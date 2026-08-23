<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/dashboard-01 -->
<script lang="ts">
  import FileWord from "~icons/ms/article"
  import FileAi from "~icons/ms/auto_awesome_motion"
  import FileDescription from "~icons/ms/description"
  import Folder from "~icons/ms/folder"
  import MoreHorizontal from "~icons/ms/more_horiz"
  import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js"
  import { useSidebar } from "$lib/registry/ui/sidebar/context.svelte.js"
  import * as Sidebar from "$lib/registry/ui/sidebar/index.js"

  let {
    items,
  }: {
    items: { name: string; url: string; icon: typeof Folder }[]
  } = $props()

  const sidebar = useSidebar()
  const isMobile = $derived(sidebar.isMobile)
</script>

<Sidebar.Group class="group-data-[collapsible=icon]:hidden">
  <Sidebar.GroupLabel>Documents</Sidebar.GroupLabel>
  <Sidebar.Menu>
    {#each items as item (item.name)}
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
              <Sidebar.MenuAction
                showOnHover
                class="rounded-sm data-[state=open]:bg-accent"
                {...props}
              >
                <MoreHorizontal />
                <span class="sr-only">More</span>
              </Sidebar.MenuAction>
            {/snippet}
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            class="w-24 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align={isMobile ? "end" : "start"}
          >
            <DropdownMenu.Item>
              <Folder />
              <span>Open</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <FileDescription />
              <span>Copy Link</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <FileAi />
              <span>Edit in AI</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <FileWord />
              <span>Export to Word</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Sidebar.MenuItem>
    {/each}
  </Sidebar.Menu>
</Sidebar.Group>
