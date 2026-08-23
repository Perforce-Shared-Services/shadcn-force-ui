<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/sidebar-07 -->
<script lang="ts">
  import Trash2 from "~icons/ms/delete"
  import Folder from "~icons/ms/folder"
  import Forward from "~icons/ms/forward"
  import MoreHorizontal from "~icons/ms/more_horiz"
  import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js"
  import { useSidebar } from "$lib/registry/ui/sidebar/context.svelte.js"
  import * as Sidebar from "$lib/registry/ui/sidebar/index.js"

  let {
    projects,
  }: {
    projects: { name: string; url: string; icon: typeof Folder }[]
  } = $props()

  const sidebar = useSidebar()
</script>

<Sidebar.Group class="group-data-[collapsible=icon]:hidden">
  <Sidebar.GroupLabel>Projects</Sidebar.GroupLabel>
  <Sidebar.Menu>
    {#each projects as item (item.name)}
      <Sidebar.MenuItem>
        <Sidebar.MenuButton>
          {#snippet child({ props })}
            <a href={item.url} {...props}>
              <item.icon />
              <span>{item.name}</span>
            </a>
          {/snippet}
        </Sidebar.MenuButton>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            {#snippet child({ props })}
              <Sidebar.MenuAction showOnHover {...props}>
                <MoreHorizontal />
                <span class="sr-only">More</span>
              </Sidebar.MenuAction>
            {/snippet}
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            class="w-48 rounded-lg"
            side={sidebar.isMobile ? "bottom" : "right"}
            align={sidebar.isMobile ? "end" : "start"}
          >
            <DropdownMenu.Item>
              <Folder class="text-muted-foreground" />
              <span>View Project</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <Forward class="text-muted-foreground" />
              <span>Share Project</span>
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>
              <Trash2 class="text-muted-foreground" />
              <span>Delete Project</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Sidebar.MenuItem>
    {/each}
    <Sidebar.MenuItem>
      <Sidebar.MenuButton class="text-sidebar-foreground/70">
        <MoreHorizontal class="text-sidebar-foreground/70" />
        <span>More</span>
      </Sidebar.MenuButton>
    </Sidebar.MenuItem>
  </Sidebar.Menu>
</Sidebar.Group>
