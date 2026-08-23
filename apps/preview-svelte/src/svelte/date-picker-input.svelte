<script lang="ts">
	import {
		DateFormatter,
		type DateValue,
		getLocalTimeZone,
		parseAbsoluteToLocal,
	} from "@internationalized/date";
	import * as Popover from "@/svelte-ui/popover/index.js";
	import { Input } from "@/svelte-ui/input/index.js";
	import { Label } from "@/svelte-ui/label/index.js";
	import { Calendar } from "@/svelte-ui/calendar/index.js";

	const df = new DateFormatter("en-US", {
		dateStyle: "long",
	});

	function formatDate(date: DateValue | undefined) {
		if (!date) return "";
		return df.format(date.toDate(getLocalTimeZone()));
	}

	let value = $state<DateValue | undefined>(
		parseAbsoluteToLocal(new Date().toISOString())
	);
	let inputValue = $state("");
	// seed the text field from the initial date once
	$effect(() => {
		if (inputValue === "" && value) {
			inputValue = formatDate(value);
		}
	});

	// keep the text input and calendar in sync both ways
	function onInput(text: string) {
		const parsed = new Date(text);
		if (!Number.isNaN(parsed.getTime())) {
			value = parseAbsoluteToLocal(parsed.toISOString());
		} else {
			value = undefined;
		}
	}
</script>

<div class="flex flex-col gap-3">
	<Label for="date-picker-input">Date</Label>
	<div class="relative flex gap-2">
		<Input
			id="date-picker-input"
			bind:value={inputValue}
			oninput={(e) => onInput(e.currentTarget.value)}
			placeholder="June 01, 2025"
			class="bg-background pe-10"
		/>
		<Popover.Root>
			<Popover.Trigger
				class="hover:bg-accent absolute inset-y-0 end-0 flex w-9 items-center justify-center rounded-e-md"
				aria-label="Pick a date"
			>
				<!-- calendar glyph drawn inline so the input stays the focus point -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="size-4 opacity-50"
				>
					<path d="M8 2v4M16 2v4M3 10h18" />
					<rect width="18" height="18" x="3" y="4" rx="2" />
				</svg>
				<span class="sr-only">Open calendar popover</span>
			</Popover.Trigger>
			<Popover.Content class="w-auto overflow-hidden p-0" align="end">
				<Calendar type="single" bind:value captionLayout="dropdown" />
			</Popover.Content>
		</Popover.Root>
	</div>
	<p class="text-muted-foreground text-sm">
		Type a date or pick one from the calendar — both stay in sync.
	</p>
</div>
