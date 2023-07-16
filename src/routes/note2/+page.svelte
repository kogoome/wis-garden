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

