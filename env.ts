import * as v from 'valibot';

const ENV_SCHEMA = v.object({
    session: v.string(),
});

export const env = v.parse(ENV_SCHEMA, process.env);
