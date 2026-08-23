<script setup lang="ts">
import { Button } from "@/ui/button"
import { Field, FieldLabel } from "@/ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover"
import { RangeCalendar } from "@/ui/range-calendar"
import type { DateValue } from "@internationalized/date"
import { getLocalTimeZone, today } from "@internationalized/date"
import CalendarIcon from "@material-symbols/svg-400/rounded/calendar_month.svg?component"
import type { DateRange } from "reka-ui"
import { ref } from "vue"
import type { Ref } from "vue"

const start = today(getLocalTimeZone())
const dateRange = ref({
  start,
  end: start.add({ days: 20 }),
}) as Ref<DateRange>
const open = ref(false)

function fmt(value?: DateValue) {
  return value
    ? value
        .toDate(getLocalTimeZone())
        .toLocaleDateString("en-US", { dateStyle: "medium" })
    : ""
}
</script>

<template>
  <Field class="mx-auto w-72">
    <FieldLabel for="date-picker-range">Date Picker Range</FieldLabel>
    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button
          id="date-picker-range"
          variant="outline"
          class="justify-start px-2.5 font-normal"
        >
          <CalendarIcon data-icon="inline-start" />
          {{
            dateRange?.start
              ? dateRange.end
                ? `${fmt(dateRange.start)} - ${fmt(dateRange.end)}`
                : fmt(dateRange.start)
              : "Pick a date"
          }}
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-auto p-0" align="start">
        <RangeCalendar
          v-model="dateRange"
          :number-of-months="2"
          @update:model-value="
            (value) => {
              if (value && value.start && value.end) open = false
            }
          "
        />
      </PopoverContent>
    </Popover>
  </Field>
</template>
