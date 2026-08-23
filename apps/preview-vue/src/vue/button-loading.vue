<script setup lang="ts">
import { ref } from "vue"
import { Button } from '@/ui/button'

// [FORCE-UI] `loading` renders the spinner and disables interaction
const loading = ref(true)
</script>

<template>
  <div class="flex gap-2">
    <Button variant="outline" :loading="loading">Generating</Button>
    <Button variant="secondary" :loading="loading">Downloading</Button>
    <Button variant="outline" @click="loading = !loading">Toggle</Button>
  </div>
</template>
