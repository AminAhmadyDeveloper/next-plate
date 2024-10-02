import 'server-only';

import { createHydrationHelpers } from '@trpc/react-query/rsc';
import { cache } from 'react';

import { makeQueryClient } from '@/lib/query-client';
import { AppRouter, appRouter } from '@/trpc';
import { createCallerFactory, createTRPCContext } from '@/trpc/server';

export const getQueryClient = cache(makeQueryClient);
const caller = createCallerFactory(appRouter)(createTRPCContext);

export const { trpc, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient,
);
