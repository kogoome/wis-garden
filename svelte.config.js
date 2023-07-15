// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';
// import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],
	preprocess: [mdsvex(mdsvexConfig), vitePreprocess()],
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
      alias: {
        '$lib/': './src/lib/'
      },
			strict: true
		})
	}
};

export default config;
