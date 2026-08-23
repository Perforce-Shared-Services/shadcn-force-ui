<script lang="ts">
	import { onMount } from "svelte";
	import { getMessageScrollerContext } from "@/svelte-ui/message-scroller/context.js";

	let {
		position = "end",
	}: {
		/** edge to pin to once the scroller has measured its content */
		position?: "start" | "end";
	} = $props();

	const scroller = getMessageScrollerContext("OpeningPosition");

	onMount(() => {
		// wait for the viewport to measure content and register scrollTo
		requestAnimationFrame(() => requestAnimationFrame(() => scroller.scrollTo(position)));
	});
</script>

<!-- renders nothing; only sets the transcript's opening scroll position -->
