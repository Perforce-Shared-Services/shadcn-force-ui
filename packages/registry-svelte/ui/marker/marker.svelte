<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	export const markerVariants = tv({
		base: "cn-marker group/marker relative flex w-full items-center",
		variants: {
			variant: {
				default: "cn-marker-variant-default",
				separator: "cn-marker-variant-separator",
				border: "cn-marker-variant-border",
			},
		},
	});

	export type MarkerVariant = VariantProps<typeof markerVariants>["variant"];
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		variant = "default",
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		variant?: MarkerVariant;
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="marker"
	class={cn(markerVariants({ variant }), className)}
	{...restProps}
>
	{@render children?.()}
</div>
