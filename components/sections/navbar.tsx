'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { nav, site } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-white/5 bg-[hsl(var(--bg))]/80 backdrop-blur-md'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="group flex items-center gap-2" aria-label={`${site.shortName} Startseite`}>
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[hsl(var(--accent))] to-[hsl(var(--neon))] text-sm font-bold text-black"
          >
            R
          </span>
          <span className="font-display text-lg tracking-tight">{site.shortName}</span>
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm text-[hsl(var(--muted))] transition-colors hover:text-[hsl(var(--fg))]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a href={site.cta.meetingUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="sm">
              {site.cta.primary}
            </Button>
          </a>
        </div>

        <button
          className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menü umschalten"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="md:hidden border-t border-white/5 bg-[hsl(var(--bg))]/95 backdrop-blur"
        >
          <ul className="flex flex-col gap-2 px-6 py-4">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm text-[hsl(var(--muted))] hover:text-[hsl(var(--fg))]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <a href={site.cta.meetingUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="md" className="w-full">
                  {site.cta.primary}
                </Button>
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </header>
  );
}
