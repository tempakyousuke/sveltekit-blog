import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      "postcss": true
    })
  ],

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: null
    }),
    ssr: false,
    vite: {
      resolve: {
        alias: {
          $types: path.resolve('./types'),
          $modules: path.resolve('./src/modules'),
        }
      },
      ssr: {
        external: ['firebase']
      }
    }
  }
};

export default config;
