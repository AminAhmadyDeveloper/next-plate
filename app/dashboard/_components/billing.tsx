import { CheckIcon } from 'lucide-react';

import Link from 'next/link';

import { ManageSubscriptionForm } from '@/app/dashboard/_components/manage-subscription-form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatDate } from '@/lib/formatting-utils';
import { validateRequest } from '@/lib/lucia-auth';
import { trpc } from '@/trpc/caller';

export const Billing = async () => {
  const { session } = await validateRequest();
  if (!session) return null;

  const [plan, plans] = await Promise.all([
    trpc.stripe.getPlan(),
    trpc.stripe.getPlans(),
  ]);

  return (
    <div className="flex flex-col w-full gap-y-3">
      <h1 className="mt-8 text-center text-3xl font-bold md:text-4xl lg:text-5xl">
        Stripe
      </h1>
      <p className="text-balance mb-10 text-center text-muted-foreground md:text-lg lg:text-xl">
        Subscribe to website using stripe payments.
      </p>
      <section>
        <Card className="space-y-2 p-8">
          <h3 className="text-lg font-semibold sm:text-xl">
            You are on: {plan?.name ?? 'Free'} plan
          </h3>
          <p className="text-sm text-muted-foreground">
            {!plan?.isPro
              ? 'The free plan is limited to 2 posts. Upgrade to the Pro plan to unlock unlimited posts.'
              : plan.isCanceled
                ? 'Your plan will be canceled on '
                : 'Your plan renews on '}
            {plan?.stripeCurrentPeriodEnd
              ? formatDate(plan.stripeCurrentPeriodEnd)
              : null}
          </p>
        </Card>
      </section>
      <section className="grid gap-6 lg:grid-cols-2">
        {plans.map((item) => (
          <Card key={item.name} className="flex flex-col p-2">
            <CardHeader className="h-full">
              <CardTitle className="line-clamp-1">{item.name}</CardTitle>
              <CardDescription className="line-clamp-2">
                {item.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-full flex-1 space-y-6">
              <div className="text-3xl font-bold">
                {item.price}
                <span className="text-sm font-normal text-muted-foreground">
                  /month
                </span>
              </div>
              <div className="space-y-2">
                {item.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <div className="aspect-square shrink-0 rounded-full bg-foreground p-px text-background">
                      <CheckIcon className="size-4" aria-hidden="true" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-4">
              {item.name === 'Free' ? (
                <Button className="w-full" asChild>
                  <Link href="/dashboard">
                    Get started
                    <span className="sr-only">Get started</span>
                  </Link>
                </Button>
              ) : (
                <ManageSubscriptionForm
                  stripePriceId={item.stripePriceId}
                  isPro={plan?.isPro ?? false}
                  stripeCustomerId={plan?.stripeCustomerId}
                  stripeSubscriptionId={plan?.stripeSubscriptionId}
                />
              )}
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
};
