/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    domains: [
      "www.google.com",
      "thefoodtech.com",
      "example.com",
      "especiasmontero.com",
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
    ],
  },
};

export default nextConfig;
