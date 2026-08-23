// [FORCE-UI] Ember port of registry:block sidebar-16 app-sidebar
// (React reference: apps/v4/registry/new-york-v4/blocks/sidebar-16/components/app-sidebar.tsx)
import { NavMain } from './nav-main-platform.gts';
import { NavProjects } from './nav-projects.gts';
import { NavSecondary } from './nav-secondary.gts';
import { NavUser } from './nav-user.gts';
import { SearchForm } from './search-form.gts';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import GalleryVerticalEnd from '~icons/ms/view_agenda';

import type { TOC } from '@ember/component/template-only';

import Folder from '~icons/ms/folder';
import Forward from '~icons/ms/forward';
import MapIcon from '~icons/ms/map';
import CalendarIcon from '~icons/ms/calendar_month';
import HomeIcon from '~icons/ms/home';
import InboxIcon from '~icons/ms/inbox';
import SearchIcon from '~icons/ms/search';
import SettingsIcon from '~icons/ms/settings';
import SparklesIcon from '~icons/ms/auto_awesome_mosaic';

const data = {
  navMain: [
    {
      title: 'Search',
      url: '#',
      icon: SearchIcon,
    },
    {
      title: 'Ask AI',
      url: '#',
      icon: SparklesIcon,
    },
    {
      title: 'Home',
      url: '#',
      icon: HomeIcon,
      isActive: true,
      items: [
        { title: 'Playground', url: '#' },
        { title: 'Step by Step', url: '#' },
        { title: 'Final', url: '#' },
      ],
    },
    {
      title: 'Inbox',
      url: '#',
      icon: InboxIcon,
      items: [
        { title: 'History', url: '#' },
        { title: 'Starred', url: '#' },
        { title: 'Team', url: '#' },
      ],
    },
    {
      title: 'Calendar',
      url: '#',
      icon: CalendarIcon,
      items: [
        { title: 'Upcoming', url: '#' },
        { title: 'Past', url: '#' },
      ],
    },
  ],
  navSecondary: [
    { title: 'Calendar', url: '#', icon: CalendarIcon },
    { title: 'Settings', url: '#', icon: SettingsIcon },
  ],
  projects: [
    { name: 'Design Engineering', url: '#', icon: Folder },
    { name: 'Sales & Marketing', url: '#', icon: Forward },
    { name: 'Travel', url: '#', icon: MapIcon },
  ],
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
};

interface AppSidebarSignature {
  Element: HTMLElement;
  Blocks: { default: [] };
}

const AppSidebar: TOC<AppSidebarSignature> = <template>
  <Sidebar ...attributes>
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton @size="lg">
            <div class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <GalleryVerticalEnd class="size-4" />
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">Acme Inc</span>
              <span class="truncate text-xs">Enterprise</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <NavMain @items={{data.navMain}} />
      {{! search form lives in site-header for this block }}
    </SidebarContent>
    <SidebarFooter>
      <NavUser @user={{data.user}} />
    </SidebarFooter>
  </Sidebar>
</template>;

export { AppSidebar };
