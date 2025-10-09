import {z} from 'zod';

export const env = z
  .object({
    session: z.string(),
  })
  .parse(process.env);
