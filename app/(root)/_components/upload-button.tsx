'use client';

import type { FC } from 'react';

import { UploadButton as _UploadButton } from '@/components/utils/uploadthing';

interface UploadButtonProps {
  disabled?: boolean;
}

export const UploadButton: FC<UploadButtonProps> = (props) => {
  return (
    <_UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        console.log('Files: ', res);
        alert('Upload Completed');
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
      }}
      appearance={{
        button: () => {
          return {
            background: `hsl(var(--primary))`,
            color: `hsl(var(--primary-foreground))`,
            opacity: props?.disabled ? 0.5 : 1,
          };
        },
      }}
      {...props}
    />
  );
};
