import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { Toaster } from 'sonner';

import type { FC, PropsWithChildren } from 'react';

import { ConfirmDialogProvider } from '@/components/extension/confirm-dialog';
import { validateRequest } from '@/lib/lucia-auth';
import { cn } from '@/lib/tailwind-utils';
import { SessionProvider } from '@/providers/session-provider';
import { StylesProvider } from '@/providers/styles-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { TRPCProvider } from '@/providers/trpc-provider';

const RootLayout: FC<PropsWithChildren> = async ({ children }) => {
  const session = await validateRequest();

  return (
    <html lang="en" suppressHydrationWarning suppressContentEditableWarning>
      <StylesProvider />
      <body className={cn(GeistMono.variable, GeistSans.variable)}>
        <TRPCProvider>
          <SessionProvider session={session}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <ConfirmDialogProvider>{children}</ConfirmDialogProvider>
              <Toaster />
            </ThemeProvider>
          </SessionProvider>
        </TRPCProvider>
      </body>
    </html>
  );
};

export default RootLayout;
