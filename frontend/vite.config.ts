import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// @ts-ignore
import stdLibBrowser from "vite-plugin-node-stdlib-browser";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), stdLibBrowser()],
  define: { global: {} },
});
