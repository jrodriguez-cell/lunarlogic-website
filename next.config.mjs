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
    ];
  },
};

export default nextConfig;
