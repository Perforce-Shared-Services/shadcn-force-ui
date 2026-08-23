# sidebar — Migration Review

## Checklist

### 1. Examples match React base?

Checked all 14 Angular demos against `apps/v4/examples/base/sidebar-*.tsx`.

**Structural deviations:**

- **`sidebar-demo.ts:212` and `sidebar-rtl.ts` (same pattern) — MAJOR**: NavMain loop wraps each of the 4 items in its own `<div uiSidebarGroup><div uiSidebarGroupLabel>Platform</div>…</div>`, producing four separate groups each labelled "Platform". The React base iterates items inside **one** `<SidebarGroup>` with one label. Causes visible layout difference: 4×padding + 4×"Platform" text.

- **`sidebar-rtl.ts:162` — BLOCKER**: `<button uiSidebarTrigger class="absolute top-4 right-4 …"></button>` appears at line 162, immediately before `<div uiSidebarProvider …>` at line 163. Both are children of `[uiDirectionProvider]`. Angular's element injector walks ancestors only; the trigger's `injectSidebar()` finds no `SIDEBAR_CONTEXT` ancestor and throws `"injectSidebar() must be used within a SidebarProvider"` at runtime. The inner trigger at line 356 (inside `uiSidebarInset`) is correctly placed.

- **`sidebar-footer.ts`**: React's footer dropdown has `side="top"` on `<DropdownMenuContent>`; Angular omits it (dropdown opens on default side).

- **`sidebar-menu-action.ts`**: React renders 5 project rows; Angular renders 3. React's `<DropdownMenuContent side="right" align="start">` → Angular's `<div uiDropdownMenuContent>` with no side/align.

- **`sidebar-menu-sub.ts`**: React has 4 sections ("Getting Started", "Build Your Application", "API Reference", "Architecture"); Angular has 3 (missing "Architecture").

- **`sidebar-rsc.ts`**: React example carries badge numbers in the project data but doesn't render them in the component body; Angular equivalent omits them from data too — acceptable divergence given the RSC concept difference (noted in docs via `<Callout>`).

All other demos (`sidebar-menu`, `sidebar-group`, `sidebar-group-action`, `sidebar-group-collapsible`, `sidebar-menu-collapsible`, `sidebar-menu-badge`, `sidebar-controlled`, `sidebar-header`) match their React counterparts structurally.

### 2. Docs follow the React/flat pattern?

Checked `apps/v4/content/docs/components/angular/sidebar.mdx` against `docs/component-docs-standard.md`.

- **Hero preview**: `<ComponentPreview framework="angular" name="sidebar-demo" />` is the first element after frontmatter, before any heading. ✓
- **Flat `##` per example**: No `## Examples` umbrella; every example is a flat `## Heading`. ✓
- **`## RTL` second-to-last**: Present, with a one-line pointer to `/docs/rtl`. ✓
- **`## API Reference` last**: Present. ✓
- **Minor deviation**: The `## RTL` `<ComponentPreview>` uses `align="start"` but **omits `direction="rtl"`**, which the docs standard requires (`<ComponentPreview … direction="rtl" />`). The demo wraps its own `DirectionProvider` so this doesn't break the preview, but it's a standard violation.

### 3. Available inside the registry?

- **`_registry.ts` entry** at line 779: name `"sidebar"`, `type: "registry:ui"`, `registryDependencies: ["button","input","separator","sheet","skeleton","tooltip"]`, 10 files listed — all match disk (`index.ts`, `sidebar-group.component.ts`, `sidebar-layout.component.ts`, `sidebar-menu.component.ts`, `sidebar-provider.component.ts`, `sidebar.component.html`, `sidebar.component.ts`, `sidebar.icons.ts`, `sidebar.variants.ts`, `use-mobile.ts`). ✓
- **`apps/v4/lib/framework-components.ts` angular Set**: `"sidebar"` present at line 432. ✓
- **`apps/v4/content/docs/components/angular/meta.json`**: `"sidebar"` present at line 51. ✓
- All `<ComponentPreview framework="angular" name="sidebar-*">` slugs resolve to files in `apps/preview-angular/src/angular/`. ✓

