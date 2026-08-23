<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/sidebar-12 -->
<script lang="ts">
  import { Calendar } from "$lib/registry/ui/calendar/index.js"
  import * as Sidebar from "$lib/registry/ui/sidebar/index.js"
</script>

<Sidebar.Group class="px-0">
  <Sidebar.GroupContent>
    <Calendar
      type="single"
      class="[&_[role=gridcell]]:w-[33px] [&_[role=gridcell].bg-accent]:bg-sidebar-primary [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground"
    />
  </Sidebar.GroupContent>
</Sidebar.Group>
