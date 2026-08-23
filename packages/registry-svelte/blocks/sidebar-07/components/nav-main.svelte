<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/sidebar-07 -->
<script lang="ts">
  import ChevronRight from "~icons/ms/chevron_right"
  import * as Collapsible from "$lib/registry/ui/collapsible/index.js"
  import * as Sidebar from "$lib/registry/ui/sidebar/index.js"

  let {
    items,
  }: {
    items: {
      title: string
      url: string
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
      <Collapsible.Root
        bind:open={openState[item.title]}
        class="group/collapsible"
      >
        <Sidebar.MenuItem>
          <Collapsible.Trigger>
            {#snippet child({ props })}
              <Sidebar.MenuButton {...props} tooltipContent={item.title}>
                {item.title}
                <ChevronRight
                  class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
                />
              </Sidebar.MenuButton>
            {/snippet}
          </Collapsible.Trigger>
          <Collapsible.Content>
            <Sidebar.MenuSub>
              {#each item.items as subItem (subItem.title)}
                <Sidebar.MenuSubItem>
                  <Sidebar.MenuSubButton>
                    {#snippet child({ props })}
                      <a href={subItem.url} {...props}>{subItem.title}</a>
                    {/snippet}
                  </Sidebar.MenuSubButton>
                </Sidebar.MenuSubItem>
              {/each}
            </Sidebar.MenuSub>
          </Collapsible.Content>
        </Sidebar.MenuItem>
      </Collapsible.Root>
    {/each}
  </Sidebar.Menu>
</Sidebar.Group>
