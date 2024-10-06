import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import type { Session, User } from 'lucia';
import { Lucia, TimeSpan } from 'lucia';

import { cache } from 'react';

import { cookies } from 'next/headers';

import { secure } from '@/lib/env-constants';
import { db } from '@/server/database/db';
import type { SelectUser } from '@/server/database/schema';
import { sessions, users } from '@/server/database/schema';

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
  getSessionAttributes: () => {
    return {};
  },
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      email: attributes.email,
      username: attributes.username,
    };
  },
  sessionExpiresIn: new TimeSpan(30, 'd'),
  sessionCookie: {
    name: 'session',
    expires: false,
    attributes: { secure },
  },
});

export const uncachedValidateRequest = async (): Promise<SessionUser> => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) {
    return { user: null, session: null };
  }
  const result = await lucia.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
  } catch {
    console.error('Failed to set session cookie');
  }
  return result;
};

export const validateRequest = cache(uncachedValidateRequest);

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<SelectUser, 'hashedPassword'>;
  }
}

export type SessionUser =
  | { user: User; session: Session }
  | { user: null; session: null };
