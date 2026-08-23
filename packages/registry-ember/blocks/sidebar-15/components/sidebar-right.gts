// [FORCE-UI] Ember port of registry:block sidebar-15 sidebar-right
// (React reference: apps/v4/registry/new-york-v4/blocks/sidebar-15/components/sidebar-right.tsx)
import { Calendars } from './calendars.gts';
import { DatePicker } from './date-picker.gts';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

import Plus from '~icons/ms/add';

import type { TOC } from '@ember/component/template-only';

const data = {
  calendars: [
    { name: 'Work', items: ['Meetings', 'Deadlines'] },
    { name: 'Personal', items: ['Gym', 'Family'] },
  ],
};

interface SidebarRightSignature {
  Element: HTMLElement;
  Blocks: { default: [] };
}

const SidebarRight: TOC<SidebarRightSignature> = <template>
  <Sidebar
    @collapsible="none"
    class="top-(--header-height) h-[calc(100svh-(--spacing)*14)] border-l"
    ...attributes
  >
    <SidebarHeader class="bg-sidebar-accent flex h-(--header-height) items-center justify-center border-b">
      <SidebarMenu>
        <SidebarMenuButton @asChild={{true}}>
          <a href="#" class="font-medium">October 2024</a>
        </SidebarMenuButton>
        <SidebarMenuButton>
          <Plus />
          <span>New Event</span>
        </SidebarMenuButton>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent class="overflow-hidden">
      <DatePicker />
      <SidebarGroup>
        <SidebarGroupLabel>Upcoming</SidebarGroupLabel>
        <SidebarGroupContent>
          <Calendars @calendars={{data.calendars}} />
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>;

export { SidebarRight };
