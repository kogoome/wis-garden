<script lang="ts">
	import type { PageData } from './$types.js';
	export let data: PageData;
	const { title, subtitle, date, Content } = data;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>
<article class="bg-black w-full h-screen overflow-y-scroll px-10">
	<div class="bg-black w-full h-[80vh] text-zinc-300 text-end flex flex-col justify-center">
		<div class="text-gradient font-bold text-8xl">
			{title}
		</div>
		<div class="text-3xl">
			{subtitle}
		</div>
		<div>
			{date}
		</div>
	</div>
	<div class="text-slate-200">
		<Content />
	</div>
</article>

<style>
	@keyframes shine {
		to {
			background-position: 200% center;
		}
	}
	.text-gradient {
		background: linear-gradient(to right, #6366f1, #34a6e4, #36b981, #6366f1);
		background-size: 400% auto;

		color: #000;
		background-clip: text;
		/* text-fill-color: transparent; */
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;

		animation: shine 8s linear infinite;
	}
</style>
