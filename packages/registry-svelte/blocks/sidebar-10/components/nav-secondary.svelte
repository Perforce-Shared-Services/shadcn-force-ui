<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/sidebar-10 -->
<script lang="ts">
  import Folder from "~icons/ms/folder"
  import * as Sidebar from "$lib/registry/ui/sidebar/index.js"

  let {
    items,
    class: className,
  }: {
    items: { title: string; url: string; icon: typeof Folder }[]
    class?: string
  } = $props()
</script>

<Sidebar.Group class={className}>
  <Sidebar.GroupContent>
    <Sidebar.Menu>
      {#each items as item (item.title)}
        <Sidebar.MenuItem>
          <Sidebar.MenuButton size="sm">
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
