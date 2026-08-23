<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/sidebar-15 -->
<script lang="ts">
  import * as Sidebar from "$lib/registry/ui/sidebar/index.js"
  import type { Component } from "svelte"

  let {
    items,
  }: {
    items: { title: string; url: string; icon: Component; isActive?: boolean }[]
  } = $props()
</script>

<Sidebar.Menu>
  {#each items as item (item.title)}
    <Sidebar.MenuItem>
      <Sidebar.MenuButton
        isActive={item.isActive ?? false}
        tooltipContent={item.title}
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
