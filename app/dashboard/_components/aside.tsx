import { Triangle } from 'lucide-react';
import type { FC } from 'react';

import Link from 'next/link';

import { Logout } from '@/components/layout/logout';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const Aside: FC = () => {
  return (
    <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
      <div className="border-b p-2">
        <Button variant="outline" size="icon" aria-label="Home" asChild>
          <Link href="/">
            <Triangle className="size-5 fill-foreground" />
          </Link>
        </Button>
      </div>
      <nav className="grid gap-1 p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg"
              aria-label="Dashboard"
              asChild
            >
              <Link href="/dashboard">
                <Icon icon="ph-chart-bar" variant="bold" size="lg" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Dashboard
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg"
              aria-label="Become Pro"
            >
              <Link href="/dashboard/become-pro">
                <Icon icon="ph-star-four" variant="bold" size="lg" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Become Pro
          </TooltipContent>
        </Tooltip>
      </nav>
      <nav className="mt-auto grid gap-1 p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Logout iconButton />
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Logout
          </TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
};
