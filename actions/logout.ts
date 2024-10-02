'use server';

import { eq } from 'drizzle-orm';

import { isRedirectError } from 'next/dist/client/components/redirect';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { lucia, validateRequest } from '@/lib/lucia-auth';
import { db } from '@/server/database/db';
import { sessions } from '@/server/database/schema';

export const logout = async () => {
  const { session } = await validateRequest();
  if (session) {
    try {
      const deletedSession = await db
        .delete(sessions)
        .where(eq(sessions.id, session.id));

      if (deletedSession.rowCount > 0) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
        return redirect('/login');
      }
    } catch (error) {
      if (isRedirectError(error)) throw error;
    }
  }
};
