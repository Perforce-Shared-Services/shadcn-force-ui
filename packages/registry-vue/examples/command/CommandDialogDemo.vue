<script setup lang="ts">
import { ref, watch } from 'vue'
import Calculator from "@material-symbols/svg-400/rounded/calculate.svg?component"
import Calendar from "@material-symbols/svg-400/rounded/calendar_month.svg?component"
import Smile from "@material-symbols/svg-400/rounded/mood.svg?component"
import User from "@material-symbols/svg-400/rounded/person.svg?component"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/ui/command'
import { Button } from '@/ui/button'

const open = ref(false)

watch(open, (value) => {
  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape')
      open.value = false
  }
  if (value)
    window.addEventListener('keydown', onKeydown)
  else
    window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div>
    <Button variant="outline" @click="open = true">
      Open Command Dialog
    </Button>
    <CommandDialog v-model:open="open">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem value="calendar">
            <Calendar />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem value="emoji">
            <Smile />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem value="calculator">
            <Calculator />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem value="profile">
            <User />
            <span>Profile</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  </div>
</template>
