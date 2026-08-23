// [FORCE-UI] Ember port of registry:block sidebar-16 page
// (React reference: apps/v4/registry/new-york-v4/blocks/sidebar-16/page.tsx)
import { AppSidebar } from './components/app-sidebar.gts';
import { SiteHeader } from './components/site-header.gts';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import type { TOC } from '@ember/component/template-only';

interface PageSignature {
  Blocks: { default: [] };
}

const Page: TOC<PageSignature> = <template>
  <SidebarProvider class="flex flex-col">
    <SiteHeader />
    <div class="flex flex-1">
      <AppSidebar />
      <SidebarInset>
        <div class="flex flex-1 flex-col gap-4 p-4">
          <div class="grid auto-rows-min gap-4 md:grid-cols-3">
            <div class="aspect-video rounded-xl bg-muted/50"></div>
            <div class="aspect-video rounded-xl bg-muted/50"></div>
            <div class="aspect-video rounded-xl bg-muted/50"></div>
          </div>
          <div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min"></div>
        </div>
      </SidebarInset>
    </div>
  </SidebarProvider>
</template>;

export default Page;
