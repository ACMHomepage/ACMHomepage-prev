import { defineConfig } from 'vite';
import visualizer from 'rollup-plugin-visualizer';
import importToCDN from 'vite-plugin-cdn-import';

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
    jsxInject: `import { jsx } from 'theme-ui'`,
  },
  plugins: [
    importToCDN({
      modules: [
        {
          name: 'react-dom',
          var: 'ReactDOM',
          path: 'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js',
        },
        {
          name: 'react',
          var: 'React',
          path: 'https://unpkg.com/react@17/umd/react.production.min.js',
        },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      plugins: rollupPlugins,
    },
  },
});
