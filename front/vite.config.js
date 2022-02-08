import { defineConfig } from 'vite';

export default defineConfig({
  esbuild: {
    jsxFactory: 'jsx',
    jsxInject: `import { jsx } from 'theme-ui'`,
  },
});
