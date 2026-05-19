'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--bg))] disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap',
  {
    variants: {
      variant: {
        // Brand purple — primary action
        primary:
          'bg-[hsl(var(--accent))] text-white hover:bg-[hsl(var(--accent-deep))] hover:shadow-[0_0_40px_hsl(var(--accent)/0.55)]',
        // Cyan neon — high-energy alt
        neon:
          'bg-[hsl(var(--neon))] text-black hover:shadow-[0_0_40px_hsl(var(--neon)/0.55)]',
        accent:
          'bg-[hsl(var(--accent))] text-white hover:bg-[hsl(var(--accent-deep))]',
        // Hairline outlined — secondary
        outline:
          'border border-[hsl(var(--border-strong))] bg-transparent text-[hsl(var(--fg))] hover:border-[hsl(var(--neon))] hover:text-[hsl(var(--neon))]',
        ghost: 'bg-transparent text-[hsl(var(--fg))] hover:bg-white/5'
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
