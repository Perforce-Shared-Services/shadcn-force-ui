// [FORCE-UI] Ember port of sidebar block nav-main (plain variant)
// (React reference: apps/v4/registry/new-york-v4/blocks/sidebar-10/components/nav-main.tsx)
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import type { ComponentLike } from '@glint/template';
import type { TOC } from '@ember/component/template-only';

export interface PlainNavItem {
  title: string;
  url: string;
  icon: ComponentLike;
  isActive?: boolean;
  badge?: string;
}

interface NavMainSignature {
  Element: HTMLUListElement;
  Args: { items: PlainNavItem[] };
  Blocks: { default: [] };
}

const NavMain: TOC<NavMainSignature> = <template>
  <SidebarMenu>
    {{#each @items as |item|}}
      <SidebarMenuItem>
        <SidebarMenuButton @asChild={{true}} @isActive={{item.isActive}}>
          <a href={{item.url}}>
            <item.icon />
            <span>{{item.title}}</span>
          </a>
          {{#if item.badge}}
            <span class="text-sidebar-foreground/70 ml-auto text-xs">{{item.badge}}</span>
          {{/if}}
        </SidebarMenuButton>
      </SidebarMenuItem>
    {{/each}}
  </SidebarMenu>
</template>;

export { NavMain };
