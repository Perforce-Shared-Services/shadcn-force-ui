<script lang="ts">
	import CheckIcon from "~icons/ms/check";
	import {
		Bubble,
		BubbleContent,
		BubbleReactions,
	} from "@/svelte-ui/bubble/index.js";
	import { Button } from "@/svelte-ui/button/index.js";
	import * as Tooltip from "@/svelte-ui/tooltip/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-4 py-12">
	<Bubble variant="secondary">
		<BubbleContent>Did you remove the stale route?</BubbleContent>
	</Bubble>
	<Bubble align="end">
		<BubbleContent>Yes, removed it from the registry.</BubbleContent>
		<BubbleReactions>
			<Tooltip.Provider>
				<Tooltip.Root>
					<Tooltip.Trigger>
						{#snippet child({ props })}
							<Button {...props} variant="ghost" size="icon-xs">
								<CheckIcon />
							</Button>
						{/snippet}
					</Tooltip.Trigger>
					<Tooltip.Content>Read on Jan 5, 2026 at 4:32 PM</Tooltip.Content>
				</Tooltip.Root>
			</Tooltip.Provider>
		</BubbleReactions>
	</Bubble>
</div>
