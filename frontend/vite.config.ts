import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import nodePolyfills from "vite-plugin-node-browser";

export default defineConfig({
  plugins: [
    react(),
    // @ts-ignore
    nodePolyfills(),
  ],
  resolve: {
    alias: {
      crypto: "crypto-browserify",
    },
  },
  define: {
    global: "globalThis",
  },
});
