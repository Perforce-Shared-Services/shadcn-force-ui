// [FORCE-UI] Ember port of registry:block sidebar-12 app-sidebar
// (React reference: apps/v4/registry/new-york-v4/blocks/sidebar-12/components/app-sidebar.tsx)
import { Calendars } from './calendars.gts';
import { DatePicker } from './date-picker.gts';
import { NavUser } from './nav-user.gts';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar';

import Plus from '~icons/ms/add';

import type { TOC } from '@ember/component/template-only';

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  calendars: [
    { name: 'My Calendars', items: ['Personal', 'Work', 'Family'] },
    { name: 'Favorites', items: ['Holidays', 'Birthdays'] },
    { name: 'Other', items: ['Travel', 'Reminders', 'Deadlines'] },
  ],
};

interface AppSidebarSignature {
  Element: HTMLElement;
  Blocks: { default: [] };
}

const AppSidebar: TOC<AppSidebarSignature> = <template>
  <Sidebar ...attributes>
    <SidebarHeader class="h-16 border-b border-sidebar-border">
      <NavUser @user={{data.user}} />
    </SidebarHeader>
    <SidebarContent>
      <DatePicker />
      <SidebarSeparator class="mx-0" />
      <Calendars @calendars={{data.calendars}} />
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Plus />
            <span>New Calendar</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>;

export { AppSidebar };
