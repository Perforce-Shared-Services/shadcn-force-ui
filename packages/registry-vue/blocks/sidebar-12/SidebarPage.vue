<script setup lang="ts">
// [FORCE-UI] Vue port of registry/new-york-v4/blocks/sidebar-12
import AppSidebar from './AppSidebar.vue'
import { Separator } from '@/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/ui/breadcrumb'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/ui/sidebar'

const placeholderDays = Array.from({ length: 20 })
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header class="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
        <SidebarTrigger class="-ml-1" />
        <Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>October 2024</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4">
        <div class="grid auto-rows-min gap-4 md:grid-cols-5">
          <div
            v-for="(day, i) in placeholderDays"
            :key="i"
            class="aspect-square rounded-xl bg-muted/50"
          />
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
