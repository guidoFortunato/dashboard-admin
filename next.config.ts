import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Usar el directorio del proyecto para que la resolución de módulos
    // (p. ej. tailwindcss) use siempre website, no la carpeta padre.
    root: path.join(__dirname),
  },
  /* config options here */
};

export default nextConfig;
