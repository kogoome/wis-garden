<script lang="ts">
  import type { PageData } from './$types.js';
  export let data: PageData


</script>

<div>{data.title}</div>
<div>
  hello world
</div>
<div>
  {data.content}
</div>
