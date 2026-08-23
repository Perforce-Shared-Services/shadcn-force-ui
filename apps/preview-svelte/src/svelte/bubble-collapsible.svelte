<script lang="ts">
	import {
		Bubble,
		BubbleContent,
	} from "@/svelte-ui/bubble/index.js";
	import { buttonVariants } from "@/svelte-ui/button/index.js";
	import * as Collapsible from "@/svelte-ui/collapsible/index.js";
	import ChevronDownIcon from "~icons/ms/keyboard_arrow_down";

	const text = `The accessibility review found two focus states that were visually too subtle in dark mode.

I checked the dialog, menu, and drawer paths because each one renders focusable controls inside a layered surface.

The dialog and drawer are fine. The menu needs the hover and focus tokens split so keyboard focus stays visible when the pointer is not involved.

I also recommend keeping the change in the style file instead of the primitive so the other themes can choose their own focus treatment later.`;

	const previewLength = 180;
	const isLong = text.length > previewLength;
	const preview = `${text.slice(0, previewLength)}...`;

	let open = $state(false);
</script>

<div class="flex w-full max-w-sm flex-col gap-8 py-12">
	<Bubble variant="muted">
		<BubbleContent>How can I help you today?</BubbleContent>
	</Bubble>

	<Bubble variant="muted" align="end">
		<BubbleContent class="whitespace-pre-line">
			<Collapsible.Root bind:open>
				<div>{open || !isLong ? text : preview}</div>
				{#if isLong}
					<Collapsible.Trigger class={buttonVariants({ variant: "link", class: "gap-1 p-0 text-muted-foreground" })}>
						{open ? "Show less" : "Show more"}
						<ChevronDownIcon
							data-icon="inline-end"
							class={open ? "rotate-180" : ""}
						/>
					</Collapsible.Trigger>
				{/if}
			</Collapsible.Root>
		</BubbleContent>
	</Bubble>
</div>
