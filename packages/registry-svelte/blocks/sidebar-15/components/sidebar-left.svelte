<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/sidebar-15 -->
<script lang="ts">
  import AudioLines from "~icons/ms/graphic_eq"
  import Send from "~icons/ms/send"
  import LifeBuoy from "~icons/ms/support"
  import * as Sidebar from "$lib/registry/ui/sidebar/index.js"

  import NavFavorites from "./nav-favorites.svelte"
  import NavMain from "./nav-main.svelte"
  import NavSecondary from "./nav-secondary.svelte"
  import NavWorkspaces from "./nav-workspaces.svelte"
  import TeamSwitcher from "./team-switcher.svelte"

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      { name: "Acme Inc", logo: AudioLines, plan: "Enterprise" },
      { name: "Acme Corp.", logo: Send, plan: "Startup" },
      { name: "Evil Corp.", logo: LifeBuoy, plan: "Free" },
    ],
  }
</script>

<Sidebar.Root class="border-r-0">
  <Sidebar.Header>
    <TeamSwitcher teams={data.teams} />
    <NavMain
      items={[
        { title: "Search", url: "#", icon: Send, isActive: true },
        { title: "Ask AI", url: "#", icon: AudioLines },
      ]}
    />
  </Sidebar.Header>
  <Sidebar.Content>
    <NavFavorites
      favorites={[
        { name: "Project Management & Task Tracking", url: "#", emoji: "📊" },
        { name: "Team Meeting Notes", url: "#", emoji: "📝" },
      ]}
    />
    <NavWorkspaces
      workspaces={[
        {
          name: "Personal Workspace",
          emoji: "🏠",
          pages: [{ name: "Code Editor Settings", emoji: "💻" }],
        },
      ]}
    />
    <NavSecondary
      items={[
        { title: "Support", url: "#", icon: LifeBuoy },
        { title: "Feedback", url: "#", icon: Send },
      ]}
      class="mt-auto"
    />
  </Sidebar.Content>
</Sidebar.Root>
