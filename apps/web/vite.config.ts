import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@atomic': path.resolve(__dirname, 'src/atomic'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@core': path.resolve(__dirname, 'src/core'),
      '@data': path.resolve(__dirname, 'src/data'),
      '@domain': path.resolve(__dirname, 'src/domain'),
    },
  },
  plugins: [react(), tailwindcss()],
  build: {
    emptyOutDir: true,
    outDir: 'dist',
  },
});
