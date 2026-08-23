// [FORCE-UI] Ember port of registry:block sidebar-05 app-sidebar
// (React reference: apps/v4/registry/new-york-v4/blocks/sidebar-05/components/app-sidebar.tsx)
import { SearchForm } from './search-form.gts';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar';

import type { TOC } from '@ember/component/template-only';

const navMain = [
  { title: 'Installation', url: '#' },
  { title: 'Project Structure', url: '#' },
  { title: 'Routing', url: '#' },
  { title: 'Data Fetching', url: '#' },
  { title: 'Rendering', url: '#' },
  { title: 'Caching', url: '#' },
  { title: 'Styling', url: '#' },
  { title: 'Optimizing', url: '#' },
  { title: 'Configuring', url: '#' },
  { title: 'Testing', url: '#' },
  { title: 'Components', url: '#' },
  { title: 'File Conventions', url: '#' },
  { title: 'Functions', url: '#' },
  { title: 'next.config.js Options', url: '#' },
  { title: 'CLI', url: '#' },
  { title: 'Edge Runtime', url: '#' },
];

interface AppSidebarSignature {
  Element: HTMLElement;
  Blocks: { default: [] };
}

const AppSidebar: TOC<AppSidebarSignature> = <template>
  <Sidebar ...attributes>
    <SidebarHeader>
      <SearchForm />
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Getting Started</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {{#each navMain as |item|}}
              <SidebarMenuItem>
                <SidebarMenuButton @asChild={{true}}>
                  <a href={{item.url}}>{{item.title}}</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            {{/each}}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarRail />
  </Sidebar>
</template>;

export { AppSidebar };
