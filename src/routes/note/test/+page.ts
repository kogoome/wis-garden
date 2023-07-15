export const load = async ({ url }) => {
	const fileName = url.pathname.replace('/note/', '');

	const post = await import(/* @vite-ignore */ `./${fileName}.md`);
	const { title, subtitle, date } = post.metadata;
	const Content = post.default;

	return {
		title,
		subtitle,
		date,
		Content
	};
};

export const prerender = true;
