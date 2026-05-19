'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { nav, site } from '@/lib/content';
import { cn } from '@/lib/utils';

/**
 * Dark slim header — Hohrising-style #0b0b0b bar framing the white page.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 text-white transition-all duration-300',
        scrolled
          ? 'border-b border-white/8 bg-[hsl(var(--bg))]/85 backdrop-blur-xl'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between px-6 lg:px-10">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label={`${site.shortName} Startseite`}
        >
          {/* Rising-stripes brand mark (custom — three diagonal indigo bars) */}
          <svg
            aria-hidden
            width="22"
            height="28"
            viewBox="0 0 22 28"
            fill="none"
            className="text-[hsl(var(--accent))] transition-transform duration-300 group-hover:-translate-y-0.5"
          >
            <path d="M0 26 L8 4 L11 4 L3 26 Z" fill="currentColor" />
            <path d="M7 26 L15 4 L18 4 L10 26 Z" fill="currentColor" opacity="0.7" />
            <path d="M14 26 L22 4 L25 4 L17 26 Z" fill="currentColor" opacity="0.45" />
          </svg>
          <span className="font-display text-[1.15rem] font-semibold tracking-tight text-white">
            {site.shortName}
            <span className="text-[hsl(var(--accent))]">.</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group relative font-display text-[0.875rem] font-medium text-white/75 transition-colors hover:text-white"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[hsl(var(--accent))] transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href={site.cta.meetingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-10 items-center gap-2 rounded-full border border-[hsl(var(--accent))] bg-[hsl(var(--accent))]/85 px-5 font-display text-[0.875rem] font-medium text-white transition-all hover:bg-[hsl(var(--accent-deep))]"
          >
            {site.cta.primary}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menü umschalten"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/10 bg-[hsl(var(--ink))] md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-6">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-white/10 py-4 font-display text-xl text-white"
                  >
                    {item.label}
                    <ArrowUpRight className="h-4 w-4 text-white/55" />
                  </Link>
                </li>
              ))}
              <li className="pt-6">
                <a
                  href={site.cta.meetingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-[hsl(var(--accent))] bg-[hsl(var(--accent))]/90 text-sm font-medium text-white"
                >
                  {site.cta.primary}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
