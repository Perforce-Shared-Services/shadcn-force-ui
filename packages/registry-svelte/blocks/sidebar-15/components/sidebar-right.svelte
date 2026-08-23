<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/sidebar-15 -->
<script lang="ts">
  import Plus from "~icons/ms/add"
  import * as Sidebar from "$lib/registry/ui/sidebar/index.js"

  import Calendars from "./calendars.svelte"
  import DatePicker from "./date-picker.svelte"
  import NavUser from "./nav-user.svelte"

  const user = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  }
</script>

<Sidebar.Root
  collapsible="none"
  class="sticky top-0 hidden h-svh border-l lg:flex"
>
  <Sidebar.Header class="h-16 border-b border-sidebar-border">
    <NavUser {user} />
  </Sidebar.Header>
  <Sidebar.Content>
    <DatePicker />
    <Sidebar.Separator class="mx-0" />
    <Calendars
      calendars={[{ name: "Design Systems", items: ["Personal", "Work"] }]}
    />
  </Sidebar.Content>
  <Sidebar.Footer>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton>
          <Plus />
          <span>New Calendar</span>
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Footer>
</Sidebar.Root>
