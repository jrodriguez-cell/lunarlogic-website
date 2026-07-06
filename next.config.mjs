/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/gualapack',
        destination: '/gualapack.html',
      },
    ];
  },
};

export default nextConfig;
