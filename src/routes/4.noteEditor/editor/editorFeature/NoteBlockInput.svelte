<script lang="ts">
	import {
		noteEditor_caretRect,
		texEditorOpen,
		blockInputOpen,
		data_position
	} from '../../note_store.js'
	// import {darkMode} from '../store'
	import { fly } from 'svelte/transition'
	import katex from 'katex'
	import { onMount } from 'svelte'

	// code block highlight.js
	import { hl } from './hl'
	import 'highlight.js/styles/atom-one-dark.css'

	// 버튼 포커스 초기값
	let currentFocusIdx: number = 0
	onMount(() => {
		const block = document.getElementById('blockInput')
		block?.focus()
		const firstBtn = block?.firstElementChild as HTMLDivElement
		buttonFocus(firstBtn)
	})

	// 수식 입력기능 위임 : texEditor
	function blockInput_math() {
		$blockInputOpen = false
		$texEditorOpen = true
	}

	const whiteCode = 
		/*html*/
		`<div class="px-4 py-1 ">
			<div 
				class="relative shadow-xl w-full mt-4 h-fit rounded-lg rounded-tl-none ring-[rgb(179,220,192)] hover:ring" 
				contenteditable="false" 
				onmouseover="(()=>{document.querySelectorAll('.editorBox').forEach(editorBox=>editorBox.parentElement.classList.remove('hover:ring'))})()" 
				onmouseleave="(()=>{document.querySelectorAll('.editorBox').forEach(editorBox=>editorBox.parentElement.classList.add('hover:ring'))})()">
				<div class="absolute -top-4 left-0 z-10" spellcheck="false" contenteditable="false">
					<input type="text" list="lang-options" value="typescript" class="bg-gray-100 rounded-t-lg min-w-16 h-5 z-10 text-amber-500 px-2 outline-none font-extralight text-sm "/>
					<datalist id="lang-options">
						<option value="typescript" />
						<option value="javascript" />
						<option value="java" />
						<option value="python" />
					</datalist>
				</div>
				<div class="absolute top-0 left-0 w-full h-full p-2 bg-gray-100 rounded-lg rounded-tl-none text-gray-700 text-md whitespace-pre-wrap select-none" contenteditable="false">'</div>
				<div id="codeinit" contenteditable="true" class="sknowCodeBlock relative p-2 whitespace-pre-wrap caret-[rgb(92,127,103)] text-transparent text-md font-sans selection:bg-gray-500 selection:bg-opacity-25 outline-none block" spellcheck="false" autocorrect="off" autocapitalize="off">​</div>
			</div>
		</div>`.replace(/\s{2,}/gi, ' ');


	function blockInput_code() {
		const editor = document.querySelector(`[data-position="${$data_position}"]`) as HTMLDivElement
		const container = editor.querySelector('.sknowContainer') as HTMLDivElement

		// 문자 치환
		container.innerHTML = container.innerHTML.replace('|', whiteCode)

		// 캐럿 이동
		const codeNode = container.querySelector('#codeinit') as HTMLElement
		const newRange = document.createRange()
		newRange.setStart(codeNode, 1)
		newRange.setEnd(codeNode, 1)
		const newSelection = document.getSelection()
		newSelection!.removeAllRanges()
		newSelection!.addRange(newRange)

		// 아이디 삭제
		codeNode.removeAttribute('id')

		// 코드블럭 이벤트 리스너 설치
		const editors = document.querySelectorAll('.sknowCodeBlock') as NodeListOf<HTMLDivElement>
		editors.forEach((el) => {
			el.addEventListener('input', () => hl(el))
			hl(el) // Init! 다른 코드들도 여기서 렌더링 한번 더 한다.
		})

		// 블럭입력기 제거
		$blockInputOpen = false
	}

	// tailwind css function
	// 키보드 가상 포커싱
	function buttonAction_onkeyup(e: KeyboardEvent) {
		const button = document.getElementById('blockInput')!.children[
			currentFocusIdx
		] as HTMLDivElement
		if (e.keyCode === 13) {
			buttonEnter(button) // css취소
			button.click() // btn fn action
		}
	}

	function buttonFocusMove_onkeydown(e: KeyboardEvent) {
		const buttons = document.getElementById('blockInput')!.children
		const idxLength = buttons.length
		// console.log("block",e.keyCode);

		// up && previos focus
		if (e.keyCode === 38) {
			buttonFocus(buttons[currentFocusIdx])
			currentFocusIdx =
				currentFocusIdx - 1 < 0 ? currentFocusIdx - 1 + idxLength : currentFocusIdx - 1
			buttonFocus(buttons[currentFocusIdx])
		}
		// down && next focus
		if (e.keyCode === 40) {
			buttonFocus(buttons[currentFocusIdx])
			currentFocusIdx =
				currentFocusIdx + 2 > idxLength ? currentFocusIdx + 1 - idxLength : currentFocusIdx + 1
			buttonFocus(buttons[currentFocusIdx])
		}
		if (e.keyCode === 13) {
			buttonEnter(buttons[currentFocusIdx])
		}
	}

	function buttonFocus(element: Element) {
		element.classList.toggle('bg-gray-100')
	}
	function buttonEnter(element: Element) {
		element.classList.toggle('shadow-inner')
	}
</script>

<div
	id="blockInput"
	contenteditable="true"
	class="absolute w-32 h-fit rounded-lg bg-white shadow-xl border-2 border-gray-200 p-1 flex flex-col gap-1 z-50 outline-none"
	style="top:{$noteEditor_caretRect.top - 60}px; left:{$noteEditor_caretRect.left + 10}px"
	transition:fly={{ y: 100 }}
	on:keydown={buttonFocusMove_onkeydown}
	on:keyup={buttonAction_onkeyup}
>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		contenteditable="false"
		class="w-full text-center h-10 items-center pt-2 hover:bg-gray-100 active:bg-gray-100 select-none rounded-md transition-all hover:-translate-y-0 hover:shadow-md focus:shadow-md active:translate-y-0 active:shadow-inner"
		on:click={blockInput_math}
	>
		{@html katex.renderToString('\\KaTeX', { displayMode: false })} 수식
	</div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		contenteditable="false"
		class="w-full text-center h-10 items-center pt-2 hover:bg-gray-100 active:bg-gray-100 select-none rounded-md transition-all hover:-translate-y-0 hover:shadow-md focus:shadow-md active:translate-y-0 active:shadow-inner"
		on:click={()=>blockInput_code()}
	>
		코드(white)
	</div>
	<div
		contenteditable="false"
		class="w-full text-center h-10 items-center pt-2 hover:bg-gray-100 active:bg-gray-100 select-none rounded-md transition-all hover:-translate-y-0 hover:shadow-md focus:shadow-md active:translate-y-0 active:shadow-inner"
	>
		이모티콘
	</div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		contenteditable="false"
		class="w-full text-center h-10 items-center pt-2 hover:bg-gray-100 active:bg-gray-100 select-none rounded-md transition-all hover:-translate-y-0 hover:shadow-md focus:shadow-md active:translate-y-0 active:shadow-inner"
		on:click={() => {
			$blockInputOpen = false
		}}
	>
		취소
	</div>
</div>
