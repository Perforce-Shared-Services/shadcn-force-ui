<script lang="ts">
	import CheckIcon from "~icons/ms/check";
	import ChevronsUpDownIcon from "~icons/ms/unfold_more";
	import { tick } from "svelte";
	import * as Command from "@/svelte-ui/command/index.js";
	import * as Popover from "@/svelte-ui/popover/index.js";
	import { Button, buttonVariants } from "@/svelte-ui/button/index.js";
	import { cn } from "@/svelte-lib/utils.js";

	const statusGroups = [
		{
			heading: "Open",
			items: [
				{ value: "backlog", label: "Backlog" },
				{ value: "todo", label: "Todo" },
				{ value: "in-progress", label: "In Progress" },
			],
		},
		{
			heading: "Closed",
			items: [
				{ value: "done", label: "Done" },
				{ value: "canceled", label: "Canceled" },
				{ value: "duplicate", label: "Duplicate" },
			],
		},
	];

	let open = $state(false);
	let value = $state("");

	const selectedLabel = $derived(
		statusGroups.flatMap((g) => g.items).find((i) => i.value === value)?.label
	);

	const triggerId = "combobox-groups-trigger";

	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<Popover.Root bind:open>
	<Popover.Trigger
		id={triggerId}
		role="combobox"
		aria-expanded={open}
		class={cn(
			buttonVariants({ variant: "outline" }),
			"w-[200px] justify-between",
			!value && "text-muted-foreground"
		)}
	>
		{selectedLabel || "Select status..."}
		<ChevronsUpDownIcon class="ms-2 size-4 opacity-50" />
	</Popover.Trigger>
	<Popover.Content class="w-[200px] p-0">
		<Command.Root>
			<Command.Input placeholder="Search status..." class="h-9" />
			<Command.List>
				<Command.Empty>No status found.</Command.Empty>
				{#each statusGroups as group (group.heading)}
					<Command.Group heading={group.heading}>
						{#each group.items as item (item.value)}
							<Command.Item
								value={item.value}
								onSelect={() => {
									value = item.value === value ? "" : item.value;
									closeAndFocusTrigger();
								}}
							>
								<CheckIcon
									class={cn("me-2 size-4", value !== item.value && "opacity-0")}
								/>
								{item.label}
							</Command.Item>
						{/each}
					</Command.Group>
				{/each}
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
