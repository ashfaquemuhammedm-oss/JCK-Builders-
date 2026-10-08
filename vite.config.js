import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  server: { open: false },
  build: {
    target: 'es2020',
    rollupOptions: {
      input: {
        home: resolve(root, 'index.html'), about: resolve(root, 'about.html'), services: resolve(root, 'services.html'),
        projects: resolve(root, 'projects.html'), process: resolve(root, 'process.html'), realEstate: resolve(root, 'real-estate.html'),
        franchise: resolve(root, 'franchise.html'), contact: resolve(root, 'contact.html')
      }
    }
  }
});
