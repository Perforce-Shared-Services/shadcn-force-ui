// [FORCE-UI] Ember port of registry:block sidebar-08 app-sidebar
// (React reference: apps/v4/registry/new-york-v4/blocks/sidebar-08/components/app-sidebar.tsx)
import { NavMain } from './nav-main-platform.gts';
import { NavProjects } from './nav-projects.gts';
import { NavSecondary } from './nav-secondary.gts';
import { NavUser } from './nav-user.gts';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';

import Calendar from '~icons/ms/calendar_month';
import Home from '~icons/ms/home';
import Inbox from '~icons/ms/inbox';
import Search from '~icons/ms/search';
import Settings from '~icons/ms/settings';
import Sparkles from '~icons/ms/star_half';

import type { ComponentLike } from '@glint/template';
import type { TOC } from '@ember/component/template-only';

interface NavItemWithIcon {
  title: string;
  url: string;
  icon: ComponentLike;
  isActive?: boolean;
  items?: { title: string; url: string }[];
}

const data = {
  navMain: [
    {
      title: 'Search',
      url: '#',
      icon: Search,
    },
    {
      title: 'Ask AI',
      url: '#',
      icon: Sparkles,
    },
    {
      title: 'Home',
      url: '#',
      icon: Home,
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
      icon: Inbox,
      items: [
        { title: 'History', url: '#' },
        { title: 'Starred', url: '#' },
        { title: 'Team', url: '#' },
      ],
    },
    {
      title: 'Calendar',
      url: '#',
      icon: Calendar,
      items: [
        { title: 'Upcoming', url: '#' },
        { title: 'Past', url: '#' },
      ],
    },
  ],
  navSecondary: [
    { title: 'Calendar', url: '#', icon: Calendar },
    { title: 'Settings', url: '#', icon: Settings },
  ],
  projects: [
    { name: 'Design Engineering', url: '#', emoji: '🎨' },
    { name: 'Sales & Marketing', url: '#', emoji: '📈' },
    { name: 'Travel', url: '#', emoji: '✈️' },
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
  <Sidebar @variant="inset" ...attributes>
    <SidebarHeader>
      <NavMain @items={{data.navMain}} />
    </SidebarHeader>
    <SidebarContent>
      <NavProjects @projects={{data.projects}} />
      <NavSecondary @items={{data.navSecondary}} @class="mt-auto" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser @user={{data.user}} />
    </SidebarFooter>
  </Sidebar>
</template>;

export { AppSidebar };
