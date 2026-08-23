<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/sidebar-08 -->
<script lang="ts">
  import ChevronRight from "~icons/ms/chevron_right"
  import Folder from "~icons/ms/folder"
  import * as Collapsible from "$lib/registry/ui/collapsible/index.js"
  import * as Sidebar from "$lib/registry/ui/sidebar/index.js"

  let {
    items,
  }: {
    items: {
      title: string
      url: string
      icon: typeof Folder
      isActive?: boolean
      items?: { title: string; url: string }[]
    }[]
  } = $props()

  let openState = $state(
    Object.fromEntries(items.map((i) => [i.title, i.isActive ?? false]))
  )
</script>

<Sidebar.Group>
  <Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
  <Sidebar.Menu>
    {#each items as item (item.title)}
      <Collapsible.Root bind:open={openState[item.title]}>
        <Sidebar.MenuItem>
          <Sidebar.MenuButton tooltipContent={item.title}>
            {#snippet child({ props })}
              <a href={item.url} {...props}>
                <item.icon />
                <span>{item.title}</span>
              </a>
            {/snippet}
          </Sidebar.MenuButton>
          {#if item.items?.length}
            <Collapsible.Trigger>
              {#snippet child({ props })}
                <Sidebar.MenuAction
                  class="data-[state=open]:rotate-90"
                  {...props}
                >
                  <ChevronRight />
                  <span class="sr-only">Toggle</span>
                </Sidebar.MenuAction>
              {/snippet}
            </Collapsible.Trigger>
            <Collapsible.Content>
              <Sidebar.MenuSub>
                {#each item.items as subItem (subItem.title)}
                  <Sidebar.MenuSubItem>
                    <Sidebar.MenuSubButton>
                      {#snippet child({ props })}
                        <a href={subItem.url} {...props}
                          ><span>{subItem.title}</span></a
                        >
                      {/snippet}
                    </Sidebar.MenuSubButton>
                  </Sidebar.MenuSubItem>
                {/each}
              </Sidebar.MenuSub>
            </Collapsible.Content>
          {/if}
        </Sidebar.MenuItem>
      </Collapsible.Root>
    {/each}
  </Sidebar.Menu>
</Sidebar.Group>
