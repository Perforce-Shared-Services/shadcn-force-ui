<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/sidebar-06 -->
<script lang="ts">
  import GalleryVerticalEnd from "~icons/ms/gallery_thumbnail"
  import * as Sidebar from "$lib/registry/ui/sidebar/index.js"

  import NavMain from "./nav-main.svelte"
  import SidebarOptInForm from "./sidebar-opt-in-form.svelte"

  // This is sample data.
  const data = {
    navMain: [
      { title: "Mail", url: "#" },
      {
        title: "Inbox",
        url: "#",
        items: [
          { title: "All Inboxes", url: "#" },
          { title: "Primary", url: "#" },
          { title: "Social", url: "#" },
          { title: "Promotions", url: "#" },
        ],
      },
      {
        title: "Workspace",
        url: "#",
        items: [
          { title: "Product", url: "#" },
          { title: "Sales", url: "#" },
          { title: "Marketing", url: "#" },
          { title: "Services", url: "#" },
        ],
      },
    ],
  }
</script>

<Sidebar.Root>
  <Sidebar.Header>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton size="lg">
          {#snippet child({ props })}
            <a href="#" {...props}>
              <div
                class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
              >
                <GalleryVerticalEnd class="size-4" />
              </div>
              <div class="flex flex-col gap-0.5 leading-none">
                <span class="font-medium">Documentation</span>
                <span class="">v1.0.0</span>
              </div>
            </a>
          {/snippet}
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Header>
  <Sidebar.Content>
    <NavMain items={data.navMain} />
  </Sidebar.Content>
  <Sidebar.Footer>
    <div class="p-1">
      <SidebarOptInForm />
    </div>
  </Sidebar.Footer>
  <Sidebar.Rail />
</Sidebar.Root>
