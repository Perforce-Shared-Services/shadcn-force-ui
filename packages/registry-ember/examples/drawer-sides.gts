import { Button } from '@/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/ui/drawer';

<template>
  <div class="flex flex-col gap-4 sm:flex-row">
    <Drawer>
      <DrawerTrigger @asChild={{true}}>
        <Button @variant="secondary">Open Left Drawer</Button>
      </DrawerTrigger>
      <DrawerContent @side="left">
        <DrawerHeader>
          <DrawerTitle>Move Goal</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
        </DrawerHeader>
        <div class="flex-1 p-4">
          <div class="size-full rounded-2xl bg-muted" />
        </div>
        <DrawerFooter>
          <DrawerClose @asChild={{true}}>
            <Button>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
    <Drawer>
      <DrawerTrigger @asChild={{true}}>
        <Button @variant="secondary">Open Right Drawer</Button>
      </DrawerTrigger>
      <DrawerContent @side="right">
        <DrawerHeader>
          <DrawerTitle>Move Goal</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
        </DrawerHeader>
        <div class="flex-1 p-4">
          <div class="size-full rounded-2xl bg-muted" />
        </div>
        <DrawerFooter>
          <DrawerClose @asChild={{true}}>
            <Button>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
    <Drawer>
      <DrawerTrigger @asChild={{true}}>
        <Button @variant="secondary">Open Top Drawer</Button>
      </DrawerTrigger>
      <DrawerContent @side="top">
        <DrawerHeader>
          <DrawerTitle>Move Goal</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
        </DrawerHeader>
        <div class="flex-1 p-4">
          <div class="size-full rounded-2xl bg-muted" />
        </div>
        <DrawerFooter>
          <DrawerClose @asChild={{true}}>
            <Button>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </div>
</template>
