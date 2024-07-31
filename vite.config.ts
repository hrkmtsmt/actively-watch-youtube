import path from 'path';
import { loadEnv, defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

const srcDir = path.join(__dirname, 'src/');
const envDir = path.join(__dirname, '.env/');
const publicDir = path.join(__dirname, 'public/');

export default defineConfig(({ mode }) => {
  return {
    publicDir,
    envDir,
    plugins: [react(), checker({ typescript: true }), tsconfigPaths(), vanillaExtractPlugin()],
    test: {
      environment: 'jsdom',
      include: ['**/*.{test,spec}.*'],
    },
    resolve: {
      alias: {
        '@src/': srcDir,
      },
    },
    server: {
      watch: {
        usePolling: true,
      },
    },
    define: { 'process.env': loadEnv(mode, envDir) },
    build: {
      target: ['es2022', 'edge89', 'firefox89', 'chrome89', 'safari15'],
    },
  };
});
