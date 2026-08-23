<script lang="ts">
	import GitBranchIcon from "~icons/ms/account_tree";
	import SearchIcon from "~icons/ms/search";
	import {
		Marker,
		MarkerContent,
		MarkerIcon,
	} from "@/svelte-ui/marker/index.js";
	import { Spinner } from "@/svelte-ui/spinner/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-8 py-12">
	<Marker>
		<MarkerIcon><GitBranchIcon /></MarkerIcon>
		<MarkerContent>Switched to a new branch</MarkerContent>
	</Marker>
	<Marker role="status">
		<MarkerIcon><Spinner /></MarkerIcon>
		<MarkerContent class="shimmer">Thinking...</MarkerContent>
	</Marker>
	<Marker variant="separator">
		<MarkerContent>Conversation compacted</MarkerContent>
	</Marker>
	<Marker>
		<MarkerIcon><SearchIcon /></MarkerIcon>
		<MarkerContent>Explored 4 files</MarkerContent>
	</Marker>
</div>
