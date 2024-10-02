import { type FetchOptions, ResponseType, ofetch } from 'ofetch';

import { isDevelopment } from '@/lib/env-utils';
import { noop } from '@/lib/function-utils';

export interface ListResponse<G> {
  count?: number;
  list?: G[];
  page?: number;
  totalPages?: number;
}

export type ResponseGeneral<T> = T;

// export interface ResponseGeneral<T> {
//   status: boolean;
//   path: string;
//   statusCode: number;
//   message?: string;
//   data?: T;
// }

export interface VerificationCodeData {
  verificationCode?: string;
}

export interface HttpError<N extends number = number> {
  error?: HttpError<number>;
  status: N;
  statusCode: N;
  expose: boolean;
  name: string;
  message: string[];
  stack?: string;
  headers?: { [key: string]: string } | undefined;
  [key: string]: unknown;
}

export interface FetchResult<T, C = false, E = unknown> {
  data?: ResponseGeneral<T>;
  error?: HttpError<number> & { data?: E };
  loading?: boolean;
}

export interface FetchOptionsCustom<R>
  extends FetchOptions<ResponseType, unknown> {
  method?: Method;
  public?: boolean;
  addToURL?: (string | undefined | null)[];
  service?: Service;
  hideMessage?: boolean;
  noCache?: boolean;
  responseType?: ResponseType;
}

export interface DefaultHeaders {
  Authentication: string;
}

export interface FetchConfig {
  headers: DefaultHeaders;
}

export type MessageResponse = ResponseGeneral<{ message: string }>;

export type Method =
  | 'GET'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'PURGE'
  | 'LINK'
  | 'UNLINK';

export type Service = 'apm' | 'apu' | 'ps' | 'notification' | 'emoji';

export const createParams = <R>(
  options: FetchOptionsCustom<R> | undefined,
): string | undefined => {
  return options?.addToURL ? `/${options.addToURL.join('/')}` : undefined;
};

export const getBaseURL = (isPublic?: boolean, service?: Service): string => {
  return 'https://jsonplaceholder.typicode.com/';
};

export const service = async <T, R = never, C = false, E = unknown>(
  path: string,
  options?: FetchOptionsCustom<R>,
): Promise<FetchResult<T, C, E>> => {
  let fetchResult: FetchResult<T, C, E> = { loading: true };

  const joinedForUrl = createParams<R>(options);
  const token = '';
  const params = options?.params ?? {};

  const headers: Record<string, string> = {
    ...((options?.headers || {}) as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = token;
  }

  if (options?.noCache) {
    headers['Cache-Control'] = 'no-cache';
    headers['Pragma'] = 'no-cache';
    headers['Expires'] = '0';
  }

  const baseURL = getBaseURL(options?.public, options?.service);

  try {
    const data = (await ofetch<ResponseGeneral<T>>(
      path + (joinedForUrl || ''),
      {
        baseURL,
        headers,
        params,
        ...options,
        responseType: 'json',
      },
    )) as ResponseGeneral<T>;

    // const responseData = data?.data as VerificationCodeData | undefined;

    // if (data?.message && !options?.hideMessage) {
    //   if (isDevelopment && responseData?.verificationCode) {
    //     alert(responseData.verificationCode);
    //   }
    //   alert(data?.message);
    // }

    fetchResult = { data, loading: false };
  } catch (error: unknown) {
    const httpError = error as HttpError;

    if (isDevelopment && (httpError.data as any)?.verificationCode) {
      alert((httpError.data as any).verificationCode);
    }
    if (httpError?.status === 500) {
      alert('Server Error');
      return { error: httpError };
    }
    if (httpError?.status === 404) {
      alert('Incorrect route');
      return { error: httpError };
    }

    fetchResult = { error: httpError, loading: false };

    if (httpError?.message) {
      alert(httpError?.message);
      return { error: httpError };
    }
  }

  return fetchResult;
};
