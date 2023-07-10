import { writable, type Writable } from 'svelte/store'
import type { Content } from '../note_store.js'

export const lib_OpenActive = writable(true)
export const note1_OpenActive = writable(true)
export const note2_OpenActive = writable(true)
export const libView: Writable<Content> = writable({
	id: 0,
	title: '',
	content: '',
	use: 'library',
})
export const note1: Writable<Content> = writable({
	id: 0,
	title: '',
	content: '',
	use: 'note',
})
export const note2: Writable<Content> = writable({
	id: 0,
	title: '',
	content: '',
	use: 'note',
})

export const bookmark_OpenActive = writable(true)
export const bookmark = writable({
	name: '',
	url: '',
})
