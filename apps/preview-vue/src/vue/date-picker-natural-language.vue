<script setup lang="ts">
import { Button } from "@/ui/button"
import { Calendar } from "@/ui/calendar"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover"
import type { DateValue } from "@internationalized/date"
import { fromDate, getLocalTimeZone, today } from "@internationalized/date"
import CalendarIcon from "@material-symbols/svg-400/rounded/calendar_month.svg?component"
import { ref } from "vue"

// ponytail: chrono-node is not installed on the vue side; presets + free-form
// input cover the demo surface. Add chrono-node parsing if true NL input lands.
const inputValue = ref("In 2 days")
const nativeDate = ref(today(getLocalTimeZone()).toDate(getLocalTimeZone()))
const open = ref(false)

function preset(days: number) {
  nativeDate.value = today(getLocalTimeZone())
    .add({ days })
    .toDate(getLocalTimeZone())
}
</script>

<template>
  <div class="flex max-w-md flex-col gap-3">
    <Label for="date" class="px-1">Schedule Date</Label>
    <div class="relative flex gap-2">
      <Input
        id="date"
        v-model="inputValue"
        placeholder="Tomorrow or next week"
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
            :model-value="fromDate(nativeDate, getLocalTimeZone())"
            @update:model-value="
              (value) => {
                if (value) {
                  nativeDate = value.toDate(getLocalTimeZone())
                  open = false
                }
              }
            "
          />
        </PopoverContent>
      </Popover>
    </div>
    <div class="flex gap-2 px-1">
      <Button variant="outline" size="sm" @click="preset(1)">Tomorrow</Button>
      <Button variant="outline" size="sm" @click="preset(7)">Next week</Button>
      <Button variant="outline" size="sm" @click="preset(30)"
        >Next month</Button
      >
    </div>
    <div class="px-1 text-sm text-muted-foreground">
      Your post will be published on
      <span class="font-medium">{{
        nativeDate.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      }}</span
      >.
    </div>
  </div>
</template>
