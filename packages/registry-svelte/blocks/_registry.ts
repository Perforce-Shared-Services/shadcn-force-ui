import { type Registry } from "shadcn/schema"

// [FORCE-UI] Svelte ports of the React blocks in
// apps/v4/registry/new-york-v4/blocks/. Registered as registry:block items so
// build-registry.mts picks them up via packages/registry-svelte/registry.ts.
export const blocks: Registry["items"] = [
  {
    name: "dashboard-01",
    description: "A dashboard with sidebar, charts and data table.",
    type: "registry:block",
    dependencies: ["@tanstack/table-core", "layerchart", "d3-scale"],
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "chart",
      "card",
      "select",
      "table",
      "badge",
      "button",
      "dropdown-menu",
      "input",
      "avatar",
    ],
    files: [
      {
        path: "blocks/dashboard-01/page.svelte",
        type: "registry:page",
        target: "src/routes/dashboard/+page.svelte",
      },
      {
        path: "blocks/dashboard-01/data.json",
        type: "registry:file",
        target: "src/lib/blocks/dashboard-01/data.json",
      },
      ...componentFiles("blocks/dashboard-01/components", [
        "app-sidebar.svelte",
        "chart-area-interactive.svelte",
        "data-table.svelte",
        "nav-documents.svelte",
        "nav-main.svelte",
        "nav-secondary.svelte",
        "nav-user.svelte",
        "section-cards.svelte",
        "site-header.svelte",
      ]),
    ],
    categories: ["dashboard"],
  },
  ...authBlock("login-01", "A simple login form.", [
    "button",
    "card",
    "input",
    "field",
  ]),
  ...authBlock("login-02", "A login form with a social button.", [
    "button",
    "input",
    "field",
  ]),
  ...authBlock("login-03", "A simple login form.", [
    "button",
    "card",
    "input",
    "field",
  ]),
  ...authBlock("login-04", "A two column login page with a cover image.", [
    "button",
    "card",
    "input",
    "field",
  ]),
  ...authBlock("login-05", "A centered login page.", [
    "button",
    "input",
    "field",
  ]),
  ...authBlock("signup-01", "A simple signup form.", [
    "button",
    "card",
    "input",
    "field",
  ]),
  ...authBlock("signup-02", "A two column signup page with a cover image.", [
    "button",
    "input",
    "field",
  ]),
  ...authBlock("signup-03", "A simple signup form.", [
    "button",
    "card",
    "input",
    "field",
  ]),
  ...authBlock("signup-04", "A two column signup page with a cover image.", [
    "button",
    "card",
    "input",
    "field",
  ]),
  ...authBlock("signup-05", "A centered signup page.", [
    "button",
    "input",
    "field",
  ]),
]

function authBlock(
  name: string,
  description: string,
  registryDependencies: string[]
): Registry["items"] {
  const componentName = name.startsWith("signup") ? "signup-form" : "login-form"
  return [
    {
      name,
      description,
      type: "registry:block",
      registryDependencies,
      files: [
        {
          path: `blocks/${name}/page.svelte`,
          type: "registry:page",
          target: `src/routes/${name}/+page.svelte`,
        },
        {
          path: `blocks/${name}/components/${componentName}.svelte`,
          type: "registry:component",
        },
      ],
      categories: name.startsWith("login")
        ? ["authentication", "login"]
        : ["authentication", "signup"],
    } as Registry["items"][number],
  ]
}

function componentFiles(base: string, files: string[]) {
  return files.map((f) => ({
    path: `${base}/${f}`,
    type: "registry:component" as const,
  }))
}

