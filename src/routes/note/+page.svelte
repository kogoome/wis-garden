<script lang="ts">
</script>

<svelte:head>
	<title>welcome wis garden</title>
</svelte:head>

<article class="bg-black w-full h-screen overflow-y-scroll px-10">
	<div class="bg-black w-full h-[80vh] text-7xl text-end flex flex-col justify-center">
		<div class="text-gradient font-bold text-white">welcome!</div>
	</div>
	<div class="text-slate-200">
		<slot />
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
