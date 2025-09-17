/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["tsx", "ts", "jsx", "js"],
  images: {
    domains: ["example.com"], // ganti dengan domain thumbnail kamu
  },

  env: {
    SITE_NAME: "CONHUB18",
    SITE_DOMAIN: "https://www.nextsxyphim.eu.org",
  },
};

module.exports = nextConfig;
