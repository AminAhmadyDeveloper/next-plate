'use client';

import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { RocketIcon } from 'lucide-react';
import type { FC } from 'react';
import { Fragment } from 'react';

import Link from 'next/link';

import { ThemeSwitcher } from '@/components/core/theme-switcher';
import { Container } from '@/components/layout/container';
import { Logout } from '@/components/layout/logout';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Activate } from '@/components/utils/activate';
import { useSession } from '@/providers/session-provider';

const routes: { name: string; href?: string; scrollTo?: string }[] = [
  { name: 'Home', href: '/' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Features', scrollTo: 'features' },
  {
    name: 'Documentation',
    href: 'https://github.com/AminAhmadyDeveloper/next-plate',
  },
] as const;

interface HeaderProps {
  hideNavigationMenu?: true;
}

export const Header: FC<HeaderProps> = ({ hideNavigationMenu }) => {
  const { session } = useSession();

  return (
    <Container>
      <header className="px-2 py-4 lg:py-6">
        <div className="flex items-center gap-2 p-0">
          <Activate activate={!hideNavigationMenu}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="focus:outline-none focus:ring-1 md:hidden"
                  size="icon"
                  variant="outline"
                >
                  <HamburgerMenuIcon className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <div className="py-1">
                  {routes.map((route) => {
                    if (route.scrollTo) {
                      return (
                        <DropdownMenuItem key={route.name} asChild>
                          <button
                            type="button"
                            onClick={() => {
                              if (typeof window !== 'undefined') {
                                const idTop = document
                                  .querySelector(`#${route.scrollTo}`)
                                  ?.getBoundingClientRect().top;

                                window.scrollTo({
                                  behavior: 'smooth',
                                  top: idTop,
                                });
                              }
                            }}
                          >
                            {route.name}
                          </button>
                        </DropdownMenuItem>
                      );
                    } else if (route.href) {
                      return (
                        <DropdownMenuItem key={route.name} asChild>
                          <Link href={route.href}>{route.name}</Link>
                        </DropdownMenuItem>
                      );
                    } else {
                      return <Fragment key={route.name} />;
                    }
                  })}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </Activate>
          <Link
            className="flex items-center justify-center text-xl font-medium"
            href="/"
          >
            <RocketIcon className="mr-2 h-5 w-5" /> Acme
          </Link>
          <Activate activate={!hideNavigationMenu}>
            <nav className="ml-10 hidden gap-4 sm:gap-6 md:flex">
              {routes.map((route) => {
                if (route.scrollTo) {
                  return (
                    <button
                      key={route.name}
                      className="text-sm font-medium text-muted-foreground/70 transition-colors hover:text-muted-foreground"
                      type="button"
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          const idTop = document
                            .querySelector(`#${route.scrollTo}`)
                            ?.getBoundingClientRect().top;

                          window.scrollTo({ behavior: 'smooth', top: idTop });
                        }
                      }}
                    >
                      {route.name}
                    </button>
                  );
                } else if (route.href) {
                  return (
                    <Link
                      key={route.name}
                      className="text-sm font-medium text-muted-foreground/70 transition-colors hover:text-muted-foreground"
                      href={route.href}
                    >
                      {route.name}
                    </Link>
                  );
                } else return <Fragment key={route.name} />;
              })}
            </nav>
          </Activate>
          <div className="ml-auto flex gap-2">
            {session ? (
              <Logout />
            ) : (
              <Button asChild variant="secondary">
                <Link href="/login">Login</Link>
              </Button>
            )}
            <ThemeSwitcher />
          </div>
        </div>
      </header>
    </Container>
  );
};
