import {
  DefaultError,
  FetchQueryOptions,
  HydrationBoundary,
  QueryClient,
  QueryKey,
  dehydrate,
} from '@tanstack/react-query';
import { FC, PropsWithChildren } from 'react';

export interface TanstackQueryPrefetchProps<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> extends Omit<
      FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
      'state'
    >,
    PropsWithChildren {}

export const TanstackQueryPrefetch: FC<TanstackQueryPrefetchProps> = async ({
  children,
  ...props
}) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(props);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};
