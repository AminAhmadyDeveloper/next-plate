'use client';

import type { FC, FormEventHandler } from 'react';
import { useTransition } from 'react';

import { logout } from '@/actions/logout';
import { ExtendedButton } from '@/components/extension/extended-button';

export const Logout: FC = () => {
  const [isPending, startTransition] = useTransition();
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    startTransition(logout);
  };

  return (
    <form onSubmit={onSubmit}>
      <ExtendedButton isLoading={isPending} size="sm" type="submit">
        Logout
      </ExtendedButton>
    </form>
  );
};
