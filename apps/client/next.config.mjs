// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("env/server.mjs"));

const tm = await import('next-transpile-modules')
const withTM = tm.default(['api', 'auth', 'env', 'config']);

/** @type {import("next").NextConfig} */
const config =  withTM({
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
});
export default config;
