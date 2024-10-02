'use server';

import { hash } from '@node-rs/argon2';
import { eq } from 'drizzle-orm';
import { generateIdFromEntropySize } from 'lucia';

import { isRedirectError } from 'next/dist/client/components/redirect';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { lucia } from '@/lib/lucia-auth';
import { db } from '@/server/database/db';
import { users } from '@/server/database/schema';
import {
  type RegisterSchema,
  registerSchema,
} from '@/validators/auth-validators';

export const register = async (credentials: RegisterSchema) => {
  try {
    const { password, username, email } = registerSchema.parse(credentials);

    const existingUsername = await db.query.users.findFirst({
      where: (record) => eq(record.username, username),
    });

    if (existingUsername) {
      return {
        error: {
          username: 'username already taken',
        },
      };
    }

    const existingEmail = await db.query.users.findFirst({
      where: (record) => eq(record.email, email),
    });

    if (existingEmail) {
      return {
        error: {
          email: 'email already exists',
        },
      };
    }

    const userId = generateIdFromEntropySize(10);

    const hashedPassword = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    const createdUser = await db.insert(users).values({
      id: userId,
      email,
      hashedPassword,
      username,
      displayName: username,
    });

    if (createdUser.rowCount > 0) {
      const session = await lucia.createSession(userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
      return redirect('/');
    }

    return {
      error: {
        general: 'something went wrong',
      },
    };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return {
      error: {
        general: 'something went wrong',
      },
    };
  }
};
