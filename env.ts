import {z} from 'zod';

const envSchema = z.object({
  session: z.string(),
});
export const env = envSchema.parse(process.env);
