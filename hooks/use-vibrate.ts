import { useEffect } from 'react';

import { isBrowser } from '@/lib/dom-utils';
import { noop } from '@/lib/function-utils';

export const useVibrate =
  !isBrowser || navigator.vibrate === undefined
    ? noop
    : (enabled: boolean, pattern: VibratePattern, loop?: boolean): void => {
        useEffect(() => {
          let interval: undefined | ReturnType<typeof setInterval>;

          if (enabled) {
            navigator.vibrate(pattern);

            if (loop) {
              interval = setInterval(
                () => {
                  navigator.vibrate(pattern);
                },
                Array.isArray(pattern)
                  ? pattern.reduce((a, n) => a + n, 0)
                  : pattern,
              );
            }

            return () => {
              navigator.vibrate(0);

              if (interval) {
                clearInterval(interval);
              }
            };
          }
        }, [loop, pattern, enabled]);
      };
