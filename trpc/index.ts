import { publicProcedure, router } from '@/trpc/server';

export const appRouter = router({
  features: publicProcedure.query(() => ({ hello: 'world!' })),
});

export type AppRouter = typeof appRouter;
