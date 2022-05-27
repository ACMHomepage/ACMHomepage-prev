import { defineConfig } from 'vite';
import visualizer from 'rollup-plugin-visualizer';
import svgr from '@svgr/rollup';
import postcssPresetEnv from 'postcss-preset-env';

const env = process.argv[process.argv.length - 1];

const rollupPlugins = [];

if (env === 'analyze') {
  rollupPlugins.push(
    visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  );
}

export default defineConfig({
  esbuild: {
    jsxFactory: 'jsx',
    jsxInject: `import { jsx } from 'theme-ui';`,
  },
  build: {
    rollupOptions: {
      plugins: rollupPlugins,
    },
  },
  css: {
    postcss: {
      plugins: [postcssPresetEnv],
    },
  },
  plugins: [svgr()],
});
