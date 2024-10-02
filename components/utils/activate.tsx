import type { FC, PropsWithChildren } from 'react';

interface ActivateProps extends PropsWithChildren {
  activate: boolean;
}

export const Activate: FC<ActivateProps> = ({ activate, children }) => {
  return activate ? children : null;
};
