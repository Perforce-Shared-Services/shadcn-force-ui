// [FORCE-UI] Ember port of registry:block sidebar-10 page
// (React reference: apps/v4/registry/new-york-v4/blocks/sidebar-10/page.tsx)
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

import type { TOC } from '@ember/component/template-only';

interface PageSignature {
  Blocks: { default: [] };
}

const Page: TOC<PageSignature> = <template>
  <SidebarProvider>
      <SidebarInset>
        <header class="flex h-14 shrink-0 items-center gap-2">
          <div class="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger class="-ml-1" />
            <Separator @orientation="vertical" @class="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem class="hidden md:block">
                  <BreadcrumbLink @href="#">Build Your Application</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator class="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div class="flex flex-1 flex-col gap-4 p-4">
          <div class="grid auto-rows-min gap-4 md:grid-cols-3">
            <div class="aspect-video rounded-xl bg-muted/50"></div>
            <div class="aspect-video rounded-xl bg-muted/50"></div>
            <div class="aspect-video rounded-xl bg-muted/50"></div>
          </div>
          <div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min"></div>
        </div>
    </SidebarInset>
  </SidebarProvider>
</template>;

export default Page;
