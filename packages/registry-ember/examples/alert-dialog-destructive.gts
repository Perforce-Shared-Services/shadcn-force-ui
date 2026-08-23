// [FORCE-UI] Ember port of examples/base/alert-dialog-destructive.tsx.
import TrashIcon from '~icons/ms/delete';
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
      <Button @variant="destructive">Delete Chat</Button>
    </AlertDialogTrigger>
    <AlertDialogContent @size="sm">
      <AlertDialogHeader>
        <AlertDialogMedia
          class="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive"
        >
          <TrashIcon />
        </AlertDialogMedia>
        <AlertDialogTitle>Delete chat?</AlertDialogTitle>
        <AlertDialogDescription>
          This will permanently delete this chat conversation.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @class="border bg-transparent shadow-none hover:bg-accent">
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction
          class="bg-destructive text-white shadow-none hover:bg-destructive/90"
        >
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
