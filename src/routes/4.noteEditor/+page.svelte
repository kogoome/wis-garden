<script lang="ts">
	import { texEditorOpen, blockInputOpen } from './note_store';
	import LeftMenuSide from './LeftMenuSide.svelte';
  import EditorLayout from './editor/_EditorLayout.svelte';
  import NoteBlockInput from './editor/editorFeature/NoteBlockInput.svelte';
  import TexEditor from './editor/editorFeature/TexEditor.svelte';

  import { underline } from '../store.js'
	import { onMount } from 'svelte'

	onMount(() => { underline(3) })

  // LeftMenuSide functions
	// import { fly } from 'svelte/transition';
  // import { angleLeft, menuBurger } from '$lib/frontend/assets/icons.js'
  // import { pageLoadData, libAccordion, noteAccordion } from './note_store.js'

  // editor dnd layout functions 
  import { layout, verticalInjection, horizonInjection, fullInjection, verticalToggle, horizonToggle, fullToggle, leftHold } from './Layout.js'

</script>

<div class="w-full h-full relative flex gap-1 overflow-y-scroll rounded-xl bg-gray-50 ">
  <LeftMenuSide/>
  <EditorLayout/>

  <!-- 플로팅 돔 -->
  {#if $blockInputOpen}
    <NoteBlockInput />
  {/if}
  {#if $texEditorOpen}
    <TexEditor />
  {/if}


</div>
