'use client';

import { usePathname } from 'next/navigation';

/**
 * The index page (/ki-telefonassistent) has its own full-width hero
 * layout. The industry sub-pages (/ki-telefonassistent/arztpraxis,
 * /handwerk, etc.) are SEO content pages and use a prose container.
 */
export default function KiTelefonassistentLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  if (path === '/ki-telefonassistent') {
    return <>{children}</>;
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-20 legal-prose [&_h1]:text-4xl [&_h1]:font-semibold [&_h1]:tracking-tight [&_h1]:text-fg [&_h1]:mb-6 [&_section]:mt-12 [&_details]:border [&_details]:border-border [&_details]:rounded-lg [&_details]:p-4 [&_details]:mt-3 [&_summary]:cursor-pointer [&_summary]:font-medium [&_summary]:text-fg">
      {children}
    </div>
  );
}
