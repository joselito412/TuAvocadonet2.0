import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    ViteImageOptimizer({
      svg: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                cleanupNumericValues: false,
              },
            },
          },
          'removeDimensions',
        ],
      },
      png: {
        // https://sharp.pixelplumbing.com/api-output#png
        quality: 80,
      },
      jpeg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 75,
      },
      jpg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 75,
      },
      tiff: {
        // https://sharp.pixelplumbing.com/api-output#tiff
        quality: 80,
      },
      // gif does not support lossless compression
      // webp is already quite small, but we can try
      webp: {
        // https://sharp.pixelplumbing.com/api-output#webp
        quality: 80,
      },
      avif: {
        // https://sharp.pixelplumbing.com/api-output#avif
        lossless: true,
      },
    }),
  ],
  base: '/TuAvocadonet2.0/', // Keep this hardcoded as per current working setup, or use process.env if we were injecting it.
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
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
            './src/components/WhatsAppButton.jsx',
          ],
        },
      },
    },
  },
});
