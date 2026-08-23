<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/sidebar-16 -->
<script lang="ts">
  import PanelLeftIcon from "~icons/ms/left_panel_close"
  import * as Breadcrumb from "$lib/registry/ui/breadcrumb/index.js"
  import { Button } from "$lib/registry/ui/button/index.js"
  import { Separator } from "$lib/registry/ui/separator/index.js"
  import { useSidebar } from "$lib/registry/ui/sidebar/context.svelte.js"

  import SearchForm from "./search-form.svelte"

  const sidebar = useSidebar()
</script>

<header
  class="sticky top-0 z-50 flex w-full items-center border-b bg-background"
>
  <div class="flex h-(--header-height) w-full items-center gap-2 px-4">
    <Button
      class="h-8 w-8"
      variant="ghost"
      size="icon"
      onclick={() => sidebar.toggle()}
    >
      <PanelLeftIcon />
      <span class="sr-only">Toggle Sidebar</span>
    </Button>
    <Separator orientation="vertical" class="mr-2 h-4" />
    <Breadcrumb.Root class="hidden sm:block">
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#Build Your Application"
            >Build Your Application</Breadcrumb.Link
          >
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page>Data Fetching</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
    <SearchForm class="w-full sm:ml-auto sm:w-auto" />
  </div>
</header>
