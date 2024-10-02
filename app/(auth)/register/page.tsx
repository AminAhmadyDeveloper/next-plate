import type { NextPage } from 'next';
import Link from 'next/link';

import { RegisterForm } from '@/app/(auth)/register/_components/register-form';

const RegisterPage: NextPage = () => {
  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Register</h1>
        <p className="text-balance text-muted-foreground">
          Enter your email below to register an account
        </p>
      </div>
      <div className="grid gap-4">
        <RegisterForm />
      </div>
      <div className="mt-4 text-center text-sm">
        have an account?{' '}
        <Link href="/login" className="underline">
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
