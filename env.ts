import {z} from 'zod';

const ENV_SCHEMA = z.object({
  session: z.string(),
});

export const env = ENV_SCHEMA.parse(process.env);
