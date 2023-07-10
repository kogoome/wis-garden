<script lang="ts">
	import katex from 'katex'
	import { noteEditor_caretRect, texEditorOpen, noteEditor_savedCaret, data_position } from '../../note_store.js'
	import { fly } from 'svelte/transition'
	import { onMount } from 'svelte'
	
	onMount(() => {
		const editor = document.querySelector(`[data-position="${$data_position}"]`) as HTMLDivElement
		console.log("editor",editor);
		const texEditor = document.getElementById('texEditor') as HTMLDivElement
		const container = editor.querySelector('.sknowContainer') as HTMLDivElement
		console.log(container);
		container.innerHTML = container.innerHTML.replace(
			'|',
			'<span id="katex-dom" contenteditable="false" class="katexSpan text-xl w-full overflow-x-hidden rounded-sm"></span>'
		)
		texEditor.focus()
	})

	let katexOptions = {
		displayMode: false,
		throwOnError: false
	}

	function texEditor_onkeyup(e: KeyboardEvent) {
		const thisDiv = e.target as HTMLDivElement
		const childNodes = thisDiv.childNodes

		// enter auto katex newline
		if (e.keyCode === 13) {
			const focusNode = window.getSelection()!.focusNode!.previousSibling!
			let findNodeIdx = -1
			childNodes.forEach((node, i) => {
				if (node.nodeValue === focusNode.textContent) findNodeIdx = i
				if ((node as HTMLDivElement).innerText === focusNode.textContent) findNodeIdx = i
			})

			if (childNodes[findNodeIdx].nodeValue) {
				childNodes[findNodeIdx].nodeValue += '\\\\'
			} else {
				;(childNodes[findNodeIdx] as HTMLDivElement).innerText += '\\\\'
			}
		}
	}
	function texEditor_onkeydown(e: KeyboardEvent) {
		console.log(e.keyCode)

		// esc
		if (e.keyCode === 27) {
			console.log("esc ");
			texEditor_close()
		}
		// tab
		if (e.keyCode === 9) {
			e.preventDefault()
			katexOptions.displayMode = !katexOptions.displayMode
		}
	}

	function texEditor_close() {
		const texEditor = document.getElementById('texEditor') as HTMLElement
		const katexDom = document.getElementById('katex-dom') as HTMLElement

		switch (getCloseState()) {
			case 'remove katex-dom':
				// 빈문자 제거
				const focusNode = katexDom.previousSibling as Node
				const whiteStrNode = katexDom.nextSibling as Text
				whiteStrNode.replaceWith(whiteStrNode.wholeText.substring(1))
				// katex-dom 제거
				katexDom.parentElement?.removeChild(katexDom)
				$texEditorOpen = false
				container_caretFocus('prev', focusNode)
				break
			case 'katex injection':
				katexDom.removeAttribute('id')
				$texEditorOpen = false
				container_caretFocus('next')
				break
		}

		function getCloseState() {
			if (texEditor.innerText.length === 0) return 'remove katex-dom'
			if (texEditor.innerText.length > 0) return 'katex injection'
		}

		function container_caretFocus(state: 'prev' | 'next', prevNode?: Node) {
			let focusNode: Node | Text
			let focusOffset: number
			switch (state) {
				case 'prev': // from saveCaret
					focusOffset = $noteEditor_savedCaret.focusOffset
					if (!prevNode)
						focusNode = document.querySelector('[placeholder="content"]')!.lastChild as Node
					else focusNode = prevNode as Node
					break
				case 'next': // from katex nextSibling
					if (katexOptions.displayMode) {
						focusOffset = 0
						focusNode = katexDom.parentElement!.nextSibling as HTMLDivElement // 블럭모드일때는 다음 div
					} else {
						focusOffset = 1
						// 포커싱할 제로스페이스 텍스트 노드 생성시켜서 삽입시키고
						const zeroSpaceNode = document.createTextNode(`​`)
						insertAfter(katexDom, zeroSpaceNode)
						// 캐럿포커스 준비
						focusNode = zeroSpaceNode
					}
					break
			}

			const newRange = document.createRange()
			newRange.setStart(focusNode, focusOffset)
			newRange.setEnd(focusNode, focusOffset)
			const newSelection = document.getSelection()
			newSelection!.removeAllRanges()
			newSelection!.addRange(newRange)
		}

		function insertAfter(baseElement: HTMLElement, newNode: Node) {
			// eslint-disable-next-line no-extra-boolean-cast
			if (!!baseElement.nextSibling) {
				baseElement.parentNode?.insertBefore(newNode, baseElement.nextSibling)
			} else {
				baseElement.parentNode?.appendChild(newNode)
			}
		}
	}

	function texEditor_oninput(e: Event) {
		const texEditor = e.target as HTMLDivElement
		const katexDom = document.getElementById('katex-dom') as HTMLElement

		texStringDataSave()
		katex.render(texEditor.textContent!, katexDom, katexOptions)

		function texStringDataSave() {
			katexDom.setAttribute('data-texEditor', texEditor.textContent!)
		}
	}
</script>

<div
	class="bg-white bg-opacity-40 backdrop-blur-sm w-[50%] h-fit absolute rounded-lg shadow-md z-20 p-2 transition-all flex flex-col gap-px left-1/2 -translate-x-1/2"
	style="top:{$noteEditor_caretRect.top - 130}px;"
	transition:fly={{ y: 100 }}
>
	<div class="flex justify-between items-center">
		<div class="transition-all {katexOptions.displayMode ? 'text-gray-500' : 'text-gray-400'}">
			{katexOptions.displayMode ? 'block' : 'inline'}
		</div>
		<input
			type="checkbox"
			class="toggle toggle-sm checked:bg-gray-500 checked:border-gray-500 transition-all"
			bind:checked={katexOptions.displayMode}
		/>
	</div>
	<div
		id="texEditor"
		contenteditable="true"
		class="w-full min-h-[24px] outline-none caret-white text-stone-400 focus:text-white  rounded-md text-xl focus:shadow-inner text-center transition-all duration-700
    "
		spellcheck="false"
		placeholder="shift+\' : 수식입력"
		on:keydown={texEditor_onkeydown}
		on:keyup={texEditor_onkeyup}
		on:input={texEditor_oninput}
	/>
</div>

<style>
	#texEditor {
		background: linear-gradient(
			45deg,
			rgb(231 229 228),
			rgb(231 229 228),
			rgb(231 229 228),
			rgb(231 229 228),
			#ffe4e6,
			#ffe4e6,
			#b9c4fe,
			#ca85f5
		);
		background-size: 300%;
		background-position: left;
		-webkit-transition: background-position 1s;
		-moz-transition: background-position 1s;
		-ms-transition: background-position 1s;
		-o-transition: background-position 1s;
		transition: 1s;
	}
	#texEditor:focus {
		background-position: right;
	}

	[contenteditable='true']:empty:not(:focus)::before {
		content: attr(placeholder);
		pointer-events: none;
		color: #999;
		display: block; /* For Firefox */
	}
</style>
