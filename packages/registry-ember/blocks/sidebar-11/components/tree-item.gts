// [FORCE-UI] Ember port of sidebar block Tree item (recursive)
// (React reference: apps/v4/registry/new-york-v4/blocks/sidebar-11/components/app-sidebar.tsx)
import { eq, or } from 'ember-truth-helpers';
import Component from '@glimmer/component';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from '@/components/ui/sidebar';

import ChevronRight from '~icons/ms/chevron_right';
import FileIcon from '~icons/ms/draft';
import Folder from '~icons/ms/folder';

import TreeItem from './tree-item.gts';

import type { TOC } from '@ember/component/template-only';

export type TreeEntry = string | TreeEntry[];

interface TreeItemSignature {
  Element: HTMLLIElement;
  Args: {
    item: TreeEntry;
  };
  Blocks: { default: [] };
}

class TreeItemClass extends Component<TreeItemSignature> {
  get name(): string {
    const item = this.args.item;
    return Array.isArray(item) ? (item[0] as string) : (item as string);
  }

  get children(): TreeEntry[] | null {
    const item = this.args.item;
    if (!Array.isArray(item)) return null;
    return item.slice(1) as TreeEntry[];
  }

  <template>
    {{#if this.children}}
      <SidebarMenuItem>
        <Collapsible
          class="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
          @defaultOpen={{or (eq this.name "components") (eq this.name "ui")}}
        >
          <CollapsibleTrigger @asChild={{true}} as |trigger|>
            <SidebarMenuButton {{trigger.modifiers}}>
              <ChevronRight class="transition-transform" />
              <Folder />
              {{this.name}}
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {{#each this.children as |child|}}
                <TreeItem @item={{child}} />
              {{/each}}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenuItem>
    {{else}}
      <li>
        <SidebarMenuButton
          @isActive={{eq this.name "button.tsx"}}
          class="data-[active=true]:bg-transparent"
        >
          <FileIcon />
          {{this.name}}
        </SidebarMenuButton>
      </li>
    {{/if}}
  </template>;
}

export { TreeItemClass as TreeItem };
