import type { FC, ReactNode } from 'react';

export interface SwitcherProps {
  selectSecondChild: boolean;
  children: ReactNode[];
}

export const Switcher: FC<SwitcherProps> = ({
  children,
  selectSecondChild,
}) => {
  return selectSecondChild ? children[1] : children[0];
};
