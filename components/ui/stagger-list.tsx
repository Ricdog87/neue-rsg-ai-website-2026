'use client'
import { ReactNode } from 'react'
import { ScrollSlide } from './scroll-slide'

interface StaggerListProps {
  children: ReactNode[]
  baseDelay?: number
  step?: number
  className?: string
  itemClassName?: string
}

export function StaggerList({ children, baseDelay = 0, step = 100, className = '', itemClassName = '' }: StaggerListProps) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <ScrollSlide key={i} delay={baseDelay + i * step} className={itemClassName}>
          {child}
        </ScrollSlide>
      ))}
    </div>
  )
}
