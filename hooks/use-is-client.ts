import { useEffect, useState } from 'react';

export const useIsClient = () => {
  const [isClient, setClient] = useState(typeof window !== 'undefined');

  useEffect(() => {
    setClient(typeof window !== 'undefined');
  }, []);

  return isClient;
};
