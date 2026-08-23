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

const innerOpen = ref(false)
</script>

<template>
  <Drawer>
    <DrawerTrigger as-child>
      <Button variant="outline">Open outer drawer</Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Outer drawer</DrawerTitle>
        <DrawerDescription
          >Drawers can be stacked on top of each other.</DrawerDescription
        >
      </DrawerHeader>
      <DrawerFooter>
        <Drawer v-model:open="innerOpen">
          <DrawerTrigger as-child>
            <Button>Open inner drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Inner drawer</DrawerTitle>
              <DrawerDescription>This one sits on top.</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose as-child>
                <Button variant="outline">Close inner</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <DrawerClose as-child>
          <Button variant="outline">Close</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
