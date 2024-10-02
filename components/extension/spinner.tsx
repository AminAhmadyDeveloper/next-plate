import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

import * as LucideIcon from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/tailwind-utils';

const spinnerVariants = cva('', {
  variants: {
    icon: {
      default: 'LoaderCircle',
      loader: 'Loader',
      'loader-pinwheel': 'LoaderPinwheel',
      'circle-dashed': 'CircleDashed',
      'circle-slash': 'CircleSlash2',
      'circle-dot-dashed': 'CircleDotDashed',
    },
  },
  defaultVariants: {
    icon: 'default',
  },
});

export interface SpinnerProps
  extends React.SVGProps<SVGSVGElement>,
    VariantProps<typeof spinnerVariants> {}

const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ icon, className, ...props }, ref) => {
    let iconName: keyof typeof LucideIcon = 'LoaderCircle';

    switch (icon) {
      case 'default':
        iconName = 'LoaderCircle';
        break;
      case 'circle-dashed':
        iconName = 'CircleDashed';
        break;
      case 'circle-dot-dashed':
        iconName = 'CircleDotDashed';
        break;
      case 'circle-slash':
        iconName = 'CircleSlash2';
        break;
      case 'loader-pinwheel':
        iconName = 'LoaderPinwheel';
        break;
      case 'loader':
        iconName = 'Loader';
        break;
      default:
        iconName = 'LoaderCircle';
        break;
    }

    const Icon = LucideIcon[iconName];

    return (
      <Icon
        ref={ref}
        className={cn(className, 'w-4 h-4 animate-spin')}
        {...props}
      />
    );
  },
);

Spinner.displayName = 'Spinner';

export { Spinner, spinnerVariants };