### 4. Style diff vs original p4one

| p4one inline class / approach | Registry equivalent | In `style-force-ui.css`? |
|---|---|---|
| Active indicator span: hardcoded `pointer-events-none absolute -left-[6px] inset-y-0 w-1 rounded-full bg-sidebar-accent-foreground opacity-0 peer-data-active/menu-button:opacity-100` | `cn-sidebar-menu-item-indicator` | Yes — `[FORCE-UI]` block at line 1242 |
| `motion-reduce:transition-none` on menu-button base | part of `cn-sidebar-menu-button` token | Yes — `[FORCE-UI] WCAG 2.3.3 guard` comment at line 1231 |
| `outline` variant shadow: `shadow-[0_0_0_1px_var(--sidebar-border)]` (direct-var, not `hsl()` wrapper) | `cn-sidebar-menu-button-variant-outline` | Yes — `[FORCE-UI]` comment at line 1250 |
| `@Component` for all layout parts (`<ng-content />` template) | `@Directive` for stateless parts (header, footer, content, etc.) | N/A — architecture change only |
| `button[uiSidebarMenuButton]` selector (element-restricted) | `[uiSidebarMenuButton]` (attribute-only, supports `<a>`) | N/A — no CSS impact |

**Theme promotion candidates:** None remaining. Every p4one-local class addition or WCAG guard is already promoted to `style-force-ui.css` with a `[FORCE-UI]` marker. The active-state accent indicator (`cn-sidebar-menu-item-indicator`) is a Force UI custom element not present in the upstream registry or Figma spec.

---

## Verdict

**FAIL** — two blockers prevent the component from functioning correctly.

## Issues

1. **[blocker]** `sidebar-layout.component.ts:30` — `SidebarTriggerDirective` is a `@Directive` (no template). Its `icon: SafeHtml` field at line 35 is injected via `DomSanitizer` but never bound to the DOM; `@Directive` has no template. Every demo using `<button uiSidebarTrigger></button>` renders an empty, invisible button. The doc comment at line 16 says the glyph is "mirrored in RTL (`cn-rtl-flip`)" — that class also cannot be applied without a template. Fix: restore as `@Component` (as in p4one `sidebar-trigger.component.ts`) with template `<span class="inline-flex cn-rtl-flip [&>svg]:fill-current" aria-hidden="true" [innerHTML]="icon"></span><span class="sr-only">Toggle sidebar</span>`.

2. **[blocker]** `sidebar-rtl.ts:162` — `<button uiSidebarTrigger>` is a sibling element placed **before** `<div uiSidebarProvider>` at line 163. Angular element-injector lookup walks ancestors only; `injectSidebar()` throws at runtime. Move the floating trigger inside the `[uiSidebarProvider]` subtree (or inside `[uiSidebarInset]`, as the React RTL demo does).

3. **[major]** `sidebar-demo.ts:211–245` and `sidebar-rtl.ts` (same pattern) — NavMain `@for` loop wraps each item in a separate `<div uiSidebarGroup><div uiSidebarGroupLabel>Platform</div>…</div>`, creating four groups each with a "Platform" header. React base: one `<SidebarGroup>` → one `<SidebarMenu>` → items iterated inside `@for`. Refactor to hoist `<div uiSidebarGroup>` and `<div uiSidebarGroupLabel>` outside the loop.

4. **[minor]** `sidebar-footer.ts` — Footer dropdown content missing `side="top"` (React: `<DropdownMenuContent side="top" …>`).

5. **[minor]** `sidebar-menu-action.ts` — 3 project rows vs React's 5; `<div uiDropdownMenuContent>` missing `side="right" align="start"`.

6. **[minor]** `sidebar-menu-sub.ts` — Missing 4th "Architecture" section present in React base.

7. **[minor]** `sidebar.mdx` `## RTL` section — `<ComponentPreview>` missing `direction="rtl"` prop per docs standard.
```

---
