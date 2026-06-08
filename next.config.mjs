/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'www.rsg-ai.de' },
      { protocol: 'https', hostname: 'www.rsg-agent-services.de' }
    ]
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion']
  },
  async redirects() {
    return [
      // Duplicate-Content konsolidieren: flache Branchenseite -> kanonische verschachtelte
      { source: '/ki-telefonassistent-arztpraxis', destination: '/ki-telefonassistent/arztpraxis', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(self), geolocation=()' }
        ]
      }
    ];
  }
};

export default nextConfig;
