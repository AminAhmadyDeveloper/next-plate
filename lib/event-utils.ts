export const on = <T extends EventTarget>(
  object: T | null,
  ...args:
    | Parameters<T['addEventListener']>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | [string, EventListenerOrEventListenerObject | CallableFunction, ...any]
): void => {
  object?.addEventListener?.(
    ...(args as Parameters<HTMLElement['addEventListener']>),
  );
};

export const off = <T extends EventTarget>(
  object: T | null,
  ...args:
    | Parameters<T['removeEventListener']>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | [string, EventListenerOrEventListenerObject | CallableFunction, ...any]
): void => {
  object?.removeEventListener?.(
    ...(args as Parameters<HTMLElement['removeEventListener']>),
  );
};
