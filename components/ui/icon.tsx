import { type VariantProps, cva } from 'class-variance-authority';

import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import { cn } from '@/lib/tailwind-utils';

const iconVariants = cva('', {
  variants: {
    size: {
      default: 'text-base',
      xs: 'text-xs',
      sm: 'text-sm',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
      '7xl': 'text-7xl',
    },
    type: {
      phosphor: 'phosphor',
      'font-awesome': 'font-awesome',
    },
    variant: {
      default: 'ph',
      bold: 'ph-bold',
      duotone: 'ph-duotone',
      fill: 'ph-fill',
      light: 'ph-light',
      thin: 'ph-thin',
    },
  },
  defaultVariants: {
    size: 'default',
    variant: 'default',
  },
});

export interface IconProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof iconVariants> {
  asChild?: boolean;
  icon: Phosphor;
}

const Icon = React.forwardRef<HTMLElement, IconProps>(
  ({ className, variant, size, asChild = false, icon, ...props }, ref) => {
    const Comp = asChild ? Slot : 'i';
    return (
      <Comp
        className={cn(iconVariants({ variant, size, className }), icon)}
        ref={ref}
        {...props}
      />
    );
  },
);
Icon.displayName = 'Icon';

export { Icon, iconVariants };
