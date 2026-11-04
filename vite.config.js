import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Keep the existing REACT_APP_* environment variable names working (Netlify + .env files)
  envPrefix: ['VITE_', 'REACT_APP_'],
  server: { port: 3000 },
  build: {
    outDir: 'build',
    // Hashed bundles go in /static (cached forever via netlify.toml); /assets is for public images
    assetsDir: 'static',
    // Support older iPhones/iPads still on iOS 14+
    target: ['es2020', 'safari14'],
  },
});
