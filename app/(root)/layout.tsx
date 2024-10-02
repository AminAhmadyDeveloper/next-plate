import type { FC, PropsWithChildren } from 'react';
import { Fragment } from 'react';

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
    </Fragment>
  );
};

export default MainLayout;
