import { initTRPC } from '@trpc/server';
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
// import { Ratelimit } from '@upstash/ratelimit';
import Superjson from 'superjson';

import { type NextApiRequest } from 'next';

// import {
//   createTRPCUpstashLimiter,
//   defaultFingerPrint,
//   redis,
// } from '@/lib/upstash-utils';

type Context = {
  req: NextApiRequest;
};

// const rateLimiter = createTRPCUpstashLimiter<typeof t>({
//   fingerprint: (ctx) => defaultFingerPrint(ctx.req),
//   message: (hitInfo) =>
//     `Too many requests, please try again later. ${Math.ceil(
//       (hitInfo.reset - Date.now()) / 1000,
//     )}`,
//   max: 15,
//   windowMs: 10000,
//   rateLimitOpts(opts) {
//     return {
//       redis: redis,
//       limiter: Ratelimit.fixedWindow(opts.max, `${opts.windowMs} ms`),
//     };
//   },
// });

const t = initTRPC.context<Context>().create({ transformer: Superjson });

export const createTRPCContext = (options?: FetchCreateContextFnOptions) => {
  return {
    request: options?.req,
  };
};

export const router = t.router;
export const publicProcedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;
