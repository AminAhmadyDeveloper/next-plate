import { useCallback, useEffect, useState } from 'react';

import { useEventListener } from '@/hooks/use-event-listener';

const IS_SERVER = typeof window === 'undefined';

type Options<T, InitializeWithValue extends boolean | undefined> = {
  deserializer?: (value: string) => T;
  initializeWithValue: InitializeWithValue;
};

export function useReadLocalStorage<T>(
  key: string,
  options: Options<T, false>,
): T | null | undefined;

export function useReadLocalStorage<T>(
  key: string,
  options?: Partial<Options<T, true>>,
): T | null;
export function useReadLocalStorage<T>(
  key: string,
  options: Partial<Options<T, boolean>> = {},
): T | null | undefined {
  let { initializeWithValue = true } = options;
  if (IS_SERVER) {
    initializeWithValue = false;
  }

  const deserializer = useCallback<(value: string) => T | null>(
    (value) => {
      if (options.deserializer) {
        return options.deserializer(value);
      }
      if (value === 'undefined') {
        return undefined as unknown as T;
      }

      let parsed: unknown;
      try {
        parsed = JSON.parse(value);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        return null;
      }

      return parsed as T;
    },
    [options],
  );

  const readValue = useCallback((): T | null => {
    if (IS_SERVER) {
      return null;
    }

    try {
      const raw = window.localStorage.getItem(key);
      return raw ? deserializer(raw) : null;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return null;
    }
  }, [key, deserializer]);

  const [storedValue, setStoredValue] = useState(() => {
    if (initializeWithValue) {
      return readValue();
    }
    return undefined;
  });

  useEffect(() => {
    setStoredValue(readValue());
  }, [key]);

  const handleStorageChange = useCallback(
    (event: StorageEvent | CustomEvent) => {
      if ((event as StorageEvent).key && (event as StorageEvent).key !== key) {
        return;
      }
      setStoredValue(readValue());
    },
    [key, readValue],
  );

  useEventListener('storage', handleStorageChange);

  useEventListener('local-storage', handleStorageChange);

  return storedValue;
}
