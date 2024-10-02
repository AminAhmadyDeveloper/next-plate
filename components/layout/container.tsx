import type { FC } from 'react';

import { cn } from '@/lib/tailwind-utils';

export const Container: FC<ReactDiv> = ({ className, ...props }) => {
  return (
    <div className="w-full flex justify-center">
      <div
        className={cn(className, 'w-full md:max-w-5xl xl:max-w-7xl')}
        {...props}
      />
    </div>
  );
};
