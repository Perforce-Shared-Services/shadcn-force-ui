<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/sidebar-14 -->
<script lang="ts">
  import * as Sidebar from "$lib/registry/ui/sidebar/index.js"

  // This is sample data.
  const data = [
    {
      title: "Introduction",
      url: "#",
      items: [
        { title: "Installation", url: "#" },
        { title: "Project Structure", url: "#" },
      ],
    },
    {
      title: "Build Your Application",
      url: "#",
      items: [
        { title: "Routing", url: "#" },
        { title: "Data Fetching", url: "#", isActive: true },
        { title: "Rendering", url: "#" },
      ],
    },
  ]
</script>

<Sidebar.Root>
  <Sidebar.Content>
    <Sidebar.Group>
      <Sidebar.GroupLabel>Table of Contents</Sidebar.GroupLabel>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {#each data as item (item.title)}
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                {#snippet child({ props })}
                  <a href={item.url} {...props} class="font-medium"
                    >{item.title}</a
                  >
                {/snippet}
              </Sidebar.MenuButton>
              {#if item.items?.length}
                <Sidebar.MenuSub>
                  {#each item.items as subItem (subItem.title)}
                    <Sidebar.MenuSubItem>
                      <Sidebar.MenuSubButton
                        isActive={subItem.isActive ?? false}
                      >
                        {#snippet child({ props })}
                          <a href={subItem.url} {...props}>{subItem.title}</a>
                        {/snippet}
                      </Sidebar.MenuSubButton>
                    </Sidebar.MenuSubItem>
                  {/each}
                </Sidebar.MenuSub>
              {/if}
            </Sidebar.MenuItem>
          {/each}
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>
  </Sidebar.Content>
  <Sidebar.Rail />
</Sidebar.Root>
