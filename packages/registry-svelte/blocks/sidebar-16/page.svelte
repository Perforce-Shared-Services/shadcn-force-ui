<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/sidebar-16 -->
<script lang="ts">
  import * as Sidebar from "$lib/registry/ui/sidebar/index.js"

  import AppSidebar from "./components/app-sidebar.svelte"
  import SiteHeader from "./components/site-header.svelte"
</script>

<Sidebar.Provider
  style="--sidebar-width: calc(var(--spacing) * 72); --header-height: calc(var(--spacing) * 12);"
>
  <AppSidebar />
  <Sidebar.Inset>
    <SiteHeader />
    <div class="flex flex-1 flex-col">
      <div class="@container/main flex flex-1 flex-col gap-2">
        <div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div class="px-4 lg:px-6">
            <div class="aspect-video rounded-xl bg-muted/50"></div>
          </div>
        </div>
      </div>
    </div>
  </Sidebar.Inset>
</Sidebar.Provider>
