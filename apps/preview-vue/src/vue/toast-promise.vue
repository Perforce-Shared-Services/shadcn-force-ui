<script setup lang="ts">
import { Button } from "@/ui/button"
import { toast } from "vue-sonner"

function fakeSave(): Promise<string> {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Data saved to the database."), 2000)
  )
}
</script>

<template>
  <Button
    variant="outline"
    @click="
      toast.promise(fakeSave(), {
        loading: 'Saving...',
        success: (data: string) => `${data}`,
        error: 'Could not save.',
      })
    "
  >
    Run promise toast
  </Button>
</template>
