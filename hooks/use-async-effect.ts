import type { DependencyList } from 'react';
import { useEffect } from 'react';

import { isFunction } from '@/lib/type-utils';

const isAsyncGenerator = (
  val: AsyncGenerator<void, void, void> | Promise<void>,
): val is AsyncGenerator<void, void, void> => {
  // @ts-expect-error Any is only choice here
  return isFunction(val[Symbol.asyncIterator]);
};

const useAsyncEffect = (
  effect: () => AsyncGenerator<void, void, void> | Promise<void>,
  deps?: DependencyList,
) => {
  useEffect(() => {
    const e = effect();
    let cancelled = false;
    async function execute() {
      if (isAsyncGenerator(e)) {
        while (true) {
          const result = await e.next();
          if (result.done || cancelled) {
            break;
          }
        }
      } else {
        await e;
      }
    }
    execute();
    return () => {
      cancelled = true;
    };
  }, deps);
};

export default useAsyncEffect;
