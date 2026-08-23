<script setup lang="ts">
// [FORCE-UI] Vue port of registry/new-york-v4/blocks/sidebar-16
import SidebarIcon from '@material-symbols/svg-400/rounded/left_panel_open.svg?component'
import SearchForm from './SearchForm.vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/ui/breadcrumb'
import { Button } from '@/ui/button'
import { Separator } from '@/ui/separator'
import { useSidebar } from '@/ui/sidebar'

const { toggleSidebar } = useSidebar()
</script>

<template>
  <header class="sticky top-0 z-50 flex w-full items-center border-b bg-background">
    <div class="flex h-(--header-height) w-full items-center gap-2 px-4">
      <Button
        class="h-8 w-8"
        variant="ghost"
        size="icon"
        @click="toggleSidebar"
      >
        <SidebarIcon />
      </Button>
      <Separator orientation="vertical" class="mr-2 h-4" />
      <Breadcrumb class="hidden sm:block">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Build Your Application</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Data Fetching</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <SearchForm class="w-full sm:ml-auto sm:w-auto" />
    </div>
  </header>
</template>
