import { initTRPC } from '@trpc/server';
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { Ratelimit } from '@upstash/ratelimit';
import Superjson from 'superjson';

import {
  createTRPCUpstashLimiter,
  defaultFingerPrint,
  redis,
} from '@/lib/upstash-utils';

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

export const createTRPCContext = (options?: FetchCreateContextFnOptions) => {
  return {
    request: options?.req,
  };
};
const t = initTRPC
  .context<ReturnType<typeof createTRPCContext>>()
  .create({ transformer: Superjson });

export const router = t.router;
export const publicProcedure = t.procedure.use(rateLimiter);
export const createCallerFactory = t.createCallerFactory;
