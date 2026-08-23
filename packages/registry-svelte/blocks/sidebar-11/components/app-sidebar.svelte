<!-- [FORCE-UI] Ported from registry/new-york-v4/blocks/sidebar-11 -->
<script lang="ts">
  import FileIcon from "~icons/ms/description"
  import * as Sidebar from "$lib/registry/ui/sidebar/index.js"

  import Tree from "./tree.svelte"

  type TreeItem = string | TreeItem[]

  const changes = [
    { state: "modified", file: "app/layout.tsx" },
    { state: "modified", file: "components/ui/button.tsx" },
  ]

  const files: TreeItem[] = [
    "package.json",
    "tsconfig.json",
    [
      "app",
      ["page.tsx", "layout.tsx"],
      ["components", ["button.tsx", "card.tsx"]],
    ],
  ]
</script>

<Sidebar.Root>
  <Sidebar.Content>
    <Sidebar.Group>
      <Sidebar.GroupLabel>Changes</Sidebar.GroupLabel>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {#each changes as change, index (index)}
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                <FileIcon />
                {change.file}
              </Sidebar.MenuButton>
              <Sidebar.MenuBadge>{change.state}</Sidebar.MenuBadge>
            </Sidebar.MenuItem>
          {/each}
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>
    <Sidebar.Group>
      <Sidebar.GroupLabel>Files</Sidebar.GroupLabel>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {#each files as item, index (index)}
            <Tree {item} />
          {/each}
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>
  </Sidebar.Content>
  <Sidebar.Rail />
</Sidebar.Root>
