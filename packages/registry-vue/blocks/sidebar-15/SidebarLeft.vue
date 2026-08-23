<script setup lang="ts">
// [FORCE-UI] Vue port of registry/new-york-v4/blocks/sidebar-15
import { h } from 'vue'
import type { Component } from 'vue'
import TeamSwitcher from './TeamSwitcher.vue'
import NavMain from './NavMain.vue'
import NavFavorites from './NavFavorites.vue'
import NavWorkspaces from './NavWorkspaces.vue'
import NavSecondary from './NavSecondary.vue'
import Search from '@material-symbols/svg-400/rounded/search.svg?component'
import Stars from '@material-symbols/svg-400/rounded/stars.svg?component'
import Home from '@material-symbols/svg-400/rounded/home.svg?component'
import Inbox from '@material-symbols/svg-400/rounded/inbox.svg?component'
import CalendarMonth from '@material-symbols/svg-400/rounded/calendar_month.svg?component'
import Tune from '@material-symbols/svg-400/rounded/tune.svg?component'
import ViewQuilt from '@material-symbols/svg-400/rounded/view_quilt.svg?component'
import Delete from '@material-symbols/svg-400/rounded/delete.svg?component'
import HelpCenter from '@material-symbols/svg-400/rounded/help_center.svg?component'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/ui/sidebar'

// Lucide command icon as a functional component.
const Command = () =>
  h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' }),
  ])

// This is sample data.
const data = {
  teams: [
    { name: 'Acme Inc', logo: Command, plan: 'Enterprise' },
    { name: 'Acme Corp.', logo: Command, plan: 'Startup' },
    { name: 'Evil Corp.', logo: Command, plan: 'Free' },
  ],
  navMain: [
    { title: 'Search', url: '#', icon: Search as Component },
    { title: 'Ask AI', url: '#', icon: Stars as Component },
    { title: 'Home', url: '#', icon: Home as Component, isActive: true },
    { title: 'Inbox', url: '#', icon: Inbox as Component, badge: '10' },
  ],
  navSecondary: [
    { title: 'Calendar', url: '#', icon: CalendarMonth as Component },
    { title: 'Settings', url: '#', icon: Tune as Component },
    { title: 'Templates', url: '#', icon: ViewQuilt as Component },
    { title: 'Trash', url: '#', icon: Delete as Component },
    { title: 'Help', url: '#', icon: HelpCenter as Component },
  ],
  favorites: [
    { name: 'Project Management & Task Tracking', url: '#', emoji: '📊' },
    { name: 'Family Recipe Collection & Meal Planning', url: '#', emoji: '🍳' },
    { name: 'Fitness Tracker & Workout Routines', url: '#', emoji: '💪' },
    { name: 'Book Notes & Reading List', url: '#', emoji: '📚' },
    { name: 'Sustainable Gardening Tips & Plant Care', url: '#', emoji: '🌱' },
    { name: 'Language Learning Progress & Resources', url: '#', emoji: '🗣️' },
    { name: 'Home Renovation Ideas & Budget Tracker', url: '#', emoji: '🏠' },
    { name: 'Personal Finance & Investment Portfolio', url: '#', emoji: '💰' },
    { name: 'Movie & TV Show Watchlist with Reviews', url: '#', emoji: '🎬' },
  ],
  workspaces: [
    {
      name: 'Personal Life Management',
      emoji: '🏠',
      pages: [
        { name: 'Daily Journal & Reflection', url: '#', emoji: '📔' },
        { name: 'Health & Wellness Tracker', url: '#', emoji: '🍏' },
        { name: 'Personal Growth & Learning Goals', url: '#', emoji: '🌟' },
      ],
    },
    {
      name: 'Professional Development',
      emoji: '💼',
      pages: [
        { name: 'Career Objectives & Milestones', url: '#', emoji: '🎯' },
        { name: 'Skill Acquisition & Training Log', url: '#', emoji: '🧠' },
        { name: 'Networking Contacts & Events', url: '#', emoji: '🤝' },
      ],
    },
  ],
}
</script>

<template>
  <Sidebar class="border-r-0">
    <SidebarHeader>
      <TeamSwitcher :teams="data.teams" />
      <NavMain :items="data.navMain" />
    </SidebarHeader>
    <SidebarContent>
      <NavFavorites :favorites="data.favorites" />
      <NavWorkspaces :workspaces="data.workspaces" />
      <NavSecondary :items="data.navSecondary" class="mt-auto" />
    </SidebarContent>
    <SidebarRail />
  </Sidebar>
</template>
