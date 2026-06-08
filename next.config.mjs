/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  serverExternalPackages: ["@better-auth/kysely-adapter"],
};

export default nextConfig;
