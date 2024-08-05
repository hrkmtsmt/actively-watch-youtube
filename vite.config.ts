import path from 'path';
import { loadEnv, defineConfig } from 'vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import typescript from '@rollup/plugin-typescript';

const srcDir = path.join(__dirname, 'src/');
const envDir = path.join(__dirname, '.env/');
const publicDir = path.join(__dirname, 'public/');
const outDir = path.join(__dirname, 'dist/');
const scriptsDir = path.join(srcDir, 'scripts/');

export default defineConfig(({ mode }) => {
  return {
    root: srcDir,
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
      outDir,
      emptyOutDir: true,
      target: ['es2022', 'edge89', 'firefox89', 'chrome89', 'safari15'],
      rollupOptions: {
        input: {
          main: path.join(srcDir, 'index.html'),
          test: path.join(scriptsDir, 'test.ts'),
        },
        output: {
          entryFileNames: `assets/[name].js`,
          chunkFileNames: `assets/chunk-[name].js`,
          assetFileNames: `assets/[name].[ext]`,
        },
        plugins: [typescript()],
      },
    },
  };
});
