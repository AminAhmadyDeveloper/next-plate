/* eslint-disable @typescript-eslint/no-explicit-any */
import { TRPCError } from '@trpc/server';
import type {
  AnyRootTypes,
  MiddlewareFunction,
  RootConfig,
} from '@trpc/server/unstable-core-do-not-import';

export type AnyRootConfig = {
  _config: RootConfig<AnyRootTypes>;
};

export type BaseOpts<TRoot extends AnyRootConfig, Res> = {
  windowMs?: number;
  max?: number;
  message?: string | ILimiterCallback<TRoot, Res>;
  onLimit?: ILimiterCallback<TRoot, Res, void>;
  fingerprint: (
    ctx: TRoot['_config']['$types']['ctx'],
    input: any,
    path: string,
  ) => string | Promise<string>;
};

export type TRPCRateLimitOptions<
  TRoot extends AnyRootConfig,
  Res,
  A = null,
> = A extends null ? BaseOpts<TRoot, Res> : A & BaseOpts<TRoot, Res>;

export type ILimiterCallback<TRoot extends AnyRootConfig, Res, T = string> = (
  info: Res,
  ctx: TRoot['_config']['$types']['ctx'],
  fingerprint: string,
) => T | Promise<T>;

export type ILimiterAdapter<Store extends IStoreCallback<A>, Res, A = null> = {
  store: Store;
  isBlocked: (
    store: ReturnType<Store>,
    fingerprint: string,
    opts: Required<TRPCRateLimitOptions<AnyRootConfig, Store>>,
  ) => Promise<InferResCallback<Res> | null> | InferResCallback<Res> | null;
};

export type InferResCallback<Res> = NonNullable<
  Res extends Promise<infer R2> ? R2 : Res
>;

export type IStoreCallback<A = null> = (
  opts: Required<TRPCRateLimitOptions<AnyRootConfig, any, A>>,
) => any;

export type MwFn<TRoot extends AnyRootConfig> = MiddlewareFunction<
  TRoot['_config']['$types']['ctx'],
  TRoot['_config']['$types']['meta'],
  TRoot['_config']['$types']['ctx'],
  TRoot['_config']['$types']['ctx'],
  unknown
>;

export const getUrl = () => {
  const base = (() => {
    if (typeof window !== 'undefined') return '';
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return 'http://localhost:3000';
  })();
  return `${base}/api/trpc`;
};

const parseOptions = <TRoot extends AnyRootConfig, Res, A = null>(
  passed: TRPCRateLimitOptions<TRoot, Res>,
  getDefaultOptions?: (
    currentState: Required<TRPCRateLimitOptions<AnyRootConfig, any, A>>,
  ) => Required<A>,
) => {
  const b = {
    ...passed,
    windowMs: passed.windowMs ?? 60_000,
    max: passed.max ?? 5,
    message: passed.message ?? 'Too many requests, please try again later.',
    fingerprint: passed.fingerprint,
    onLimit: passed.onLimit,
  } as unknown as Required<TRPCRateLimitOptions<AnyRootConfig, Res, A>>;
  const newOpts = getDefaultOptions ? getDefaultOptions(b as any) : ({} as any);
  return {
    ...b,
    ...newOpts,
  };
};

export const defineTRPCLimiter = <
  Store extends IStoreCallback<A>,
  Res,
  A = null,
>(
  adapter: ILimiterAdapter<Store, Res, A>,
  getDefaultOptions?: (
    currentState: Required<TRPCRateLimitOptions<AnyRootConfig, any, A>>,
  ) => Required<A>,
) => {
  return <TRoot extends AnyRootConfig>(
    opts: TRPCRateLimitOptions<TRoot, Res, A>,
  ) => {
    const options = parseOptions(opts as any, getDefaultOptions);
    const store = adapter.store(options as any);
    const middleware: MwFn<TRoot> = async ({ ctx, next, input, path }) => {
      const fp = await options.fingerprint(ctx, input, path);
      if (!fp) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'No fingerprint returned',
        });
      }
      const hitInfo = await adapter.isBlocked(store, fp, options as any);
      if (hitInfo) {
        if (typeof options.onLimit === 'function') {
          await options.onLimit(hitInfo as any, ctx, fp);
        }
        const message =
          typeof options.message === 'function'
            ? await options.message(hitInfo as any, ctx, fp)
            : options.message;
        throw new TRPCError({
          code: 'TOO_MANY_REQUESTS',
          message,
        });
      }
      return next();
    };
    return middleware;
  };
};

export const defineLimiterWithProps = <
  T,
  Res,
  Store extends IStoreCallback<T> = IStoreCallback<T>,
>(
  adapter: ILimiterAdapter<Store, Res, T>,
  getDefaultOptions: (
    currentState: Required<TRPCRateLimitOptions<AnyRootConfig, any, T>>,
  ) => Required<T>,
) => {
  const d = defineTRPCLimiter(adapter as any, getDefaultOptions);
  return <TRoot extends AnyRootConfig>(
    opts: TRPCRateLimitOptions<TRoot, Res, T>,
  ) => {
    type D = typeof defineTRPCLimiter<Store, Res, T>;
    return d(opts as any) as any as ReturnType<ReturnType<D>>;
  };
};

export const defaultFingerPrint = (req?: Request | Record<any, any>) => {
  const forwarded =
    req instanceof Request
      ? req.headers.get('x-forwarded-for')
      : req?.headers['x-forwarded-for'];
  const ip = forwarded
    ? (typeof forwarded === 'string' ? forwarded : forwarded[0])?.split(/, /)[0]
    : ((req as any)?.socket?.remoteAddress ?? null);

  return ip || '127.0.0.1';
};
