<script lang="ts">
  import { fly } from 'svelte/transition';
  import { layout, leftHold } from './Layout.js'
  import { angleLeft, menuBurger } from '$lib/frontend/assets/icons.js'
  import { pageLoadData, libAccordion, noteAccordion, bookmarkAccordion, type Content } from './note_store.js'
  import { libView, note1, note2, lib_OpenActive, note1_OpenActive, note2_OpenActive, bookmark, bookmark_OpenActive } from './editor/text.js'

  function openLibraryContent(content:Content) {
    if($lib_OpenActive) $libView = content
  }
  function openNoteContent(content:Content) {
    if($note1_OpenActive) $note1 = content
    if($note2_OpenActive && $layout.display !== 'full') $note2 = content
  }
  function lib_OpenActiveToggle() {
    $lib_OpenActive = !$lib_OpenActive
  }
  function note1_OpenActiveToggle() {
    $note1_OpenActive = !$note1_OpenActive
  }
  function note2_OpenActiveToggle() {
    $note2_OpenActive = !$note2_OpenActive
  }
  function addNote() {
    $note1_OpenActive = false
    $note1 = {
			id: 0,
			title: '',
			content: '',
			use: 'note'
		}
    const title = document.querySelector('.sknowTitle') as HTMLDivElement
    // console.log(title);
    title.focus()
  }


  const bookmarks = [
    {name:"wiki", url:"https://ko.wikipedia.org/wiki/%EC%9C%84%EC%83%81%EC%88%98%ED%95%99"},
    {name:"blog", url:"https://blog.naver.com/jooyeon926"},
    {name:"kpi1", url:"https://www.onmd.net/mdhow/?q=YToyOntzOjEyOiJrZXl3b3JkX3R5cGUiO3M6MzoiYWxsIjtzOjQ6InBhZ2UiO2k6Mjt9&bmode=view&idx=9443047&t=board&category=68108kI173"},
    {name:"kpi2", url:"https://easytoread.tistory.com/entry/KPI-%EC%9E%91%EC%84%B1-%EC%9E%91%EC%84%B1-%EC%98%88%EC%8B%9C-%ED%95%B5%EC%8B%AC-%EC%84%B1%EA%B3%BC-%EC%A7%80%ED%91%9C"},
  ]
  function openBookmark(bmark:{name:string, url:string}) {
    if($bookmark_OpenActive) $bookmark = bmark
  }
  function bookmark_OpenActiveToggle() {
    $bookmark_OpenActive = !$bookmark_OpenActive
  }
</script>

