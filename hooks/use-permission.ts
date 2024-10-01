import { type MutableRefObject, useEffect, useState } from 'react';

import { off, on } from '@/lib/event-utils';

export type UsePermissionState =
  | PermissionState
  | 'not-requested'
  | 'requested';

export function usePermission(
  descriptor: PermissionDescriptor,
): UsePermissionState {
  const [state, setState] = useState<UsePermissionState>('not-requested');

  useEffect(() => {
    const unmount: MutableRefObject<(() => void) | null> = { current: null };

    setState('requested');

    navigator.permissions
      .query(descriptor)

      .then((status): void => {
        const handleChange = () => {
          setState(status.state);
        };

        setState(status.state);
        on(status, 'change', handleChange, { passive: true });

        unmount.current = () => {
          off(status, 'change', handleChange);
        };
      });

    return () => {
      if (unmount.current) {
        unmount.current();
      }
    };
  }, [descriptor.name]);

  return state;
}
