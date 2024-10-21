/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vnoc.com",
      },
      {
        protocol: "https",
        hostname: "cdn.vnoc.com",
      },
      {
        protocol: "https",
        hostname: "d2qcctj8epnr7y.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "vnoclogos.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "contentbots.com",
      },
      {
        protocol: "https",
        hostname: "vnoclogos.s3-us-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "tools.contrib.com",
      },
      {
        protocol: "https",
        hostname: "contrib.com",
      },
      {
        protocol: "https",
        hostname: "www.contrib.com",
      },
      {
        protocol: "https",
        hostname: "vnoclogos.s3-us-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "vnoc.com",
      },
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "domaindirectory.com",
      },
      {
        protocol: "https",
        hostname: "manage.vnoc.com",
      },
      {
        protocol: "https",
        hostname: "vnocimages.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
