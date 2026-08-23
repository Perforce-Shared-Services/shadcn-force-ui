// [FORCE-UI] Ember port of registry:block dashboard-01 app-sidebar
// (React reference: apps/v4/registry/new-york-v4/blocks/dashboard-01/components/app-sidebar.tsx)
// Tabler icons mapped to Material Symbols equivalents.
import type { TOC } from '@ember/component/template-only';
import { or } from 'ember-truth-helpers';
import { NavMain } from './nav-main.gts';
import { NavUser } from './nav-user.gts';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import type { ComponentLike } from '@glint/template';
interface NavItem {
  title: string;
  url: string;
  icon: ComponentLike;
  isActive?: boolean;
  items?: { title: string; url: string }[];
}

interface User {
  name: string;
  email: string;
  avatar: string;
}

import Frame from '~icons/ms/crop_free';
import ChartBar from '~icons/ms/leaderboard';
import ListDetails from '~icons/ms/format_list_bulleted';
import Folder from '~icons/ms/folder';
import Database from '~icons/ms/database';

const data: {
  user: User;
  navMain: NavItem[];
} = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    { title: 'Dashboard', url: '#', icon: Frame },
    { title: 'Lifecycle', url: '#', icon: ListDetails },
    { title: 'Analytics', url: '#', icon: ChartBar },
    { title: 'Projects', url: '#', icon: Folder },
    { title: 'Team', url: '#', icon: Database },
  ],
};

interface AppSidebarSignature {
  Element: HTMLElement;
  Args: {
    variant?: 'sidebar' | 'floating' | 'inset';
  };
  Blocks: { default: [] };
}

const AppSidebar: TOC<AppSidebarSignature> = <template>
  <Sidebar @variant={{or @variant "inset"}} ...attributes>
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton @size="lg" @asChild={{true}}>
            <a href="#">
              <div
                class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
              >
                <Frame class="size-4" />
              </div>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-medium">Acme Inc</span>
                <span class="truncate text-xs">Enterprise</span>
              </div>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <NavMain @items={{data.navMain}} />
    </SidebarContent>
    <SidebarFooter>
      <NavUser @user={{data.user}} />
    </SidebarFooter>
  </Sidebar>
</template>;

export { AppSidebar };
