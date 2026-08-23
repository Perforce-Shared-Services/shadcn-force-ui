// [FORCE-UI] Ember port of sidebar block nav-workspaces
// (React reference: apps/v4/registry/new-york-v4/blocks/sidebar-10/components/nav-workspaces.tsx)
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

import ChevronRight from '~icons/ms/chevron_right';
import MoreHorizontal from '~icons/ms/more_horiz';
import Plus from '~icons/ms/add';

import type { TOC } from '@ember/component/template-only';

export interface WorkspaceItem {
  name: string;
  emoji: string;
  pages: {
    name: string;
    emoji: string;
  }[];
}

interface NavWorkspacesSignature {
  Element: HTMLDivElement;
  Args: { workspaces: WorkspaceItem[] };
  Blocks: { default: [] };
}

const NavWorkspaces: TOC<NavWorkspacesSignature> = <template>
  <SidebarGroup>
    <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        {{#each @workspaces as |workspace|}}
          <Collapsible>
            <SidebarMenuItem class="group/workspace-item">
              <CollapsibleTrigger @asChild={{true}} as |trigger|>
                <SidebarMenuButton {{trigger.modifiers}}>
                  <span class="text-ellipsis overflow-hidden">{{workspace.emoji}}</span>
                  <span>{{workspace.name}}</span>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {{#each workspace.pages as |page|}}
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton @asChild={{true}}>
                        <a href="#">
                          <span>{{page.emoji}}</span>
                          <span>{{page.name}}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  {{/each}}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        {{/each}}
        <SidebarMenuItem>
          <SidebarMenuButton class="text-sidebar-foreground/70">
            <MoreHorizontal />
            <span>More</span>
          </SidebarMenuButton>
          <SidebarMenuAction @showOnHover={{true}}>
            <Plus />
            <span class="sr-only">Add Workspace</span>
          </SidebarMenuAction>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</template>;

export { NavWorkspaces };
