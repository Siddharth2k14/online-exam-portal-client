
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'; // ✅ Import visualizer plugin

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/bundle-report.html', // ✅ Output location
      open: true,                          // ✅ Auto-open in browser
      gzipSize: true,                      // ✅ Show Gzip size
      brotliSize: true                     // ✅ Show Brotli size
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
  server: {
    allowedHosts: ['899e-49-43-116-147.ngrok-free.app'],
  },
});
