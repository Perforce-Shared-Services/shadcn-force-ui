<script setup lang="ts">
import { AspectRatio } from '@/ui/aspect-ratio'
</script>

<template>
  <div dir="rtl" class="w-full max-w-md space-y-4">
    <AspectRatio :ratio="16 / 9" class="overflow-hidden rounded-lg border">
      <img
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2"
        alt="صورة توضيحية بنسبة عرض إلى ارتفاع 16:9"
        class="h-full w-full object-cover"
      >
    </AspectRatio>
    <p class="text-muted-foreground text-sm">
      صورة بنسبة 16:9 تدعم الاتجاه من اليمين إلى اليسار.
    </p>
  </div>
</template>
