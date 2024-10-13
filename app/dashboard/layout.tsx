import type { FC, PropsWithChildren } from 'react';

import { redirect } from 'next/navigation';

import { Aside } from '@/app/dashboard/_components/aside';
import { Header } from '@/app/dashboard/_components/header';
import { Footer } from '@/components/layout/footer';
import { validateRequest } from '@/lib/lucia-auth';

const DashboardLayout: FC<PropsWithChildren> = async ({ children }) => {
  const { session } = await validateRequest();
  if (!session) redirect('/login');

  return (
    <div className="grid h-screen w-full pl-[53px]">
      <Aside />
      <div className="flex flex-col">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
