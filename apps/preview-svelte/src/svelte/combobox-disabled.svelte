<script lang="ts">
	import CheckIcon from "~icons/ms/check";
	import ChevronsUpDownIcon from "~icons/ms/unfold_more";
	import { tick } from "svelte";
	import * as Command from "@/svelte-ui/command/index.js";
	import * as Popover from "@/svelte-ui/popover/index.js";
	import { Button, buttonVariants } from "@/svelte-ui/button/index.js";
	import { cn } from "@/svelte-lib/utils.js";

	const users = [
		{ value: "ada", label: "Ada Lovelace", available: true },
		{ value: "grace", label: "Grace Hopper", available: false },
		{ value: "alan", label: "Alan Turing", available: true },
		{ value: "katherine", label: "Katherine Johnson", available: false },
		{ value: "margaret", label: "Margaret Hamilton", available: true },
	];

	let open = $state(false);
	let value = $state("");

	const selectedLabel = $derived(users.find((u) => u.value === value)?.label);

	const triggerId = "combobox-disabled-trigger";

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
			"w-[220px] justify-between",
			!value && "text-muted-foreground"
		)}
	>
		{selectedLabel || "Assign to..."}
		<ChevronsUpDownIcon class="ms-2 size-4 opacity-50" />
	</Popover.Trigger>
	<Popover.Content class="w-[220px] p-0">
		<Command.Root>
			<Command.Input placeholder="Search user..." class="h-9" />
			<Command.List>
				<Command.Empty>No user found.</Command.Empty>
				<Command.Group>
					{#each users as user (user.value)}
						<Command.Item
							value={user.value}
							disabled={!user.available}
							onSelect={() => {
								value = user.value === value ? "" : user.value;
								closeAndFocusTrigger();
							}}
						>
							<CheckIcon
								class={cn("me-2 size-4", value !== user.value && "opacity-0")}
							/>
							{user.label}
							<span class="text-muted-foreground ms-auto text-xs">
								{user.available ? "Available" : "Busy"}
							</span>
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
