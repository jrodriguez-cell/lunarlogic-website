/** @type {import('next').NextConfig} */

// Client-specific demo walkthroughs. They're intentionally reachable as shared
// links, but must stay out of search/AI-crawler indexes so prospecting tools
// don't infer the ICP from a single client (e.g. a large multinational).
const NOINDEX = { key: 'X-Robots-Tag', value: 'noindex, nofollow' };

const nextConfig = {
  async headers() {
    return [
      { source: '/gualapack', headers: [NOINDEX] },
      { source: '/gualapack.html', headers: [NOINDEX] },
      { source: '/truemixmasters', headers: [NOINDEX] },
      { source: '/truemixmasters.html', headers: [NOINDEX] },
      { source: '/amy', headers: [NOINDEX] },
      { source: '/amy/:path*', headers: [NOINDEX] },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/gualapack',
        destination: '/gualapack.html',
      },
      {
        source: '/truemixmasters',
        destination: '/truemixmasters.html',
      },
      // Amy Phillips — Finance Cockpit demo. Unlike the single-file gualapack
      // walkthrough, this is a full multi-page Next.js app deployed as its own
      // Vercel project (served under a /amy basePath). Forward the /amy path and
      // everything beneath it (routes + /amy/_next/* assets) to that deployment.
      {
        source: '/amy',
        destination: 'https://lunarlogic-amy-demo.vercel.app/amy',
      },
      {
        source: '/amy/:path*',
        destination: 'https://lunarlogic-amy-demo.vercel.app/amy/:path*',
      },
    ];
  },
};

export default nextConfig;
