<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		type = "button",
		children,
		...restProps
	}: WithElementRef<HTMLButtonAttributes> = $props();
</script>

<!-- [FORCE-UI] absolute overlay trigger covering the whole attachment; React
     version supports a `render` prop for custom elements — pass an anchor via
     the default slot composition instead when a link target is needed. -->
<button
	bind:this={ref}
	data-slot="attachment-trigger"
	{type}
	class={cn("cn-attachment-trigger absolute inset-0 z-10 outline-none", className)}
	{...restProps}
>
	{@render children?.()}
</button>
