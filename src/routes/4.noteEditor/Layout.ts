import { writable, type Writable } from 'svelte/store'

type Layout = {
	display: 'full' | 'vertical' | 'horizon'
	leftMenu: boolean
	leftMenuHolder: boolean
	fileDrag: boolean
}
export const layout: Writable<Layout> = writable({
	display: 'full',
	leftMenu: true,
	leftMenuHolder: true,
	fileDrag: false,
})
let subscribe_layout: Layout
layout.subscribe((data) => (subscribe_layout = data))

export function verticalToggle() {
	layout.update(() => ({
		display: subscribe_layout.display !== 'vertical' ? 'vertical' : 'full',
		leftMenu: subscribe_layout.leftMenu,
		leftMenuHolder: subscribe_layout.leftMenuHolder,
		fileDrag: subscribe_layout.fileDrag,
	}))
}
export function horizonToggle() {
	layout.update(() => ({
		display: subscribe_layout.display !== 'horizon' ? 'horizon' : 'full',
		leftMenu: subscribe_layout.leftMenu,
		leftMenuHolder: subscribe_layout.leftMenuHolder,
		fileDrag: subscribe_layout.fileDrag,
	}))
}
export function fullToggle() {
	layout.update(() => ({
		display: (subscribe_layout.display = 'full'),
		leftMenu: subscribe_layout.leftMenu,
		leftMenuHolder: subscribe_layout.leftMenuHolder,
		fileDrag: subscribe_layout.fileDrag,
	}))
}
export function horizonInjection() {
	layout.update(() => ({
		display: (subscribe_layout.display = 'horizon'),
		leftMenu: subscribe_layout.leftMenu,
		leftMenuHolder: subscribe_layout.leftMenuHolder,
		fileDrag: subscribe_layout.fileDrag,
	}))
}
export function verticalInjection() {
	layout.update(() => ({
		display: (subscribe_layout.display = 'vertical'),
		leftMenu: subscribe_layout.leftMenu,
		leftMenuHolder: subscribe_layout.leftMenuHolder,
		fileDrag: subscribe_layout.fileDrag,
	}))
}
export function fullInjection() {
	layout.update(() => ({
		display: (subscribe_layout.display = 'full'),
		leftMenu: subscribe_layout.leftMenu,
		leftMenuHolder: subscribe_layout.leftMenuHolder,
		fileDrag: subscribe_layout.fileDrag,
	}))
}

export function leftHold() {
	layout.update(() => ({
		display: subscribe_layout.display,
		leftMenu: subscribe_layout.leftMenu,
		leftMenuHolder: !subscribe_layout.leftMenuHolder,
		fileDrag: subscribe_layout.fileDrag,
	}))
}
