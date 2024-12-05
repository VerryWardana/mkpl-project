import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../django_app/django_app/frontend/build/static',
    emptyOutDir: true,
  },
});