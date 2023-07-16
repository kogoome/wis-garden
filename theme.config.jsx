import { Head } from "./components/Head";
import { useNextSeoProps } from "./config/useNextSeoProps";
import { Logo } from "./components/Logo";

const config = {
	logo: Logo,
	// project: {
	//   link: 'empty'
	// },
	docsRepositoryBase: 'https://github.com/path-of-reason/wis-garden',
	footer: {
		text: 'made by wis',
	},
	head: Head,
	feedback: {
		content: () => <>Question? Give me feedback →</>,
		labels: 'feedback',
	},
	useNextSeoProps,
	i18n: [],
}

export default config;
