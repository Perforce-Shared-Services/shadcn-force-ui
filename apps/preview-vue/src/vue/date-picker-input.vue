<script setup lang="ts">
import { Button } from "@/ui/button"
import { Calendar } from "@/ui/calendar"
import { Field, FieldLabel } from "@/ui/field"
import { Input } from "@/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover"
import type { DateValue } from "@internationalized/date"
import { getLocalTimeZone, parseDateTime } from "@internationalized/date"
import CalendarIcon from "@material-symbols/svg-400/rounded/calendar_month.svg?component"
import { computed, ref } from "vue"
import type { Ref } from "vue"

const text = ref("2025-03-14")
const date = computed(() => {
  try {
    return parseDateTime(text.value) as unknown as DateValue
  } catch {
    return undefined
  }
})
const open = ref(false)
</script>

<template>
  <Field class="mx-auto w-64">
    <FieldLabel for="date-picker-input">Date (ISO)</FieldLabel>
    <div class="relative flex gap-2">
      <Input
        id="date-picker-input"
        v-model="text"
        placeholder="2025-03-14"
        class="bg-background pr-10"
      />
      <Popover v-model:open="open">
        <PopoverTrigger as-child>
          <Button
            variant="ghost"
            class="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            aria-label="Select date"
          >
            <CalendarIcon class="size-3.5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto overflow-hidden p-0" align="end">
          <Calendar
            :model-value="date"
            @update:model-value="
              (value) => {
                if (value) {
                  text = value.toString()
                  open = false
                }
              }
            "
          />
        </PopoverContent>
      </Popover>
    </div>
  </Field>
</template>
