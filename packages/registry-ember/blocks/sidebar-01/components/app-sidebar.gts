// [FORCE-UI] Ember port of registry:block sidebar-01 app-sidebar
// (React reference: apps/v4/registry/new-york-v4/blocks/sidebar-01/components/app-sidebar.tsx)
import { SearchForm } from './search-form.gts';
import { VersionSwitcher } from './version-switcher.gts';

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

// This is sample data.
const versions = ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'];

const navMain = [
  {
    title: 'Getting Started',
    url: '#',
    items: [
      { title: 'Installation', url: '#' },
      { title: 'Project Structure', url: '#' },
    ],
  },
  {
    title: 'Build Your Application',
    url: '#',
    items: [
      { title: 'Routing', url: '#' },
      { title: 'Data Fetching', url: '#' },
      { title: 'Rendering', url: '#' },
      { title: 'Caching', url: '#' },
      { title: 'Styling', url: '#' },
      { title: 'Optimizing', url: '#' },
      { title: 'Configuring', url: '#' },
      { title: 'Testing', url: '#' },
      { title: 'Authentication', url: '#' },
      { title: 'Deploying', url: '#' },
      { title: 'Upgrading', url: '#' },
      { title: 'Examples', url: '#' },
    ],
  },
  {
    title: 'API Reference',
    url: '#',
    items: [
      { title: 'Components', url: '#' },
      { title: 'File Conventions', url: '#' },
      { title: 'Functions', url: '#' },
      { title: 'next.config.js Options', url: '#' },
      { title: 'CLI', url: '#' },
      { title: 'Edge Runtime', url: '#' },
    ],
  },
];

interface AppSidebarSignature {
  Element: HTMLElement;
  Blocks: { default: [] };
}

const AppSidebar: TOC<AppSidebarSignature> = <template>
  <Sidebar ...attributes>
    <SidebarHeader>
      <VersionSwitcher @versions={{versions}} @defaultVersion="1.0.1" />
      <SearchForm />
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {{#each navMain as |item|}}
              <SidebarMenuItem>
                <SidebarMenuButton @asChild={{true}}>
                  <a href={{item.url}}>{{item.title}}</a>
                </SidebarMenuButton>
                {{#if item.items}}
                  <SidebarMenuSub>
                    {{#each item.items as |child|}}
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton @asChild={{true}}>
                          <a href={{child.url}}>{{child.title}}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    {{/each}}
                  </SidebarMenuSub>
                {{/if}}
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
