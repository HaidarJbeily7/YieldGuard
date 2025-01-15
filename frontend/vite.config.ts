import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import nodePolyfills from "vite-plugin-node-browser";

// https://vite.dev/config/
export default defineConfig({
  // @ts-ignore
  plugins: [react(), nodePolyfills()],
  define: { global: {} },
});
