<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/dashboard-01 -->
<!-- ponytail: simplified vs React — no dnd-kit row reordering or @tanstack/react-table column
     pinning; plain Svelte state covers sorting/filter/visibility. Port table-core if parity
     with the React data-table becomes a requirement. -->
<script lang="ts">
  import ChevronDown from "~icons/ms/keyboard_arrow_down"
  import ArrowUpDown from "~icons/ms/swap_vert"
  import { Badge } from "$lib/registry/ui/badge/index.js"
  import { Button } from "$lib/registry/ui/button/index.js"
  import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js"
  import { Input } from "$lib/registry/ui/input/index.js"
  import * as Table from "$lib/registry/ui/table/index.js"

  type Row = {
    id: number
    header: string
    type: string
    status: string
    target: string
    limit: string
    reviewer: string
  }

  let { data }: { data: Row[] } = $props()

  const columns = [
    { key: "header", label: "Title" },
    { key: "type", label: "Type" },
    { key: "status", label: "Status" },
    { key: "target", label: "Target" },
    { key: "limit", label: "Limit" },
    { key: "reviewer", label: "Reviewer" },
  ] as const

  const visibleColumns: Record<
    "header" | "type" | "status" | "target" | "limit" | "reviewer",
    boolean
  > = $state({
    header: true,
    type: true,
    status: true,
    target: true,
    limit: true,
    reviewer: true,
  })
  let search = $state("")
  let sortKey = $state<keyof Row>("id")
  let sortAsc = $state(false)

  const filtered = $derived(
    data.filter(
      (row) =>
        row.header.toLowerCase().includes(search.toLowerCase()) ||
        row.reviewer.toLowerCase().includes(search.toLowerCase())
    )
  )

  const sorted = $derived.by(() => {
    const rows = [...filtered].sort((a, b) => {
      const av = String(a[sortKey])
      const bv = String(b[sortKey])
      return sortAsc
        ? av.localeCompare(bv, undefined, { numeric: true })
        : bv.localeCompare(av, undefined, { numeric: true })
    })
    return rows
  })
</script>

<div class="flex flex-col gap-4 px-4 lg:px-6">
  <div class="flex flex-wrap items-center justify-between gap-3">
    <Input class="max-w-xs" placeholder="Filter rows..." bind:value={search} />
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {#snippet child({ props })}
          <Button variant="outline" {...props}>
            Columns <ChevronDown class="ml-auto size-4" />
          </Button>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end" class="w-44">
        {#each columns as column (column.key)}
          <DropdownMenu.CheckboxItem
            bind:checked={visibleColumns[column.key]}
            class="capitalize"
          >
            {column.label}
          </DropdownMenu.CheckboxItem>
        {/each}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>
  <div class="overflow-hidden rounded-lg border">
    <Table.Root>
      <Table.Header>
        <Table.Row class="bg-muted/50">
          {#each columns as column (column.key)}
            {#if visibleColumns[column.key]}
              <Table.Head>
                <Button
                  variant="ghost"
                  size="sm"
                  class="-ml-2 h-8"
                  onclick={() => {
                    sortKey =
                      column.key === sortKey
                        ? sortKey
                        : (column.key as keyof Row)
                    sortAsc = column.key === sortKey ? !sortAsc : true
                  }}
                >
                  {column.label}
                  <ArrowUpDown class="ml-1 size-3" />
                </Button>
              </Table.Head>
            {/if}
          {/each}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each sorted as row (row.id)}
          <Table.Row class="hover:bg-muted/50">
            {#each columns as column (column.key)}
              {#if visibleColumns[column.key]}
                <Table.Cell>
                  {#if column.key === "status"}
                    <Badge
                      variant="outline"
                      class="text-muted-foreground px-1.5"
                    >
                      {row.status}
                    </Badge>
                  {:else if column.key === "target"}
                    <span class="tabular-nums">{row.target}</span>
                  {:else if column.key === "limit"}
                    <span class="tabular-nums">{row.limit}</span>
                  {:else}
                    {row[column.key as keyof Row]}
                  {/if}
                </Table.Cell>
              {/if}
            {/each}
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>
</div>
