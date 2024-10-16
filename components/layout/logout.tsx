'use client';

import type { FC, MouseEventHandler } from 'react';
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

  const onSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
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
      <ExtendedButton
        isLoading={isPending}
        size="sm"
        type="button"
        onClick={onSubmit}
      >
        Logout
      </ExtendedButton>
      <ExtendedButton
        isLoading={isPending}
        type="button"
        variant="ghost"
        size="icon"
        className="mt-auto rounded-lg"
        aria-label="Logout"
        onClick={onSubmit}
      >
        <Icon
          icon="ph-sign-out"
          variant="bold"
          size="lg"
          className="text-primary"
        />
      </ExtendedButton>
    </Switcher>
  );
};
