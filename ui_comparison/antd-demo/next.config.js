const nextConfig = {
  transpilePackages: ['antd', '@ant-design/icons', '@ant-design/cssinjs'],
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;