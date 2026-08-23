<script setup lang="ts">
// [FORCE-UI] Vue port of registry/new-york-v4/blocks/sidebar-05
import Search from '@material-symbols/svg-400/rounded/search.svg?component'
import { Label } from '@/ui/label'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from '@/ui/sidebar'
</script>

<template>
  <form>
    <SidebarGroup class="py-0">
      <SidebarGroupContent class="relative">
        <Label for="search" class="sr-only">Search</Label>
        <SidebarInput id="search" placeholder="Search the docs..." class="pl-8" />
        <Search
          class="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none"
        />
      </SidebarGroupContent>
    </SidebarGroup>
  </form>
</template>
