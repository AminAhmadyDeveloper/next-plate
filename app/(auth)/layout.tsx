import type { FC, PropsWithChildren } from 'react';

import Image from 'next/image';
import { redirect } from 'next/navigation';

import { validateRequest } from '@/lib/lucia-auth';

const AuthLayout: FC<PropsWithChildren> = async ({ children }) => {
  const { session } = await validateRequest();
  if (session) redirect('/');

  return (
    <div className="w-screen h-screen overflow-hidden grid md:grid-cols-2">
      <div className="flex items-center justify-center py-12 order-2 md:order-1 col-span-full md:col-span-1">
        {children}
      </div>
      <div className="bg-muted block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
