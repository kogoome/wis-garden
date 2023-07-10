/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { caretPosition } from '../note_store.js'
import { hl } from './editorFeature/hl.js'
let caretPos: number
caretPosition.subscribe((n) => (caretPos = n))

// onMount event

export function titleEditor_onkeydown(e: KeyboardEvent) {
	const title = e.target as HTMLDivElement
	// console.log(e.keyCode)
	// 엔터키 누르면
	if (e.keyCode === 13) {
		// 기본기능 막고
		e.preventDefault()
		const container = title.parentElement?.querySelector('.sknowContainer') as HTMLDivElement
		const firstBlock = container.querySelector('.sknowBlock') as HTMLDivElement | null
		// 컨테이너에 블럭이 없으면
		if (!firstBlock) {
			// 만들고 추가해서
			const div = htmlToElement(
				/*html*/ `<div contenteditable="true" class="sknowBlock outline-none bg-white  w-full min-h-[28px] my-px rounded-sm" placeholder="text" spellcheck="false"/>`
			) as HTMLDivElement
			container.appendChild(div)
		}
		// 포커스
		container.focus()
	}
}

let container_keydown_stop = false
export function container_keyup() {
	const selection = window.getSelection() as Selection
	caretPosition.set(selection.focusOffset)
	container_keydown_stop = false
}

export function container_keydown(e: KeyboardEvent) {
	// NOTE 지금 첫번째 블록 삭제를 막아주는 역할을 키업 이벤트가 수행하고있는데, 키다운 누르고 있으면 키업이벤트 발동 없이 셀렉션 변경되면서 무시됨. 키다운일때도 셀렉션 처리해줘야함.
	const selection = window.getSelection() as Selection
	caretPosition.set(selection.focusOffset)

	// 하위 블럭 이벤트가 없으므로 단일 컨테이너 이벤트
	const eventDiv = e.target as HTMLDivElement

	// ! container keydown event
	if (eventDiv.classList.contains('sknowContainer')) {
		// 키입력 중단점 설정
		if (container_keydown_stop) {
			e.preventDefault()
			return
		}
		// f1 key 개발확인용
		if (e.keyCode === 112) console.log(eventDiv.innerText)
		// backspace key 첫번째 블럭의 0번캐럿일때는 타이틀로 올라가기
		if (e.keyCode === 8 && eventDiv.childElementCount <= 1) {
			// 연속 키입력 중단 이벤트
			if (caretPos === 1) container_keydown_stop = true
			// 타이틀로 올라가기
			if (caretPos === 0) {
				e.preventDefault()
				const title = document.querySelector('.sknowTitle') as HTMLDivElement
				title.focus()
				lastCaretFocus(title)
			}
		}
		// enter key focus sknowBlock
		if (e.keyCode === 13) {
			e.preventDefault()
			addNewSknowBlock()
		}
	}
	// ! 코드블럭에디터 키다운 이벤트
	if (eventDiv.classList.contains('sknowCodeBlock')) {
		const sknowCodeBlock = e.target as HTMLDivElement
		sknowCodeBlock.addEventListener('input', () => hl(sknowCodeBlock))
		console.log(e.keyCode)
		// tab key -> indent
		if (e.keyCode === 9) {
			e.preventDefault()
		}
		// esc key
		if (e.keyCode === 27) {
			e.preventDefault()
			const codeBlock = e.target as HTMLDivElement
			const nextSknowBlock = (findParentSknowBlock(codeBlock) as HTMLDivElement)
				.nextElementSibling as HTMLDivElement | undefined
			// 다음 블록 잇으면 그거 포커싱하고
			if (nextSknowBlock) {
				nextSknowBlock.focus() // 내용 없으면 필요
				lastCaretFocus(nextSknowBlock, 0)
			} else {
				// 없으면 작성해서 넣기
				addNewSknowBlock()
			}
		}
	}

	function addNewSknowBlock() {
		const selection = window.getSelection()
		// NOTE 이게 언젠 자기 자신 언제는 컨테이너가 나타남. 연타누르면 컨테이너
		// * 1. 블록의 클래스를 확인해서 블록이면 그대로, 컨테이너면 이전단계 쓸 수 잇게 필터링하거나
		// * 2. 블록에 인덱스 먹여서 인덱스 기준으로 중간에 삽입시키거나.
		// 인덱스 기준으로 사용하는것도 제법 괜찮다 생각이 드는건, 라인수랑 커서가 잇는 라인 넘버를 출력 가능하니까.
		// 캐럿정보랑 합치면 에디터의 캐럿 좌표값이 나오는 효과가 잇다.
		// 근데 라인수 뷰는 어케만들지. 하단 바를 만들어야 대나, 아니면 vscode 처럼 왼쪽에 붙이는게 나을려나
		// ! 1 번으로 택

		const focusNode = selection?.focusNode as Node
		const currentBlock =
			focusNode.nodeName === '#text'
				? (focusNode.parentElement as HTMLDivElement)
				: (focusNode as HTMLDivElement)
		// * current block 이 sknow 블럭인지 아닌지 판단해서 아니면 부모 재귀적으로 찾아서 sknowBlock 찾아내자
		const sknowBlock = findParentSknowBlock(currentBlock)
		insertAfterDiv(sknowBlock)

		// NOTE 엔터 눌럿는데 div 안에 요소가 없어서 focus가 안되는 문제가 있음. 스크롤로 대체하자.
		// 해당 태그의 절대좌표를 얻어내서 하단 여유부까지 자동 스크롤
		const editorBox = eventDiv.parentElement as HTMLDivElement
		const nextEl = sknowBlock?.nextElementSibling as HTMLDivElement
		if (nextEl?.getBoundingClientRect().top > editorBox.clientHeight * 0.9) {
			editorBox.scrollTop = editorBox.scrollHeight - editorBox.clientHeight
		}
	}
	function findParentSknowBlock(div: HTMLDivElement) {
		let currentDiv: HTMLElement = div
		let parentDiv = div.parentElement as HTMLElement
		let depth = 1

		// 부모 태그가 컨테이너가 나올때까지 부모를 찾음
		while (!parentDiv.classList.contains('sknowContainer')) {
			currentDiv = currentDiv.parentElement as HTMLElement
			parentDiv = currentDiv.parentElement as HTMLElement
			depth++
			// 못찾거나 에디터 뎁스가 높으면 중단
			if (parentDiv.classList.contains('editorBox') || depth === 20) return
		}
		// 찾으면 현재 태그-sknowBlock 리턴
		return currentDiv
	}
}

