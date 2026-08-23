// [FORCE-UI] Ember port of registry:block sidebar-10 app-sidebar
// (React reference: apps/v4/registry/new-york-v4/blocks/sidebar-10/components/app-sidebar.tsx)
import { NavActions } from './nav-actions.gts';
import { NavFavorites } from './nav-favorites.gts';
import { NavMain } from './nav-main-plain.gts';
import { NavSecondary } from './nav-secondary.gts';
import { NavWorkspaces } from './nav-workspaces.gts';
import { TeamSwitcher } from './team-switcher.gts';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';

import GalleryVerticalEndLogo from '~icons/ms/view_agenda';
import AudioWaveformLogo from '~icons/ms/graphic_eq';
import CommandLogo from '~icons/ms/keyboard_command_key';

import type { ComponentLike } from '@glint/template';
import type { TOC } from '@ember/component/template-only';

import BlocksIcon from '~icons/ms/view_module';
import CalendarIcon from '~icons/ms/calendar_month';
import HomeIcon from '~icons/ms/home';
import InboxIcon from '~icons/ms/inbox';
import SearchIcon from '~icons/ms/search';
import SettingsIcon from '~icons/ms/settings';
import SparklesIcon from '~icons/ms/auto_awesome_mosaic';
import TrashIcon from '~icons/ms/delete';
import HelpIcon from '~icons/ms/help';

interface WorkspacePage { name: string; emoji: string }

const data: {
  teams: { name: string; logo: ComponentLike; plan: string }[];
  navMain: { title: string; url: string; icon: ComponentLike; isActive?: boolean; badge?: string }[];
  navSecondary: { title: string; url: string; icon: ComponentLike }[];
  favorites: { name: string; url: string; emoji: string }[];
  workspaces: { name: string; emoji: string; pages: WorkspacePage[] }[];
} = {
  teams: [
    { name: 'Acme Inc', logo: GalleryVerticalEndLogo, plan: 'Enterprise' },
    { name: 'Acme Corp.', logo: AudioWaveformLogo, plan: 'Startup' },
    { name: 'Evil Corp.', logo: CommandLogo, plan: 'Free' },
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
    { title: 'Help', url: '#', icon: HelpIcon },
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
    {
      name: 'Work',
      emoji: '💼',
      pages: [
        { name: 'Meeting Notes', emoji: '📝' },
        { name: 'Projects', emoji: '📁' },
      ],
    },
  ],
};

interface AppSidebarSignature {
  Element: HTMLElement;
  Blocks: { default: [] };
}

const AppSidebar: TOC<AppSidebarSignature> = <template>
  <Sidebar class="border-r-0" ...attributes>
    <SidebarHeader>
      <TeamSwitcher @teams={{data.teams}} />
      <NavActions />
    </SidebarHeader>
    <SidebarContent>
      <NavMain @items={{data.navMain}} />
      <NavFavorites @favorites={{data.favorites}} />
      <NavWorkspaces @workspaces={{data.workspaces}} />
      <NavSecondary @items={{data.navSecondary}} @class="mt-auto" />
    </SidebarContent>
    <SidebarFooter />
  </Sidebar>
</template>;

export { AppSidebar };
