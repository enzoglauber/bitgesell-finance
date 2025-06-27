import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths()],
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
});