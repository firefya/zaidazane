import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Ensures assets load properly in GitHub Pages
  server: {
    port: 3000, // Keep local dev consistent
    open: true,  // Auto-open browser
  },
  build: {
    outDir: 'dist', // GitHub Pages expects a `dist` folder
  }
});
