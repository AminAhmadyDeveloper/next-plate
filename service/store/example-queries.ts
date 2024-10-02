import { createQueryKeys } from '@lukemorales/query-key-factory';

export const example = createQueryKeys('example', {
  detail: (example: string) => [example],
  list: (filters: []) => ({
    queryKey: [{ filters }],
    queryFn: (ctx) => ctx,
    contextQueries: {
      search: (query: string, limit = 15) => ({
        queryKey: [query, limit],
        queryFn: (ctx) => ctx,
      }),
    },
  }),
});
