import type { FetchError } from 'ofetch';

import '@tanstack/react-query';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: FetchError;
  }
}
