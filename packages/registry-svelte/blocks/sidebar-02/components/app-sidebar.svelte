<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/sidebar-02 -->
<script lang="ts">
  import ChevronRight from "~icons/ms/chevron_right"
  import * as Collapsible from "$lib/registry/ui/collapsible/index.js"
  import * as Sidebar from "$lib/registry/ui/sidebar/index.js"

  import SearchForm from "./search-form.svelte"
  import VersionSwitcher from "./version-switcher.svelte"

  // This is sample data.
  const navMain = [
    {
      title: "Getting Started",
      items: [
        { title: "Installation", url: "#" },
        { title: "Project Structure", url: "#" },
      ],
    },
    {
      title: "Build Your Application",
      items: [
        { title: "Routing", url: "#" },
        { title: "Data Fetching", url: "#", isActive: true },
        { title: "Rendering", url: "#" },
        { title: "Caching", url: "#" },
        { title: "Styling", url: "#" },
        { title: "Optimizing", url: "#" },
        { title: "Configuring", url: "#" },
        { title: "Testing", url: "#" },
        { title: "Authentication", url: "#" },
        { title: "Deploying", url: "#" },
        { title: "Upgrading", url: "#" },
        { title: "Examples", url: "#" },
      ],
    },
    {
      title: "API Reference",
      items: [
        { title: "Components", url: "#" },
        { title: "File Conventions", url: "#" },
        { title: "Functions", url: "#" },
        { title: "CLI", url: "#" },
        { title: "Edge Runtime", url: "#" },
      ],
    },
    {
      title: "Architecture",
      items: [
        { title: "Accessibility", url: "#" },
        { title: "Fast Refresh", url: "#" },
        { title: "Supported Browsers", url: "#" },
      ],
    },
    {
      title: "Community",
      items: [{ title: "Contribution Guide", url: "#" }],
    },
  ]

  let openState = $state(
    Object.fromEntries(navMain.map((i) => [i.title, true]))
  )
</script>

<Sidebar.Root>
  <Sidebar.Header>
    <VersionSwitcher
      versions={["1.0.1", "1.1.0-alpha", "2.0.0-beta1"]}
      defaultVersion="1.0.1"
    />
    <SearchForm />
  </Sidebar.Header>
  <Sidebar.Content class="gap-0">
    <!-- We create a collapsible SidebarGroup for each parent. -->
    {#each navMain as item (item.title)}
      <Collapsible.Root
        bind:open={openState[item.title]}
        class="group/collapsible"
      >
        <Sidebar.Group>
          <Sidebar.GroupLabel
            class="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            {#snippet child({ props })}
              <Collapsible.Trigger {...props}>
                {item.title}
                <ChevronRight
                  class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
                />
              </Collapsible.Trigger>
            {/snippet}
          </Sidebar.GroupLabel>
          <Collapsible.Content>
            <Sidebar.GroupContent>
              <Sidebar.Menu>
                {#each item.items as subItem (subItem.title)}
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton isActive={subItem.isActive ?? false}>
                      {#snippet child({ props })}
                        <a href={subItem.url} {...props}>{subItem.title}</a>
                      {/snippet}
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                {/each}
              </Sidebar.Menu>
            </Sidebar.GroupContent>
          </Collapsible.Content>
        </Sidebar.Group>
      </Collapsible.Root>
    {/each}
  </Sidebar.Content>
  <Sidebar.Rail />
</Sidebar.Root>
