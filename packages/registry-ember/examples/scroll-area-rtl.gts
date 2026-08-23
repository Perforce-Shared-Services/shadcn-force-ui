// [FORCE-UI] Ember port of examples/base/scroll-area-rtl.tsx. Fixed rtl dir
// per the ember RTL demo convention.
import { Separator } from '@/ui/separator';
import { ScrollArea } from '@/ui/scroll-area';

const tags = Array.from({ length: 50 }, (_, i) => `v1.2.0-beta.${50 - i}`);

<template>
  <ScrollArea class="h-72 w-48 rounded-md border" dir="rtl">
    <div class="p-4">
      <h4 class="mb-4 text-sm leading-none font-medium">العلامات</h4>
      {{#each tags as |tag|}}
        <div class="text-sm">{{tag}}</div>
        <Separator class="my-2" />
      {{/each}}
    </div>
  </ScrollArea>
</template>
