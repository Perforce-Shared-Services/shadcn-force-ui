// [FORCE-UI] Ember port of sidebar block nav-actions
// (React reference: apps/v4/registry/new-york-v4/blocks/sidebar-10/components/nav-actions.tsx)
// ponytail: static menu groups — the React version wires per-action callbacks.
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import type { ComponentLike } from '@glint/template';
import type { TOC } from '@ember/component/template-only';

import ArrowDown from '~icons/ms/south';
import ArrowUp from '~icons/ms/north';
import Bell from '~icons/ms/notifications';
import Copy from '~icons/ms/content_copy';
import CornerUpLeft from '~icons/ms/reply';
import CornerUpRight from '~icons/ms/forward';
import FileText from '~icons/ms/article';
import GalleryVerticalEnd from '~icons/ms/view_agenda';
import LineChart from '~icons/ms/monitoring';
import LinkIcon from '~icons/ms/link';
import MoreHorizontal from '~icons/ms/more_horiz';
import Settings2 from '~icons/ms/tune';
import Star from '~icons/ms/star';
import Trash2 from '~icons/ms/delete';

const actionGroups: { label: string; icon: ComponentLike }[][] = [
  [
    { label: 'Customize Page', icon: Settings2 },
    { label: 'Turn into wiki', icon: FileText },
  ],
  [
    { label: 'Copy Link', icon: LinkIcon },
    { label: 'Duplicate', icon: Copy },
    { label: 'Move to', icon: CornerUpRight },
    { label: 'Move to Trash', icon: Trash2 },
  ],
  [
    { label: 'Undo', icon: CornerUpLeft },
    { label: 'View Analytics', icon: LineChart },
    { label: 'Version History', icon: GalleryVerticalEnd },
    { label: 'Show All Updates', icon: Bell },
    { label: 'Star Thread', icon: Star },
  ],
];

interface NavActionsSignature {
  Element: HTMLDivElement;
  Blocks: { default: [] };
}

const NavActions: TOC<NavActionsSignature> = <template>
  <div class="flex items-center gap-2 text-sidebar-foreground" ...attributes>
    <div class="flex">
      <Button @variant="ghost" @size="icon" class="h-8 w-8">
        <ArrowUp />
      </Button>
      <Button @variant="ghost" @size="icon" class="h-8 w-8">
        <ArrowDown />
      </Button>
    </div>
    <Popover @side="bottom" @align="end">
      <PopoverTrigger @asChild={{true}} as |trigger|>
        <Button @variant="ghost" @size="icon" class="h-8 w-8" {{trigger.modifiers}}>
          <MoreHorizontal />
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-52 p-1 pt-0">
        {{#each actionGroups as |group groupIndex|}}
          <SidebarGroup class="p-0 pb-1">
            <SidebarGroupContent class="flex-col">
              {{#if groupIndex}}
                <div class="bg-border -mx-1 my-1 h-px"></div>
              {{/if}}
              <SidebarMenu>
                {{#each group as |action|}}
                  <SidebarMenuItem>
                    <SidebarMenuButton as="div">
                      <action.icon /> {{action.label}}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                {{/each}}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        {{/each}}
      </PopoverContent>
    </Popover>
  </div>
</template>;

export { NavActions };
