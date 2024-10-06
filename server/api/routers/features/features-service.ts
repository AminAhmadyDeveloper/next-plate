import { publicProcedure } from '@/trpc/server';

export const listOfFeatures = publicProcedure.query(() => {
  return [
    {
      name: 'Next.js',
      description: 'The React Framework for Production',
      logo: 'NextjsIcon',
    },
    {
      name: 'React.js',
      description: 'Server and client components.',
      logo: 'ReactJs',
    },
    {
      name: 'Authentication',
      description:
        'Credential authentication with password reset and email validation',
      logo: 'LuciaAuth',
    },
    {
      name: 'Database',
      description: 'Drizzle with postgres database',
      logo: 'Drizzle',
    },
    {
      name: 'TypeSafe Backend',
      description: 'Preserve type safety from backend to frontend with tRPC',
      logo: 'TRPC',
    },
    {
      name: 'Subscription',
      description: 'Subscription with stripe',
      logo: 'StripeLogo',
    },
    {
      name: 'Tailwindcss',
      description: 'Simple and elegant UI components built with Tailwind CSS',
      logo: 'TailwindCss',
    },
    {
      name: 'Shadcn UI',
      description: 'A set of beautifully designed UI components for React',
      logo: 'ShadcnUi',
    },
    {
      name: 'React Email',
      description: 'Write emails in React with ease.',
      logo: 'ReactEmail',
    },
    {
      name: 'Hook Form',
      description: 'Better forms with hook form',
      logo: 'SimpleIconsReacthookform',
    },
    {
      name: 'Upstash Redis',
      description: 'Used Upstash powerful client for redis cache',
      logo: 'Upstash',
    },
    {
      name: 'Auto Form',
      description: 'Create your forms automatically form your schema',
      logo: 'LightningBoltIcon',
    },
    {
      name: 'Argon2',
      description: 'Unleash real power of encryption with argon 2',
      logo: 'HealthiconsChemicalBurn',
    },
    {
      name: 'Tanstack Query',
      description: 'always-up-to-date auto-managed queries and mutations.',
      logo: 'LogosReactQueryIcon',
    },
    {
      name: 'Geist',
      description: 'Vercel standard theme really perfect',
      logo: 'FontFamilyIcon',
    },
    {
      name: 'ZOD',
      description:
        'Zod is a TypeScript-first schema declaration and validation library.',
      logo: 'SimpleIconsZod',
    },
    {
      name: 'OFetch',
      description: 'A better fetch API. Works on node, browser, and workers.',
      logo: 'WebhookIcon',
    },
    {
      name: 'Resend',
      description: 'Send mail easy as they never been',
      logo: 'AtSignIcon',
    },
    {
      name: 'Super JSON',
      description: 'not just json!',
      logo: 'NoniconsJson16',
    },
    {
      name: 'Magic Regexp (Removed)',
      description: 'A compiled-away, type-safe, readable RegExp alternative',
      logo: 'UnjsMagicRegexp',
    },
    {
      name: 'Uploadthing',
      description: 'UploadThing is the easiest way to file uploads.',
      logo: 'UploadthingIcon',
    },
  ];
});
