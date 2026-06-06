'use client'
import { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

export function GlowButton({ children, variant = 'primary', size = 'md', className, ...props }: GlowButtonProps) {
  const sizes = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-base', lg: 'px-8 py-4 text-lg' }
  const variants = {
    primary: 'bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)]',
    secondary: 'bg-transparent border border-white/20 text-white hover:border-white/60 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]',
  }
  return (
    <button
      className={cn(
        'relative inline-flex items-center justify-center rounded-full font-medium transition-all duration-300',
        'active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
        sizes[size],
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
