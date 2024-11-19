import 'dotenv/config';

import {z} from 'zod';

const EnvSchema = z.object({
  session: z.string(),
});
export const env = EnvSchema.parse(process.env);
