import { eq } from 'drizzle-orm';
import type Stripe from 'stripe';

import { headers } from 'next/headers';

import { stripe } from '@/lib/stripe-instance';
import { db } from '@/server/database/db';
import { users } from '@/server/database/schema';

export async function POST(req: Request) {
  console.log(
    'process.env.STRIPE_WEBHOOK_SECRET!',
    process.env.STRIPE_WEBHOOK_SECRET!,
  );

  const body = await req.text();
  const signature = headers().get('Stripe-Signature') ?? '';

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : 'Unknown error.'}`,
      { status: 400 },
    );
  }

  console.log({ event });

  switch (event.type) {
    case 'checkout.session.completed': {
      const checkoutSessionCompleted = event.data.object;

      const userId = checkoutSessionCompleted?.metadata?.userId;

      console.log(checkoutSessionCompleted);

      if (!userId) {
        return new Response('User id not found in checkout session metadata.', {
          status: 404,
        });
      }

      const subscription = await stripe.subscriptions.retrieve(
        checkoutSessionCompleted.subscription as string,
      );

      await db
        .update(users)
        .set({
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          stripePriceId: subscription.items.data[0]?.price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000,
          ),
        })
        .where(eq(users.id, userId));

      break;
    }
    case 'invoice.payment_succeeded': {
      const invoicePaymentSucceeded = event.data.object;

      const userId = invoicePaymentSucceeded?.metadata?.userId;

      if (!userId) {
        return new Response('User id not found in invoice metadata.', {
          status: 404,
        });
      }

      const subscription = await stripe.subscriptions.retrieve(
        invoicePaymentSucceeded.subscription as string,
      );

      await db
        .update(users)
        .set({
          stripePriceId: subscription.items.data[0]?.price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000,
          ),
        })
        .where(eq(users.id, userId));

      break;
    }
    default:
      console.warn(`Unhandled event type: ${event.type}`);
  }

  return new Response(null, { status: 200 });
}
