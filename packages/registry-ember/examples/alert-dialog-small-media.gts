// [FORCE-UI] Ember port of examples/base/alert-dialog-small-media.tsx.
import BluetoothIcon from '~icons/ms/bluetooth';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/ui/alert-dialog';
import { Button } from '@/ui/button';

<template>
  <AlertDialog>
    <AlertDialogTrigger>
      <Button @variant="outline">Show Dialog</Button>
    </AlertDialogTrigger>
    <AlertDialogContent @size="sm">
      <AlertDialogHeader>
        <AlertDialogMedia>
          <BluetoothIcon />
        </AlertDialogMedia>
        <AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
        <AlertDialogDescription>
          Do you want to allow the USB accessory to connect to this device?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Don't allow</AlertDialogCancel>
        <AlertDialogAction>Allow</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