// Sidebar blocks (sidebar-01..16) are appended here by the sidebar block set.
export const sidebarBlocks: Registry["items"] = (
  [
    [
      "sidebar-01",
      "A simple sidebar with navigation grouped by section.",
      true,
    ],
    ["sidebar-02", "A sidebar with collapsible sections.", false],
    ["sidebar-03", "A sidebar with sub-components.", false],
    ["sidebar-04", "A floating sidebar with sub-components.", false],
    ["sidebar-05", "A sidebar with collapsible sub-sections.", false],
    ["sidebar-06", "A sidebar with dropdown navigation menus.", false],
    [
      "sidebar-07",
      "A sidebar with team switcher, projects, and user menu.",
      false,
    ],
    ["sidebar-08", "An inset sidebar with secondary navigation.", false],
    ["sidebar-09", "A sidebar with an icon bar and mail list.", false],
    ["sidebar-10", "A sidebar with favorites, workspaces, and actions.", false],
    ["sidebar-11", "A sidebar showing file changes and a file tree.", false],
    [
      "sidebar-12",
      "A sidebar with calendar, date picker, and user menu.",
      false,
    ],
    ["sidebar-13", "A settings dialog built with a sidebar inside.", false],
    ["sidebar-14", "A table of contents sidebar.", false],
    ["sidebar-15", "Left and right sidebars with sticky headers.", false],
    ["sidebar-16", "A sidebar with a sticky header and search.", false],
  ] as const
).map(([name, description]) => ({
  name,
  description,
  type: "registry:block" as const,
  registryDependencies: sidebarRegistryDeps(name),
  files: sidebarFiles(name),
  categories: ["sidebar"],
}))

function sidebarRegistryDeps(name: string): string[] {
  const deps = ["sidebar", "separator"]
  if (name !== "sidebar-13") deps.push("breadcrumb")
  if (
    [
      "sidebar-07",
      "sidebar-08",
      "sidebar-09",
      "sidebar-12",
      "sidebar-15",
      "sidebar-16",
    ].includes(name)
  )
    deps.push("avatar", "dropdown-menu")
  if (["sidebar-06", "sidebar-07", "sidebar-08"].includes(name))
    deps.push("collapsible")
  if (name === "sidebar-12") deps.push("calendar")
  if (name === "sidebar-13") deps.push("dialog")
  return deps
}

function sidebarFiles(name: string) {
  // Component file lists mirror the React block sources one-for-one.
  const componentMap: Record<string, string[]> = {
    "sidebar-01": [
      "app-sidebar.svelte",
      "search-form.svelte",
      "version-switcher.svelte",
    ],
    "sidebar-02": [
      "app-sidebar.svelte",
      "search-form.svelte",
      "version-switcher.svelte",
    ],
    "sidebar-03": ["app-sidebar.svelte"],
    "sidebar-04": ["app-sidebar.svelte"],
    "sidebar-05": ["app-sidebar.svelte", "search-form.svelte"],
    "sidebar-06": [
      "app-sidebar.svelte",
      "nav-main.svelte",
      "sidebar-opt-in-form.svelte",
    ],
    "sidebar-07": [
      "app-sidebar.svelte",
      "nav-main.svelte",
      "nav-projects.svelte",
      "nav-user.svelte",
      "team-switcher.svelte",
    ],
    "sidebar-08": [
      "app-sidebar.svelte",
      "nav-main.svelte",
      "nav-projects.svelte",
      "nav-secondary.svelte",
      "nav-user.svelte",
    ],
    "sidebar-09": ["app-sidebar.svelte", "nav-user.svelte"],
    "sidebar-10": [
      "app-sidebar.svelte",
      "nav-actions.svelte",
      "nav-favorites.svelte",
      "nav-main.svelte",
      "nav-secondary.svelte",
      "nav-workspaces.svelte",
      "team-switcher.svelte",
    ],
    "sidebar-11": ["app-sidebar.svelte", "tree.svelte"],
    "sidebar-12": [
      "app-sidebar.svelte",
      "calendars.svelte",
      "date-picker.svelte",
      "nav-user.svelte",
    ],
    "sidebar-13": ["settings-dialog.svelte"],
    "sidebar-14": ["app-sidebar.svelte"],
    "sidebar-15": [
      "calendars.svelte",
      "date-picker.svelte",
      "nav-favorites.svelte",
      "nav-main.svelte",
      "nav-secondary.svelte",
      "nav-user.svelte",
      "nav-workspaces.svelte",
      "sidebar-left.svelte",
      "sidebar-right.svelte",
      "team-switcher.svelte",
    ],
    "sidebar-16": [
      "app-sidebar.svelte",
      "nav-main.svelte",
      "nav-projects.svelte",
      "nav-secondary.svelte",
      "nav-user.svelte",
      "search-form.svelte",
      "site-header.svelte",
    ],
  }

  return [
    {
      path: `blocks/${name}/page.svelte`,
      type: "registry:page" as const,
      target: `src/routes/${name}/+page.svelte`,
    },
    ...(componentMap[name] ?? []).map((f) => ({
      path: `blocks/${name}/components/${f}`,
      type: "registry:component" as const,
    })),
  ]
}
