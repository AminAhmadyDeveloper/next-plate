import { manageSubscriptionSchema } from '@/server/api/routers/stripe/stripe-input';
import {
  getStripePlan,
  getStripePlans,
  manageSubscription,
} from '@/server/api/routers/stripe/stripe-service';
import { protectedProcedure, router } from '@/trpc/server';

export const stripeRouter = router({
  getPlans: protectedProcedure.query(({ ctx }) => getStripePlans(ctx)),
  getPlan: protectedProcedure.query(({ ctx }) => getStripePlan(ctx)),
  managePlan: protectedProcedure
    .input(manageSubscriptionSchema)
    .mutation(({ ctx, input }) => manageSubscription(ctx, input)),
});
