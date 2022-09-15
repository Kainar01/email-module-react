import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import path from 'path';

// https://vitejs.dev/config/

export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [
      cssInjectedByJsPlugin(),
      tsconfigPaths(),
      react(),
      dts({
        insertTypesEntry: true,
      }),
    ],
    base: process.env.VITE_PUBLIC_URL,
    build: {
      cssCodeSplit: false,
      rollupOptions: {
        external: [
          'react',
          'react-dom',
          'styled-components',
          'normalize.css',
          'grapesjs-preset-webpage',
          'grapesjs-blocks-basic',
          'grapesjs',
          'react-error-boundary',
          'grapesjs-react',
        ],
        output: {
          manualChunks: undefined,
          globals: {
            react: 'react',
            'react-dom': 'react-dom',
            'styled-components': 'styled',
            grapesjs: 'grapesjs',
            'react-error-boundary': 'react-error-boundary',
            'grapesjs-blocks-basic': 'grapesjs-blocks-basic',
            'grapesjs-preset-webpage': 'grapesjs-preset-webpage',
            'grapesjs-react': 'grapesjs-react',
          },
        },
      },
      lib: {
        entry: path.resolve(__dirname, 'src/index.tsx'),
        name: 'ReactEmailModule',
        fileName: 'react-email-module',
      },
    },
  });
};
