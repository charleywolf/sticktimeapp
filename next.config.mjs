/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/waze-api",
        destination: "https://www.waze.com/live-map/api/user-drive?geo_env=na",
      },
    ];
  },
};

export default nextConfig;
