<script setup lang="ts">
// [FORCE-UI] Vue port of registry/new-york-v4/blocks/sidebar-10
import ArrowUpRight from '@material-symbols/svg-400/rounded/north_east.svg?component'
import LinkIcon from '@material-symbols/svg-400/rounded/link.svg?component'
import MoreHorizontal from '@material-symbols/svg-400/rounded/more_horiz.svg?component'
import StarOff from '@material-symbols/svg-400/rounded/star_rate.svg?component'
import Delete from '@material-symbols/svg-400/rounded/delete.svg?component'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/ui/sidebar'

const props = defineProps<{
  favorites: {
    name: string
    url: string
    emoji: string
  }[]
}>()

const { isMobile } = useSidebar()
</script>

<template>
  <SidebarGroup class="group-data-[collapsible=icon]:hidden">
    <SidebarGroupLabel>Favorites</SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem v-for="item in props.favorites" :key="item.name">
        <SidebarMenuButton as-child>
          <a :href="item.url" :title="item.name">
            <span>{{ item.emoji }}</span>
            <span>{{ item.name }}</span>
          </a>
        </SidebarMenuButton>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <SidebarMenuAction show-on-hover>
              <MoreHorizontal />
              <span class="sr-only">More</span>
            </SidebarMenuAction>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            class="w-56 rounded-lg"
            :side="isMobile ? 'bottom' : 'right'"
            :align="isMobile ? 'end' : 'start'"
          >
            <DropdownMenuItem>
              <StarOff class="text-muted-foreground" />
              <span>Remove from Favorites</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LinkIcon class="text-muted-foreground" />
              <span>Copy Link</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ArrowUpRight class="text-muted-foreground" />
              <span>Open in New Tab</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Delete class="text-muted-foreground" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton class="text-sidebar-foreground/70">
          <MoreHorizontal />
          <span>More</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>
