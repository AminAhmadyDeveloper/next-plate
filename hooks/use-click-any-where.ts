import { useEventListener } from '@/hooks/use-event-listener';

export const useClickAnyWhere = (handler: (event: MouseEvent) => void) => {
  useEventListener('click', (event) => {
    handler(event);
  });
};
