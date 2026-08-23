import { Button } from '@/ui/button';

<template>
  <div class="flex flex-col items-center gap-4">
    {{! [FORCE-UI] native @loading prop — spinner + aria-busy + disabled come for free }}
    <Button @loading={{true}} @size="sm">Loading...</Button>
    <Button @loading={{true}} @size="sm" @variant="outline">Please wait</Button>
    <Button @loading={{true}} @size="sm" @variant="secondary">Processing</Button>
  </div>
</template>
