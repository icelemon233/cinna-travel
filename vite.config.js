import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  base: mode === 'github-pages' ? '/cinna-travel/' : '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.endsWith('/src/lhasa-street-data.js')) return 'lhasa-streets';
        },
      },
    },
  },
}));
