import { featuresRoute } from '@/server/api/features/features-route';
import { router } from '@/trpc/server';

export const appRouter = router({
  features: featuresRoute,
});

export type AppRouter = typeof appRouter;
