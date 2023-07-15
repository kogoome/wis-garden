<script lang="ts">
  import type { PageData } from './$types.js';
  import './md.css'

  export let data: PageData
  const { title, Content} = data

</script>

<article class="bg-black w-screen h-screen overflow-y-scroll px-10">
  <div class="bg-black w-full h-[80vh] text-7xl text-end flex flex-col justify-center">
    <div class="text-gradient font-bold text-white">
    {title}
    </div>
  </div>
  <div class="text-slate-200 ">
    <Content/>
  </div>

</article>


<style>
  @keyframes shine {
    to {
      background-position: 200% center;
    }
  }
  .text-gradient {
    background: linear-gradient(
      to right, 
      #6366F1,
      #34A6E4,
      #36B981,
      #6366F1
      );
    background-size: 400% auto;
    
    color: #000;
    background-clip: text;
    /* text-fill-color: transparent; */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    
    animation: shine 8s linear infinite;
  }
</style>
