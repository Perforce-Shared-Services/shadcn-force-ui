<script setup lang="ts">
// [FORCE-UI] Vue port of registry/new-york-v4/blocks/sidebar-07
import { h } from 'vue'
import TeamSwitcher from './TeamSwitcher.vue'
import NavMain from './NavMain.vue'
import NavProjects from './NavProjects.vue'
import NavUser from './NavUser.vue'
import GraphicEq from '@material-symbols/svg-400/rounded/graphic_eq.svg?component'
import KeyboardCommandKey from '@material-symbols/svg-400/rounded/keyboard_command_key.svg?component'
import Terminal from '@material-symbols/svg-400/rounded/terminal.svg?component'
import SmartToy from '@material-symbols/svg-400/rounded/smart_toy.svg?component'
import MenuBook from '@material-symbols/svg-400/rounded/menu_book.svg?component'
import Tune from '@material-symbols/svg-400/rounded/tune.svg?component'
import DesignServices from '@material-symbols/svg-400/rounded/design_services.svg?component'
import PieChart from '@material-symbols/svg-400/rounded/pie_chart.svg?component'
import Map from '@material-symbols/svg-400/rounded/map.svg?component'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/ui/sidebar'

// Lucide gallery-vertical-end as a functional component.
const GalleryVerticalEnd = () =>
  h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M7 2h10' }),
    h('path', { d: 'M5 6h14' }),
    h('rect', { width: '18', height: '16', x: '3', y: '10', rx: '2' }),
  ])

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    { name: 'Acme Inc', logo: GalleryVerticalEnd, plan: 'Enterprise' },
    { name: 'Acme Corp.', logo: GraphicEq, plan: 'Startup' },
    { name: 'Evil Corp.', logo: KeyboardCommandKey, plan: 'Free' },
  ],
  navMain: [
    {
      title: 'Playground',
      url: '#',
      icon: Terminal,
      isActive: true,
      items: [
        { title: 'History', url: '#' },
        { title: 'Starred', url: '#' },
        { title: 'Settings', url: '#' },
      ],
    },
    {
      title: 'Models',
      url: '#',
      icon: SmartToy,
      items: [
        { title: 'Genesis', url: '#' },
        { title: 'Explorer', url: '#' },
        { title: 'Quantum', url: '#' },
      ],
    },
    {
      title: 'Documentation',
      url: '#',
      icon: MenuBook,
      items: [
        { title: 'Introduction', url: '#' },
        { title: 'Get Started', url: '#' },
        { title: 'Tutorials', url: '#' },
        { title: 'Changelog', url: '#' },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Tune,
      items: [
        { title: 'General', url: '#' },
        { title: 'Team', url: '#' },
        { title: 'Billing', url: '#' },
        { title: 'Limits', url: '#' },
      ],
    },
  ],
  projects: [
    { name: 'Design Engineering', url: '#', icon: DesignServices },
    { name: 'Sales & Marketing', url: '#', icon: PieChart },
    { name: 'Travel', url: '#', icon: Map },
  ],
}
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarHeader>
      <TeamSwitcher :teams="data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
      <NavProjects :projects="data.projects" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
