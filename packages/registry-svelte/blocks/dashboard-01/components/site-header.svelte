<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/dashboard-01 -->
<script lang="ts">
  import { Button } from "$lib/registry/ui/button/index.js"
  import { Separator } from "$lib/registry/ui/separator/index.js"
  import * as Sidebar from "$lib/registry/ui/sidebar/index.js"
</script>

<header
  class="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)"
>
  <div class="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
    <Sidebar.Trigger class="-ml-1" />
    <Separator
      orientation="vertical"
      class="mx-2 data-[orientation=vertical]:h-4"
    />
    <h1 class="text-base font-medium">Documents</h1>
    <div class="ml-auto flex items-center gap-2">
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:bg-accent dark:text-foreground hidden h-8 items-center justify-center rounded-md px-3 text-sm font-medium sm:flex"
      >
        GitHub
      </a>
    </div>
  </div>
</header>
