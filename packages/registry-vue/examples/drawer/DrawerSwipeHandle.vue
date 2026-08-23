<script setup lang="ts">
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/ui/drawer'
import { Button } from '@/ui/button'
</script>

<template>
  <Drawer>
    <DrawerTrigger as-child>
      <Button variant="outline">Swipeable handle drawer</Button>
    </DrawerTrigger>
    <DrawerContent>
      <!-- the bottom-direction handle is rendered by DrawerContent itself -->
      <DrawerHeader>
        <DrawerTitle>Swipe handle</DrawerTitle>
        <DrawerDescription>Drag the handle at the top edge down to dismiss.</DrawerDescription>
      </DrawerHeader>
      <div class="grid place-items-center p-8 text-sm text-muted-foreground">
        Try dragging this sheet by its handle.
      </div>
    </DrawerContent>
  </Drawer>
</template>
