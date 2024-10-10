import { CheckIcon } from 'lucide-react';
import type { FC } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const BillingSkeleton: FC = () => {
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
          <h3 className="text-lg font-semibold sm:text-xl flex items-center">
            You are on <Skeleton className="h-8 w-24 mx-2" /> plan
          </h3>
          <Skeleton className="h-4 w-full" />
        </Card>
      </section>
      <section className="grid gap-6 lg:grid-cols-2">
        {[0, 1].map((item) => {
          return (
            <Card key={item} className="flex flex-col p-2">
              <CardHeader className="h-full">
                <CardTitle className="line-clamp-1">
                  <Skeleton className="h-5 w-20" />
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  <Skeleton className="h-4 w-full" />
                </CardDescription>
              </CardHeader>
              <CardContent className="h-full flex-1 gap-y-6">
                <div className="text-3xl font-bold">
                  <span className="text-sm font-normal text-muted-foreground flex items-center">
                    <Skeleton className="h-5 w-20 mr-2" />
                    /month
                  </span>
                </div>
                <div className="gap-y-2">
                  <div className="flex items-center gap-2">
                    <div className="aspect-square shrink-0 rounded-full bg-foreground p-px text-background">
                      <CheckIcon className="size-4" aria-hidden="true" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      <Skeleton className="h-5 w-32" />
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="aspect-square shrink-0 rounded-full bg-foreground p-px text-background">
                      <CheckIcon className="size-4" aria-hidden="true" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      <Skeleton className="h-5 w-32" />
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-4">
                <Skeleton className="h-8 w-full" />
              </CardFooter>
            </Card>
          );
        })}
      </section>
    </div>
  );
};
