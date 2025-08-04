import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), visualizer({
    filename: 'bundle-report.html',
    open: true,
    gzipSize: true,
    brotliSize: true,
    json: true
  }), sentryVitePlugin({
    org: "student-oef",
    project: "javascript-react"
  })],

  build: {
    sourcemap: true
  },

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js"
  },
  server: {
    allowedHosts: ["899e-49-43-116-147.ngrok-free.app"]
  }
});