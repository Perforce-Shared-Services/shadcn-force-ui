// [FORCE-UI] Ember port of sidebar block nav-favorites
// (React reference: apps/v4/registry/new-york-v4/blocks/sidebar-10/components/nav-favorites.tsx)
import Component from '@glimmer/component';
import { consume } from 'ember-provide-consume-context';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import ArrowUpRight from '~icons/ms/north_east';
import LinkIcon from '~icons/ms/link';
import MoreHorizontal from '~icons/ms/more_horiz';
import StarOff from '~icons/ms/star_rate_half';
import Trash2 from '~icons/ms/delete';

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

export interface FavoriteItem {
  name: string;
  url: string;
  emoji: string;
}

interface NavFavoritesSignature {
  Element: HTMLDivElement;
  Args: { favorites: FavoriteItem[] };
  Blocks: { default: [] };
}

class NavFavoritesComponent extends Component<NavFavoritesSignature> {
  @consume(SidebarContext) context!: ContextRegistry[typeof SidebarContext];

  <template>
    <SidebarGroup class="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Favorites</SidebarGroupLabel>
      <SidebarMenu>
        {{#each @favorites as |item|}}
          <SidebarMenuItem>
            <SidebarMenuButton @asChild={{true}}>
              <a href={{item.url}} title={{item.name}}>
                <span>{{item.emoji}}</span>
                <span>{{item.name}}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger @asChild={{true}} as |trigger|>
                <SidebarMenuAction @showOnHover={{true}} {{trigger.modifiers}}>
                  <MoreHorizontal />
                  <span class="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                class="w-56 rounded-lg"
                @side={{if this.context.isMobile "bottom" "right"}}
                @align={{if this.context.isMobile "end" "start"}}
              >
                <DropdownMenuItem>
                  <StarOff class="text-muted-foreground" />
                  <span>Remove from Favorites</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LinkIcon class="text-muted-foreground" />
                  <span>Copy Link</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ArrowUpRight class="text-muted-foreground" />
                  <span>Open in New Tab</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 class="text-muted-foreground" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        {{/each}}
        <SidebarMenuItem>
          <SidebarMenuButton class="text-sidebar-foreground/70">
            <MoreHorizontal />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  </template>
}

export { NavFavoritesComponent as NavFavorites };
