import type { DetailedHTMLProps, HTMLAttributes } from 'react';

declare global {
  export type ReactDiv = DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > &
    JSX.IntrinsicAttributes;
}
