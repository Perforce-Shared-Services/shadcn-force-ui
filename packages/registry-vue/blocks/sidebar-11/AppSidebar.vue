<script setup lang="ts">
// [FORCE-UI] Vue port of registry/new-york-v4/blocks/sidebar-11
import File from '@material-symbols/svg-400/rounded/description.svg?component'
import TreeItem from './TreeItem.vue'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/ui/sidebar'

// This is sample data.
interface TreeNode {
  name: string
  children?: TreeNode[]
}

const data = {
  changes: [
    { file: 'README.md', state: 'M' },
    { file: 'api/hello/route.ts', state: 'U' },
    { file: 'app/layout.tsx', state: 'M' },
  ],
  tree: [
    {
      name: 'app',
      children: [
        { name: 'api', children: [{ name: 'hello', children: [{ name: 'route.ts' }] }] },
        { name: 'page.tsx' },
        { name: 'layout.tsx' },
        { name: 'blog', children: [{ name: 'page.tsx' }] },
      ],
    },
    {
      name: 'components',
      children: [
        { name: 'ui', children: [{ name: 'button.tsx' }, { name: 'card.tsx' }] },
        { name: 'header.tsx' },
        { name: 'footer.tsx' },
      ],
    },
    { name: 'lib', children: [{ name: 'util.ts' }] },
    { name: 'public', children: [{ name: 'favicon.ico' }, { name: 'vercel.svg' }] },
    { name: '.eslintrc.json' },
    { name: '.gitignore' },
    { name: 'next.config.js' },
    { name: 'tailwind.config.js' },
    { name: 'package.json' },
    { name: 'README.md' },
  ] as TreeNode[],
}
</script>

<template>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Changes</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="(item, index) in data.changes" :key="index">
              <SidebarMenuButton>
                <File />
                {{ item.file }}
              </SidebarMenuButton>
              <SidebarMenuBadge>{{ item.state }}</SidebarMenuBadge>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Files</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <TreeItem v-for="(item, index) in data.tree" :key="index" :item="item" />
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarRail />
  </Sidebar>
</template>
