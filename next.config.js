/** @type {import('next').NextConfig} */
const nextConfig = {
  // Garante que esses pacotes sejam tratados como externos no server
  serverExternalPackages: [
    "@prisma/client",
    "@libsql/client",
    "@prisma/adapter-libsql",
  ],
};

module.exports = nextConfig;
