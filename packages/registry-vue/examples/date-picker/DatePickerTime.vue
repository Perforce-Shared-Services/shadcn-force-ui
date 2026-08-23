<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { DateValue } from '@internationalized/date'
import { getLocalTimeZone, today } from '@internationalized/date'
import CalendarIcon from "@material-symbols/svg-400/rounded/calendar_month.svg?component"
import { Button } from '@/ui/button'
import { Calendar } from '@/ui/calendar'
import { Field, FieldLabel } from '@/ui/field'
import { Input } from '@/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'

const date = ref(today(getLocalTimeZone())) as Ref<DateValue>
const time = ref('09:00')
const open = ref(false)

function display() {
  return `${date.value.toDate(getLocalTimeZone()).toLocaleDateString('en-US', { dateStyle: 'long' })} at ${time.value}`
}
</script>

<template>
  <Field class="mx-auto w-72">
    <FieldLabel for="date-picker-time">Date & time</FieldLabel>
    <div class="flex flex-col gap-3">
      <Popover v-model:open="open">
        <PopoverTrigger as-child>
          <Button
            id="date-picker-time"
            variant="outline"
            class="justify-start font-normal"
          >
            <CalendarIcon data-icon="inline-start" />
            {{ display() }}
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
      <Input v-model="time" type="time" class="w-fit" aria-label="Time" />
    </div>
  </Field>
</template>
