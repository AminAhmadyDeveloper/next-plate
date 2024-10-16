import includes from 'lodash.includes';

import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

export interface ActivePath {
  title: 'Dashboard' | 'Become Pro';
  path: '/dashboard' | '/dashboard/become-pro';
}

const defaultActivePath: ActivePath = {
  path: '/dashboard',
  title: 'Dashboard',
};

export const useActivePath = () => {
  const [activePath, setActivePath] = useState<ActivePath>(defaultActivePath);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      if (includes(pathname, 'become-pro')) {
        setActivePath({
          path: '/dashboard/become-pro',
          title: 'Become Pro',
        });
      } else {
        setActivePath({
          path: '/dashboard',
          title: 'Dashboard',
        });
      }
    }
  }, [pathname]);

  return activePath;
};
