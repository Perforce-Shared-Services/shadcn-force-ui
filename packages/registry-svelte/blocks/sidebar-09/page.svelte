<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/sidebar-09 -->
<script lang="ts">
  import { Separator } from "$lib/registry/ui/separator/index.js"
  import * as Sidebar from "$lib/registry/ui/sidebar/index.js"

  import AppSidebar from "./components/app-sidebar.svelte"
</script>

<Sidebar.Provider style="--sidebar-width: 20rem;">
  <AppSidebar />
  <Sidebar.Inset>
    <header
      class="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4"
    >
      <Sidebar.Trigger class="-ml-1" />
      <Separator
        orientation="vertical"
        class="mr-2 data-[orientation=vertical]:h-4"
      />
    </header>
  </Sidebar.Inset>
</Sidebar.Provider>
