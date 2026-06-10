'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { nav, site } from '@/lib/content';
import { cn } from '@/lib/utils';
import { SoundToggle } from '@/components/system/sound-engine';
import { RsgLogoMark } from '@/components/icons/rsg-logo';
import { useEnglish } from '@/components/system/use-locale';
import { LangSwitch } from '@/components/system/lang-switch';
import { useScrollNav } from '@/hooks/use-scroll-nav';

const NAV_EN: Record<string, string> = {
  '/ki-telefonassistent': 'Phone Assistant',
  '/automatisierung': 'Automation',
  '/preise': 'Pricing',
  '/cases': 'Cases',
  '/insights': 'Insights',
  '/termin': 'Book a call',
};

export function Navbar() {
  const en = useEnglish();
  const items = en ? nav.map((n) => ({ ...n, label: NAV_EN[n.href] ?? n.label })) : nav;
  const ctaLabel = en ? 'Book a demo' : site.cta.primary;
  const homeHref = en ? '/en' : '/';
  const scrolled = useScrollNav();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const ids = nav.map((n) => n.href.replace('#', ''));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (sections.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection('#' + visible[0].target.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 text-white">
      <div
        className={cn(
          'relative overflow-hidden transition-all duration-300',
          scrolled
            ? 'h-0 opacity-0'
            : 'h-9 border-b border-white/8 bg-[hsl(240_14%_2%)]/85 opacity-100 backdrop-blur-md'
        )}
      >
        <div className="mx-auto flex h-9 max-w-[1280px] items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-3 font-mono text-[0.625rem] uppercase tracking-[0.24em] text-white/60">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-[hsl(174_100%_50%)] opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(174_100%_50%)]" />
            </span>
            <span className="hidden sm:inline">
              {en ? 'Q3 2026 · Cohort 06 · 2 of 5 seats taken' : 'Q3 2026 · Kohorte 06 · 2 von 5 Plätzen vergeben'}
            </span>
            <span className="sm:hidden">{en ? '2 / 5 seats · Q3 2026' : '2 / 5 Plätze · Q3 2026'}</span>
          </div>
          <a
            href={site.cta.meetingUrl}
            className="group inline-flex items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.24em] text-[hsl(174_100%_70%)] transition-colors hover:text-white"
          >
            <span className="hidden sm:inline">{en ? 'Grab a slot' : 'Slot sichern'}</span>
            <span className="sm:hidden">{en ? 'Slot' : 'Slot'}</span>
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent 0%, hsl(174 100% 50% / 0.4) 20%, hsl(174 90% 42% / 0.4) 50%, hsl(174 100% 50% / 0.4) 80%, transparent 100%)' }}
        />
      </div>

      <div
        className={cn(
          'transition-all duration-300',
          scrolled
            ? 'py-2 border-b border-white/8 bg-black/90 backdrop-blur-md shadow-lg'
            : 'py-4 bg-transparent'
        )}
      >
        <nav className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between px-6 lg:px-10">
          <Link
            href={homeHref}
            className="group flex items-center"
            aria-label={`${site.shortName} ${en ? 'home' : 'Startseite'}`}
          >
            <RsgLogoMark className="h-7 w-auto text-white transition-opacity duration-300 group-hover:opacity-80" />
          </Link>
          <ul className="hidden items-center gap-1 md:flex">
            {items.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    className={cn(
                      'group relative inline-flex h-9 items-center px-3.5 font-display text-[0.85rem] font-medium transition-colors',
                      isActive ? 'text-white' : 'text-white/60 hover:text-white'
                    )}
                  >
                    <span aria-hidden className="absolute inset-0 -z-10 scale-90 rounded-full bg-white/[0.06] opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
                    <span className="relative flex items-center gap-2">
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-dot"
                          className="h-1 w-1 rounded-full bg-[hsl(174_100%_50%)]"
                          style={{ boxShadow: '0 0 8px hsl(174 100% 50% / 0.8)' }}
                        />
                      )}
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="hidden items-center gap-3 md:flex">
            <LangSwitch />
            <SoundToggle />
            <a
              href={site.cta.meetingUrl}
              data-sound="tick"
              className="group relative inline-flex h-10 items-center gap-2 overflow-hidden rounded-full bg-white/[0.04] px-5 font-display text-[0.85rem] font-medium text-white backdrop-blur-sm transition-all hover:bg-white/[0.08]"
              style={{ border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <span aria-hidden className="absolute inset-0 -translate-x-full opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" style={{ background: 'linear-gradient(90deg, hsl(174 90% 42%) 0%, hsl(220 90% 55%) 50%, hsl(174 100% 50%) 100%)' }} />
              <span className="relative z-10">{ctaLabel}</span>
              <ArrowUpRight className="relative z-10 h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
          <button
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menü umschalten"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/8 bg-[hsl(var(--bg))]/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-6">
              {items.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-white/10 py-4 font-display text-xl text-white"
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-[0.6875rem] text-white/40">0{i + 1}</span>
                      {item.label}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-white/55" />
                  </Link>
                </motion.li>
              ))}
              <li className="pt-6">
                <a href={site.cta.meetingUrl} className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[hsl(var(--accent))] text-sm font-medium text-white">
                  {ctaLabel}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </li>
              <li className="pt-4"><LangSwitch className="!bg-white/[0.06]" /></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
