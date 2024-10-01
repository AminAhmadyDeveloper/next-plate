import Cookies from 'js-cookie';

import { type Dispatch, useCallback, useEffect, useState } from 'react';

import { useEmptyEffect } from '@/hooks/use-empty-effect';
import { useFirstMountState } from '@/hooks/use-first-mount-state.js';
import { useSyncedRef } from '@/hooks/use-synced-ref.js';
import { isBrowser } from '@/lib/dom-utils';

const cookiesSetters = new Map<string, Set<Dispatch<string | null>>>();

const registerSetter = (key: string, setter: Dispatch<string | null>) => {
  let setters = cookiesSetters.get(key);

  if (!setters) {
    setters = new Set();
    cookiesSetters.set(key, setters);
  }

  setters.add(setter);
};

const unregisterSetter = (
  key: string,
  setter: Dispatch<string | null>,
): void => {
  const setters = cookiesSetters.get(key);

  if (!setters) return;

  setters.delete(setter);

  if (setters.size === 0) {
    cookiesSetters.delete(key);
  }
};

const invokeRegisteredSetters = (
  key: string,
  value: string | null,
  skipSetter?: Dispatch<string | null>,
) => {
  const setters = cookiesSetters.get(key);

  if (!setters) return;

  for (const s of setters) {
    if (s !== skipSetter) s(value);
  }
};

export type UseCookieValueOptions<
  InitializeWithValue extends boolean | undefined = boolean | undefined,
> = Cookies.CookieAttributes &
  (InitializeWithValue extends undefined
    ? {
        initializeWithValue?: InitializeWithValue;
      }
    : {
        initializeWithValue: InitializeWithValue;
      });

export type UseCookieValueReturn<
  V extends undefined | null | string = undefined | null | string,
> = [
  value: V,
  set: (value: string) => void,
  remove: () => void,
  fetch: () => void,
];

export function useCookieValue(
  key: string,
  options: UseCookieValueOptions<false>,
): UseCookieValueReturn;
export function useCookieValue(
  key: string,
  options?: UseCookieValueOptions,
): UseCookieValueReturn;

export function useCookieValue(
  key: string,
  options: UseCookieValueOptions = {},
): UseCookieValueReturn {
  if (process.env.NODE_ENV === 'development' && Cookies === undefined) {
    throw new ReferenceError(
      'Dependency `js-cookies` is not installed, it is required for `useCookieValue` work.',
    );
  }

  let { initializeWithValue = true } = options;

  if (!isBrowser) {
    initializeWithValue = false;
  }

  const methods = useSyncedRef({
    set(value: string) {
      setState(value);
      Cookies.set(key, value, options.cookiesOptions);
      invokeRegisteredSetters(key, value, setState);
    },
    remove() {
      setState(null);
      Cookies.remove(key, options.cookiesOptions);
      invokeRegisteredSetters(key, null, setState);
    },
    fetchVal: () => Cookies.get(key) ?? null,
    fetch() {
      const value = methods.current.fetchVal();
      setState(value);
      invokeRegisteredSetters(key, value, setState);
    },
  });

  const isFirstMount = useFirstMountState();
  const [state, setState] = useState<string | null | undefined>(
    isFirstMount && initializeWithValue
      ? methods.current.fetchVal()
      : undefined,
  );

  useEmptyEffect(() => {
    if (!initializeWithValue) {
      methods.current.fetch();
    }
  });

  useEffect(() => {
    registerSetter(key, setState);

    return () => {
      unregisterSetter(key, setState);
    };
  }, [key]);

  return [
    state,

    useCallback((value: string) => {
      methods.current.set(value);
    }, []),

    useCallback(() => {
      methods.current.remove();
    }, []),

    useCallback(() => {
      methods.current.fetch();
    }, []),
  ];
}
