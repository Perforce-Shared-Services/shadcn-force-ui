<script setup lang="ts">
import { ref } from "vue"
import { Button } from '@/ui/button'

// [FORCE-UI] `loading` renders the spinner and disables interaction
const saving = ref(true)
</script>

<template>
  <div class="flex gap-2">
    <Button variant="outline" :loading="saving">Generating</Button>
    <Button variant="secondary" :loading="saving">Downloading</Button>
    <Button variant="outline" @click="saving = !saving">Toggle</Button>
  </div>
</template>
