<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { DateValue } from '@internationalized/date'
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date'
import ChevronDownIcon from "@material-symbols/svg-400/rounded/keyboard_arrow_down.svg?component"
import { Button } from '@/ui/button'
import { Calendar } from '@/ui/calendar'
import { Field, FieldLabel } from '@/ui/field'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'

const date = ref(new CalendarDate(1998, 6, 15)) as Ref<DateValue>
const open = ref(false)
</script>

<template>
  <Field class="mx-auto w-56">
    <FieldLabel for="date-picker-dob">Date of birth</FieldLabel>
    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button
          id="date-picker-dob"
          variant="outline"
          class="w-full justify-between font-normal"
        >
          {{ date ? date.toDate(getLocalTimeZone()).toLocaleDateString() : 'Select date' }}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-auto overflow-hidden p-0" align="start">
        <Calendar
          :model-value="date"
          layout="month-and-year"
          :year-range="[new CalendarDate(1930, 1, 1), today(getLocalTimeZone())]"
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
