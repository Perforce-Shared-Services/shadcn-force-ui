// [FORCE-UI] Ember port of registry:block sidebar-02 app-sidebar
// (React reference: apps/v4/registry/new-york-v4/blocks/sidebar-02/components/app-sidebar.tsx)
import { SearchForm } from './search-form.gts';
import { VersionSwitcher } from './version-switcher.gts';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
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

import ChevronRight from '~icons/ms/chevron_right';

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
              <Collapsible class="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger @asChild={{true}} as |trigger|>
                    <SidebarMenuButton {{trigger.modifiers}}>
                      <span>{{item.title}}</span>
                      <ChevronRight
                        class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {{#each item.items as |child|}}
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton @asChild={{true}}>
                            <a href={{child.url}}>{{child.title}}</a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      {{/each}}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            {{/each}}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarRail />
  </Sidebar>
</template>;

export { AppSidebar };
