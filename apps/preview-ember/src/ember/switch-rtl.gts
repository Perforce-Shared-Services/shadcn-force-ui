// [FORCE-UI] Ember port of examples/base/switch-rtl.tsx. Fixed rtl dir per
// the ember RTL demo convention.
import { Switch } from '@/ember-ui/switch';

<template>
  <label
    class="flex max-w-sm items-center justify-between gap-4"
    dir="rtl"
    for="switch-focus-mode-rtl"
  >
    <span class="flex flex-col gap-1">
      <span class="text-sm leading-none font-medium">المشاركة عبر الأجهزة</span>
      <span class="text-sm text-muted-foreground">
        يتم مشاركة التركيز عبر الأجهزة، ويتم إيقاف تشغيله عند مغادرة التطبيق.
      </span>
    </span>
    <Switch id="switch-focus-mode-rtl" />
  </label>
</template>
