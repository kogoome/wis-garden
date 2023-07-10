<script lang="ts">
	import {
		pageLoadData,
		noteEditor_caretRect,
		noteEditor_savedCaret,
		blockInputOpen,
		data_position,
		type Content
	} from '../note_store'
	import { 
		titleEditor_onkeydown, 
		container_keyup,
		container_keydown, 
	} from './NoteEditor.js'
	import { fly } from 'svelte/transition'
	import Swal from 'sweetalert2'
	import { onMount } from 'svelte'

	export let note: Content 
	export let editorPosition: 'full'|'left'|'right'|'up'|'down'

	onMount(()=>{
	})

	function container_oninput(e: Event) {
		const thisDiv = e.target as HTMLDivElement
		// action triger
		if (thisDiv.innerHTML.includes('|')) {
			// 이벤트 발생 에디터 포지션 저장 => 텍스에디터나 블록입력기에서 사용 
			$data_position = editorPosition
			setBlockInputNTexEditorPosition()
			caretSave()
			$blockInputOpen = true
		}

		function setBlockInputNTexEditorPosition() {
			// get bounding caret position
			const boundingClientRect = window.getSelection()!.getRangeAt(0).getBoundingClientRect()
			// store share bounding caret position
			noteEditor_caretRect.set({
				top: boundingClientRect.top,
				left: boundingClientRect.left
			})
		}

		async function caretSave() {
			const selection = window.getSelection()
			if (!selection) return false
			noteEditor_savedCaret.set({
				focusOffset: selection.focusOffset - 1,
				focusNode: selection.focusNode
			})
		}
	}

	// 노트 저장
	async function saveNote() {
		// const body = `{"title":${note.title}, "content":${note.content}, "use":"note"}`
		if (note.id === 0) {
			// 새 노트면
			const resData = await fetch('http://localhost:3001/json_api', {
				method: 'POST',
				mode: 'cors',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title: note.title, content: note.content, use: 'note' })
			})
				.then((res) => res.json())
				.catch((err) => console.log(err))
			// 서버 저장하고 서버로드 데이터에 노트 푸시
			if (resData.id) $pageLoadData.note = [...$pageLoadData.note, resData]
			note.id = resData.id
			console.log(resData)
		} else {
			// 기존 노트면
			const resData = await fetch('http://localhost:3001/json_api/' + note.id, {
				method: 'PUT',
				mode: 'cors',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title: note.title, content: note.content, use: 'note' })
			})
				.then((res) => res.json())
				.catch((err) => console.log(err)) // 서버 저장만
			console.log(resData)
		}
		Swal.fire({
			toast: true,
			position: 'top-end',
			showConfirmButton: false,
			timer: 1000,
			timerProgressBar: true,
			didOpen: (toast) => {
				toast.addEventListener('mouseenter', Swal.stopTimer)
				toast.addEventListener('mouseleave', Swal.resumeTimer)
			},
			title: 'save!',
			icon: 'success',
		})
	}

	// s노트 삭제
	async function deleteNote() {
		// 저장되지 않은 새노트라면 메모리만 삭제
		if (note.id === 0) {
			note.title = ''
			note.content = ''
			
			Swal.fire({
				toast: true,
				position: 'top-end',
				showConfirmButton: false,
				timer: 1000,
				timerProgressBar: true,
				didOpen: (toast) => {
					toast.addEventListener('mouseenter', Swal.stopTimer)
					toast.addEventListener('mouseleave', Swal.resumeTimer)
				},
				title: 'note delete!',
				icon: 'success',
			})
		}
		// 타이틀에 ! 있으면 삭제 불가
		else if (!note.title.includes('!')) {
			// 삭제 확인 모달팝업 띄우고
			const swalWithBootstrapButtons = Swal.mixin({
				customClass: {
					confirmButton: 'btn btn-success',
					cancelButton: 'btn btn-danger'
				},
				buttonsStyling: false
			})

			swalWithBootstrapButtons.fire({
				title: 'Are you sure?',
				text: "You won't be able to revert this!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Yes, delete it!',
				cancelButtonText: 'No, cancel!',
				reverseButtons: true
			}).then(async (result) => {
				// 삭제버튼 클릭시
				if (result.isConfirmed) {

					// 데이터 삭제
					await fetch('http://localhost:3001/json_api/' + note.id, {
						method: 'DELETE'
					})
						.then((res) => res.json())
						.catch((err) => console.log(err)) // 서버 저장만
					$pageLoadData.note = $pageLoadData.note.filter((item) => item.id !== note.id)
					note.content = ''

					swalWithBootstrapButtons.fire(
						'Deleted!',
						`Your "${note.title}" has been deleted.`,
						'success'
					)

					note.title = ''
					note.id=0
					console.log(note);
				} else if (
					/* Read more about handling dismissals below */
					result.dismiss === Swal.DismissReason.cancel
				) {
					swalWithBootstrapButtons.fire(
						'Cancelled',
						'Your imaginary file is safe :)',
						'error'
					)
				}
			})
		} else {
			Swal.fire({
				toast: true,
				position: 'top-end',
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
				didOpen: (toast) => {
					toast.addEventListener('mouseenter', Swal.stopTimer)
					toast.addEventListener('mouseleave', Swal.resumeTimer)
				},
				title: '"!" important note can not delete',
				icon: 'warning',
			})
		}
	}


</script>

<div
	class="editorBox bg-white rounded-lg w-full h-full p-5 text-left relative transition-all overflow-y-scroll scroll-smooth" data-position="{editorPosition}"
	transition:fly={{ y: -100 }}
>
	<!-- <div class="w-full h-full "> -->
		<!-- 타이틀 에디터 -->
		<div class="sknowTitle bg-white outline-none max-w-[1080px] min-h-[28px] mx-auto py-1 rounded-sm text-3xl font-semibold  font-sans" contenteditable="true" spellcheck="false" placeholder="title"
		bind:innerHTML={note.title}
		on:keydown={titleEditor_onkeydown}>
			{note.title}
		</div>
	
		<!-- 본문 에디터 p-1 pt-1로 변경할것-->
		<div class="sknowContainer max-w-[1080px] mx-auto text-lg outline-none [pt-1]" contenteditable="true" spellcheck="true" on:keydown="{container_keydown}" on:keyup={container_keyup} on:input={container_oninput} bind:innerHTML={note.content} >
		</div>
		<div class="footerSpace w-full h-32"/>

	<!-- </div> -->
</div>
<!-- 하단 버튼 -->
<div class="absolute bottom-2 right-2 flex gap-2">
	<button
		class=" bg-white rounded-3xl p-1 px-2 grayscale border-2 border-gray-300 text-sm text-gray-400 font-bold font-sans hover:grayscale-0 hover:text-gray-600 hover:border-[rgb(179,220,192)]
transition-all"
		on:click={saveNote}>save</button
	>
	<button
		class=" bg-white rounded-3xl p-1 px-2 grayscale border-2 border-gray-300 text-sm text-gray-400 font-bold font-sans hover:grayscale-0 hover:text-gray-600 hover:border-[rgb(179,220,192)] transition-all"
		on:click={deleteNote}>delete</button
	>
</div>

<style>
	[contenteditable='true']:empty:before {
		content: attr(placeholder);
		pointer-events: none;
		color: #999;
		display: block; /* For Firefox */
	}
</style>
