<script setup lang="ts">
// [FORCE-UI] Vue port of registry/new-york-v4/blocks/sidebar-16
import Search from '@material-symbols/svg-400/rounded/search.svg?component'
import { Label } from '@/ui/label'
import { SidebarInput } from '@/ui/sidebar'
</script>

<template>
  <form>
    <div class="relative">
      <Label for="search" class="sr-only">Search</Label>
      <SidebarInput id="search" placeholder="Type to search..." class="h-8 pl-7" />
      <Search
        class="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none"
      />
    </div>
  </form>
</template>
