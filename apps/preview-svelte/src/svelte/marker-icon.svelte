<script lang="ts">
	import BookOpenCheckIcon from "~icons/ms/menu_book";
	import GitBranchIcon from "~icons/ms/account_tree";
	import SearchIcon from "~icons/ms/search";
	import {
		Marker,
		MarkerContent,
		MarkerIcon,
	} from "@/svelte-ui/marker/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-12 py-12">
	<Marker>
		<MarkerIcon><GitBranchIcon /></MarkerIcon>
		<MarkerContent>Switched to a new branch</MarkerContent>
	</Marker>
	<Marker variant="separator">
		<MarkerIcon><SearchIcon /></MarkerIcon>
		<MarkerContent>Explored 4 files</MarkerContent>
	</Marker>
	<Marker class="flex-col">
		<MarkerIcon><BookOpenCheckIcon /></MarkerIcon>
		<MarkerContent>Syncing completed</MarkerContent>
	</Marker>
</div>
