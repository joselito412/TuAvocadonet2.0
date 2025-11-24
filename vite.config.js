import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  base: "/TuAvocadonet2.0/", // Keep this hardcoded as per current working setup, or use process.env if we were injecting it.
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    minify: "esbuild",
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Separate chunk for UI components
          'ui-components': [
            './src/components/Navigation.tsx',
            './src/components/Footer.tsx',
            './src/components/WhatsAppButton.jsx'
          ],
        },
      },
    },
  },
});
