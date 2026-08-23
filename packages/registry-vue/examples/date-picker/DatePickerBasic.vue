<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { DateValue } from '@internationalized/date'
import { getLocalTimeZone, today } from '@internationalized/date'
import CalendarIcon from "@material-symbols/svg-400/rounded/calendar_month.svg?component"
import { Button } from '@/ui/button'
import { Calendar } from '@/ui/calendar'
import { Field, FieldLabel } from '@/ui/field'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'

const date = ref<DateValue>() as Ref<DateValue | undefined>
const open = ref(false)

function display(value?: DateValue) {
  return value ? value.toDate(getLocalTimeZone()).toLocaleDateString('en-US', { dateStyle: 'long' }) : ''
}
</script>

<template>
  <Field class="mx-auto w-56">
    <FieldLabel for="date-picker-basic">Date</FieldLabel>
    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button
          id="date-picker-basic"
          variant="outline"
          class="justify-start font-normal"
        >
          <CalendarIcon data-icon="inline-start" />
          {{ date ? display(date) : 'Pick a date' }}
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-auto p-0" align="start">
        <Calendar
          :model-value="date"
          @update:model-value="(value) => {
            if (value) {
              date = value
              open = false
            }
          }"
        />
      </PopoverContent>
    </Popover>
  </Field>
</template>
