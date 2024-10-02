'use server';

import { verify } from '@node-rs/argon2';
import { eq } from 'drizzle-orm';

import { isRedirectError } from 'next/dist/client/components/redirect';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { lucia } from '@/lib/lucia-auth';
import { db } from '@/server/database/db';
import type { LoginSchema } from '@/validators/auth-validators';
import { loginSchema } from '@/validators/auth-validators';

export const login = async (credentials: LoginSchema) => {
  try {
    const { password, username } = loginSchema.parse(credentials);

    const existingUser = await db.query.users.findFirst({
      where: (record) => eq(record.username, username),
    });

    if (!existingUser || !existingUser.hashedPassword) {
      return {
        error: {
          general: 'username or password is not valid',
        },
      };
    }

    const isPasswordValid = await verify(
      existingUser.hashedPassword,
      password,
      {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
      },
    );

    if (!isPasswordValid) {
      return {
        error: {
          general: 'username or password is not valid',
        },
      };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect('/');
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return {
      error: {
        general: 'something went wrong',
      },
    };
  }
};
