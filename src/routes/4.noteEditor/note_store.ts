import { writable, type Writable } from 'svelte/store'
// 왼쪽 사이드 메뉴 오픈
export const libAccordion = writable(false)
export const noteAccordion = writable(false)
export const bookmarkAccordion = writable(false)

// 블럭입력기 오픈
export const blockInputOpen = writable(false)
// 수식 입력기 열기
export const texEditorOpen = writable(false)
// 블럭입력시 생성위치 저장용
export const noteEditor_caretRect = writable({ top: 0, left: 0 })
// 입력기 불러올 때 캐럿 위치 저장 -> 수식입력기나 코드입력기 종료시 로드함.
export const noteEditor_savedCaret: Writable<{ focusOffset: number; focusNode: Node | null }> =
	writable()
// 키입력 이벤트시마다 에디터 캐럿 x위치 저장. 에디터 x좌표라고 볼 수 있음
export const caretPosition = writable(-1)
// 에디터 y좌표, 블럭 인덱스 추적용. 현재 사용되지 않음
export const sknowBlockIdx = writable(-1)
// 최대 y값, 미사용
export const totalBlockLine_number = writable(0)
// 블럭입력기 위치에 대한 레이아웃 기준값. 블럭 치환시 에디터 돔 검색용으로 사용됨.
export const data_position: Writable<'full' | 'left' | 'right' | 'up' | 'down'> = writable('full')

// 임시 노트 데이터 저장소
export const pageLoadData: Writable<{ note: Content[]; library: Content[] }> = writable({
	note: [],
	library: [],
})
// 노트데이터 객체형식
export type Content = {
	id: number
	title: string
	content: string
	use?: string
}

// 노트 데이터 페치api 읽어오기
export const preload = async () => {
	const library = await fetch('/json_api?use=library')
		.then((res) => res.json())
		.catch((err) => console.log(err))
	const note = await fetch('/json_api?use=note')
		.then((res) => res.json())
		.catch((err) => console.log(err))

	pageLoadData.set({ library, note })
}
preload()
