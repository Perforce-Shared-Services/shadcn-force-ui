// [FORCE-UI] Ember port of sidebar block nav-main (dropdown variant)
// (React reference: apps/v4/registry/new-york-v4/blocks/sidebar-06/components/nav-main.tsx)
import { fn } from '@ember/helper';
import Component from '@glimmer/component';
import { consume } from 'ember-provide-consume-context';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import MoreHorizontal from '~icons/ms/more_horiz';

const SidebarContext = 'sidebar-context' as const;

interface SidebarContextValue {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
}

interface ContextRegistry {
  [SidebarContext]: SidebarContextValue;
}

export interface NavItem {
  title: string;
  url: string;
  items?: {
    title: string;
    url: string;
  }[];
}

interface NavMainSignature {
  Element: HTMLDivElement;
  Args: { items: NavItem[] };
  Blocks: { default: [] };
}

class NavMainComponent extends Component<NavMainSignature> {
  @consume(SidebarContext) context!: ContextRegistry[typeof SidebarContext];

  <template>
    <SidebarGroup>
      <SidebarMenu>
        {{#each @items as |item|}}
          <DropdownMenu>
            <SidebarMenuItem>
              <DropdownMenuTrigger @asChild={{true}} as |trigger|>
                <SidebarMenuButton
                  class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  {{trigger.modifiers}}
                >
                  {{item.title}}
                  <MoreHorizontal class="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              {{#if item.items.length}}
                <DropdownMenuContent
                  @side={{if this.context.isMobile "bottom" "right"}}
                  @align={{if this.context.isMobile "end" "start"}}
                  class="min-w-56 rounded-lg"
                >
                  {{#each item.items as |subItem|}}
                    <DropdownMenuItem @asChild={{true}}>
                      <a href={{subItem.url}}>{{subItem.title}}</a>
                    </DropdownMenuItem>
                  {{/each}}
                </DropdownMenuContent>
              {{/if}}
            </SidebarMenuItem>
          </DropdownMenu>
        {{/each}}
      </SidebarMenu>
    </SidebarGroup>
  </template>
}

export { NavMainComponent as NavMain };
