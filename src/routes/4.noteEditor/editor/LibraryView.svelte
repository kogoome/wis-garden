<script lang="ts">
	import type { Content } from '../note_store.js'
	import { fly } from 'svelte/transition'
	export let note: Content
	// $: console.log("라이브러리 뷰 데이터 : ", note);
</script>

<div class="w-full h-fit p-1">
	<div
		class="rounded-lg w-full h-fit bg-white  text-left px-6 py-3 relative hover:ring hover:ring-[rgb(179,220,192)] transition-all"
		in:fly={{ y: -100, delay:300, duration:200 }} out:fly={{ y: -100, duration:200 }}
	>
		<div
			class="text-3xl font-semibold outline-none mb-2 max-w-[1080px] mx-auto"
			contenteditable="false"
		>
			{note.title}
		</div>
	
		<div class="outline-none text-xl max-w-[1080px] mx-auto" contenteditable="true" bind:innerHTML="{note.content}" >
		</div>
	</div>
</div>
