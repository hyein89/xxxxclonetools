/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["tsx", "ts", "jsx", "js"],
  images: {
    domains: ["example.com"], // ganti dengan domain thumbnail kamu
  },
};

module.exports = nextConfig;
