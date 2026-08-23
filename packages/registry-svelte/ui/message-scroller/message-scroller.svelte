<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="message-scroller"
	class={cn(
		"cn-message-scroller group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
