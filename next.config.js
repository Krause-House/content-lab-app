/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "images.unsplash.com",
      "cdn.discordapp.com",
      "s.espncdn.com",
      "a.espncdn.com",
      "images.overtime.tv",
      "i.ibb.co",
      "pmgxknlyzvixzwjqqkzg.supabase.co",
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dreamerz",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
