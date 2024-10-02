'use client';

import type { FC } from 'react';
import { useTransition } from 'react';

import { register } from '@/app/(auth)/register/_actions/register';
import { ExtendedButton } from '@/components/extension/extended-button';
import AutoForm from '@/components/ui/auto-form';
import {
  type RegisterSchema,
  registerSchema,
} from '@/validators/auth-validators';

export const RegisterForm: FC = () => {
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (values: RegisterSchema) => {
    startTransition(async () => {
      const { error } = await register(values);
      if (error) console.log(error);
    });
  };

  return (
    <AutoForm
      onSubmit={onSubmit}
      formSchema={registerSchema}
      fieldConfig={{
        password: {
          inputProps: {
            type: 'password',
          },
        },
      }}
    >
      <ExtendedButton isLoading={isPending} className="w-full">
        Register
      </ExtendedButton>
    </AutoForm>
  );
};
