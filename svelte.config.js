// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import path from 'path';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md']
			// layout: {
			// 	note: 'src/routes/note/MdLayout.svelte'
			// }
		})
	],
	extensions: ['.svelte', '.md'],
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			paths: {
				base: dev ? '' : '/wis-garden'
			},
			strict: true
		}),
		prerender: {
			entries: ['/note/test', '/', '/codemirror', '/customEditor']
		}
		// alias: {
		// 	$lib: 'src/lib'
		// }
	}
};

export default config;
