import { useEffect } from 'react';

export const useEmptyEffect = (effect: () => unknown | Promise<unknown>) => {
  useEffect(() => {
    effect();
  }, []);
};
