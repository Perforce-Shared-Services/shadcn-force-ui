<script setup lang="ts">
import { toast } from 'vue-sonner'
import { Button } from '@/ui/button'
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <Button variant="outline" @click="toast('Event has been created')">
      Default
    </Button>
    <Button variant="outline" @click="toast.success('Settings saved!')">
      Success
    </Button>
    <Button variant="outline" @click="toast.info('A new version is available.')">
      Info
    </Button>
    <Button variant="outline" @click="toast.warning('Storage almost full.')">
      Warning
    </Button>
    <Button variant="outline" @click="toast.error('Failed to save changes.')">
      Error
    </Button>
  </div>
</template>
