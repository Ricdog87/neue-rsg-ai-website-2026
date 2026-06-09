'use client'
import { useRef, useEffect, useState, ReactNode } from 'react'

interface ScrollSlideProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right'
  className?: string
}

const HIDDEN: Record<string, string> = {
  up: 'translate3d(0, 52px, 0) scale(0.99)',
  left: 'translate3d(-56px, 0, 0) scale(0.99)',
  right: 'translate3d(56px, 0, 0) scale(0.99)',
}

/**
 * Cinematic reveal wrapper — fades + glides content in as it enters the
 * viewport. Robust by design:
 *   - Triggers via rootMargin (top crosses ~88% vh) instead of a % of the
 *     element, so TALL sections never sit blank/invisible while on-screen.
 *   - reduced-motion, missing IntersectionObserver, and a 1.6s safety
 *     timeout all fall back to fully visible — content is NEVER stuck hidden.
 *   - One-shot (disconnects) + GPU transforms = smooth, no re-trigger jitter.
 */
export function ScrollSlide({ children, delay = 0, direction = 'up', className = '' }: ScrollSlideProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true); return
    }
    if (typeof IntersectionObserver === 'undefined') { setVisible(true); return }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0, rootMargin: '0px 0px -12% 0px' }
    )
    observer.observe(el)
    const safety = window.setTimeout(() => setVisible(true), 1600)
    return () => { observer.disconnect(); window.clearTimeout(safety) }
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : HIDDEN[direction],
        transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: visible ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
