'use client';

import type { FC } from 'react';

import { useConfirm } from '@/components/extension/confirm-dialog';
import { Button } from '@/components/ui/button';

export const Confirm: FC = () => {
  const confirm = useConfirm();

  const onClick = async () => {
    const isConfirmed = await confirm({
      title: 'Delete Item',
      description: 'Are you sure you want to delete this item?',
      confirmText: 'Delete',
      cancelText: 'Cancel',
    });
    console.log(isConfirmed);
  };

  return <Button onClick={onClick}>Show Dialog</Button>;
};
