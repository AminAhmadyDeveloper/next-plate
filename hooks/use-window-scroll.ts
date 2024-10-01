import { useCallback, useLayoutEffect, useState } from 'react';

interface Coordinations {
  x: number | null;
  y: number | null;
}

export const useWindowScroll = (): [
  Coordinations,
  (options?: ScrollToOptions) => void,
] => {
  const [state, setState] = useState<Coordinations>({ x: null, y: null });

  const scrollTo = useCallback((options?: ScrollToOptions) => {
    window.scrollTo(options);
  }, []);

  useLayoutEffect(() => {
    const handleScroll = () => {
      setState({ x: window.scrollX, y: window.scrollY });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return [state, scrollTo];
};
