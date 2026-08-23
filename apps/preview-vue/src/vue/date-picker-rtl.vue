<script setup lang="ts">
import { Button } from "@/ui/button"
import { Calendar } from "@/ui/calendar"
import { Field, FieldLabel } from "@/ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover"
import type { DateValue } from "@internationalized/date"
import { getLocalTimeZone, today } from "@internationalized/date"
import CalendarIcon from "@material-symbols/svg-400/rounded/calendar_month.svg?component"
import { ref } from "vue"
import type { Ref } from "vue"

const date = ref(today(getLocalTimeZone())) as Ref<DateValue>
</script>

<template>
  <Field dir="rtl" class="mx-auto w-56">
    <FieldLabel dir="rtl" for="date-picker-rtl">التاريخ</FieldLabel>
    <Popover>
      <PopoverTrigger as-child>
        <Button
          id="date-picker-rtl"
          variant="outline"
          class="justify-start font-normal"
          dir="rtl"
        >
          <CalendarIcon data-icon="inline-start" />
          {{
            date
              .toDate(getLocalTimeZone())
              .toLocaleDateString("ar", { dateStyle: "long" })
          }}
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-auto p-0" align="start" dir="rtl">
        <Calendar dir="rtl" :model-value="date" locale="ar" />
      </PopoverContent>
    </Popover>
  </Field>
</template>
