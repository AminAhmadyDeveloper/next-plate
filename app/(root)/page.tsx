import { Loader2Icon } from 'lucide-react';
import { type FC, Suspense } from 'react';

import { Confirm } from '@/app/(root)/_components/confirm';
import { FeaturesList } from '@/app/(root)/_components/features-list';
import { HeroSection } from '@/app/(root)/_components/hero-section';
import { Resend } from '@/app/(root)/_components/resend';
import { ReviewsList } from '@/app/(root)/_components/reviews-list';
import { UploadDropzone } from '@/app/(root)/_components/upload-dropzone';
import { Container } from '@/components/layout/container';
import NumberTicker from '@/components/ui/number-ticker';
import { validateRequest } from '@/lib/lucia-auth';
import { HydrateClient, trpc } from '@/trpc/caller';

const MainPage: FC = async () => {
  const { user } = await validateRequest();
  await trpc.features.listOfFeatures.prefetch();

  return (
    <main>
      <HeroSection />
      <Container>
        <div className="mx-auto lg:max-w-screen-lg">
          <h1 className="mb-4 text-center text-3xl font-bold md:text-4xl lg:text-5xl">
            <a id="features"></a> Features
          </h1>
          <p className="text-balance mb-10 text-center text-muted-foreground md:text-lg lg:text-xl">
            This starter template is a guide to help you get started with
            Next.js for large scale applications. Feel free to add or remove
            features to suit your needs.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            <HydrateClient>
              <Suspense fallback={<Loader2Icon className="animate-spin" />}>
                <FeaturesList />
              </Suspense>
            </HydrateClient>
          </div>
          <h1 className="mt-8 text-center text-3xl font-bold md:text-4xl lg:text-5xl">
            <a id="upload"></a> Easy Uploads
          </h1>
          <p className="text-balance mb-10 text-center text-muted-foreground md:text-lg lg:text-xl">
            UploadThing is the easiest way to file uploads.
          </p>
          <Container className="xl:!max-w-5xl">
            <UploadDropzone
              disabled={
                user?.username !== process.env.NEXT_PUBLIC_ADMIN_USER_NAME
              }
            />
          </Container>
          <h1 className="mt-8 text-center text-3xl font-bold md:text-4xl lg:text-5xl">
            Send it via Resend
          </h1>
          <p className="text-balance mb-10 text-center text-muted-foreground md:text-lg lg:text-xl">
            Resend will help you send email so easy!
          </p>
          <Container className="xl:!max-w-5xl flex justify-center items-center">
            <Resend />
          </Container>
          <h1 className="mt-8 text-center text-3xl font-bold md:text-4xl lg:text-5xl">
            Global Confirm
          </h1>
          <p className="text-balance mb-10 text-center text-muted-foreground md:text-lg lg:text-xl">
            A flexible and customizable confirm dialog component for React
            applications, built with accessibility in mind.
          </p>
          <Container className="xl:!max-w-5xl flex justify-center items-center">
            <Confirm />
          </Container>
          <h1 className="mt-8 text-center text-3xl font-bold md:text-4xl lg:text-5xl">
            <a id="reviews"></a> Reviews
          </h1>
          <p className="text-balance mb-10 text-center text-muted-foreground md:text-lg lg:text-xl">
            Loved by over <NumberTicker value={1000} /> people
          </p>
          <div className="w-full">
            <ReviewsList />
          </div>
        </div>
      </Container>
    </main>
  );
};

export default MainPage;
