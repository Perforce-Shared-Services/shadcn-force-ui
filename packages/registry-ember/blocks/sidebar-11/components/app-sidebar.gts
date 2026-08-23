// [FORCE-UI] Ember port of registry:block sidebar-11 app-sidebar
// (React reference: apps/v4/registry/new-york-v4/blocks/sidebar-11/components/app-sidebar.tsx)
import { TreeItem } from './tree-item.gts';
import type { TreeEntry } from './tree-item.gts';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar';

import FileIcon from '~icons/ms/draft';

import type { TOC } from '@ember/component/template-only';

// This is sample data.
const changes = [
  { file: 'README.md', state: 'M' },
  { file: 'api/hello/route.ts', state: 'U' },
  { file: 'app/layout.tsx', state: 'M' },
];

const tree: TreeEntry[] = [
  [
    'app',
    ['api', ['hello', ['route.ts']], 'page.tsx', 'layout.tsx', ['blog', ['page.tsx']]],
  ],
  ['components', ['ui', 'button.tsx', 'card.tsx'], 'header.tsx', 'footer.tsx'],
  ['lib', ['util.ts']],
  ['public', 'favicon.ico', 'vercel.svg'],
  '.eslintrc.json',
  '.gitignore',
  'next.config.js',
  'tailwind.config.js',
  'package.json',
  'README.md',
];

interface AppSidebarSignature {
  Element: HTMLElement;
  Blocks: { default: [] };
}

const AppSidebar: TOC<AppSidebarSignature> = <template>
  <Sidebar ...attributes>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Changes</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {{#each changes as |item|}}
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <FileIcon />
                  {{item.file}}
                </SidebarMenuButton>
                <SidebarMenuBadge>{{item.state}}</SidebarMenuBadge>
              </SidebarMenuItem>
            {{/each}}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Files</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {{#each tree as |entry|}}
              <TreeItem @item={{entry}} />
            {{/each}}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarRail />
  </Sidebar>
</template>;

export { AppSidebar };
