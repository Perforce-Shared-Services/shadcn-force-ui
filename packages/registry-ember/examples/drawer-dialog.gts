import { Button } from '@/ui/button';
import {
  Dialog,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/ui/dialog';
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
  {{! [FORCE-UI] responsive drawer-on-mobile / dialog-on-desktop pattern; the
      React example swaps components via a JS media-query hook, Ember toggles
      them with utility classes }}
  <Drawer>
    <DrawerTrigger @asChild={{true}}>
      <Button class="md:hidden">Edit Profile</Button>
    </DrawerTrigger>
    <DrawerContent class="md:hidden">
      <DrawerHeader>
        <DrawerTitle>Edit profile</DrawerTitle>
        <DrawerDescription>
          Make changes to your profile here. Click save when you're done.
        </DrawerDescription>
      </DrawerHeader>
      <div class="grid gap-4 px-4 py-4"></div>
      <DrawerFooter>
        <Button type="submit">Save changes</Button>
        <DrawerClose @asChild={{true}}>
          <Button @variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
  <Dialog>
    <DialogTrigger>
      <Button class="max-md:hidden">Edit Profile</Button>
    </DialogTrigger>
    <DialogContent @class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4"></div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
        <DialogClose @asChild={{true}}>
          <Button @variant="outline">Cancel</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
