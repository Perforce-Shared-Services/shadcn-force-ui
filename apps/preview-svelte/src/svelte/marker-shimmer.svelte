<script lang="ts">
	import { Marker, MarkerContent } from "@/svelte-ui/marker/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-8 py-12">
	<Marker role="status">
		<MarkerContent class="shimmer">Thinking...</MarkerContent>
	</Marker>
	<Marker variant="separator" role="status">
		<MarkerContent class="shimmer">Reading 4 files</MarkerContent>
	</Marker>
</div>
