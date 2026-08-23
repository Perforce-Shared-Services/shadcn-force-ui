<script lang="ts">
	import { onMount } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import {
		getMessageScrollerContext,
		getMessageScrollerController,
	} from "./context.js";

	let {
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();

	const scroller = $derived(
		getMessageScrollerContext("MessageScroller.Viewport")
	);
	const controller = getMessageScrollerController();

	let viewportEl: HTMLDivElement | null = $state(null);

	function distanceFromEdges(el: HTMLDivElement) {
		return {
			start: el.scrollTop,
			end: el.scrollHeight - el.clientHeight - el.scrollTop,
		};
	}

	function updateEdges() {
		if (!viewportEl || !controller) return;
		const { start, end } = distanceFromEdges(viewportEl);
		controller.setEdges(
			start <= scroller.scrollEdgeThreshold,
			end <= scroller.scrollEdgeThreshold
		);
	}

	function scrollTo(direction: "start" | "end") {
		if (!viewportEl) return;
		viewportEl.scrollTo({
			top: direction === "end" ? viewportEl.scrollHeight : 0,
			behavior: "smooth",
		});
	}

	function followToEnd() {
		if (!viewportEl || !scroller.autoScroll) return;
		const { end } = distanceFromEdges(viewportEl);
		// follow appends only while the user is already near the bottom
		if (end <= Math.max(scroller.scrollEdgeThreshold, 160)) {
			viewportEl.scrollTo({ top: viewportEl.scrollHeight });
		}
	}

	$effect(() => {
		controller?.registerScrollTo(scrollTo);
	});

	onMount(() => {
		if (!viewportEl) return;
		updateEdges();
		// auto-follow: react to appended items / growing content
		const observer = new MutationObserver(() => {
			requestAnimationFrame(() => {
				followToEnd();
				updateEdges();
			});
		});
		observer.observe(viewportEl, {
			childList: true,
			subtree: true,
			characterData: true,
		});
		return () => observer.disconnect();
	});
</script>

<div
	bind:this={viewportEl}
	data-slot="message-scroller-viewport"
	onscroll={updateEdges}
	class={cn(
		"cn-message-scroller-viewport size-full min-h-0 min-w-0 scroll-fade-b scrollbar-thin scrollbar-gutter-stable overflow-y-auto overscroll-contain contain-content data-autoscrolling:scrollbar-thumb-transparent data-autoscrolling:scrollbar-track-transparent",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
