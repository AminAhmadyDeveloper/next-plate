import { Suspense } from 'react';

import type { NextPage } from 'next';

import { Billing } from '@/app/dashboard/_components/billing';
import { BillingSkeleton } from '@/app/dashboard/_components/billing-skeleton';
import { Container } from '@/components/layout/container';

const DashboardPage: NextPage = () => {
  return (
    <main className="flex-1">
      <Container className="xl:!max-w-5xl flex justify-center items-center">
        <Suspense fallback={<BillingSkeleton />}>
          <Billing />
        </Suspense>
      </Container>
    </main>
  );
};

export default DashboardPage;
