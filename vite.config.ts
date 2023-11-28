//import { defineConfig } from 'vite';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // site: 'https://jeromeabel.github.io',
  base: '/neptunebeerclub',
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/ui/components'),
      '@containers': path.resolve(__dirname, './src/ui/containers'),
      '@layouts': path.resolve(__dirname, './src/ui/layouts'),
      '@features': path.resolve(__dirname, './src/features'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
  define: {
    'process.env.MapboxAccessToken': JSON.stringify(process.env.MapboxAccessToken),
  },
});
