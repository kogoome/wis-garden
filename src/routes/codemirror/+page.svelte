<script lang="ts">
	import { EditorView, keymap } from '@codemirror/view';
	import { onMount } from 'svelte';
	import { basicSetup } from 'codemirror';
	import { EditorState, Compartment } from '@codemirror/state';
	import { defaultKeymap } from '@codemirror/commands';

	onMount(() => {
		let tabSize = new Compartment();

		let state = EditorState.create({
			doc: 'Hello World',
			extensions: [tabSize.of(EditorState.tabSize.of(2)), keymap.of(defaultKeymap)]
		});

		let myTheme = EditorView.theme(
			{
				'&': {
					color: 'white',
					backgroundColor: '#034'
				},
				'.cm-content': {
					caretColor: '#0e9'
				},
				'&.cm-focused .cm-cursor': {
					borderLeftColor: '#0e9'
				},
				'&.cm-focused .cm-selectionBackground, ::selection': {
					backgroundColor: '#074'
				},
				'.cm-gutters': {
					backgroundColor: '#045',
					color: '#ddd',
					border: 'none'
				}
			},
			{ dark: true }
		);

		let view = new EditorView({
			state,
			parent: document.getElementById('container') as HTMLDivElement,
			extensions: myTheme
		});
	});
</script>

<div class="text-2xl">hello codemirror!!</div>
<div id="container" class="p-10 rounded-2xl" />
