import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['docs.google.com', 'lh3.googleusercontent.com'],
    localPatterns: [
      {
        // Match your API route for generated thumbnails
        pathname: "/api/slides/first-thumb",
      },
    ],
  },
};

export default nextConfig;
