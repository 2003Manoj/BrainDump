import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/BrainDump/', // Your base path

  server: {
    headers: {
      'Permissions-Policy': 'interest-cohort=()', // Disable the deprecated 'interest-cohort' feature
    },
  },
});
