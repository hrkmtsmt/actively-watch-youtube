import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'wxt';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

const envDir = path.join(__dirname, '.env/');
const srcDir = path.join(__dirname, 'src/');

// See https://wxt.dev/api/config.html
export default defineConfig({
  vite: () => {
    return {
      envDir,
      build: { target: ['es2022', 'edge89', 'firefox89', 'chrome89', 'safari15'] },
      plugins: [tsconfigPaths(), vanillaExtractPlugin()],
    };
  },
  srcDir,
  modules: ['@wxt-dev/module-react'],
  manifest: {
    permissions: ['storage'],
  },
});
