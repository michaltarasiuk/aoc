import {P, match} from 'ts-pattern';
import * as v from 'valibot';
import {env} from '../env';

class ResponseError extends Error {
	constructor(public response: Response) {
		super();
		this.name = ResponseError.name;
	}
}

const INPUT_SCHEMA = v.object({
	year: v.number([
		v.integer('The year must be an integer.'),
		v.minValue(2015, 'The year must be at least 2015.'),
		v.maxValue(2023, 'The year must not exceed 2023.'),
	]),
	day: v.number([
		v.integer('The day must be an integer.'),
		v.minValue(1, 'The day must be at least 1.'),
		v.maxValue(25, 'The day must not exceed 25.'),
	]),
});

export async function getInput(input: {year: number; day: number}) {
	try {
		v.parse(INPUT_SCHEMA, input);
		const {year, day} = input;

		const response = await fetch(
			`https://adventofcode.com/${year}/day/${day}/input`,
			{
				headers: {
					Accept: 'text/plain',
					Cookie: `session=${env.session}`,
				},
			},
		);
		if (!response.ok) throw new ResponseError(response);

		return await response.text();
	} catch (value) {
		const message = await match(value)
			.with(P.instanceOf(v.ValiError), (valiError) => {
				return getMessageOfValiError(valiError);
			})
			.with(P.instanceOf(ResponseError), (responseError) => {
				return getMessageOfResponseError(responseError);
			})
			.with(P.instanceOf(Error), (error) => {
				return error.message;
			})
			.run();

		console.error(message);
		process.exit();
	}
}

function getMessageOfValiError(error: v.ValiError) {
	return error.issues
		.map((issue) => `[ValiError] ${issue.message}`)
		.join('\n');
}

async function getMessageOfResponseError(error: ResponseError) {
	const text = await error.response.text();
	return `[ResponseError] ${text}`;
}
