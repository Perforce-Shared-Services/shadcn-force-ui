<script setup lang="ts">
import { ref } from 'vue'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/ui/drawer'
import { Button } from '@/ui/button'

const snapPoints = [0.35, 0.65, 1]
const activeSnap = ref<number | string | null>(snapPoints[0])
</script>

<template>
  <Drawer
    v-model:active-snap-point="activeSnap"
    :snap-points="snapPoints"
  >
    <DrawerTrigger as-child>
      <Button variant="outline">Drawer with snap points</Button>
    </DrawerTrigger>
    <DrawerContent class="h-[85vh]">
      <DrawerHeader>
        <DrawerTitle>Snap points</DrawerTitle>
        <DrawerDescription>Drag the drawer between three heights.</DrawerDescription>
      </DrawerHeader>
      <div class="flex flex-1 flex-col items-center justify-center gap-2 p-4 text-muted-foreground">
        <p>Active snap point: {{ snapPoints.indexOf(Number(activeSnap)) + 1 }} / {{ snapPoints.length }}</p>
        <ul class="list-disc pl-5 text-left text-sm">
          <li>Peek (35%)</li>
          <li>Half (65%)</li>
          <li>Full (100%)</li>
        </ul>
      </div>
    </DrawerContent>
  </Drawer>
</template>
