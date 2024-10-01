import { useState } from 'react';
import type { RefObject } from 'react';

import { useEventListener } from '@/hooks/use-event-listener';

export const useHover = <T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T>,
): boolean => {
  const [value, setValue] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setValue(true);
  };
  const handleMouseLeave = () => {
    setValue(false);
  };

  useEventListener('mouseenter', handleMouseEnter, elementRef);
  useEventListener('mouseleave', handleMouseLeave, elementRef);

  return value;
};
