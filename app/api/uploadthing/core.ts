import { UploadThingError } from 'uploadthing/server';

import { type FileRouter, createUploadthing } from 'uploadthing/next';

import { validateRequest } from '@/lib/lucia-auth';

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: { maxFileSize: '4MB' },
    pdf: { maxFileSize: '4MB' },
  })
    .middleware(async () => {
      const { session, user } = await validateRequest();
      if (!session) throw new UploadThingError('Unauthorized');
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete for userId:', metadata.userId);
      console.log('file url', file.url);
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
