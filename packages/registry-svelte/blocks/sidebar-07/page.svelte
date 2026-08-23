<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/sidebar-07 -->
<script lang="ts">
  import * as Breadcrumb from "$lib/registry/ui/breadcrumb/index.js"
  import { Separator } from "$lib/registry/ui/separator/index.js"
  import * as Sidebar from "$lib/registry/ui/sidebar/index.js"

  import AppSidebar from "./components/app-sidebar.svelte"
</script>

<Sidebar.Provider
  style="--sidebar-width: calc(var(--spacing) * 72); --header-height: calc(var(--spacing) * 12);"
>
  <AppSidebar />
  <Sidebar.Inset>
    <header
      class="flex h-(--header-height) shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
    >
      <div class="flex items-center gap-2 px-4">
        <Sidebar.Trigger class="-ml-1" />
        <Separator orientation="vertical" class="mr-2 h-4" />
        <Breadcrumb.Root>
          <Breadcrumb.List>
            <Breadcrumb.Item class="hidden md:block">
              <Breadcrumb.Link href="#Build Your Application"
                >Build Your Application</Breadcrumb.Link
              >
            </Breadcrumb.Item>
            <Breadcrumb.Separator class="hidden md:block" />
            <Breadcrumb.Item>
              <Breadcrumb.Page>Data Fetching</Breadcrumb.Page>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
      </div>
    </header>
    <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div class="grid auto-rows-min gap-4 md:grid-cols-3">
        <div class="aspect-video rounded-xl bg-muted/50"></div>
        <div class="aspect-video rounded-xl bg-muted/50"></div>
        <div class="aspect-video rounded-xl bg-muted/50"></div>
      </div>
      <div
        class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min"
      ></div>
    </div>
  </Sidebar.Inset>
</Sidebar.Provider>
