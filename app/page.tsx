import type { NextPage } from 'next';

import { Icon } from '@/components/ui/icon';

const MainPage: NextPage = () => {
  return (
    <div data-aos="fade-up" data-aos-easing="ease-in-out">
      <Icon icon="ph-airplane-takeoff" variant="duotone" size="7xl" />
    </div>
  );
};

export default MainPage;
