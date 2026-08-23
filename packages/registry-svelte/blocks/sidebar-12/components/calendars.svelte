<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/sidebar-12 -->
<script lang="ts">
  import Check from "~icons/ms/check"
  import ChevronRight from "~icons/ms/chevron_right"
  import * as Collapsible from "$lib/registry/ui/collapsible/index.js"
  import * as Sidebar from "$lib/registry/ui/sidebar/index.js"

  let {
    calendars,
  }: {
    calendars: { name: string; items: string[] }[]
  } = $props()

  let openState = $state(
    Object.fromEntries(calendars.map((c, ix) => [c.name, ix === 0]))
  )
</script>

{#each calendars as calendar, index (calendar.name)}
  <Sidebar.Group class="py-0">
    <Collapsible.Root
      bind:open={openState[calendar.name]}
      class="group/collapsible"
    >
      <Sidebar.GroupLabel
        class="group/label w-full text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      >
        {#snippet child({ props })}
          <Collapsible.Trigger {...props}>
            {calendar.name}
            <ChevronRight
              class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
            />
          </Collapsible.Trigger>
        {/snippet}
      </Sidebar.GroupLabel>
      <Collapsible.Content>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            {#each calendar.items as item (item)}
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                  <div
                    data-active={index < 2}
                    class="group/calendar-item flex aspect-square size-4 shrink-0 items-center justify-center rounded-sm border border-sidebar-border text-sidebar-primary-foreground data-[active=true]:border-sidebar-primary data-[active=true]:bg-sidebar-primary"
                  >
                    <Check
                      class="hidden size-3 group-data-[active=true]/calendar-item:block"
                    />
                  </div>
                  {item}
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            {/each}
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Collapsible.Content>
    </Collapsible.Root>
  </Sidebar.Group>
  <Sidebar.Separator class="mx-0" />
{/each}
