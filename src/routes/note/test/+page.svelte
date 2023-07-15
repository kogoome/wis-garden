<script lang="ts">
	import type { PageData } from './$types.js';
	export let data: PageData;
	const { title, subtitle, date, Content } = data;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>
<article class="bg-[#111] w-full h-screen overflow-y-scroll">
	<div class="w-full h-[80vh] text-end flex flex-col justify-center gap-8 px-10">
		<div class="text-gradient font-bold text-8xl">
			{title}
		</div>
		<div class="flex flex-col gap-1">
			<div class="text-3xl text-zinc-300">
				{subtitle}
			</div>
			<div class="text-zinc-500">
				{date}
			</div>
		</div>
	</div>
	<div class="text-slate-200 px-10">
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
