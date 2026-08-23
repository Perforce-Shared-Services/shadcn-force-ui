// [FORCE-UI] Ember port of examples/base/aspect-ratio-rtl.tsx. Fixed rtl dir
// per the ember RTL demo convention (React cycles locales).
import { AspectRatio } from '@/ui/aspect-ratio';

<template>
  <figure class="w-full max-w-sm" dir="rtl">
    <AspectRatio @ratio={{1.7777777}} class="overflow-hidden rounded-lg bg-muted">
      <img
        alt="Photo"
        class="absolute inset-0 h-full w-full rounded-lg object-cover grayscale dark:brightness-20"
        src="https://avatar.vercel.sh/shadcn1"
      />
    </AspectRatio>
    <figcaption class="mt-2 text-center text-sm text-muted-foreground">
      منظر طبيعي جميل
    </figcaption>
  </figure>
</template>
