import { Suspense } from 'react';

import type { NextPage } from 'next';

import { Billing } from '@/app/dashboard/_components/billing';
import { Spinner } from '@/components/extension/spinner';
import { Container } from '@/components/layout/container';

const DashboardPage: NextPage = () => {
  return (
    <main className="flex-1">
      <Suspense fallback={<Spinner />}>
        <Container className="xl:!max-w-5xl flex justify-center items-center">
          <Billing />
        </Container>
      </Suspense>
    </main>
  );
};

export default DashboardPage;
