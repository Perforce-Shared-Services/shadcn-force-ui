<script lang="ts">
	import { Button, buttonVariants } from "@/svelte-ui/button/index.js";
	import * as Drawer from "@/svelte-ui/drawer/index.js";

	let open = $state(false);
</script>

<Drawer.Root bind:open>
	<Drawer.Trigger class={buttonVariants({ variant: "outline" })}>
		Open drawer
	</Drawer.Trigger>
	<Drawer.Content>
		<div class="mx-auto w-full max-w-sm">
			<Drawer.Header>
				<Drawer.Title>Nested drawer</Drawer.Title>
				<Drawer.Description>
					Open another drawer on top of this one.
				</Drawer.Description>
			</Drawer.Header>
			<div class="flex justify-center py-4">
				<Drawer.NestedRoot>
					<Drawer.Trigger class={buttonVariants({ variant: "outline" })}>
						Open nested drawer
					</Drawer.Trigger>
					<Drawer.Content>
						<div class="mx-auto w-full max-w-sm">
							<Drawer.Header>
								<Drawer.Title>I'm the nested one</Drawer.Title>
								<Drawer.Description>
									Closing me returns you to the first drawer.
								</Drawer.Description>
							</Drawer.Header>
							<Drawer.Footer>
								<Drawer.Close class={buttonVariants({ variant: "outline" })}>
									Close
								</Drawer.Close>
							</Drawer.Footer>
						</div>
					</Drawer.Content>
				</Drawer.NestedRoot>
			</div>
			<Drawer.Footer>
				<Drawer.Close class={buttonVariants({ variant: "outline" })}>
					Close
				</Drawer.Close>
			</Drawer.Footer>
		</div>
	</Drawer.Content>
</Drawer.Root>
