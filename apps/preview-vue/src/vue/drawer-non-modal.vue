<script setup lang="ts">
import { Button } from "@/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/ui/drawer"
import { ref } from "vue"

const open = ref(false)
</script>

<template>
  <div class="flex flex-col items-start gap-4">
    <p class="text-sm text-muted-foreground">
      While this drawer is open you can still interact with the page — it is
      non-modal.
    </p>
    <Drawer v-model:open="open" :modal="false">
      <DrawerTrigger as-child>
        <Button variant="outline">Open non-modal drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Non-modal drawer</DrawerTitle>
          <DrawerDescription
            >No overlay; the rest of the page stays
            interactive.</DrawerDescription
          >
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose as-child>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </div>
</template>