{#if $layout.leftMenu || $layout.leftMenuHolder}
  <div id="sideMenu" class="w-1/5 h-full bg-gray-100 flex flex-col gap-1" in:fly="{{x:-200, delay:200, duration:200}}" out:fly={{x:-200, duration:200}} on:mouseleave="{()=>{$layout.leftMenu = false}}">

    <!-- 사이드바 고정버튼 -->
    <div class="w-full h-12  bg-white bg-opacity-20 items-center text-right p-1"> 
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="btn btn-sm btn-ghost h-10 w-10 text-2xl text-white" on:click="{leftHold}">
        {#if $layout.leftMenuHolder}
        <img src={angleLeft} alt="angleLeft">
        {:else}
        <img src={menuBurger} alt="menuBurger">
        {/if}
      </div>
    </div>


    <div class="w-full h-full px-2 overflow-y-scroll flex flex-col ">
      <input
        type="text"
        class="z-10 input input-ghost focus:outline-none hover:ring ring-[rgb(205,231,213)] outline-none focus:ring focus:ring-[rgb(179,220,192)] bg-white mt-1"
        placeholder="search"
      />
      <div class="w-full h-fit flex flex-col ">

        <!-- 사이드바 메뉴 : 라이브러리 -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class="z-10 w-full h-12 hover:bg-[rgb(235,236,240)] {$libAccordion
            ? 'bg-[rgb(235,236,240)] shadow-md'
            : ''} hover:shadow-md duration-500 rounded-md h-12 leading-[3rem] px-4 transition-all select-none mt-1"
          on:click={() => {
            $libAccordion = !$libAccordion
          }}
        >
          # 라이브러리
        </div>
        {#if $libAccordion}
          <div
            class="bg-gray-50 shadow-inner w-full h-fit rounded-b-lg -trangray-y-1 py-1 "
            transition:fly={{ y: -50 }}
          >
            {#each $pageLoadData.library as libContent, i}
              <div
                class="select-none hover:text-red-400 px-4 transition-all  {$libView.title === libContent.title
								? 'text-amber-500 bg-amber-100 px-1'
								: 'text-gray-400'}"
                on:mouseenter="{()=>{openLibraryContent(libContent)}}"
                on:mouseup="{lib_OpenActiveToggle}"
              >
                {libContent.title}
              </div>
            {/each}
          </div>
        {/if}
      </div>
      <!-- 사이드바 메뉴 : 노트 -->
      <div class="w-full h-fit flex flex-col ">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class="z-10 w-full h-12 hover:bg-[rgb(235,236,240)] {$noteAccordion
            ? 'bg-[rgb(235,236,240)] shadow-md'
            : ''} hover:shadow-md duration-500 rounded-md h-12 leading-[3rem] px-4 transition-all select-none mt-1 flex justify-between items-center"
          on:click={() => {
            $noteAccordion = !$noteAccordion
          }}
        >
          <div># 마이노트</div>
          {#if $noteAccordion}
            <button
              class="btn btn-ghost btn-sm text-gray-400 transition-all "
              on:click|stopPropagation={addNote}>+</button
            >
          {/if}
        </div>
        {#if $noteAccordion}
          <div
            class="bg-gray-50 shadow-inner w-full h-fit rounded-b-lg -trangray-y-1 py-1 "
            transition:fly={{ y: -50 }}
          >
            {#each $pageLoadData.note as noteContent, i}
              <div
                class="select-none hover:text-red-400 px-4 transition-all  {$note1.title === noteContent.title
								? 'text-[rgb(92,127,103)] bg-[rgb(229,255,236)] px-1'
								: 'text-gray-400'} {$note2.title === noteContent.title
								? 'text-sky-600 bg-sky-100 px-1'
								: 'text-gray-400'}"
                on:mouseenter="{()=>{openNoteContent(noteContent)}}"
                on:mouseup="{note1_OpenActiveToggle}"
                on:dblclick="{note2_OpenActiveToggle}"
              >
                {noteContent.title}
              </div>
            {/each}
          </div>
        {/if}
      </div>
      <!-- 사이드바 메뉴 : 북마크 -->
      <div class="w-full h-fit flex flex-col ">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class="z-10 w-full h-12 hover:bg-[rgb(235,236,240)] {$bookmarkAccordion
            ? 'bg-[rgb(235,236,240)] shadow-md'
            : ''} hover:shadow-md duration-500 rounded-md h-12 leading-[3rem] px-4 transition-all select-none mt-1 flex justify-between items-center"
          on:click={() => {
            $bookmarkAccordion = !$bookmarkAccordion
          }}
        >
          <div># 북마크</div>
        </div>
        {#if $bookmarkAccordion}
          <div
            class="bg-gray-50 shadow-inner w-full h-fit rounded-b-lg -trangray-y-1 py-1 "
            transition:fly={{ y: -50 }}
          >
            {#each bookmarks as bmark, i}
              <div
                class="select-none hover:text-red-400 px-4 transition-all  {$bookmark.url === bmark.url
								? 'text-[rgb(92,127,103)] bg-[rgb(229,255,236)] px-1'
								: 'text-gray-400'}" 
                on:mouseenter="{()=>{openBookmark(bmark)}}"
                on:mouseup="{bookmark_OpenActiveToggle}"
              >
                {bmark.name}
              </div>
            {/each}
          </div>
        {/if}
      </div>







    </div>
  </div>
{:else}
  <!-- svelte-ignore a11y-mouse-events-have-key-events -->
  <div class="absolute z-20 top-0 left-0 w-5 h-full " on:mouseover="{()=>{$layout.leftMenu=true}}" />
{/if}

<style>
  .shadow-inner {
    box-shadow: inset -4px -4px 12px rgba(255, 255, 255, 1), 
           inset 3px 0px 9px rgba(70, 70, 70, 0.12);
  }

</style>