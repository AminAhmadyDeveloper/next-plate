import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

import { users } from '@/server/database/schema';

export const loginSchema = createInsertSchema(users)
  .pick({
    username: true,
  })
  .extend({
    password: z.string(),
  });

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = createInsertSchema(users)
  .pick({
    username: true,
    email: true,
  })
  .extend({
    password: z.string(),
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
