<script lang="ts">
	import { base } from '$app/paths';
	import SideNavbar from "./SideNavbar.svelte";

</script>
<div class="w-screen h-screen flex">
  <SideNavbar {base}/>
  <slot/>
</div>

