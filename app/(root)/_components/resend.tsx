'use client';

import { useMutation } from '@tanstack/react-query';
import type { FC } from 'react';
import { Fragment, useMemo } from 'react';

import { ExtendedButton } from '@/components/extension/extended-button';
import { useSession } from '@/providers/session-provider';
import { service } from '@/service/api-service';

export interface EmailResponse {
  id: string;
}

export const Resend: FC = () => {
  const { user } = useSession();

  const mutationFn = async () => {
    const { data } = await service<EmailResponse>('send', { method: 'POST' });
    return data;
  };

  const sendEmailMutation = useMutation({
    mutationKey: ['SEND_EMAIL', 'POST'],
    mutationFn,
  });

  const mutate = () => sendEmailMutation.mutate();

  const disabled = useMemo(() => {
    return user?.username !== 'aminahmady' || sendEmailMutation.isPending;
  }, [sendEmailMutation.isPending, user?.username]);

  return (
    <Fragment>
      <ExtendedButton
        onClick={mutate}
        disabled={disabled}
        isLoading={sendEmailMutation.isPending}
      >
        Send Welcome Mail
      </ExtendedButton>
    </Fragment>
  );
};
