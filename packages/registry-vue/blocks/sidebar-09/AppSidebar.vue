<script setup lang="ts">
// [FORCE-UI] Vue port of registry/new-york-v4/blocks/sidebar-09
import { h, ref } from 'vue'
import type { Component } from 'vue'
import Inbox from '@material-symbols/svg-400/rounded/inbox.svg?component'
import Draft from '@material-symbols/svg-400/rounded/draft.svg?component'
import SendIcon from '@material-symbols/svg-400/rounded/send.svg?component'
import ArchiveX from '@material-symbols/svg-400/rounded/archive.svg?component'
import AutoDelete from '@material-symbols/svg-400/rounded/auto_delete.svg?component'
import NavUser from './NavUser.vue'
import { Label } from '@/ui/label'
import { Switch } from '@/ui/switch'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/ui/sidebar'

// Lucide command icon as a functional component.
const Command = () =>
  h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' }),
  ])

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    { title: 'Inbox', url: '#', icon: Inbox as Component, isActive: true },
    { title: 'Drafts', url: '#', icon: Draft as Component, isActive: false },
    { title: 'Sent', url: '#', icon: SendIcon as Component, isActive: false },
    { title: 'Junk', url: '#', icon: ArchiveX as Component, isActive: false },
    { title: 'Trash', url: '#', icon: AutoDelete as Component, isActive: false },
  ],
  mails: [
    {
      name: 'William Smith',
      email: 'williamsmith@example.com',
      subject: 'Meeting Tomorrow',
      date: '09:34 AM',
      teaser:
        'Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.',
    },
    {
      name: 'Alice Smith',
      email: 'alicesmith@example.com',
      subject: 'Re: Project Update',
      date: 'Yesterday',
      teaser:
        "Thanks for the update. The project looks great. Let's schedule a call to discuss the next steps.",
    },
    {
      name: 'Bob Johnson',
      email: 'bobjohnson@example.com',
      subject: 'Budget Approval',
      date: '2 days ago',
      teaser:
        'I need your approval for the budget proposal I sent last week. Can we discuss this in detail?',
    },
    {
      name: 'Emily Davis',
      email: 'emilydavis@example.com',
      subject: 'New Idea',
      date: '1 week ago',
      teaser:
        "I have an idea for the new marketing campaign. Let's schedule a brainstorming session.",
    },
    {
      name: 'Michael Brown',
      email: 'michaelbrown@example.com',
      subject: 'Conference Tickets',
      date: '1 week ago',
      teaser:
        'I found tickets for the upcoming tech conference at a discounted price. Are you interested?',
    },
  ],
}

const activeItem = ref(data.navMain[0])
const mails = ref(data.mails)
const { setOpen } = useSidebar()

function selectItem(item: typeof data.navMain[number]) {
  activeItem.value = item
  // ponytail: mirrors React block's random shuffle demo behaviour
  mails.value = [...data.mails].sort(() => Math.random() - 0.5).slice(0, Math.max(5, Math.floor(Math.random() * 10) + 1))
  setOpen(true)
}
</script>

<template>
  <Sidebar
    collapsible="icon"
    class="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
  >
    <!-- This is the first sidebar -->
    <!-- We disable collapsible and adjust width to icon. -->
    <!-- This will make the sidebar appear as icons. -->
    <Sidebar collapsible="none" class="w-[calc(var(--sidebar-width-icon)+1px)]! border-r">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" as-child class="md:h-8 md:p-0">
              <a href="#">
                <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command class="size-4" />
                </div>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-medium">Acme Inc</span>
                  <span class="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent class="px-1.5 md:px-0">
            <SidebarMenu>
              <SidebarMenuItem v-for="item in data.navMain" :key="item.title">
                <SidebarMenuButton
                  :tooltip="item.title"
                  :is-active="activeItem?.title === item.title"
                  class="px-2.5 md:px-2"
                  @click="selectItem(item)"
                >
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser :user="data.user" />
      </SidebarFooter>
    </Sidebar>

    <!-- This is the second sidebar -->
    <!-- We disable collapsible and let it fill remaining space -->
    <Sidebar collapsible="none" class="hidden flex-1 md:flex">
      <SidebarHeader class="gap-3.5 border-b p-4">
        <div class="flex w-full items-center justify-between">
          <div class="text-base font-medium text-foreground">
            {{ activeItem?.title }}
          </div>
          <Label class="flex items-center gap-2 text-sm">
            <span>Unreads</span>
            <Switch class="shadow-none" />
          </Label>
        </div>
        <SidebarInput placeholder="Type to search..." />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup class="px-0">
          <SidebarGroupContent>
            <a
              v-for="mail in mails"
              :key="mail.email"
              href="#"
              class="flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <div class="flex w-full items-center gap-2">
                <span>{{ mail.name }}</span>
                <span class="ml-auto text-xs">{{ mail.date }}</span>
              </div>
              <span class="font-medium">{{ mail.subject }}</span>
              <span class="line-clamp-2 w-[260px] text-xs whitespace-break-spaces">
                {{ mail.teaser }}
              </span>
            </a>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  </Sidebar>
</template>
