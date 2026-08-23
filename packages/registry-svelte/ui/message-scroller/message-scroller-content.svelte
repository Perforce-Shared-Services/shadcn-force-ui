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
	data-slot="message-scroller-content"
	class={cn("cn-message-scroller-content flex h-max min-h-full flex-col", className)}
	{...restProps}
>
	{@render children?.()}
</div>
