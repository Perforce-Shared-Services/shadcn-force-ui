<script lang="ts">
	import {
		Marker,
		MarkerContent,
		MarkerIcon,
	} from "@/svelte-ui/marker/index.js";
	import { Spinner } from "@/svelte-ui/spinner/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-8 py-12">
	<Marker role="status">
		<MarkerIcon><Spinner /></MarkerIcon>
		<MarkerContent>Compacting conversation</MarkerContent>
	</Marker>
	<Marker variant="separator" role="status">
		<MarkerIcon><Spinner /></MarkerIcon>
		<MarkerContent>Running tests</MarkerContent>
	</Marker>
</div>
