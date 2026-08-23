<script lang="ts">
	import CheckIcon from "~icons/ms/check";
	import { tick } from "svelte";
	import * as Command from "@/svelte-ui/command/index.js";
	import * as Popover from "@/svelte-ui/popover/index.js";
	import { Button } from "@/svelte-ui/button/index.js";

	const continents = [
		"Africa",
		"Antarctica",
		"Asia",
		"Europe",
		"North America",
		"Oceania",
		"South America",
	];

	let open = $state(false);
	let value = $state("");

	const triggerId = "combobox-popup-trigger";

	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<div class="flex flex-col items-start gap-4">
	<p class="text-muted-foreground text-sm">
		Popup state is fully controlled — the toggle button drives the same <code>open</code>
		state as the combobox.
	</p>
	<div class="flex items-center gap-2">
		<Popover.Root bind:open>
			<Popover.Trigger
					id={triggerId}
				role="combobox"
				aria-expanded={open}
				class="hover:bg-accent dark:hover:bg-accent/50 flex h-9 w-[220px] items-center justify-between rounded-md border px-3 text-sm font-medium"
			>
				{value || "Browse continents..."}
			</Popover.Trigger>
			<Popover.Content class="w-[220px] p-0">
				<Command.Root>
					<Command.Input placeholder="Search continent..." class="h-9" />
					<Command.List>
						<Command.Empty>No continent found.</Command.Empty>
						<Command.Group>
							{#each continents as continent (continent)}
								<Command.Item
									value={continent}
									onSelect={() => {
										value = continent === value ? "" : continent;
										closeAndFocusTrigger();
									}}
								>
									<CheckIcon
										class={value === continent
											? "me-2 size-4"
											: "me-2 size-4 opacity-0"}
									/>
									{continent}
								</Command.Item>
							{/each}
						</Command.Group>
					</Command.List>
				</Command.Root>
			</Popover.Content>
		</Popover.Root>
		<Button variant="outline" onclick={() => (open = !open)}>
			{open ? "Close" : "Open"}
		</Button>
	</div>
</div>
