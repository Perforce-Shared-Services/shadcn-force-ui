<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/sidebar-16 -->
<script lang="ts">
  import FolderIcon from "~icons/ms/folder"
  import AudioLines from "~icons/ms/graphic_eq"
  import Command from "~icons/ms/keyboard_command_key"
  import Map from "~icons/ms/map"
  import PieChartIcon from "~icons/ms/pie_chart"
  import Send from "~icons/ms/send"
  import LifeBuoy from "~icons/ms/support"
  import * as Sidebar from "$lib/registry/ui/sidebar/index.js"

  import NavMain from "./nav-main.svelte"
  import NavProjects from "./nav-projects.svelte"
  import NavSecondary from "./nav-secondary.svelte"
  import NavUser from "./nav-user.svelte"

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      { title: "Dashboard", url: "#", icon: PieChartIcon, isActive: true },
      { title: "Lifecycle", url: "#", icon: Map },
      {
        title: "Analytics",
        url: "#",
        icon: AudioLines,
        items: [{ title: "Usage", url: "#" }],
      },
    ],
    navSecondary: [
      { title: "Support", url: "#", icon: LifeBuoy },
      { title: "Feedback", url: "#", icon: Send },
    ],
    projects: [
      { name: "Design Engineering", url: "#", icon: PieChartIcon },
      { name: "Sales & Marketing", url: "#", icon: Map },
      { name: "Travel", url: "#", icon: LifeBuoy },
      { name: "Support", url: "#", icon: Send },
    ],
  }
</script>

<Sidebar.Root
  class="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
>
  <Sidebar.Header>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton size="lg">
          {#snippet child({ props })}
            <a href="#" {...props}>
              <div
                class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
              >
                <Command class="size-4" />
              </div>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-medium">Acme Inc</span>
                <span class="truncate text-xs">Enterprise</span>
              </div>
            </a>
          {/snippet}
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Header>
  <Sidebar.Content>
    <NavMain items={data.navMain} />
    <NavProjects projects={data.projects} />
    <NavSecondary items={data.navSecondary} class="mt-auto" />
  </Sidebar.Content>
  <Sidebar.Footer>
    <NavUser user={data.user} />
  </Sidebar.Footer>
</Sidebar.Root>
