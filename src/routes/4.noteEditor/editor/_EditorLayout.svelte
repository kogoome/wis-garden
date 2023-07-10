<script lang="ts">
  import { layout, verticalInjection, horizonInjection, fullInjection, verticalToggle, horizonToggle, fullToggle } from '../Layout.js'
  import { libAccordion, noteAccordion, bookmarkAccordion } from '../note_store.js'
  import { libView, note1, note2, bookmark } from './text.js'
  import LibraryView from './LibraryView.svelte';
  import NoteEditor from './NoteEditor.svelte';
  import { fly } from 'svelte/transition'
</script>

<div class="w-full h-full flex relative">

	{#if $bookmarkAccordion}
		<div class="absolute top-0 left-0 z-0 overflow-scroll w-full h-full p-5 rounded-lg" in:fly="{{x:100, duration:200, delay:200}}" out:fly="{{y:-100, duration:200}}">
			<iframe src={$bookmark.url} title={$bookmark.name} frameborder="0" class="w-full rounded-lg {$noteAccordion? 'h-1/2':'h-full'}" sandbox=""></iframe>
		</div>
	{/if}
  <!-- editor zone -->
  <div class="absolute z-10 p-4 flex flex-col gap-2 {$bookmarkAccordion? 'h-1/2 w-full top-1/2 left-0':'top-0 left-0 h-full w-full'} {$noteAccordion? '':'pointer-events' }" >
    <!-- 라이브러리 뷰 -->
    {#if $libAccordion}
	  	<LibraryView note={$libView}/>
    {/if}
		
		<!-- 노트 에디터 -->
    {#if $noteAccordion}
	    <div class="w-full h-full relative rounded-lg p-1 overflow-hidden" in:fly={{ y: 100, delay:200, duration:200}} out:fly={{y: 100, duration:200}}>
	      {#if $layout.display==='full'}
	        <div class="full w-full h-full bg-white hover:ring ring-[rgb(205,231,213)] rounded-lg relative overflow-hidden" in:fly="{{y:100, x:100, delay:300, duration:200 }}" out:fly="{{y:100, duration:200}}">
	          <NoteEditor note={$note1} editorPosition="full"/>
	        </div>
	      {:else if $layout.display === 'vertical'}
	        <div class="vertical w-full h-full flex gap-4">
	          <div class="bg-white backdrop-blur-sm w-full h-full rounded-lg hover:ring ring-[rgb(205,231,213)] relative" in:fly="{{y:-100, delay:300, duration:200}}" out:fly="{{y:-100, duration:200}}">
	            <NoteEditor note={$note1} editorPosition="left"/>
	          </div>
	          <div class="bg-white backdrop-blur-sm w-full h-full rounded-lg hover:ring ring-[rgb(205,231,213)] relative" in:fly="{{y:100, delay:300, duration:200}}" out:fly="{{y:100, duration:200}}">
	            <NoteEditor note={$note2} editorPosition="right"/>
	          </div>
	        </div>
	      {:else if $layout.display==='horizon'}
	        <div class="horizon w-full h-full flex flex-col gap-4 ">
	          <div class=" basis-1/2 bg-white backdrop-blur-sm w-full max-h-full rounded-lg hover:ring ring-[rgb(205,231,213)] relative overflow-hidden" in:fly="{{x:-100, delay:300, duration:200}}" out:fly="{{x:-100, duration:200}}">
	            <NoteEditor note={$note1} editorPosition="up"/>
	          </div>
	          <div class="basis-1/2 bg-white backdrop-blur-sm w-full max-h-full rounded-lg hover:ring ring-[rgb(205,231,213)] relative overflow-hidden" in:fly="{{x:100, delay:300, duration:200}}" out:fly="{{x:100, duration:200}}">
	            <NoteEditor note={$note2} editorPosition="down"/>
	          </div>
	        </div>
	      {/if}
	
	
	      <!-- top screen option button -->
	      <div class="absolute top-2 right-2 z-10 flex gap-3">
	        <!-- svelte-ignore a11y-click-events-have-key-events -->
	        <div class="bg-white rounded-3xl p-1 px-2 grayscale border-2 border-gray-300 text-sm text-gray-400 font-bold font-sans hover:grayscale-0 hover:text-gray-600 hover:border-[rgb(179,220,192)] transition-all" on:click="{fullToggle}">full</div>
	        <!-- svelte-ignore a11y-click-events-have-key-events -->
	        <div class="bg-white rounded-3xl p-1 px-2 grayscale border-2 border-gray-300 text-sm text-gray-400 font-bold font-sans hover:grayscale-0 hover:text-gray-600 hover:border-[rgb(179,220,192)] transition-all" on:click="{verticalToggle}">vertical</div>
	        <!-- svelte-ignore a11y-click-events-have-key-events -->
	        <div class="bg-white rounded-3xl p-1 px-2 grayscale border-2 border-gray-300 text-sm text-gray-400 font-bold font-sans hover:grayscale-0 hover:text-gray-600 hover:border-[rgb(179,220,192)] transition-all" on:click="{horizonToggle}">horizon</div>
	      </div>
	
	      <!-- hover zone -->
	      {#if $layout.fileDrag}
	        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
	        <div class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-1/2 h-1/2 z-20" on:mouseover="{fullInjection}"></div>
	        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
	        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-28 z-20" on:mouseover="{horizonInjection}"></div>
	        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
	        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-28 z-20" on:mouseover="{horizonInjection}"></div>
	        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
	        <div class="absolute top-1/2 left-0 -translate-y-1/2 h-1/2 w-28 z-20" on:mouseover="{verticalInjection}"></div>
	        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
	        <div class="absolute top-1/2 right-0 -translate-y-1/2 h-1/2 w-28 z-20" on:mouseover="{verticalInjection}"></div>
	      {/if}  
	    </div>
    {/if}

		
  </div>
</div>

<style>
	.pointer-events {
		pointer-events: none;
	}
</style>