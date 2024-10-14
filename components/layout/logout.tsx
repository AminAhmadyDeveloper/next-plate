'use client';

import type { FC, FormEventHandler } from 'react';
import { useTransition } from 'react';

import { logout } from '@/actions/logout';
import { useConfirm } from '@/components/extension/confirm-dialog';
import { ExtendedButton } from '@/components/extension/extended-button';
import { Icon } from '@/components/ui/icon';
import { Switcher } from '@/components/utils/switcher';

interface LogoutProps {
  iconButton?: true;
}

export const Logout: FC<LogoutProps> = ({ iconButton }) => {
  const [isPending, startTransition] = useTransition();

  const confirm = useConfirm();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    const isConfirmed = await confirm({
      title: 'Logout',
      description: 'Are you sure you want to logout?',
      confirmText: 'Logout',
      cancelText: 'Cancel',
    });
    if (isConfirmed) {
      e.stopPropagation();
      e.preventDefault();
      startTransition(logout);
    }
  };

  return (
    <Switcher selectSecondChild={!!iconButton}>
      <form onSubmit={onSubmit}>
        <ExtendedButton isLoading={isPending} size="sm" type="submit">
          Logout
        </ExtendedButton>
      </form>
      <form onSubmit={onSubmit}>
        <ExtendedButton
          isLoading={isPending}
          type="submit"
          variant="ghost"
          size="icon"
          className="mt-auto rounded-lg"
          aria-label="Logout"
        >
          <Icon
            icon="ph-sign-out"
            variant="bold"
            size="lg"
            className="text-primary"
          />
        </ExtendedButton>
      </form>
    </Switcher>
  );
};
