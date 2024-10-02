import type { NextPage } from 'next';
import Link from 'next/link';

import { LoginForm } from '@/app/(auth)/login/_components/login-form';

const LoginPage: NextPage = () => {
  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-balance text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-4">
        <LoginForm />
      </div>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="underline">
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
