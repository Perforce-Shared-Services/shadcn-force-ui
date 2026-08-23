// [FORCE-UI] Ember port of registry:block sidebar-16 site-header
// (React reference: apps/v4/registry/new-york-v4/blocks/sidebar-16/components/site-header.tsx)
import { SearchForm } from './search-form.gts';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import SidebarPanelIcon from '~icons/ms/left_panel_open';

import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import { consume } from 'ember-provide-consume-context';

import type { TOC } from '@ember/component/template-only';

const SidebarContext = 'sidebar-context' as const;

interface SidebarContextValue {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
}

interface ContextRegistry {
  [SidebarContext]: SidebarContextValue;
}

interface SiteHeaderSignature {
  Element: HTMLElement;
  Blocks: { default: [] };
}

class SiteHeaderComponent extends Component<SiteHeaderSignature> {
  @consume(SidebarContext) context!: ContextRegistry[typeof SidebarContext];

  <template>
  <header class="bg-background sticky top-0 z-50 flex w-full items-center border-b" ...attributes>
    <div class="flex h-(--header-height) w-full items-center gap-2 px-4">
      <Button
        class="h-8 w-8"
        @variant="ghost"
        @size="icon"
        {{on "click" this.context.toggleSidebar}}
      >
        <SidebarPanelIcon />
        <span class="sr-only">Toggle Sidebar</span>
      </Button>
      <Separator @orientation="vertical" @class="mr-2 h-4" />
      <Breadcrumb class="hidden sm:block">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink @href="#">Build Your Application</BreadcrumbLink>
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
</template>;

}

export { SiteHeaderComponent as SiteHeader };
