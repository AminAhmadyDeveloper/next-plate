import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic-layout-effect';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useMediaQuery } from '@/hooks/use-media-query';

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';
const LOCAL_STORAGE_KEY = 'ts-dark-mode';

type DarkModeOptions = {
  defaultValue?: boolean;
  localStorageKey?: string;
  initializeWithValue?: boolean;
};

type DarkModeReturn = {
  isDarkMode: boolean;
  toggle: () => void;
  enable: () => void;
  disable: () => void;
  set: (value: boolean) => void;
};

export const useDarkMode = (options: DarkModeOptions = {}): DarkModeReturn => {
  const {
    defaultValue,
    localStorageKey = LOCAL_STORAGE_KEY,
    initializeWithValue = true,
  } = options;

  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY, {
    initializeWithValue,
    defaultValue,
  });
  const [isDarkMode, setDarkMode] = useLocalStorage<boolean>(
    localStorageKey,
    defaultValue ?? isDarkOS ?? false,
    { initializeWithValue },
  );

  useIsomorphicLayoutEffect(() => {
    if (isDarkOS !== isDarkMode) {
      setDarkMode(isDarkOS);
    }
  }, [isDarkOS]);

  return {
    isDarkMode,
    toggle: () => {
      setDarkMode((prev) => !prev);
    },
    enable: () => {
      setDarkMode(true);
    },
    disable: () => {
      setDarkMode(false);
    },
    set: (value) => {
      setDarkMode(value);
    },
  };
};
