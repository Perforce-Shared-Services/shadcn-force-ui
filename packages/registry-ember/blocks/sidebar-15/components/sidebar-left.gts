// [FORCE-UI] Ember port of registry:block sidebar-15 sidebar-left
// (React reference: apps/v4/registry/new-york-v4/blocks/sidebar-15/components/sidebar-left.tsx)
import { Calendars } from './calendars.gts';
import { NavFavorites } from './nav-favorites.gts';
import { NavMain } from './nav-main-plain.gts';
import { NavSecondary } from './nav-secondary.gts';
import { NavWorkspaces } from './nav-workspaces.gts';
import { TeamSwitcher } from './team-switcher.gts';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

import type { ComponentLike } from '@glint/template';
import type { TOC } from '@ember/component/template-only';

import AudioWaveform from '~icons/ms/graphic_eq';
import BlocksIcon from '~icons/ms/view_module';
import CalendarIcon from '~icons/ms/calendar_month';
import CommandIcon from '~icons/ms/keyboard_command_key';
import HomeIcon from '~icons/ms/home';
import InboxIcon from '~icons/ms/inbox';
import QuestionIcon from '~icons/ms/help';
import SearchIcon from '~icons/ms/search';
import SettingsIcon from '~icons/ms/settings';
import SparklesIcon from '~icons/ms/auto_awesome_mosaic';
import TrashIcon from '~icons/ms/delete';

// This is sample data.
const data = {
  teams: [
    { name: 'Acme Inc', logo: CommandIcon, plan: 'Enterprise' },
    { name: 'Acme Corp.', logo: AudioWaveform, plan: 'Startup' },
    { name: 'Evil Corp.', logo: CommandIcon, plan: 'Free' },
  ],
  navMain: [
    { title: 'Search', url: '#', icon: SearchIcon },
    { title: 'Ask AI', url: '#', icon: SparklesIcon },
    { title: 'Home', url: '#', icon: HomeIcon, isActive: true },
    { title: 'Inbox', url: '#', icon: InboxIcon, badge: '10' },
  ],
  navSecondary: [
    { title: 'Calendar', url: '#', icon: CalendarIcon },
    { title: 'Settings', url: '#', icon: SettingsIcon },
    { title: 'Templates', url: '#', icon: BlocksIcon },
    { title: 'Trash', url: '#', icon: TrashIcon },
    { title: 'Help', url: '#', icon: QuestionIcon },
  ],
  calendars: [
    { name: 'My Calendars', items: ['Design Systems', 'Team Sync', 'Product Roadmap'] },
    { name: 'Others', items: ['Launch Planning', 'Birthdays'] },
  ],
  favorites: [
    { name: 'Project Management & Task Tracking', url: '#', emoji: '📊' },
    { name: 'Family Recipe Collection & Meal Planning', url: '#', emoji: '🍳' },
    { name: 'Fitness Tracker & Workout Routines', url: '#', emoji: '💪' },
    { name: 'Book Notes & Reading List', url: '#', emoji: '📚' },
  ],
  workspaces: [
    {
      name: 'Personal',
      emoji: '🏠',
      pages: [
        { name: 'Code Journal', emoji: '💻' },
        { name: 'Home Improvements', emoji: '🔧' },
      ],
    },
  ],
};

interface SidebarLeftSignature {
  Element: HTMLElement;
  Blocks: { default: [] };
}

const SidebarLeft: TOC<SidebarLeftSignature> = <template>
  <Sidebar class="border-r-0" ...attributes>
    <SidebarHeader>
      <TeamSwitcher @teams={{data.teams}} />
    </SidebarHeader>
    <SidebarContent>
      <NavMain @items={{data.navMain}} />
      <NavFavorites @favorites={{data.favorites}} />
      <NavWorkspaces @workspaces={{data.workspaces}} />
      <Calendars @calendars={{data.calendars}} />
      <NavSecondary @items={{data.navSecondary}} @class="mt-auto" />
    </SidebarContent>
    <SidebarRail />
  </Sidebar>
</template>;

export { SidebarLeft };
