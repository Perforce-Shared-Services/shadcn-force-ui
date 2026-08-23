<script lang="ts">
	import type { ComponentProps } from "svelte";
	import { cn } from "$lib/utils.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	let {
		class: className,
		variant = "ghost",
		size = "icon-xs",
		children,
		...restProps
	}: Omit<ComponentProps<typeof Button>, "size"> & {
		size?: ComponentProps<typeof Button>["size"];
	} = $props();
</script>

<Button
	data-slot="attachment-action"
	{variant}
	{size}
	class={cn("cn-attachment-action", className)}
	{...restProps}
>
	{@render children?.()}
</Button>
