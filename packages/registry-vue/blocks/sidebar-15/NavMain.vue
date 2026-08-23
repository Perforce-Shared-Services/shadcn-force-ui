<script setup lang="ts">
// [FORCE-UI] Vue port of registry/new-york-v4/blocks/sidebar-15
import type { Component } from 'vue'
import {
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/ui/sidebar'

const props = defineProps<{
  items: {
    title: string
    url: string
    icon: Component
    isActive?: boolean
    badge?: string
  }[]
}>()
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem v-for="item in props.items" :key="item.title">
      <SidebarMenuButton as-child :is-active="item.isActive">
        <a :href="item.url">
          <component :is="item.icon" />
          <span>{{ item.title }}</span>
        </a>
      </SidebarMenuButton>
      <SidebarMenuBadge v-if="item.badge">{{ item.badge }}</SidebarMenuBadge>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
