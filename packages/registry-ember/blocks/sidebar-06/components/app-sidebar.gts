// [FORCE-UI] Ember port of registry:block sidebar-06 app-sidebar
// (React reference: apps/v4/registry/new-york-v4/blocks/sidebar-06/components/app-sidebar.tsx)
import { NavMain } from './nav-main-dropdown.gts';
import { SidebarOptInForm } from './sidebar-opt-in-form.gts';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';

import type { TOC } from '@ember/component/template-only';

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
      <SidebarOptInForm />
    </SidebarHeader>
    <SidebarContent>
      <NavMain @items={{navMain}} />
    </SidebarContent>
    <SidebarFooter />
  </Sidebar>
</template>;

export { AppSidebar };
