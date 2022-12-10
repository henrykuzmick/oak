const withTM = require('next-transpile-modules')(['api', 'auth', 'db', 'trpc']);

module.exports = withTM({
  webpack: (config) => {
    return config;
  },
  reactStrictMode: true,
  swcMinify: true,
});