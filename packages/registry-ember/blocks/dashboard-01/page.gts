// [FORCE-UI] Ember port of registry:block dashboard-01 page
// (React reference: apps/v4/registry/new-york-v4/blocks/dashboard-01/page.tsx)
import { AppSidebar } from './components/app-sidebar.gts';
import { ChartAreaInteractive } from './components/chart-area-interactive.gts';
import { DataTable } from './components/data-table.gts';
import { SectionCards } from './components/section-cards.gts';
import { SiteHeader } from './components/site-header.gts';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import data from './data.json';

import type { TOC } from '@ember/component/template-only';
import type { TableRowData } from './components/data-table.gts';

interface DashboardPageSignature {
  Blocks: { default: [] };
}

const DashboardPage: TOC<DashboardPageSignature> = <template>
  <SidebarProvider
    style="--sidebar-width: calc(var(--spacing) * 72); --header-height: calc(var(--spacing) * 12);"
    class="!min-h-svh"
  >
    <AppSidebar @variant="inset" />
    <SidebarInset>
      <SiteHeader />
      <div class="flex flex-1 flex-col">
        <div class="@container/main flex flex-1 flex-col gap-2">
          <div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <ChartAreaInteractive />
            <DataTable @data={{data}} />
          </div>
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>;

export default DashboardPage;
