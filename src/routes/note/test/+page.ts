export const load = async () => {
	const fileName = 'test';
	const post = await import(`./${fileName}.md`);
	const { title, subtitle, date } = post.metadata;
	const Content = post.default;

	return {
		title,
		subtitle,
		date,
		Content
	};
};
