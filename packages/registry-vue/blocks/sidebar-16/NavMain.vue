<script setup lang="ts">
// [FORCE-UI] Vue port of registry/new-york-v4/blocks/sidebar-16
import ChevronRight from '@material-symbols/svg-400/rounded/chevron_right.svg?component'
import Terminal from '@material-symbols/svg-400/rounded/terminal.svg?component'
import SmartToy from '@material-symbols/svg-400/rounded/smart_toy.svg?component'
import MenuBook from '@material-symbols/svg-400/rounded/menu_book.svg?component'
import Tune from '@material-symbols/svg-400/rounded/tune.svg?component'
import type { Component } from 'vue'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/ui/sidebar'

const props = defineProps<{
  items: {
    title: string
    url: string
    icon: Component
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}>()
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel>Platform</SidebarGroupLabel>
    <SidebarMenu>
      <Collapsible
        v-for="item in props.items"
        :key="item.title"
        as-child
        :default-open="item.isActive"
      >
        <SidebarMenuItem>
          <SidebarMenuButton as-child :tooltip="item.title">
            <a :href="item.url">
              <component :is="item.icon" />
              <span>{{ item.title }}</span>
            </a>
          </SidebarMenuButton>
          <template v-if="item.items?.length">
            <CollapsibleTrigger as-child>
              <SidebarMenuAction class="data-[state=open]:rotate-90">
                <ChevronRight />
                <span class="sr-only">Toggle</span>
              </SidebarMenuAction>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
                  <SidebarMenuSubButton as-child>
                    <a :href="subItem.url">
                      <span>{{ subItem.title }}</span>
                    </a>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </template>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  </SidebarGroup>
</template>
