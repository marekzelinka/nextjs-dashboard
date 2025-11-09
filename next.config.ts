import type { NextConfig } from "next";
import "@/env";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  typedRoutes: true,
  experimental: {
    typedEnv: true,
  },
};

export default nextConfig;
