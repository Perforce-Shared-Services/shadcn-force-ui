<script setup lang="ts">
// [FORCE-UI] Vue port of registry/new-york-v4/blocks/sidebar-15
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { DateValue } from '@internationalized/date'
import { fromDate, getLocalTimeZone } from '@internationalized/date'
import { Calendar } from '@/ui/calendar'
import {
  SidebarGroup,
  SidebarGroupContent,
} from '@/ui/sidebar'

// ponytail: display date only, the block demo does not consume it
const date = ref(fromDate(new Date(2024, 9, 15), getLocalTimeZone())) as Ref<DateValue>
</script>

<template>
  <SidebarGroup class="px-0">
    <SidebarGroupContent>
      <Calendar
        v-model="date"
        class="[&_[role=gridcell]]:w-[33px] [&_[role=gridcell].bg-accent]:bg-sidebar-primary [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground"
      />
    </SidebarGroupContent>
  </SidebarGroup>
</template>
