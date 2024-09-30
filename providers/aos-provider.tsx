'use client';

import AOS from 'aos';

import type { FC } from 'react';
import { useEffect } from 'react';

export const AosProvider: FC = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(AOS.init, []);
  return null;
};
