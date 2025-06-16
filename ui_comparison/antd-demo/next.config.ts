import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['antd', '@ant-design/icons', '@ant-design/cssinjs'],
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
