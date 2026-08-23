<script lang="ts">
	import GitBranchIcon from "~icons/ms/account_tree";
	import {
		Marker,
		MarkerContent,
		MarkerIcon,
	} from "$lib/registry/ui/marker/index.js";
	import { Spinner } from "$lib/registry/ui/spinner/index.js";
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
</div>
