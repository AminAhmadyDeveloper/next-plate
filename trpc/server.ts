import type { inferAsyncReturnType } from '@trpc/server';
import { TRPCError, initTRPC } from '@trpc/server';
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { Ratelimit } from '@upstash/ratelimit';
import Superjson from 'superjson';
import { ZodError } from 'zod';

import { uncachedValidateRequest } from '@/lib/lucia-auth';
import { stripe } from '@/lib/stripe-instance';
import {
  createTRPCUpstashLimiter,
  defaultFingerPrint,
  redis,
} from '@/lib/upstash-utils';
import { db } from '@/server/database/db';

const rateLimiter = createTRPCUpstashLimiter<typeof t>({
  fingerprint: (ctx) => defaultFingerPrint(ctx.request),
  message: (hitInfo) =>
    `Too many requests, please try again later. ${Math.ceil(
      (hitInfo.reset - Date.now()) / 1000,
    )}`,
  max: 1500,
  windowMs: 10000,
  rateLimitOpts(opts) {
    return {
      redis: redis,
      limiter: Ratelimit.fixedWindow(opts.max, `${opts.windowMs} ms`),
    };
  },
});

export const createTRPCContext = async (
  options?: FetchCreateContextFnOptions,
) => {
  const { session, user } = await uncachedValidateRequest();
  return {
    session,
    user,
    db,
    headers: options?.resHeaders,
    stripe: stripe,
    request: options?.req,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: Superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const _protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session || !ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      session: { ...ctx.session },
      user: { ...ctx.user },
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure.use(rateLimiter);
export const protectedProcedure = _protectedProcedure.use(rateLimiter);
export const createCallerFactory = t.createCallerFactory;

export type TRPCContext = inferAsyncReturnType<typeof createTRPCContext>;
export type ProtectedTRPCContext = TRPCContext & {
  user: NonNullable<TRPCContext['user']>;
  session: NonNullable<TRPCContext['session']>;
};
