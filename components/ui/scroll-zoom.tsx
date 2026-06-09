'use client'
import { useRef, useEffect, useState, ReactNode } from 'react'

interface ScrollZoomProps {
  children: ReactNode
  delay?: number
  className?: string
}

/**
 * Cinematic zoom-reveal wrapper — content rises + scales up subtly as it
 * enters view (film-cut feel). Same robustness contract as ScrollSlide:
 * rootMargin trigger (no blank tall-section bands), reduced-motion / no-IO /
 * safety-timeout fallbacks so content is never stuck invisible.
 */
export function ScrollZoom({ children, delay = 0, className = '' }: ScrollZoomProps) {
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
        transform: visible ? 'none' : 'translate3d(0, 66px, 0) scale(0.92)',
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: visible ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
