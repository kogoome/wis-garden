<script lang="ts">
	export let title = 'test';
	export let subtitle = 'test';
	export let date = '2000-1-1';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>
<article class="bg-[#111] w-full h-screen overflow-y-scroll">
	<div class="w-full h-[80vh] text-end flex flex-col justify-center gap-8 px-10">
		<div class="text-gradient font-bold text-8xl">{title}</div>
		<div class="flex flex-col gap-1">
			<div class="text-3xl text-zinc-300">{subtitle}</div>
			<div class="text-zinc-500">{date}</div>
		</div>
	</div>
	<div class="w-full text-slate-200 px-10 flex justify-center">
    <div class="max-w-[900px]">
      <slot />
    </div>
	</div>
  <div class="w-full h-[30vh] bg-[#111]">
  </div>
</article>

