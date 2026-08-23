<script lang="ts">
	import type { Snippet } from "svelte";
	import {
		setMessageScrollerContext,
		setMessageScrollerController,
		type MessageScrollerState,
		type MessageScrollerProviderProps,
	} from "./context.js";

	let {
		autoScroll = true,
		scrollEdgeThreshold = 80,
		children,
	}: MessageScrollerProviderProps & { children?: Snippet } = $props();

	let atStart = $state(false);
	let atEnd = $state(false);
	let viewportScrollTo: (direction: "start" | "end") => void = () => {};

	setMessageScrollerController({
		setEdges(start: boolean, end: boolean) {
			atStart = start;
			atEnd = end;
		},
		registerScrollTo(fn: (direction: "start" | "end") => void) {
			viewportScrollTo = fn;
		},
	});

	const scrollerState: MessageScrollerState = {
		get autoScroll() {
			return autoScroll;
		},
		get scrollEdgeThreshold() {
			return scrollEdgeThreshold;
		},
		get atStart() {
			return atStart;
		},
		get atEnd() {
			return atEnd;
		},
		scrollTo: (direction) => viewportScrollTo(direction),
	};

	setMessageScrollerContext(scrollerState);
</script>

{@render children?.()}
