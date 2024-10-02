'use client';

import { httpBatchLink } from '@trpc/client';
import SuperJSON from 'superjson';

import { createTRPCReact } from '@trpc/react-query';
import { useState } from 'react';
import type { FC, PropsWithChildren } from 'react';

import { getQueryClient } from '@/lib/tanstack-query-utils';
import { getUrl } from '@/lib/trpc-utils';
import { TanstackQueryProvider } from '@/providers/tanstack-query-provider';
import type { AppRouter } from '@/trpc';

export const trpc = createTRPCReact<AppRouter>();

const queryClient = getQueryClient();

export const TRPCProvider: FC<PropsWithChildren> = ({ children }) => {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [httpBatchLink({ transformer: SuperJSON, url: getUrl() })],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
    </trpc.Provider>
  );
};