function insertAfterDiv(sknowBlock?: HTMLElement) {
	// 인수 블럭이 없으면 중단
	if (!sknowBlock) return
	const div =
		htmlToElement(/*html*/ `<div contenteditable="true" class="sknowBlock outline-none bg-white  w-full min-h-[28px] my-px rounded-sm" placeholder="text" spellcheck="false" 
		/>`) as HTMLDivElement

	insertAfter(sknowBlock, div)
	const newRange = document.createRange()
	newRange.setStart(div, 0)
	newRange.setEnd(div, 0)
	const newSelection = document.getSelection()
	newSelection!.removeAllRanges()
	newSelection!.addRange(newRange)
	// console.log('load caret')

	function insertAfter(sknowBlock: HTMLElement, newNode: HTMLElement) {
		// eslint-disable-next-line no-extra-boolean-cast
		if (!!sknowBlock.nextSibling) {
			sknowBlock.parentNode?.insertBefore(newNode, sknowBlock.nextSibling)
		} else {
			sknowBlock.parentNode?.appendChild(newNode)
		}
	}
}

function lastCaretFocus(dom: HTMLElement, caretIdx?: number) {
	const lastChild = dom.lastChild! as Text
	const newRange = document.createRange()
	const lastIndex = caretIdx !== undefined ? caretIdx : lastChild.length

	newRange.setStart(lastChild, lastIndex)
	newRange.setEnd(lastChild, lastIndex)
	const newSelection = document.getSelection()
	newSelection!.removeAllRanges()
	newSelection!.addRange(newRange)
}

function htmlToElement(html: string) {
	const template = document.createElement('template')
	html = html.trim() // Never return a text node of whitespace as the result
	template.innerHTML = html
	return template.content.firstChild
}
