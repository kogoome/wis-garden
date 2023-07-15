import { defineMDSveXConfig as defineConfig } from 'mdsvex';
// import path from 'node:path';
// import { fileURLToPath } from 'node:url';

// const dirname = path.resolve(fileURLToPath(import.meta.url), '../');

const config = defineConfig({
	extensions: ['.md'],
	// layout: { // 레이아웃 파일은 스태틱파일로 사용되지 않음. 
	// 	md: path.join(dirname, 'src/lib/layout/note-layout.svelte')
	// }
});

export default config;
