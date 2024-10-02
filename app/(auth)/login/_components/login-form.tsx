'use client';

import type { FC } from 'react';
import { useTransition } from 'react';

import { login } from '@/app/(auth)/login/_actions/login';
import { ExtendedButton } from '@/components/extension/extended-button';
import AutoForm from '@/components/ui/auto-form';
import type { LoginSchema } from '@/validators/auth-validators';
import { loginSchema } from '@/validators/auth-validators';

export const LoginForm: FC = () => {
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (values: LoginSchema) => {
    startTransition(async () => {
      const { error } = await login(values);
      if (error) console.log(error);
    });
  };

  return (
    <AutoForm
      fieldConfig={{
        password: {
          inputProps: {
            type: 'password',
          },
        },
      }}
      onSubmit={onSubmit}
      formSchema={loginSchema}
    >
      <ExtendedButton isLoading={isPending} className="w-full">
        Login
      </ExtendedButton>
    </AutoForm>
  );
};
