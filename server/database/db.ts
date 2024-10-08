import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from '@/server/database/schema';

const sql = neon(process.env.NEXT_DRIZZLE_DATABASE_URL!);
export const db = drizzle(sql, { schema });
