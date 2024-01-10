import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	resolve: {
		alias: {
			$types: path.resolve('./types'),
      $model: path.resolve('./src/model'),
      $modules: path.resolve('./src/modules')
		}
	},
  plugins: [sveltekit()],
	ssr: {
		external: ['firebase']
	}
});
