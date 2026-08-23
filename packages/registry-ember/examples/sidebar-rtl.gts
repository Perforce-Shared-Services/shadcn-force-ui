// [FORCE-UI] Ember port of examples/base/sidebar-rtl.tsx. The React version
// is a full language-switching showcase; this port fixes dir="rtl" per the
// ember RTL demo convention and renders a compact sidebar.
import FrameIcon from '~icons/ms/web_asset';
import LifeBuoyIcon from '~icons/ms/support_agent';
import MapIcon from '~icons/ms/map';
import PieChartIcon from '~icons/ms/pie_chart';
import SendIcon from '~icons/ms/send';
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
  SidebarProvider,
} from '@/ui/sidebar';

const projects = [
  { name: 'Design Engineering', url: '#', Icon: FrameIcon, badge: '24' },
  { name: 'Sales & Marketing', url: '#', Icon: PieChartIcon, badge: '12' },
  { name: 'Travel', url: '#', Icon: MapIcon, badge: '3' },
  { name: 'Support', url: '#', Icon: LifeBuoyIcon, badge: '21' },
  { name: 'Feedback', url: '#', Icon: SendIcon, badge: '8' },
];

<template>
  <SidebarProvider class="min-h-auto w-full" dir="rtl">
    <Sidebar class="h-80">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>المشاريع</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {{#each projects as |project|}}
                <SidebarMenuItem>
                  <SidebarMenuButton href={{project.url}}>
                    <project.Icon />
                    <span>{{project.name}}</span>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>{{project.badge}}</SidebarMenuBadge>
                </SidebarMenuItem>
              {{/each}}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  </SidebarProvider>
</template>
