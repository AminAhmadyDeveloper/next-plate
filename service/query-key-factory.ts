import { mergeQueryKeys } from '@lukemorales/query-key-factory';

import { example } from '@/service/store/example-queries';

export const queries = mergeQueryKeys(example);
