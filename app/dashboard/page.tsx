import type { NextPage } from 'next';

import { AreaChart } from '@/app/dashboard/_components/area-chart';
import { BarChart } from '@/app/dashboard/_components/bar-chart';
import { Container } from '@/components/layout/container';

const DashboardPage: NextPage = () => {
  return (
    <main className="flex-1">
      <h1 className="mt-8 text-center text-3xl font-bold md:text-4xl lg:text-5xl">
        Charts
      </h1>
      <p className="text-balance mb-10 text-center text-muted-foreground md:text-lg lg:text-xl">
        Recharts is easy and cool
      </p>
      <Container className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BarChart />
        <AreaChart />
      </Container>
    </main>
  );
};

export default DashboardPage;
