// [FORCE-UI] Ember port of registry:block sidebar-09 app-sidebar
// (React reference: apps/v4/registry/new-york-v4/blocks/sidebar-09/components/app-sidebar.tsx)
// ponytail: mail list is static (no shuffle-on-click) — cosmetic behavior only.
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { NavUser } from './nav-user.gts';
import { Label } from '@/components/ui/label';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
    SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  } from '@/components/ui/sidebar';

import { Switch } from '@/components/ui/switch';

import ArchiveX from '~icons/ms/archive';
import CommandIcon from '~icons/ms/keyboard_command_key';
import FileIcon from '~icons/ms/draft';
import InboxIcon from '~icons/ms/inbox';
import SendIcon from '~icons/ms/send';
import TrashIcon from '~icons/ms/delete';

// This is sample data
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    { title: 'Inbox', url: '#', icon: InboxIcon, isActive: true },
    { title: 'Drafts', url: '#', icon: FileIcon, isActive: false },
    { title: 'Sent', url: '#', icon: SendIcon, isActive: false },
    { title: 'Junk', url: '#', icon: ArchiveX, isActive: false },
    { title: 'Trash', url: '#', icon: TrashIcon, isActive: false },
  ],
  mails: [
    {
      name: 'William Smith',
      email: 'williamsmith@example.com',
      subject: 'Meeting Tomorrow',
      date: '09:34 AM',
      teaser:
        'Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.',
    },
    {
      name: 'Alice Smith',
      email: 'alicesmith@example.com',
      subject: 'Re: Project Update',
      date: 'Yesterday',
      teaser:
        'Thanks for the update. The progress looks great so far.\nLet\'s schedule a call to discuss the next steps.',
    },
    {
      name: 'Bob Johnson',
      email: 'bobjohnson@example.com',
      subject: 'Weekend Plans',
      date: '12:45 PM',
      teaser:
        "Hey everyone! I'm thinking of organizing a hiking trip this weekend. Let me know if you're interested.",
    },
  ],
};

interface AppSidebarSignature {
  Element: HTMLElement;
  Blocks: { default: [] };
}

class AppSidebarComponent extends Component<AppSidebarSignature> {
  @tracked activeTitle: string = 'Inbox';

  setActive = (title: string) => {
    this.activeTitle = title;
  };

  <template>
    <Sidebar
      @collapsible="icon"
      class="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      ...attributes
    >
      {{! first, icon-only panel }}
      <Sidebar @collapsible="none" class="w-[calc(var(--sidebar-width-icon)+1px)]! border-r">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton @asChild={{true}} @size="lg" class="md:h-8 md:p-0">
                <a href="#">
                  <div class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <CommandIcon class="size-4" />
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
          <SidebarGroup>
            <SidebarGroupContent class="px-1.5 md:px-0">
              <SidebarMenu>
                {{#each data.navMain as |item|}}
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      @tooltip={{item.title}}
                      {{on "click" (fn this.setActive item.title)}}
                      @isActive={{eq this.activeTitle item.title}}
                      class="px-2.5 md:px-2"
                    >
                      <item.icon />
                      <span>{{item.title}}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                {{/each}}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser @user={{data.user}} />
        </SidebarFooter>
      </Sidebar>

      {{! second, list panel }}
      <Sidebar @collapsible="none" class="hidden flex-1 md:flex">
        <SidebarHeader class="gap-3.5 border-b p-4">
          <div class="flex w-full items-center justify-between">
            <div class="text-foreground text-base font-medium">
              {{this.activeTitle}}
            </div>
            <Label class="flex items-center gap-2 text-sm">
              <span>Unreads</span>
              <Switch class="shadow-none" />
            </Label>
          </div>
          <SidebarInput placeholder="Type to search..." />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup class="px-0">
            <SidebarGroupContent>
              {{#each data.mails as |mail|}}
                <a
                  href="#"
                  class="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0"
                >
                  <div class="flex w-full items-center gap-2">
                    <span>{{mail.name}}</span>
                    <span class="ml-auto text-xs">{{mail.date}}</span>
                  </div>
                  <span class="font-medium">{{mail.subject}}</span>
                  <span class="line-clamp-2 w-[260px] text-xs whitespace-break-spaces">
                    {{mail.teaser}}
                  </span>
                </a>
              {{/each}}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  </template>;
}

export { AppSidebarComponent as AppSidebar };
