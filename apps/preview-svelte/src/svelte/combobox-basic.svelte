<script lang="ts">
	import ChevronDownIcon from "~icons/ms/keyboard_arrow_down";
	import CheckIcon from "~icons/ms/check";
	import ChevronsUpDownIcon from "~icons/ms/unfold_more";
	import { tick } from "svelte";
	import * as Command from "@/svelte-ui/command/index.js";
	import * as Popover from "@/svelte-ui/popover/index.js";
	import { Button, buttonVariants } from "@/svelte-ui/button/index.js";
	import { cn } from "@/svelte-lib/utils.js";

	const frameworks = [
		{ value: "sveltekit", label: "SvelteKit" },
		{ value: "next.js", label: "Next.js" },
		{ value: "nuxt.js", label: "Nuxt.js" },
		{ value: "remix", label: "Remix" },
		{ value: "astro", label: "Astro" },
	];

	let open = $state(false);
	let value = $state("");

	const selectedValue = $derived(frameworks.find((f) => f.value === value)?.label);

	const triggerId = "combobox-basic-trigger";

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
		{selectedValue || "Select framework..."}
		<ChevronsUpDownIcon class="ms-2 size-4 opacity-50" />
	</Popover.Trigger>
	<Popover.Content class="w-[200px] p-0">
		<Command.Root>
			<Command.Input placeholder="Search framework..." class="h-9" />
			<Command.List>
				<Command.Empty>No framework found.</Command.Empty>
				<Command.Group>
					{#each frameworks as framework (framework.value)}
						<Command.Item
							value={framework.value}
							onSelect={() => {
								value = framework.value === value ? "" : framework.value;
								closeAndFocusTrigger();
							}}
						>
							<CheckIcon
								class={cn("me-2 size-4", value !== framework.value && "opacity-0")}
							/>
							{framework.label}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
