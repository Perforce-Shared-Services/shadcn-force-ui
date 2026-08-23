<script lang="ts">
	import { toast } from "svelte-sonner";
	import GitBranchIcon from "~icons/ms/account_tree";
	import RevertIcon from "~icons/ms/restart_alt";
	import {
		Marker,
		MarkerContent,
		MarkerIcon,
	} from "@/svelte-ui/marker/index.js";

	// [FORCE-UI] React's marker uses a `render` prop to swap the root element;
	// the Svelte port composes an anchor/button around the Marker instead.
</script>

<div class="flex w-full max-w-sm flex-col gap-8 py-12">
	<a href="#links-and-buttons" class="w-fit">
		<Marker>
			<MarkerIcon><GitBranchIcon /></MarkerIcon>
			<MarkerContent>View the pull request</MarkerContent>
		</Marker>
	</a>
	<button
		type="button"
		class="w-fit cursor-pointer transition-colors hover:text-foreground"
		onclick={() => toast("You clicked the revert button")}
	>
		<Marker>
			<MarkerIcon><RevertIcon /></MarkerIcon>
			<MarkerContent>Revert this change</MarkerContent>
		</Marker>
	</button>
</div>
