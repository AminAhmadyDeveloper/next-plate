'use client';

import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { RocketIcon } from 'lucide-react';

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
import { useSession } from '@/providers/session-provider';

const routes = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/#features' },
  {
    name: 'Documentation',
    href: 'https://www.touha.dev/posts/simple-nextjs-t3-authentication-with-lucia',
  },
] as const;

export const Header = () => {
  const { session } = useSession();

  return (
    <Container>
      <header className="px-2 py-4 lg:py-6">
        <div className="flex items-center gap-2 p-0">
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
                {routes.map(({ name, href }) => (
                  <DropdownMenuItem key={name} asChild>
                    <Link href={href}>{name}</Link>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            className="flex items-center justify-center text-xl font-medium"
            href="/"
          >
            <RocketIcon className="mr-2 h-5 w-5" /> Acme
          </Link>
          <nav className="ml-10 hidden gap-4 sm:gap-6 md:flex">
            {routes.map(({ name, href }) => (
              <Link
                key={name}
                className="text-sm font-medium text-muted-foreground/70 transition-colors hover:text-muted-foreground"
                href={href}
              >
                {name}
              </Link>
            ))}
          </nav>
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
