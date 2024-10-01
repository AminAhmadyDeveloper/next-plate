'use client';

import AOS from 'aos';

import type { FC } from 'react';

import { useEmptyEffect } from '@/hooks/use-empty-effect';

export const AosProvider: FC = () => {
  useEmptyEffect(AOS.init);
  return null;
};
