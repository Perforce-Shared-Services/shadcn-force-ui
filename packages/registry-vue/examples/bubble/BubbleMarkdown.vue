<script setup lang="ts">
import { Bubble, BubbleContent } from '@/ui/bubble'
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <Bubble align="start">
      <BubbleContent>
        <div class="space-y-2 text-sm">
          <p class="font-semibold">Release notes — v2.4</p>
          <ul class="list-disc space-y-1 pl-5">
            <li><strong>New:</strong> keyboard shortcuts for every action</li>
            <li><em>Improved:</em> 40% faster search indexing</li>
            <li><code class="rounded bg-muted px-1 py-0.5 text-xs">--dry-run</code> now works in CI</li>
          </ul>
        </div>
      </BubbleContent>
    </Bubble>
    <Bubble align="end" variant="tinted">
      <BubbleContent>
        <p class="text-sm">Nice — deploying right away. 🚀</p>
      </BubbleContent>
    </Bubble>
  </div>
</template>
