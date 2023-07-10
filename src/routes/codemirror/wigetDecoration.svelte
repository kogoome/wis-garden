<script lang="ts">
	import {
		EditorView,
		keymap,
		Decoration,
		ViewUpdate,
		WidgetType,
		ViewPlugin,
		type DecorationSet
	} from '@codemirror/view';
	import { onMount } from 'svelte';
	import { EditorState, Compartment, StateField, StateEffect, Range } from '@codemirror/state';
	import { defaultKeymap, indentWithTab } from '@codemirror/commands';
	import { syntaxTree } from '@codemirror/language';
	import { javascript } from '@codemirror/lang-javascript';

	onMount(() => {
		let tabSize = new Compartment();
		let language = new Compartment();

		function toggleBoolean(view: EditorView, pos: number) {
			let before = view.state.doc.sliceString(Math.max(0, pos - 5), pos);
			let change;
			if (before == 'false') change = { from: pos - 5, to: pos, insert: 'true' };
			else if (before.endsWith('true')) change = { from: pos - 4, to: pos, insert: 'false' };
			else return false;
			view.dispatch({ changes: change });
			return true;
		}

		const checkboxPlugin = ViewPlugin.fromClass(
			class {
				decorations: DecorationSet;

				constructor(view: EditorView) {
					this.decorations = checkboxes(view);
				}

				update(update: ViewUpdate) {
					if (update.docChanged || update.viewportChanged)
						this.decorations = checkboxes(update.view);
				}
			},
			{
				decorations: (v) => v.decorations,

				eventHandlers: {
					mousedown: (e, view) => {
						let target = e.target as HTMLElement;
						if (
							target.nodeName == 'INPUT' &&
							target.parentElement!.classList.contains('cm-boolean-toggle')
						)
							return toggleBoolean(view, view.posAtDOM(target));
					}
				}
			}
		);
		function checkboxes(view: EditorView) {
			let widgets: Range<Decoration>[] = [];
			for (let { from, to } of view.visibleRanges) {
				syntaxTree(view.state).iterate({
					from,
					to,
					enter: (node) => {
						if (node.name == 'BooleanLiteral') {
							let isTrue = view.state.doc.sliceString(node.from, node.to) == 'true';
							let deco = Decoration.widget({
								widget: new CheckboxWidget(isTrue),
								side: 1
							});
							widgets.push(deco.range(node.to));
						}
					}
				});
			}
			return Decoration.set(widgets);
		}

		class CheckboxWidget extends WidgetType {
			constructor(readonly checked: boolean) {
				super();
			}

			eq(other: CheckboxWidget) {
				return other.checked == this.checked;
			}

			toDOM() {
				let wrap = document.createElement('span');
				wrap.setAttribute('aria-hidden', 'true');
				wrap.className = 'cm-boolean-toggle';
				let box = wrap.appendChild(document.createElement('input'));
				box.type = 'checkbox';
				box.checked = this.checked;
				return wrap;
			}

			ignoreEvent() {
				return false;
			}
		}

		const doc = `if (true) {
  console.log("okay")
} else {
  console.log("oh no")
}
`;

		let state = EditorState.create({
			doc,
			extensions: [
				tabSize.of(EditorState.tabSize.of(2)),
				keymap.of(defaultKeymap),
				keymap.of([indentWithTab]),
				language.of(javascript())
			]
		});

		let view = new EditorView({
			state,
			parent: document.getElementById('container') as HTMLDivElement
		});
		view.plugin(checkboxPlugin);
	});
</script>

<div id="container" class="p-10 rounded-2xl" />
