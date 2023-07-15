<script lang="ts">
  import type { PageData } from './$types.js';
  export let data: PageData
  const { title, Content} = data

</script>
<article>
  <div class="bg-slate-100 w-full h-2/3 text-6xl text-end px-10">{title}</div>
  <Content/>
</article>
