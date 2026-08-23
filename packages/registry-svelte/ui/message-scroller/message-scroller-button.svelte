<script lang="ts">
	import { cn } from "$lib/utils.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button, type ButtonVariant, type ButtonSize } from "$lib/registry/ui/button/index.js";
	import { getMessageScrollerContext } from "./context.js";

	let {
		class: className,
		direction = "end",
		variant = "secondary",
		size = "icon-sm",
		children,
		...restProps
	}: {
		class?: string;
		direction?: "start" | "end";
		variant?: ButtonVariant;
		size?: ButtonSize;
		children?: import("svelte").Snippet;
	} & Record<string, unknown> = $props();

	const scroller = $derived(
		getMessageScrollerContext("MessageScroller.Button")
	);

	const active = $derived(direction === "end" ? !scroller.atEnd : !scroller.atStart);
</script>

<div
	data-slot="message-scroller-button"
	data-direction={direction}
	data-active={active}
	class={cn(
		"cn-message-scroller-button absolute inset-s-1/2 -translate-x-1/2 border-border bg-background text-foreground transition-[translate,scale,opacity] duration-200 hover:bg-muted hover:text-foreground data-[active=false]:pointer-events-none data-[active=false]:scale-95 data-[active=false]:opacity-0 data-[active=false]:duration-400 data-[active=false]:ease-[cubic-bezier(0.7,0,0.84,0)] data-[active=true]:translate-y-0 data-[active=true]:scale-100 data-[active=true]:opacity-100 data-[active=true]:ease-[cubic-bezier(0.23,1,0.32,1)] data-[direction=end]:bottom-4 data-[direction=end]:data-[active=false]:translate-y-full data-[direction=start]:top-4 data-[direction=start]:data-[active=false]:-translate-y-full rtl:translate-x-1/2 data-[direction=start]:[&_svg]:rotate-180",
		className
	)}
>
	<Button {variant} {size} onclick={() => scroller.scrollTo(direction)} {...restProps}>
		{#if children}
			{@render children()}
		{:else}
			<IconPlaceholder
				lucide="ArrowDownIcon"
				tabler="IconArrowDown"
				hugeicons="ArrowDown02Icon"
				phosphor="ArrowDownIcon"
				remixicon="RiArrowDownLine"
			/>
			<span class="sr-only">
				{direction === "end" ? "Scroll to end" : "Scroll to start"}
			</span>
		{/if}
	</Button>
</div>
