<script lang="ts">
	import FileTextIcon from "~icons/ms/description";
	import GitAccountTreeIcon from "~icons/ms/account_tree";
	import SearchIcon from "~icons/ms/search";
	import {
		Marker,
		MarkerContent,
		MarkerIcon,
	} from "@/svelte-ui/marker/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-3 py-12">
	<Marker variant="border">
		<MarkerIcon><GitAccountTreeIcon /></MarkerIcon>
		<MarkerContent>Switched to release-candidate</MarkerContent>
	</Marker>
	<Marker variant="border">
		<MarkerIcon><SearchIcon /></MarkerIcon>
		<MarkerContent>Reviewed 8 related files</MarkerContent>
	</Marker>
	<Marker variant="border">
		<MarkerIcon><FileTextIcon /></MarkerIcon>
		<MarkerContent>Opened implementation notes</MarkerContent>
	</Marker>
</div>
