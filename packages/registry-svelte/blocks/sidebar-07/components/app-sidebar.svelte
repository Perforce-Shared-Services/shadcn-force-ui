<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/sidebar-07 -->
<script lang="ts">
  import GalleryVerticalEnd from "~icons/ms/gallery_thumbnail"
  import Command from "~icons/ms/keyboard_command_key"
  import Map from "~icons/ms/map"
  import PieChartIcon from "~icons/ms/pie_chart"
  import Send from "~icons/ms/send"
  import LifeBuoy from "~icons/ms/support"
  import * as Sidebar from "$lib/registry/ui/sidebar/index.js"

  import NavMain from "./nav-main.svelte"
  import NavProjects from "./nav-projects.svelte"
  import NavUser from "./nav-user.svelte"
  import TeamSwitcher from "./team-switcher.svelte"

  // This is sample data.
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      { name: "Acme Inc", logo: GalleryVerticalEnd, plan: "Enterprise" },
      { name: "Acme Corp.", logo: Command, plan: "Startup" },
      { name: "Evil Corp.", logo: Command, plan: "Free" },
    ],
    navMain: [
      {
        title: "Playground",
        url: "#",
        isActive: true,
      },
      {
        title: "Models",
        url: "#",
      },
      {
        title: "Documentation",
        url: "#",
      },
      {
        title: "Settings",
        url: "#",
      },
    ],
    projects: [
      { name: "Design Engineering", url: "#", icon: PieChartIcon },
      { name: "Sales & Marketing", url: "#", icon: Map },
      { name: "Travel", url: "#", icon: LifeBuoy },
      { name: "Support", url: "#", icon: Send },
    ],
  }
</script>

<Sidebar.Root collapsible="icon">
  <Sidebar.Header>
    <TeamSwitcher teams={data.teams} />
    <NavMain items={data.navMain} />
  </Sidebar.Header>
  <Sidebar.Content>
    <NavProjects projects={data.projects} />
  </Sidebar.Content>
  <Sidebar.Footer>
    <NavUser user={data.user} />
  </Sidebar.Footer>
</Sidebar.Root>
