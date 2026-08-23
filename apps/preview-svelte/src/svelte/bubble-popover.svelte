<script lang="ts">
	import InfoIcon from "~icons/ms/info";
	import {
		Bubble,
		BubbleContent,
		BubbleReactions,
	} from "@/svelte-ui/bubble/index.js";
	import { Button } from "@/svelte-ui/button/index.js";
	import * as Popover from "@/svelte-ui/popover/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-4 py-12">
	<Bubble align="end">
		<BubbleContent>Run the build script.</BubbleContent>
	</Bubble>
	<Bubble variant="destructive">
		<BubbleContent>Failed to run the command.</BubbleContent>
		<BubbleReactions>
			<Popover.Root>
				<Popover.Trigger>
					{#snippet child({ props })}
						<Button
							{...props}
							variant="ghost"
							size="icon-xs"
							aria-label="Show error details"
							class="aria-expanded:text-destructive"
						>
							<InfoIcon />
						</Button>
					{/snippet}
				</Popover.Trigger>
				<Popover.Content>
					<Popover.Header>
						<Popover.Title class="text-sm">
							Command failed with exit code 1
						</Popover.Title>
						<Popover.Description class="text-sm">
							ENOENT: no such file or directory, open pnpm-lock.yaml
						</Popover.Description>
					</Popover.Header>
				</Popover.Content>
			</Popover.Root>
		</BubbleReactions>
	</Bubble>
</div>
