import hljs from 'highlight.js'

export const hl = (el: HTMLElement) => {
	// 상단 랭귀지 가져오기
	const language = (
		(el.previousElementSibling!.previousElementSibling!.firstElementChild! as HTMLInputElement)
			.value as string
	).trim()
	// 뷰어에 변환 입력
	el.previousElementSibling!.innerHTML = hljs
		.highlight(el.innerHTML.replace(/(<div>)/gi, '\n').replace(/(<\/div>|<br>)/gi, ''), {
			language,
		})
		.value.replace(/(&amp;)/gi, '&')
}
