// [FORCE-UI] Ember port of examples/base/alert-action.tsx
import { Button } from '@/ember-ui/button';
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from '@/ember-ui/alert';

<template>
  <Alert @class="max-w-md">
    <AlertTitle>Dark mode is now available</AlertTitle>
    <AlertDescription>
      Enable it under your profile settings to get started.
    </AlertDescription>
    <AlertAction>
      <Button @size="xs" @variant="default">Enable</Button>
    </AlertAction>
  </Alert>
</template>
