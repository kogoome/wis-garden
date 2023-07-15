import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.resolve(fileURLToPath(import.meta.url), '../');

const config = defineConfig({
	extensions: ['.md'],
	layout: {
		note: path.join(dirname, 'src/lib/layout/note-layout.svelte')
	}
});

export default config;
