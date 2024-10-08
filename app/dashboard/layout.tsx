import type { FC, PropsWithChildren } from 'react';

import { redirect } from 'next/navigation';

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { validateRequest } from '@/lib/lucia-auth';

const DashboardLayout: FC<PropsWithChildren> = async ({ children }) => {
  const { session } = await validateRequest();
  if (!session) redirect('/login');

  return (
    <div className="flex flex-col min-h-screen">
      <Header hideNavigationMenu />
      {children}
      <Footer />
    </div>
  );
};

export default DashboardLayout;
