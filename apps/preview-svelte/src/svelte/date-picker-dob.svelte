<script lang="ts">
	import CalendarIcon from "~icons/ms/calendar_month";
	import { DateFormatter, type DateValue, getLocalTimeZone, today, getLocalTimeZone as ltz } from "@internationalized/date";
	import { cn } from "@/svelte-lib/utils.js";
	import { buttonVariants } from "@/svelte-ui/button/index.js";
	import { Calendar } from "@/svelte-ui/calendar/index.js";
	import * as Popover from "@/svelte-ui/popover/index.js";

	const df = new DateFormatter("en-US", {
		dateStyle: "long",
	});

	let value = $state<DateValue | undefined>();
	// birth dates cannot be in the future
	let maxValue = $derived(today(ltz()));
</script>

<Popover.Root>
	<Popover.Trigger
		class={cn(
			buttonVariants({
				variant: "outline",
				class: "w-[280px] justify-start text-start font-normal",
			}),
			!value && "text-muted-foreground"
		)}
	>
		<CalendarIcon class="me-2 size-4" />
		{value ? df.format(value.toDate(getLocalTimeZone())) : "Date of birth"}
	</Popover.Trigger>
	<Popover.Content class="w-auto p-0" align="start">
		<Calendar type="single" bind:value {maxValue} captionLayout="dropdown" placeholder={maxValue} />
	</Popover.Content>
</Popover.Root>
