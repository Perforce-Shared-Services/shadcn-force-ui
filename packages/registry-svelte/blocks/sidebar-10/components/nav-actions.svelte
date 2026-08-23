<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/sidebar-10 -->
<script lang="ts">
  import MoreHorizontal from "~icons/ms/more_horiz"
  import Star from "~icons/ms/star"
  import { Button } from "$lib/registry/ui/button/index.js"
  import * as Popover from "$lib/registry/ui/popover/index.js"
  import * as Sidebar from "$lib/registry/ui/sidebar/index.js"

  const groups = [
    [
      { icon: Star, label: "Rename" },
      { icon: Star, label: "Duplicate" },
      { icon: Star, label: "Archive" },
    ],
    [
      { icon: Star, label: "Copy link" },
      { icon: Star, label: "Move to" },
    ],
    [{ icon: Star, label: "Delete" }],
  ]

  let isOpen = $state(true)
</script>

<div class="flex items-center gap-2 text-sm">
  <div class="hidden font-medium text-muted-foreground md:inline-block">
    Edit Oct 08
  </div>
  <Button variant="ghost" size="icon" class="h-7 w-7">
    <Star />
  </Button>
  <Popover.Root bind:open={isOpen}>
    <Popover.Trigger>
      {#snippet child({ props })}
        <Button
          variant="ghost"
          size="icon"
          class="h-7 w-7 data-[state=open]:bg-accent"
          {...props}
        >
          <MoreHorizontal />
        </Button>
      {/snippet}
    </Popover.Trigger>
    <Popover.Content class="w-56 overflow-hidden rounded-lg p-0" align="end">
      <Sidebar.Root collapsible="none" class="bg-transparent">
        <Sidebar.Content>
          {#each groups as group, index (index)}
            <Sidebar.Group class="border-b last:border-none">
              <Sidebar.GroupContent class="gap-0">
                <Sidebar.Menu>
                  {#each group as item (item.label)}
                    <Sidebar.MenuItem>
                      <Sidebar.MenuButton>
                        <item.icon />
                        <span>{item.label}</span>
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                  {/each}
                </Sidebar.Menu>
              </Sidebar.GroupContent>
            </Sidebar.Group>
          {/each}
        </Sidebar.Content>
      </Sidebar.Root>
    </Popover.Content>
  </Popover.Root>
</div>
