<script setup lang="ts">
// [FORCE-UI] Vue port of registry/new-york-v4/blocks/dashboard-01
import { h } from 'vue'
import type { Component } from 'vue'
import NavMain from './NavMain.vue'
import NavDocuments from './NavDocuments.vue'
import NavSecondary from './NavSecondary.vue'
import NavUser from './NavUser.vue'
import SpaceDashboard from '@material-symbols/svg-400/rounded/space_dashboard.svg?component'
import ListAlt from '@material-symbols/svg-400/rounded/list_alt.svg?component'
import BarChart from '@material-symbols/svg-400/rounded/bar_chart.svg?component'
import Folder from '@material-symbols/svg-400/rounded/folder.svg?component'
import Group from '@material-symbols/svg-400/rounded/group.svg?component'
import Description from '@material-symbols/svg-400/rounded/description.svg?component'
import Help from '@material-symbols/svg-400/rounded/help.svg?component'
import Search from '@material-symbols/svg-400/rounded/search.svg?component'
import Settings from '@material-symbols/svg-400/rounded/settings.svg?component'
// Lucide arrow-up-to-line (IconInnerShadowTop stand-in)
const IconInnerShadowTop = () =>
  h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M5 3h14' }),
    h('rect', { width: '18', height: '18', x: '3', y: '7', rx: '2' }),
  ])
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/ui/sidebar'

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    { title: 'Dashboard', url: '#', icon: SpaceDashboard as Component },
    { title: 'Lifecycle', url: '#', icon: ListAlt as Component },
    { title: 'Analytics', url: '#', icon: BarChart as Component },
    { title: 'Projects', url: '#', icon: Folder as Component },
    { title: 'Team', url: '#', icon: Group as Component },
  ],
  navDocuments: [
    { name: 'Data Library', url: '#', icon: Folder as Component },
    { name: 'Reports', url: '#', icon: Description as Component },
    { name: 'Word Assistant', url: '#', icon: Description as Component },
  ],
  navSecondary: [
    { title: 'Settings', url: '#', icon: Settings as Component },
    { title: 'Get Help', url: '#', icon: Help as Component },
    { title: 'Search', url: '#', icon: Search as Component },
  ],
}
</script>

<template>
  <Sidebar collapsible="offcanvas">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            as-child
            class="data-[slot=sidebar-menu-button]:p-1.5!"
          >
            <a href="#">
              <IconInnerShadowTop class="size-5!" />
              <span class="text-base font-semibold">Acme Inc.</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
      <NavDocuments :items="data.navDocuments" />
      <NavSecondary :items="data.navSecondary" class="mt-auto" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
  </Sidebar>
</template>
