<script lang="ts">
	import { EditorView, keymap, Decoration, type DecorationSet } from '@codemirror/view';
	import { onMount } from 'svelte';
	import { basicSetup } from 'codemirror';
	import { EditorState, Compartment, StateField, StateEffect } from '@codemirror/state';
	import { defaultKeymap } from '@codemirror/commands';

	onMount(() => {
		let tabSize = new Compartment();

		const addUnderline = StateEffect.define<{ from: number; to: number }>({
			map: ({ from, to }, change) => ({ from: change.mapPos(from), to: change.mapPos(to) })
		});

		const underlineMark = Decoration.mark({ class: 'cm-underline' });

		const underlineField = StateField.define<DecorationSet>({
			create() {
				return Decoration.none;
			},
			update(underlines, tr) {
				underlines = underlines.map(tr.changes);
				for (let e of tr.effects)
					if (e.is(addUnderline)) {
						underlines = underlines.update({
							add: [underlineMark.range(e.value.from, e.value.to)]
						});
					}
				return underlines;
			},
			provide: (f) => EditorView.decorations.from(f)
		});

		export function underlineSelection(view: EditorView) {
			let effects: StateEffect<unknown>[] = view.state.selection.ranges
				.filter((r) => !r.empty)
				.map(({ from, to }) => addUnderline.of({ from, to }));
			if (!effects.length) return false;

			if (!view.state.field(underlineField, false))
				effects.push(StateEffect.appendConfig.of([underlineField]));
			view.dispatch({ effects });
			return true;
		}

		const underlineKeymap = keymap.of([
			{
				key: 'Mod-h',
				preventDefault: true,
				run: underlineSelection
			}
		]);

		let state = EditorState.create({
			doc: 'Hello World',
			extensions: [tabSize.of(EditorState.tabSize.of(2)), keymap.of(defaultKeymap), underlineKeymap]
		});

		let view = new EditorView({
			state,
			parent: document.getElementById('container') as HTMLDivElement
		});
	});
</script>

<div class="text-2xl">hello codemirror!!</div>
<div id="container" class="p-10 rounded-2xl" />

<style>
	:global(.cm-underline) {
		text-decoration: 'underline 3px red';
	}
	:global(.cm-gutters) {
		background-color: '#045';
		color: '#ddd';
		border: 'none';
	}
	:global(&) {
		color: 'white';
		background-color: '#034';
	}
	:global(&.cm-focused .cm-selectionBackground)::selection {
		background-color: '#074';
	}
	:global(&.cm-focused .cm-cursor) {
		border-left-color: '#0e9';
	}
	:global(.cm-content) {
		caret-color: '#0e9';
	}
</style>
