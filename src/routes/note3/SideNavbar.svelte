<script lang="ts">
  import { routes} from './routes'
  export let base:string

	let sidebarWidth = 200;
	const sidebarToggle = () => {
		sidebarWidth = sidebarWidth === 200 ? 0 : 200;
	};
</script>

<div
	class="h-full bg-zinc-900 text-zinc-300 relative transition-all"
	style={`width: ${sidebarWidth}px`}
>
	<button
		class="absolute top-0 -right-5 w-5 h-full bg-[#111] hover:bg-zinc-800 flex flex-col justify-center"
		on:click={sidebarToggle}
	>
		<div class="w-full flex justify-center">
			<svg
				width="12"
				height="20"
				viewBox="0 0 12 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M12 17.1336L4.583 9.7166L12 2.2834L9.7166 0L0 9.7166L9.7166 19.4332L12 17.1336Z"
					fill="gray"
				/>
			</svg>
		</div>
	</button>
	<div class="w-full h-full p-5">
    {#each routes as route }
		<div class="whitespace-nowrap overflow-hidden">
			<a href={`${base}/note3/${route}`}>{route}</a>
		</div>
    {/each}
	</div>
</div>

