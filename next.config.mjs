/** @type {import('next').NextConfig} */
const nextConfig = {
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
