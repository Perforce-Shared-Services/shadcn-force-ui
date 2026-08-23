<script setup lang="ts">
// [FORCE-UI] Vue port of registry/new-york-v4/blocks/sidebar-11 (recursive Tree)
import File from '@material-symbols/svg-400/rounded/description.svg?component'
import Folder from '@material-symbols/svg-400/rounded/folder.svg?component'
import ChevronRight from '@material-symbols/svg-400/rounded/chevron_right.svg?component'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/ui/collapsible'
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from '@/ui/sidebar'

export interface TreeItem {
  name: string
  children?: TreeItem[]
}

defineProps<{
  item: TreeItem
}>()
</script>

<template>
  <!-- Leaf -->
  <SidebarMenuButton
    v-if="!item.children?.length"
    :is-active="item.name === 'button.tsx'"
    class="data-[active=true]:bg-transparent"
  >
    <File />
    {{ item.name }}
  </SidebarMenuButton>

  <!-- Branch -->
  <SidebarMenuItem v-else>
    <Collapsible
      class="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
      :default-open="item.name === 'components' || item.name === 'ui'"
      as-child
    >
      <SidebarMenuItem>
        <CollapsibleTrigger as-child>
          <SidebarMenuButton class="w-full">
            <ChevronRight class="transition-transform" />
            <Folder />
            {{ item.name }}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            <TreeItem v-for="(child, index) in item.children" :key="index" :item="child" />
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  </SidebarMenuItem>
</template>
