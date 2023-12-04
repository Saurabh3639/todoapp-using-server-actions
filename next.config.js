/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  distDir: "out",
  env: {
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
  },
};

module.exports = nextConfig;
