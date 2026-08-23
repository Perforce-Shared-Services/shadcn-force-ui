<script setup lang="ts">
// [FORCE-UI] Vue port of registry/new-york-v4/blocks/sidebar-01
import { ref } from 'vue'
import Check from '@material-symbols/svg-400/rounded/check.svg?component'
import ChevronsUpDown from '@material-symbols/svg-400/rounded/unfold_more.svg?component'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/ui/sidebar'

const props = defineProps<{
  versions: string[]
  defaultVersion: string
}>()

const selectedVersion = ref(props.defaultVersion)
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <!-- lucide gallery-vertical-end -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                <path d="M7 2h10" /><path d="M5 6h14" /><rect width="18" height="16" x="3" y="10" rx="2" />
              </svg>
            </div>
            <div class="flex flex-col gap-0.5 leading-none">
              <span class="font-medium">Documentation</span>
              <span>v{{ selectedVersion }}</span>
            </div>
            <ChevronsUpDown class="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-(--radix-dropdown-menu-trigger-width)" align="start">
          <DropdownMenuItem
            v-for="version in versions"
            :key="version"
            @select="selectedVersion = version"
          >
            v{{ version }}
            <Check v-if="version === selectedVersion" class="ml-auto" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
