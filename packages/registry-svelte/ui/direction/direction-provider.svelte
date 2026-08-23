<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import { Direction, setDirectionContext } from "./context.js";

	let {
		ref = $bindable(null),
		class: className,
		direction = "ltr",
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		direction?: Direction;
	} = $props();

	setDirectionContext(() => direction);
</script>

<!-- [FORCE-UI] bits-ui has no DirectionProvider primitive, so this port wraps
     children in a display:contents div carrying the dir attribute — that keeps
     both useDirection() and the rtl:/ltr: Tailwind variants working. Upgrade
     path: switch to a native provider if bits-ui ships one. -->
<div
	bind:this={ref}
	data-slot="direction-provider"
	dir={direction}
	class={cn("contents", className)}
	{...restProps}
>
	{@render children?.()}
</div>
