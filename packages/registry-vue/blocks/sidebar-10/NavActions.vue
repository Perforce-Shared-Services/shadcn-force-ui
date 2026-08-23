<script setup lang="ts">
// [FORCE-UI] Vue port of registry/new-york-v4/blocks/sidebar-10
import { h, ref } from 'vue'
import type { Component } from 'vue'
import Star from '@material-symbols/svg-400/rounded/star.svg?component'
import MoreHorizontal from '@material-symbols/svg-400/rounded/more_horiz.svg?component'
import Settings from '@material-symbols/svg-400/rounded/settings.svg?component'
import Article from '@material-symbols/svg-400/rounded/article.svg?component'
import LinkIcon from '@material-symbols/svg-400/rounded/link.svg?component'
import ContentCopy from '@material-symbols/svg-400/rounded/content_copy.svg?component'
import TurnRight from '@material-symbols/svg-400/rounded/turn_right.svg?component'
import Delete from '@material-symbols/svg-400/rounded/delete.svg?component'
import TurnLeft from '@material-symbols/svg-400/rounded/turn_left.svg?component'
import Monitoring from '@material-symbols/svg-400/rounded/monitoring.svg?component'
import Notifications from '@material-symbols/svg-400/rounded/notifications.svg?component'
import ArrowUpward from '@material-symbols/svg-400/rounded/arrow_upward.svg?component'
import ArrowDownward from '@material-symbols/svg-400/rounded/arrow_downward.svg?component'
import { Button } from '@/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/ui/popover'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/ui/sidebar'

// Lucide gallery-vertical-end as a functional component.
const GalleryVerticalEnd = () =>
  h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M7 2h10' }),
    h('path', { d: 'M5 6h14' }),
    h('rect', { width: '18', height: '16', x: '3', y: '10', rx: '2' }),
  ])

const data: { label: string; icon: Component }[][] = [
  [
    { label: 'Customize Page', icon: Settings as Component },
    { label: 'Turn into wiki', icon: Article as Component },
  ],
  [
    { label: 'Copy Link', icon: LinkIcon as Component },
    { label: 'Duplicate', icon: ContentCopy as Component },
    { label: 'Move to', icon: TurnRight as Component },
    { label: 'Move to Trash', icon: Delete as Component },
  ],
  [
    { label: 'Undo', icon: TurnLeft as Component },
    { label: 'View analytics', icon: Monitoring as Component },
    { label: 'Version History', icon: GalleryVerticalEnd as Component },
    { label: 'Show delete pages', icon: Delete as Component },
    { label: 'Notifications', icon: Notifications as Component },
  ],
  [
    { label: 'Import', icon: ArrowUpward as Component },
    { label: 'Export', icon: ArrowDownward as Component },
  ],
]

const isOpen = ref(true)
</script>

<template>
  <div class="flex items-center gap-2 text-sm">
    <div class="hidden font-medium text-muted-foreground md:inline-block">
      Edit Oct 08
    </div>
    <Button variant="ghost" size="icon" class="h-7 w-7">
      <Star />
    </Button>
    <Popover v-model:open="isOpen">
      <PopoverTrigger as-child>
        <Button variant="ghost" size="icon" class="h-7 w-7 data-[state=open]:bg-accent">
          <MoreHorizontal />
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-56 overflow-hidden rounded-lg p-0" align="end">
        <Sidebar collapsible="none" class="bg-transparent">
          <SidebarContent>
            <SidebarGroup
              v-for="(group, index) in data"
              :key="index"
              class="border-b last:border-none"
            >
              <SidebarGroupContent class="gap-0">
                <SidebarMenu>
                  <SidebarMenuItem v-for="(item, itemIndex) in group" :key="itemIndex">
                    <SidebarMenuButton>
                      <component :is="item.icon" />
                      <span>{{ item.label }}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </PopoverContent>
    </Popover>
  </div>
</template>
