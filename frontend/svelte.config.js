import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		target: '#svelte',
		vite: {
			build: {
				sourcemap: true
			},
			resolve: {
				alias: {
					'@logic': path.resolve('./src/logic'),
					'@utils': path.resolve('./src/utils'),
				}
			}
		}
	}
};

export default config;
