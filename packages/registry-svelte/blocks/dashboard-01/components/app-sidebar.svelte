<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/dashboard-01 -->
<script lang="ts">
  import FileWord from "~icons/ms/article"
  import FileAi from "~icons/ms/auto_awesome_motion"
  import FileDescription from "~icons/ms/description"
  import InnerShadowTop from "~icons/ms/filter_center_focus"
  import Help from "~icons/ms/help"
  import Search from "~icons/ms/search"
  import Settings from "~icons/ms/settings"
  import * as Sidebar from "$lib/registry/ui/sidebar/index.js"

  import NavDocuments from "./nav-documents.svelte"
  import NavMain from "./nav-main.svelte"
  import NavSecondary from "./nav-secondary.svelte"
  import NavUser from "./nav-user.svelte"

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navDocuments: [
      { name: "Data Library", url: "#", icon: FileDescription },
      { name: "Reports", url: "#", icon: FileAi },
      { name: "Word Assistant", url: "#", icon: FileWord },
    ],
    navSecondary: [
      { title: "Settings", url: "#", icon: Settings },
      { title: "Get Help", url: "#", icon: Help },
      { title: "Search", url: "#", icon: Search },
    ],
  }
</script>

<Sidebar.Root variant="inset">
  <Sidebar.Header>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton class="h-12" size="lg">
          {#snippet child({ props })}
            <a href="#" {...props}>
              <div
                class="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
              >
                <InnerShadowTop class="size-5" />
              </div>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">Acme Inc</span>
                <span class="truncate text-xs">Enterprise</span>
              </div>
            </a>
          {/snippet}
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
    <NavMain items={[]} />
  </Sidebar.Header>
  <Sidebar.Content>
    <NavDocuments items={data.navDocuments} />
  </Sidebar.Content>
  <Sidebar.Footer>
    <NavSecondary items={data.navSecondary} class="mt-auto" />
    <NavUser user={data.user} />
  </Sidebar.Footer>
</Sidebar.Root>
