<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/dashboard-01 -->
<script lang="ts">
  import PlusCircleFilled from "~icons/ms/add_circle"
  import Folder from "~icons/ms/folder"
  import Users from "~icons/ms/group"
  import ChartBar from "~icons/ms/insert_chart"
  import ListDetails from "~icons/ms/list_alt"
  import MailIcon from "~icons/ms/mail"
  import Dashboard from "~icons/ms/space_dashboard"
  import { Button } from "$lib/registry/ui/button/index.js"
  import * as Sidebar from "$lib/registry/ui/sidebar/index.js"

  let {
    items,
  }: {
    items: {
      title: string
      url: string
      icon: typeof Dashboard
      isActive?: boolean
    }[]
  } = $props()

  const defaultItems = [
    { title: "Dashboard", url: "#", icon: Dashboard, isActive: true },
    { title: "Lifecycle", url: "#", icon: ListDetails },
    { title: "Analytics", url: "#", icon: ChartBar },
    { title: "Projects", url: "#", icon: Folder },
    { title: "Team", url: "#", icon: Users },
  ]
</script>

<Sidebar.Group>
  <Sidebar.GroupContent class="flex flex-col gap-2">
    <Sidebar.Menu>
      <Sidebar.MenuItem class="flex items-center gap-2">
        <Sidebar.MenuButton
          tooltipContent="Quick Create"
          class="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
        >
          <PlusCircleFilled />
          <span>Quick Create</span>
        </Sidebar.MenuButton>
        <Button
          size="icon"
          class="size-8 group-data-[collapsible=icon]:opacity-0"
          variant="outline"
        >
          <MailIcon />
          <span class="sr-only">Inbox</span>
        </Button>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
    <Sidebar.Menu>
      {#each items?.length ? items : defaultItems as item (item.title)}
        <Sidebar.MenuItem>
          <Sidebar.MenuButton
            tooltipContent={item.title}
            isActive={item.isActive ?? false}
          >
            {#snippet child({ props })}
              <a href={item.url} {...props}>
                <item.icon />
                <span>{item.title}</span>
              </a>
            {/snippet}
          </Sidebar.MenuButton>
        </Sidebar.MenuItem>
      {/each}
    </Sidebar.Menu>
  </Sidebar.GroupContent>
</Sidebar.Group>
