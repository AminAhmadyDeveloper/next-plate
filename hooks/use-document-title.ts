import { useRef } from 'react';

import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic-layout-effect';
import { useUnmount } from '@/hooks/use-unmount';

type UseDocumentTitleOptions = {
  preserveTitleOnUnmount?: boolean;
};

export const useDocumentTitle = (
  title: string,
  options: UseDocumentTitleOptions = {},
): void => {
  const { preserveTitleOnUnmount = true } = options;
  const defaultTitle = useRef<string | null>(null);

  useIsomorphicLayoutEffect(() => {
    defaultTitle.current = window.document.title;
  }, []);

  useIsomorphicLayoutEffect(() => {
    window.document.title = title;
  }, [title]);

  useUnmount(() => {
    if (!preserveTitleOnUnmount && defaultTitle.current) {
      window.document.title = defaultTitle.current;
    }
  });
};
