import { Fragment } from 'react';

import type { NextPage } from 'next';

import { Icon } from '@/components/ui/icon';

const MainPage: NextPage = () => {
  return (
    <Fragment>
      <div data-aos="fade-up">
        <Icon icon="ph-acorn" variant="duotone" size="7xl" />
      </div>
    </Fragment>
  );
};

export default MainPage;
