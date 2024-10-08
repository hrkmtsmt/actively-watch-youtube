import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'wxt';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

const envDir = path.join(__dirname, '.env/');
const srcDir = path.join(__dirname, 'src/');
const entrypointsDir = path.join(srcDir, 'app/');
const publicDir = path.join(entrypointsDir, 'public/');

// NOTE: https://wxt.dev/api/config.html
export default defineConfig({
  vite: () => {
    return {
      envDir,
      build: {
        target: ['es2022', 'edge89', 'firefox89', 'chrome89', 'safari15'],
      },
      plugins: [tsconfigPaths(), vanillaExtractPlugin()],
    };
  },
  srcDir,
  entrypointsDir,
  publicDir,
  modules: ['@wxt-dev/module-react'],
  manifest: {
    host_permissions: ['http://*/*', 'https://*/*'],
    permissions: ['storage'],
  },
});
