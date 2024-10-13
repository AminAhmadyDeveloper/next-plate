import { Share } from 'lucide-react';
import type { FC } from 'react';

import { Button } from '@/components/ui/button';

export const Header: FC = () => {
  return (
    <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
      <h1 className="text-xl font-semibold">Playground</h1>
      <Button variant="outline" size="sm" className="ml-auto gap-1.5 text-sm">
        <Share className="size-3.5" />
        Share
      </Button>
    </header>
  );
};
