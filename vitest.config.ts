import { defineConfig } from 'vitest/config';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: ['node_modules/**/*'],
  },
  plugins: [tsconfigPaths(), vanillaExtractPlugin()],
});
