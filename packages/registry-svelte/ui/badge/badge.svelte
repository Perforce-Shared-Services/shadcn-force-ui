<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	export const badgeVariants = tv({
		base: "cn-badge focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive group/badge inline-flex w-fit shrink-0 items-center justify-center overflow-hidden whitespace-nowrap transition-colors focus-visible:ring-[3px] [&>svg]:pointer-events-none",
		variants: {
			variant: {
				default: "cn-badge-variant-default",
				secondary: "cn-badge-variant-secondary",
				destructive: "cn-badge-variant-destructive",
				warning: "cn-badge-variant-warning",
				success: "cn-badge-variant-success",
				info: "cn-badge-variant-info",
				"success-solid": "cn-badge-variant-success-solid",
				"warning-solid": "cn-badge-variant-warning-solid",
				"info-solid": "cn-badge-variant-info-solid",
				"error-solid": "cn-badge-variant-error-solid",
				outline: "cn-badge-variant-outline",
				ghost: "cn-badge-variant-ghost",
				link: "cn-badge-variant-link",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});

	export type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];
</script>

<script lang="ts">
	import type { HTMLAnchorAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		href,
		class: className,
		variant = "default",
		srLabel,
		children,
		...restProps
	}: WithElementRef<HTMLAnchorAttributes> & {
		variant?: BadgeVariant;
		/**
		 * [FORCE-UI] Visually-hidden text prefix announced before the badge's
		 * content. Status is otherwise conveyed only through color, which a
		 * screen reader can't perceive — set this on count- or glyph-only
		 * badges (e.g. `srLabel="Synced versions:"` on a bare "42").
		 */
		srLabel?: string;
	} = $props();
</script>

<svelte:element
	this={href ? "a" : "span"}
	bind:this={ref}
	data-slot="badge"
	{href}
	class={cn(badgeVariants({ variant }), className)}
	{...restProps}
>
	{#if !href && srLabel}<span class="sr-only">{srLabel}&nbsp;</span>{/if}
	{@render children?.()}
</svelte:element>
