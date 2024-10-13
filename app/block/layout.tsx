import type { FC, PropsWithChildren } from 'react';

import { Aside } from '@/app/block/_components/aside';
import { Header } from '@/app/block/_components/header';

const BlockLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="grid h-screen w-full pl-[53px]">
      <Aside />
      <div className="flex flex-col">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default BlockLayout;
