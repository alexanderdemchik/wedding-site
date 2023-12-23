import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import postcssPresetEnv from 'postcss-preset-env';
import postcssNesting from 'postcss-nesting';
import postCssGlobalData from '@csstools/postcss-global-data';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [
        postCssGlobalData({ files: ['./src/templates/basic/media-queries.css'] }),
        postcssPresetEnv,
        postcssNesting,
      ],
    },
  },
});
