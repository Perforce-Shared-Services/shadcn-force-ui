<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/ui/sidebar"
import Calendar from "@material-symbols/svg-400/rounded/calendar_month.svg?component"
import House from "@material-symbols/svg-400/rounded/home.svg?component"
import Inbox from "@material-symbols/svg-400/rounded/inbox.svg?component"

const items = [
  { title: "الرئيسية", icon: House },
  { title: "البريد الوارد", icon: Inbox },
  { title: "التقويم", icon: Calendar },
]
</script>

<template>
  <SidebarProvider dir="rtl">
    <Sidebar dir="rtl">
      <SidebarContent dir="rtl">
        <SidebarGroup dir="rtl">
          <SidebarGroupLabel>التطبيق</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem v-for="item in items" :key="item.title">
                <SidebarMenuButton as-child dir="rtl">
                  <a href="#">
                    <component :is="item.icon" />
                    <span>{{ item.title }}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    <main class="flex-1 p-4">
      <SidebarTrigger />
      <p class="mt-2 text-sm text-muted-foreground">
        الشريط الجانبي يدعم الاتجاه من اليمين إلى اليسار.
      </p>
    </main>
  </SidebarProvider>
</template>
