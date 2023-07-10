<script lang="ts">
	import { onMount } from 'svelte';

	let editor: HTMLDivElement;
	const content = {};
	const key: { [key: string]: boolean } = {};
	onMount(() => {});
	const keyup = (e: KeyboardEvent) => {
		key[e.key.toLowerCase()] = false;
	};
	const keydown = (e: KeyboardEvent) => {
		key[e.key.toLowerCase()] = true;
		if (e.key === 'enter') {
			// e.preventDefault();
		}
		if (key['shift'] && key['j']) {
			e.preventDefault();
			caretXMove('left');
		}
		if (key['shift'] && key['l']) {
			e.preventDefault();
			caretXMove('right');
		}
		if (key['shift'] && key['i']) {
			e.preventDefault();
			caretYMove('up');
		}
		if (key['shift'] && key['k']) {
			e.preventDefault();
			caretYMove('down');
		}
		function lastCaretFocus(dom: HTMLElement, caretIdx?: number) {
			const lastChild = dom.lastChild! as Text;
			const newRange = document.createRange();
			const lastIndex = caretIdx !== undefined ? caretIdx : lastChild.length;

			newRange.setStart(lastChild, lastIndex);
			newRange.setEnd(lastChild, lastIndex);
			const newSelection = document.getSelection();
			newSelection!.removeAllRanges();
			newSelection!.addRange(newRange);
		}
		function caretXMove(direct: 'right' | 'left') {
			const x = direct === 'right' ? 1 : -1;
			e.preventDefault();
			const selection = getSelection();
			const range = selection?.getRangeAt(0);
			const node = range?.endContainer;
			const nextNode = node?.nextSibling;
			const caretPos = range?.endOffset;
			if (!node || !caretPos) return;
			range.setEnd(node, caretPos + x);
			range.setStart(node, caretPos + x);
		}
		function caretYMove(direct: 'up' | 'down') {
			const selection = getSelection();
			const range = selection?.getRangeAt(0);
			const node = range?.endContainer;
			const y =
				direct === 'up'
					? node?.parentElement?.previousSibling?.firstChild
					: node?.parentElement?.nextSibling?.firstChild;
			console.log(y);
			const caretPos = range?.endOffset;
			if (!node || !caretPos || !y) return;
			range.setEnd(y, caretPos);
			range.setStart(y, caretPos);
		}
	};
</script>

<div class="w-full h-full p-10">
	<div class="bg-slate-200 rounded-lg">
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			contenteditable="true"
			class="outline-none p-1"
			on:keydown={keydown}
			on:keyup={keyup}
			bind:this={editor}
		/>
	</div>
</div>
