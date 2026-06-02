export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 legal-prose [&_h1]:text-4xl [&_h1]:font-semibold [&_h1]:tracking-tight [&_h1]:text-fg [&_h1]:mb-6 [&_section]:mt-12 [&_details]:border [&_details]:border-border [&_details]:rounded-lg [&_details]:p-4 [&_details]:mt-3 [&_summary]:cursor-pointer [&_summary]:font-medium [&_summary]:text-fg">
      {children}
    </div>
  );
}
