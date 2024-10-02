import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

import type { AnyRootConfig, BaseOpts } from '@/lib/trpc-utils';
import { defineLimiterWithProps } from '@/lib/trpc-utils';

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const isBlocked = async (store: Ratelimit, fingerprint: string) => {
  const { success, pending, ...rest } = await store.limit(fingerprint);
  await pending;
  return success ? null : rest;
};

export const createTRPCUpstashLimiter = defineLimiterWithProps<
  {
    rateLimitOpts: (
      opts: Required<BaseOpts<AnyRootConfig, unknown>>,
    ) => ConstructorParameters<typeof Ratelimit>[0];
  },
  NonNullable<Awaited<ReturnType<typeof isBlocked>>>
>(
  {
    store: (opts) => new Ratelimit(opts.rateLimitOpts(opts)),
    isBlocked,
  },
  (currentState) => {
    return { rateLimitOpts: currentState.rateLimitOpts };
  },
);

export { defaultFingerPrint } from '@/lib/trpc-utils';
