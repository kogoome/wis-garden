<script lang="ts">
	import { onMount } from 'svelte';

	let editor: HTMLDivElement;
	const content = {};
	onMount(() => {});

	const keydown = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			// e.preventDefault();
		}
		if (e.key === 'h') {
			e.preventDefault();
			const selection = getSelection();
			const range = selection?.getRangeAt(0);
			const node = range?.endContainer;
			const caretPos = range?.endOffset;
			console.log(caretPos);
			if (!node || !caretPos) return;
			range?.setEnd(node, caretPos - 1);
		}
		if (e.key === 'l') {
			e.preventDefault();
			const selection = getSelection();
			const range = selection?.getRangeAt(0);
			const node = range?.endContainer;
			const caretPos = range?.endOffset;
			console.log(caretPos);
			if (!node || !caretPos) return;
			range.setStart(node, caretPos + 1);
		}
	};
</script>

<div class="w-full h-full p-10">
	<div class="bg-slate-200 rounded-lg">
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div contenteditable="true" class="outline-none p-1" on:keydown={keydown} bind:this={editor} />
	</div>
</div>
