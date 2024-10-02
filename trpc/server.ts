import { initTRPC } from '@trpc/server';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters';
import superjson from 'superjson';

const t = initTRPC.create({
  transformer: superjson,
});

export const createTRPCContext = (options?: FetchCreateContextFnOptions) => {
  return {
    request: options?.req,
  };
};

export const router = t.router;
export const publicProcedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;
