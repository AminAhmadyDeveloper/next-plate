'use client';

import {
  QueryClientProvider,
  type QueryClientProviderProps,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FC, Fragment } from 'react';

import { getQueryClient } from '@/lib/tanstack-query-utils';

const queryClient = getQueryClient();

export const TanstackQueryProvider: FC<
  Omit<QueryClientProviderProps, 'client'>
> = ({ ...props }) => {
  return (
    <Fragment>
      <QueryClientProvider client={queryClient} {...props} />
      <ReactQueryDevtools client={queryClient} initialIsOpen={false} />
    </Fragment>
  );
};
