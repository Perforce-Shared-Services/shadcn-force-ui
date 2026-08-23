<script setup lang="ts">
// [FORCE-UI] Vue port of registry/new-york-v4/blocks/dashboard-01
import AppSidebar from './AppSidebar.vue'
import ChartAreaInteractive from './ChartAreaInteractive.vue'
import DataTable from './DataTable.vue'
import SectionCards from './SectionCards.vue'
import SiteHeader from './SiteHeader.vue'
import {
  SidebarInset,
  SidebarProvider,
} from '@/ui/sidebar'
import data from './data.json'
</script>

<template>
  <SidebarProvider
    style="--sidebar-width: calc(var(--spacing) * 72); --header-height: calc(var(--spacing) * 12)"
  >
    <AppSidebar variant="inset" />
    <SidebarInset>
      <SiteHeader />
      <div class="flex flex-1 flex-col">
        <div class="@container/main flex flex-1 flex-col gap-2">
          <div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div class="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable :data="data" />
          </div>
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
