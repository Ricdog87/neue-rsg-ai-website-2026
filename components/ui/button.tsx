'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--bg))] disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap',
  {
    variants: {
      variant: {
        // Solid ink button — editorial / premium primary
        primary:
          'bg-[hsl(var(--ink))] text-[hsl(var(--bg))] hover:bg-[hsl(var(--ink))]/85',
        // Burnt-sienna accent — used sparingly for the highest-intent CTA
        accent:
          'bg-[hsl(var(--accent))] text-white hover:bg-[hsl(var(--accent-deep))]',
        // Legacy alias for older sections
        neon:
          'bg-[hsl(var(--accent))] text-white hover:bg-[hsl(var(--accent-deep))]',
        // Hairline outlined — secondary
        outline:
          'border border-[hsl(var(--ink))] bg-transparent text-[hsl(var(--ink))] hover:bg-[hsl(var(--ink))] hover:text-[hsl(var(--bg))]',
        ghost:
          'bg-transparent text-[hsl(var(--ink))] hover:bg-[hsl(var(--surface))]'
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-sm',
        lg: 'h-14 px-8 text-base'
      }
    },
    defaultVariants: { variant: 'primary', size: 'md' }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
);
Button.displayName = 'Button';

export { buttonVariants };
