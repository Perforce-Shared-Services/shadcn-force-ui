import type { Registry } from "shadcn/schema"

// [FORCE-UI] Ember ports of the React blocks in
// apps/v4/registry/new-york-v4/blocks/. File paths are relative to this
// package root (resolved by build-registry.mts via getBaseSrcDir).
type BlockItem = Registry["items"][number]

function block(
  name: string,
  description: string,
  files: { path: string; type: "registry:page" | "registry:component" | "registry:file"; target?: string }[],
  registryDependencies: string[],
  categories: string[]
): BlockItem {
  return {
    name,
    description,
    type: "registry:block",
    dependencies: [],
    registryDependencies,
    files: files.map((f) => ({
      path: `blocks/${name}/${f.path}`,
      type: f.type,
      ...(f.target ? { target: f.target } : {}),
    })),
    categories,
  } as unknown as BlockItem
}

const page = (name: string, target: string) => ({
  path: "page.gts",
  type: "registry:page" as const,
  target,
})
const comp = (path: string) => ({ path, type: "registry:component" as const })

export const blocks: BlockItem[] = [
  block("dashboard-01", "A dashboard with sidebar and cards.", [
    page("page.gts", "app/dashboard/page.gts"),
    { path: "data.json", type: "registry:file", target: "app/dashboard/data.json" },
    comp("components/app-sidebar.gts"),
    comp("components/chart-area-interactive.gts"),
    comp("components/data-table.gts"),
    comp("components/nav-main.gts"),
    comp("components/nav-user.gts"),
    comp("components/section-cards.gts"),
    comp("components/site-header.gts"),
  ], ["sidebar", "breadcrumb", "separator", "card", "badge", "button", "checkbox", "table", "dropdown-menu"], ["dashboard"]),

  ...(["login-01","login-02","login-03","login-04","login-05"] as const).flatMap((name) => {
    const deps = ["button", "input"]
    return [block(name, "A simple login form.", [
      page("page.gts", "app/login/page.gts"),
      comp("components/login-form.gts"),
    ], name === "login-01" || name === "login-03" ? [...deps, "card", "field"] : [...deps, "field"], ["authentication", "login"])]
  }),

  ...(["signup-01","signup-02","signup-03","signup-04","signup-05"] as const).map((name) =>
    block(name, "A simple signup form.", [
      page("page.gts", "app/signup/page.gts"),
      comp("components/signup-form.gts"),
    ], ["button", "input", "card", "field"], ["authentication", "signup"])
  ),

  ...Array.from({ length: 16 }, (_, i) => {
    const n = String(i + 1).padStart(2, "0")
    const name = `sidebar-${n}`
    const files: { path: string }[] =
      name === "sidebar-15" ? [] : [{ path: "components/app-sidebar.gts" }]
    const extra: Record<string, string[]> = {
      "sidebar-01": ["search-form.gts", "version-switcher.gts"],
      "sidebar-02": ["search-form.gts", "version-switcher.gts"],
      "sidebar-05": ["search-form.gts"],
      "sidebar-06": ["nav-main-dropdown.gts", "sidebar-opt-in-form.gts"],
      "sidebar-07": ["nav-main.gts", "nav-projects.gts", "nav-user.gts", "team-switcher.gts"],
      "sidebar-08": ["nav-main-platform.gts", "nav-projects.gts", "nav-secondary.gts", "nav-user.gts"],
      "sidebar-09": ["nav-user.gts"],
      "sidebar-10": ["nav-actions.gts", "nav-favorites.gts", "nav-main-plain.gts", "nav-secondary.gts", "nav-workspaces.gts", "team-switcher.gts"],
      "sidebar-11": ["tree-item.gts"],
      "sidebar-12": ["calendars.gts", "date-picker.gts", "nav-user.gts"],
      "sidebar-13": ["settings-dialog.gts"],
      "sidebar-15": ["calendars.gts", "date-picker.gts", "nav-favorites.gts", "nav-main-plain.gts", "nav-secondary.gts", "nav-user.gts", "nav-workspaces.gts", "sidebar-left.gts", "sidebar-right.gts", "team-switcher.gts"],
      "sidebar-16": ["nav-main-platform.gts", "nav-projects.gts", "nav-secondary.gts", "nav-user.gts", "search-form.gts", "site-header.gts"],
    }
    if (name === "sidebar-13") {
      return block(name, "A settings dialog.", [
        comp("components/settings-dialog.gts"),
      ], ["dialog", "sidebar", "breadcrumb", "button"], ["sidebar"])
    }
    for (const f of extra[name] ?? []) files.push({ path: `components/${f}` })
    const regDeps = ["sidebar", "separator", "breadcrumb"]
    if ((extra[name] ?? []).some((f) => f.startsWith("nav-user") || f.includes("team-switcher"))) {
      regDeps.push("dropdown-menu", "collapsible")
    }
    if (name === "sidebar-12" || name === "sidebar-15") {
      // calendars/date-picker are static stand-ins; no calendar dep available
    }
    if (name === "sidebar-13") regDeps.push("dialog")
    return block(name, "A sidebar block.", files.map((f) => comp(f.path.replace(/^components\//, "components/"))), [...new Set(regDeps)], ["sidebar"])
  }),
]
