import type { ResponseType } from 'ofetch';
import { type FetchOptions, ofetch } from 'ofetch';

export interface ListResponse<G> {
  count?: number;
  list?: G[];
  page?: number;
  totalPages?: number;
}

export type ResponseGeneral<T> = T;

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

export interface FetchResult<T, E = unknown> {
  data?: ResponseGeneral<T>;
  error?: HttpError<number> & { data?: E };
  loading?: boolean;
}

export interface FetchOptionsCustom
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

export const createParams = (
  options: FetchOptionsCustom | undefined,
): string | undefined => {
  return options?.addToURL ? `/${options.addToURL.join('/')}` : undefined;
};

export const getBaseURL = (): string => {
  const base = (() => {
    if (typeof window !== 'undefined') return '';
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return 'http://localhost:3000';
  })();
  return `${base}/api/`;
};

export const service = async <T, E = unknown>(
  path: string,
  options?: FetchOptionsCustom,
): Promise<FetchResult<T, E>> => {
  let fetchResult: FetchResult<T, E> = { loading: true };

  const joinedForUrl = createParams(options);
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

  const baseURL = getBaseURL();

  try {
    const data = (await ofetch<ResponseGeneral<T>>(
      baseURL + path + (joinedForUrl || ''),
      {
        baseURL,
        headers,
        params,
        ...options,
        responseType: 'json',
      },
    )) as ResponseGeneral<T>;

    fetchResult = { data, loading: false };
  } catch (error: unknown) {
    const httpError = error as HttpError;

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
