import 'server-only';

import { createHydrationHelpers } from '@trpc/react-query/rsc';
import { cache } from 'react';

import { makeQueryClient } from '@/lib/tanstack-query-utils';
import { appRouter } from '@/trpc';
import { createCallerFactory, createTRPCContext } from '@/trpc/server';

export const getQueryClient = cache(makeQueryClient);
const caller = createCallerFactory(appRouter)(createTRPCContext);
export const { trpc, HydrateClient } = createHydrationHelpers<typeof appRouter>(
  caller,
  getQueryClient,
);
