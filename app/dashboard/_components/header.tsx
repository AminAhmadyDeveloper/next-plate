'use client';

import type { FC } from 'react';

import { useActivePath } from '@/app/dashboard/_hooks/use-active-path';

export const Header: FC = () => {
  const activePath = useActivePath();

  return (
    <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
      <h1 className="text-xl font-semibold">{activePath?.title}</h1>
    </header>
  );
};
