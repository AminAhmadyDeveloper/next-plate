import { featuresRoute } from '@/server/api/routers/features/features-route';
import { stripeRouter } from '@/server/api/routers/stripe/stripe-procedure';
import { router } from '@/trpc/server';

export const appRouter = router({
  features: featuresRoute,
  stripe: stripeRouter,
});

export type AppRouter = typeof appRouter;
