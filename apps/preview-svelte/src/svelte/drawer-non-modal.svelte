<script lang="ts">
	import { Button, buttonVariants } from "@/svelte-ui/button/index.js";
	import * as Drawer from "@/svelte-ui/drawer/index.js";

	let open = $state(false);
</script>

<div class="flex flex-col items-start gap-4">
	<p class="text-muted-foreground text-sm">
		Non-modal drawers let you interact with the rest of the page while open —
		no overlay, no scroll lock.
	</p>
	<Button variant="outline" onclick={() => (open = !open)}>
		{open ? "Close drawer" : "Open drawer"}
	</Button>
	<Drawer.Root bind:open modal={false}>
		<Drawer.Content class="mb-0 flex flex-col rounded-t-[10px]">
			<div class="mx-auto w-full max-w-sm">
				<Drawer.Header>
					<Drawer.Title>Non-modal drawer</Drawer.Title>
					<Drawer.Description>
						The page behind stays fully interactive.
					</Drawer.Description>
				</Drawer.Header>
				<Drawer.Footer>
					<Drawer.Close class={buttonVariants({ variant: "outline" })}>
						Close
					</Drawer.Close>
				</Drawer.Footer>
			</div>
		</Drawer.Content>
	</Drawer.Root>
</div>
