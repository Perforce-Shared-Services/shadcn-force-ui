<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/sidebar-15 -->
<script lang="ts">
  import Trash2 from "~icons/ms/delete"
  import LinkIcon from "~icons/ms/link"
  import MoreHorizontal from "~icons/ms/more_horiz"
  import ArrowUpRight from "~icons/ms/north_east"
  import StarOff from "~icons/ms/star_rate"
  import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js"
  import { useSidebar } from "$lib/registry/ui/sidebar/context.svelte.js"
  import * as Sidebar from "$lib/registry/ui/sidebar/index.js"

  let {
    favorites,
  }: {
    favorites: { name: string; url: string; emoji: string }[]
  } = $props()

  const sidebar = useSidebar()
</script>

<Sidebar.Group class="group-data-[collapsible=icon]:hidden">
  <Sidebar.GroupLabel>Favorites</Sidebar.GroupLabel>
  <Sidebar.Menu>
    {#each favorites as item (item.name)}
      <Sidebar.MenuItem>
        <Sidebar.MenuButton title={item.name}>
          {#snippet child({ props })}
            <a href={item.url} {...props}>
              <span>{item.emoji}</span>
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
            class="w-56 rounded-lg"
            side={sidebar.isMobile ? "bottom" : "right"}
            align={sidebar.isMobile ? "end" : "start"}
          >
            <DropdownMenu.Item>
              <StarOff class="text-muted-foreground" />
              <span>Remove from Favorites</span>
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>
              <LinkIcon class="text-muted-foreground" />
              <span>Copy Link</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <ArrowUpRight class="text-muted-foreground" />
              <span>Open in New Tab</span>
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>
              <Trash2 class="text-muted-foreground" />
              <span>Delete</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Sidebar.MenuItem>
    {/each}
    <Sidebar.MenuItem>
      <Sidebar.MenuButton class="text-sidebar-foreground/70">
        <MoreHorizontal />
        <span>More</span>
      </Sidebar.MenuButton>
    </Sidebar.MenuItem>
  </Sidebar.Menu>
</Sidebar.Group>
