import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { PlusIcon } from 'lucide-react';
import type { FC } from 'react';

import Link from 'next/link';

import { CopyToClipboard } from '@/app/(root)/_components/copy-to-clipboard';
import { LuciaAuth, NextjsIcon } from '@/components/core/icons';
import { Button } from '@/components/ui/button';

export const HeroSection: FC = () => {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-300px)] max-w-5xl flex-col  items-center justify-center gap-4 py-10 text-center  md:py-12">
      <div className="p-4">
        <div className="mb-10 flex items-center justify-center gap-3">
          <NextjsIcon className="h-[52px] w-[52px]" />
          <PlusIcon className="h-8 w-8" />
          <LuciaAuth className="h-14 w-14" />
        </div>
        <h1 className="text-balance bg-gradient-to-tr  from-black/70 via-black to-black/60 bg-clip-text text-center text-3xl font-bold text-transparent dark:from-zinc-400/10 dark:via-white/90 dark:to-white/20  sm:text-5xl md:text-6xl lg:text-7xl">
          Next.js Lucia Auth Starter Template
        </h1>
        <p className="text-balance mb-10 mt-4 text-center text-muted-foreground md:text-lg lg:text-xl">
          A Next.js Authentication starter template (password reset, email
          validation and oAuth). Includes Lucia, Drizzle, tRPC, Stripe,
          tailwindcss, shadcn-ui and react-email.
        </p>
        <div className="mb-10">
          <div className="mx-auto max-w-[430px]">
            <CopyToClipboard text="git clone github.com/AminAhmadyDeveloper/next-plate.git" />
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <Button size="lg" variant="outline" asChild>
            <Link href="https://github.com/AminAhmadyDeveloper/next-plate">
              <GitHubLogoIcon className="mr-1 h-5 w-5" />
              GitHub
            </Link>
          </Button>
          <Button size="lg" asChild>
            <Link href="/login">Get Started</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
