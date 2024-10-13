'use client';

import { UploadDropzone as _UploadDropzone } from '@uploadthing/react';
import type { FC } from 'react';

import type { OurFileRouter } from '@/app/api/uploadthing/core';

interface UploadDropzoneProps {
  disabled?: boolean;
}

export const UploadDropzone: FC<UploadDropzoneProps> = (props) => (
  <_UploadDropzone<OurFileRouter, 'imageUploader'>
    appearance={{
      label: () => ({ color: 'hsl(var(--primary))' }),
      container: () => ({
        borderColor: 'hsl(var(--border))',
        borderWidth: '2px',
        width: '100%',
      }),
      button: () => {
        return {
          background: `hsl(var(--primary))`,
          color: `hsl(var(--primary-foreground))`,
          opacity: props?.disabled ? 0.5 : 1,
        };
      },
    }}
    endpoint="imageUploader"
    onClientUploadComplete={(res) => {
      console.log('Files: ', res);
      alert('Upload Completed');
    }}
    onUploadError={(error: Error) => {
      alert(`ERROR! ${error.message}`);
    }}
    onUploadBegin={(name) => {
      console.log('Uploading: ', name);
    }}
    onChange={(acceptedFiles) => {
      console.log('Accepted files: ', acceptedFiles);
    }}
    {...props}
  />
);
