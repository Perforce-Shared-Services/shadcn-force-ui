<script lang="ts">
	import { Button, buttonVariants } from "@/svelte-ui/button/index.js";
	import * as Drawer from "@/svelte-ui/drawer/index.js";

	const snapPoints = [0.35, 0.65, 1];
	let activeSnapPoint = $state<number | string | null>(snapPoints[0]);
</script>

<div class="flex flex-col items-center gap-4">
	<p class="text-muted-foreground text-sm text-center max-w-sm">
		Drag the drawer between snap points. Currently snapped to{" "}
		{Math.round((Number(activeSnapPoint) || 0) * 100)}% of the screen.
	</p>
	<Drawer.Root bind:activeSnapPoint snapPoints={snapPoints} fadeFromIndex={snapPoints.length - 1}>
		<Drawer.Trigger class={buttonVariants({ variant: "outline" })}>
			Open drawer with snap points
		</Drawer.Trigger>
		<Drawer.Content>
			<div class="mx-auto flex w-full max-w-sm flex-col items-center gap-1 pb-4">
				<Drawer.Header class="items-center">
					<Drawer.Title>Snap points</Drawer.Title>
					<Drawer.Description>Drag up and down to switch.</Drawer.Description>
				</Drawer.Header>
				<div class="flex gap-2 py-4">
					{#each snapPoints as point, i (i)}
						<Button
							variant="outline"
							size="sm"
							onclick={() => (activeSnapPoint = point)}
						>
							{Math.round(point * 100)}%
						</Button>
					{/each}
				</div>
				<Drawer.Footer class="w-full">
					<Drawer.Close class={buttonVariants({ variant: "outline" })}>
						Close
					</Drawer.Close>
				</Drawer.Footer>
			</div>
		</Drawer.Content>
	</Drawer.Root>
</div>
