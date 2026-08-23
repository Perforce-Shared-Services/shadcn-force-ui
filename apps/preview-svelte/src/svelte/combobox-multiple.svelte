<script lang="ts">
	import CheckIcon from "~icons/ms/check";
	import ChevronsUpDownIcon from "~icons/ms/unfold_more";
	import CloseIcon from "~icons/ms/close";
	import { tick } from "svelte";
	import * as Command from "@/svelte-ui/command/index.js";
	import * as Popover from "@/svelte-ui/popover/index.js";
	import { Badge, badgeVariants } from "@/svelte-ui/badge/index.js";
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
	let selected = $state<string[]>([]);

	function toggle(value: string) {
		selected = selected.includes(value)
			? selected.filter((v) => v !== value)
			: [...selected, value];
	}

	const triggerId = "combobox-multiple-trigger";

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
			"h-auto min-h-10 w-[240px] justify-between px-2 py-1.5",
			selected.length === 0 && "text-muted-foreground"
		)}
	>
		{#if selected.length === 0}
			Select frameworks...
		{:else}
			<span class="flex flex-wrap items-center gap-1">
				{#each selected as value (value)}
					<Badge variant="secondary" class="pe-1">
						{frameworks.find((f) => f.value === value)?.label}
						<button
							type="button"
							class="hover:bg-muted/60 rounded-full p-0.5"
							aria-label="Remove {value}"
							onclick={(e) => {
								e.stopPropagation();
								toggle(value);
							}}
						>
							<CloseIcon class="size-3" />
						</button>
					</Badge>
				{/each}
			</span>
		{/if}
		<ChevronsUpDownIcon class="ms-2 size-4 shrink-0 opacity-50" />
	</Popover.Trigger>
	<Popover.Content class="w-[240px] p-0">
		<Command.Root>
			<Command.Input placeholder="Search framework..." class="h-9" />
			<Command.List>
				<Command.Empty>No framework found.</Command.Empty>
				<Command.Group>
					{#each frameworks as framework (framework.value)}
						<Command.Item
							value={framework.value}
							onSelect={() => {
								toggle(framework.value);
							}}
						>
							<CheckIcon
								class={cn("me-2 size-4", !selected.includes(framework.value) && "opacity-0")}
							/>
							{framework.label}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
