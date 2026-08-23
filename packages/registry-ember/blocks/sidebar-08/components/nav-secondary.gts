// [FORCE-UI] Ember port of sidebar block nav-secondary
// (React reference: apps/v4/registry/new-york-v4/blocks/sidebar-08/components/nav-secondary.tsx)
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import type { ComponentLike } from '@glint/template';
import type { TOC } from '@ember/component/template-only';

export interface SecondaryNavItem {
  title: string;
  url: string;
  icon: ComponentLike;
}

interface NavSecondarySignature {
  Element: HTMLDivElement;
  Args: {
    items: SecondaryNavItem[];
    class?: string;
  };
  Blocks: { default: [] };
}

const NavSecondary: TOC<NavSecondarySignature> = <template>
  <SidebarGroup @class={{@class}}>
    <SidebarGroupContent>
      <SidebarMenu>
        {{#each @items as |item|}}
          <SidebarMenuItem>
            <SidebarMenuButton @asChild={{true}} @size="sm">
              <a href={{item.url}}>
                <item.icon />
                <span>{{item.title}}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        {{/each}}
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</template>;

export { NavSecondary };
