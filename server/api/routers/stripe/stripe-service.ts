import {
  freePlan,
  proPlan,
  subscriptionPlans,
} from '@/config/subscriptions-config';
import { formatPrice } from '@/lib/formatting-utils';
import { stripe } from '@/lib/stripe-instance';
import type { ManageSubscriptionInput } from '@/server/api/routers/stripe/stripe-input';
import type { ProtectedTRPCContext } from '@/trpc/server';

const getUrl = () => {
  const base = (() => {
    if (typeof window !== 'undefined') return '';
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return 'http://localhost:3000';
  })();
  return base;
};

export const getStripePlans = async (ctx: ProtectedTRPCContext) => {
  try {
    const user = await ctx.db.query.users.findFirst({
      where: (table, { eq }) => eq(table.id, ctx.user.id),
      columns: {
        id: true,
      },
    });

    if (!user) {
      throw new Error('User not found.');
    }

    const proPrice = await stripe.prices.retrieve(proPlan.stripePriceId);

    return subscriptionPlans.map((plan) => {
      return {
        ...plan,
        price:
          plan.stripePriceId === proPlan.stripePriceId
            ? formatPrice((proPrice.unit_amount ?? 0) / 100, {
                currency: proPrice.currency,
              })
            : formatPrice(0 / 100, { currency: proPrice.currency }),
      };
    });
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getStripePlan = async (ctx: ProtectedTRPCContext) => {
  try {
    const user = await ctx.db.query.users.findFirst({
      where: (table, { eq }) => eq(table.id, ctx.user.id),
      columns: {
        stripePriceId: true,
        stripeCurrentPeriodEnd: true,
        stripeSubscriptionId: true,
        stripeCustomerId: true,
      },
    });

    if (!user) {
      throw new Error('User not found.');
    }

    // Check if user is on a pro plan
    const isPro =
      !!user.stripePriceId &&
      (user.stripeCurrentPeriodEnd?.getTime() ?? 0) + 86_400_000 > Date.now();

    const plan = isPro ? proPlan : freePlan;

    // Check if user has canceled subscription
    let isCanceled = false;
    if (isPro && !!user.stripeSubscriptionId) {
      const stripePlan = await stripe.subscriptions.retrieve(
        user.stripeSubscriptionId,
      );
      isCanceled = stripePlan.cancel_at_period_end;
    }

    return {
      ...plan,
      stripeSubscriptionId: user.stripeSubscriptionId,
      stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd,
      stripeCustomerId: user.stripeCustomerId,
      isPro,
      isCanceled,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const manageSubscription = async (
  ctx: ProtectedTRPCContext,
  input: ManageSubscriptionInput,
) => {
  const user = await ctx.db.query.users.findFirst({
    where: (table, { eq }) => eq(table.id, ctx.user.id),
    columns: {
      id: true,
      email: true,
      stripeCustomerId: true,
      stripeSubscriptionId: true,
      stripePriceId: true,
    },
  });

  if (!user) {
    throw new Error('User not found.');
  }

  // If the user is already subscribed to a plan, we redirect them to the Stripe billing portal
  if (input.isPro && input.stripeCustomerId) {
    const stripeSession = await ctx.stripe.billingPortal.sessions.create({
      customer: input.stripeCustomerId,
      return_url: getUrl(),
    });

    return {
      url: stripeSession.url,
    };
  }
  // If the user is not subscribed to a plan, we create a Stripe Checkout session
  try {
    const stripeSession = await ctx.stripe.checkout.sessions.create({
      success_url: getUrl(),
      cancel_url: getUrl(),
      payment_method_types: ['card'],
      mode: 'subscription',
      billing_address_collection: 'auto',
      customer_email: user.email,
      line_items: [
        {
          price: input.stripePriceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.id,
      },
    });

    return {
      url: stripeSession.url,
    };
  } catch (error) {
    console.log(error);
  }
};
