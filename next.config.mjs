/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  typescript: {
    // Allows you to run the dev server and build 
    // even while you are gradually renaming files to .tsx
    ignoreBuildErrors: true,
  },
};

export default nextConfig;