import SuperJSON from 'superjson';

import { redis } from '@/lib/upstash-utils';
import type { FetchOptionsCustom } from '@/service/api-service';
import { service } from '@/service/api-service';

interface RedisCacheGeneralResponse<TData> {
  json: TData;
}

export const getAndCacheData = async <TData, TError = unknown>(
  path: string,
  options?: FetchOptionsCustom,
) => {
  const key = `${path}${options?.addToURL?.length ? `/${options?.addToURL?.join('/')}` : ''}${options?.params ? `?${new URLSearchParams(options?.params)}` : ''}`;

  const cachedData = await redis.get<RedisCacheGeneralResponse<TData>>(key);

  if (!cachedData) {
    const { data } = await service<TData, TError>(path, options);

    if (data) {
      await redis.set(key, SuperJSON.stringify(data), { ex: 60 * 30 });
      return data;
    }
  } else {
    return cachedData.json;
  }
};
