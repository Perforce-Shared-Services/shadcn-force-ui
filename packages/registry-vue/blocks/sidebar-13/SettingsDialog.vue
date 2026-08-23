<script setup lang="ts">
// [FORCE-UI] Vue port of registry/new-york-v4/blocks/sidebar-13
import { ref } from 'vue'
import type { Component } from 'vue'
import Notifications from '@material-symbols/svg-400/rounded/notifications.svg?component'
import Menu from '@material-symbols/svg-400/rounded/menu.svg?component'
import Home from '@material-symbols/svg-400/rounded/home.svg?component'
import Paintbrush from '@material-symbols/svg-400/rounded/format_paint.svg?component'
import Chat from '@material-symbols/svg-400/rounded/chat.svg?component'
import Globe from '@material-symbols/svg-400/rounded/globe.svg?component'
import Keyboard from '@material-symbols/svg-400/rounded/keyboard.svg?component'
import Check from '@material-symbols/svg-400/rounded/check.svg?component'
import Video from '@material-symbols/svg-400/rounded/videocam.svg?component'
import LinkIcon from '@material-symbols/svg-400/rounded/link.svg?component'
import Lock from '@material-symbols/svg-400/rounded/lock.svg?component'
import Settings from '@material-symbols/svg-400/rounded/settings.svg?component'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/ui/breadcrumb'
import { Button } from '@/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/ui/sidebar'

const data = {
  nav: [
    { name: 'Notifications', icon: Notifications as Component },
    { name: 'Navigation', icon: Menu as Component },
    { name: 'Home', icon: Home as Component },
    { name: 'Appearance', icon: Paintbrush as Component },
    { name: 'Messages & media', icon: Chat as Component },
    { name: 'Language & region', icon: Globe as Component },
    { name: 'Accessibility', icon: Keyboard as Component },
    { name: 'Mark as read', icon: Check as Component },
    { name: 'Audio & video', icon: Video as Component },
    { name: 'Connected accounts', icon: LinkIcon as Component },
    { name: 'Privacy & visibility', icon: Lock as Component },
    { name: 'Advanced', icon: Settings as Component },
  ],
}

const open = ref(true)
const placeholderRows = Array.from({ length: 10 })
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button size="sm">Open Dialog</Button>
    </DialogTrigger>
    <DialogContent class="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
      <DialogTitle class="sr-only">Settings</DialogTitle>
      <DialogDescription class="sr-only">
        Customize your settings here.
      </DialogDescription>
      <SidebarProvider class="items-start">
        <Sidebar collapsible="none" class="hidden md:flex">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem v-for="item in data.nav" :key="item.name">
                    <SidebarMenuButton as-child :is-active="item.name === 'Messages & media'">
                      <a href="#">
                        <component :is="item.icon" />
                        <span>{{ item.name }}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main class="flex h-[480px] flex-1 flex-col overflow-hidden">
          <header class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div class="flex items-center gap-2 px-4">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem class="hidden md:block">
                    <BreadcrumbLink href="#">Settings</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator class="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Messages & media</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div class="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
            <div
              v-for="(row, i) in placeholderRows"
              :key="i"
              class="aspect-video max-w-3xl rounded-xl bg-muted/50"
            />
          </div>
        </main>
      </SidebarProvider>
    </DialogContent>
  </Dialog>
</template>
