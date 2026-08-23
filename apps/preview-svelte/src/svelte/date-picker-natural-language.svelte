<script lang="ts">
	import CalendarIcon from "~icons/ms/calendar_month";
	import { DateFormatter, type DateValue, getLocalTimeZone, parseAbsoluteToLocal } from "@internationalized/date";
	import * as Chrono from "chrono-node";
	import { onMount, tick } from "svelte";
	import { cn } from "@/svelte-lib/utils.js";
	import { buttonVariants } from "@/svelte-ui/button/index.js";
	import { Calendar } from "@/svelte-ui/calendar/index.js";
	import * as Popover from "@/svelte-ui/popover/index.js";

	const df = new DateFormatter("en-US", { dateStyle: "long" });

	let value = $state<DateValue | undefined>();
	// chrono-node parses natural language like "next friday at 3pm"
	function tryParse(text: string): DateValue | undefined {
		if (!text.trim()) return undefined;
		const parsed = Chrono.en.casual.parse(text)[0];
		return parsed
			? parseAbsoluteToLocal(parsed.date().toISOString())
			: undefined;
	}

	let query = $state("in two weeks");
	let open = $state(false);
	const triggerId = "natural-language-trigger";

	onMount(() => {
		value = tryParse(query);
	});

	function applyQuery(text: string) {
		query = text;
		const parsed = tryParse(text);
		if (parsed) {
			value = parsed;
			open = false;
			tick().then(() => document.getElementById(triggerId)?.focus());
		}
	}
</script>

<Popover.Root bind:open>
	<Popover.Trigger
		id={triggerId}
		class={cn(
			buttonVariants({
				variant: "outline",
				class: "w-[280px] justify-start text-start font-normal",
			}),
			!value && "text-muted-foreground"
		)}
	>
		<CalendarIcon class="me-2 size-4" />
		{value ? df.format(value.toDate(getLocalTimeZone())) : "Schedule meeting"}
	</Popover.Trigger>
	<Popover.Content class="w-auto p-0" align="start">
		<div class="flex flex-col">
			<input
				class="border-b px-3 py-2 text-sm outline-none"
				placeholder='Try "tomorrow", "next friday"...'
				bind:value={query}
				onkeydown={(e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						applyQuery(query);
					}
				}}
			/>
			<Calendar
				type="single"
				bind:value
				captionLayout="dropdown"
				onValueChange={() => (open = false)}
			/>
		</div>
	</Popover.Content>
</Popover.Root>
