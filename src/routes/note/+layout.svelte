<script>
	import { base } from '$app/paths';
	import SideNavbar from "./SideNavbar.svelte";

</script>
<div class="flex w-screen h-screen ">
  <SideNavbar {base}/>
  <slot/>
</div>
