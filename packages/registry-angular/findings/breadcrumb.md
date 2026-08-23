# breadcrumb — Migration Review

## Checklist

### 1. Examples match React base?

All 7 React base demos have Angular counterparts (1:1 file-name parity):
`breadcrumb-{basic,demo,dropdown,ellipsis,link,rtl,separator}`.

Material deviations:

| Demo | Deviation | Severity |
|------|-----------|----------|
| `breadcrumb-demo.ts` | DropdownMenu omitted; comment says "pending" but the Angular dropdown-menu port is available and used in `breadcrumb-dropdown.ts`. Hero demo renders a ghost button with no popup — the React `BreadcrumbDemo` is a full dropdown. | major |
| `breadcrumb-separator.ts` | `<li uiBreadcrumbSeparator [innerHTML]="dot">` — `[innerHTML]` on the component host overwrites Angular's rendered view; custom dot separator is visually broken. React: `<BreadcrumbSeparator><DotIcon /></BreadcrumbSeparator>` (children projection). | blocker |
| `breadcrumb-dropdown.ts` | Same `[innerHTML]` on separator host (`line 49`). Dropdown menu itself is correctly composed. | blocker |
| `breadcrumb-rtl.ts` | Same separator `[innerHTML]` issue (line 40) + `<svg [innerHTML]="chevronDown">` double-nests SVGs (should be `<span>`). Stale "pending" dropdown comment. React RTL has full dropdown. | blocker + major |
| `breadcrumb-link.ts` | `href="#link-component"` (no router); comment explains Angular's attribute-selector idiom replaces React `render` prop. Acceptable. | — |

### 2. Docs follow the React/flat pattern?

`apps/v4/content/docs/components/angular/breadcrumb.mdx`:

- ✅ Frontmatter: `title`, `description`, `base: angular`, `component: true`.
- ✅ Hero preview first line after frontmatter: `<ComponentPreview framework="angular" name="breadcrumb-demo" previewClassName="p-2" />`.
- ✅ `## Installation` → CodeTabs with cli + manual (Steps + `<ComponentSource framework="angular" name="breadcrumb">`).
- ✅ `## Usage` → import snippet + template snippet.
- ✅ `## Composition` → ASCII tree (matches base page).
- ✅ Flat `##` per example: Basic / Custom separator / Dropdown / Collapsed / Link component.
- ✅ `## RTL` second-to-last with `direction="rtl"` and pointer to `/docs/rtl`.
- ✅ `## API Reference` last, `### PartName` sub-sections with `| Input | Type | Default |` tables.

No `## Examples` umbrella. Fully compliant with `docs/component-docs-standard.md`.

### 3. Available inside the registry?

`_registry.ts` entry (`lines 283–293`):
```
name: "breadcrumb", type: "registry:ui"
files:
  breadcrumb.component.ts          ✅ on disk
  breadcrumb-separator.component.html ✅
  breadcrumb-ellipsis.component.html  ✅
  breadcrumb.component.html           ✅
  breadcrumb.icons.ts                 ✅
  index.ts                            ✅
```
All 6 disk files registered; no extras, no missing.

`framework-components.ts` angular Set: `"breadcrumb"` ✅ (line ~279).  
`apps/v4/content/docs/components/angular/meta.json` pages: `"breadcrumb"` ✅.  
All 7 demo files exist under `apps/preview-angular/src/angular/breadcrumb-*.ts` ✅.

`validate:previews` resolution: all 7 demo components are discoverable (top-level glob, no subdirectory nesting, default exports present). Should pass once separator rendering bugs are fixed.

### 4. Style diff vs original p4one

| Part | p4one class string | registry-angular | Notes |
|------|--------------------|------------------|-------|
| `BreadcrumbComponent` (root) | `cn(className)` — no own classes | `cn("cn-breadcrumb", className)` | `cn-breadcrumb` undefined in CSS — dead class |
| `BreadcrumbListComponent` | `'flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-muted-foreground'` | `cn("cn-breadcrumb-list flex flex-wrap items-center wrap-break-word", ...)` | CSS token supplies `gap-1.5 text-sm text-muted-foreground` — equivalent |
| `BreadcrumbItemComponent` | `'inline-flex items-center gap-1'` | `cn("cn-breadcrumb-item inline-flex items-center", ...)` | CSS token supplies `gap-1` — equivalent |
| `BreadcrumbLinkComponent` | full inline Tailwind | `cn("cn-breadcrumb-link", ...)` | CSS token matches — equivalent |
| `BreadcrumbPageComponent` | `'font-normal text-foreground'` | `cn("cn-breadcrumb-page", ...)` | CSS token matches — equivalent |
| `BreadcrumbSeparatorComponent` | `cn('[&_svg]:size-3.5 [&_svg]:fill-current', ...)` | `cn("cn-breadcrumb-separator [&_svg]:size-3.5 [&_svg]:fill-current", ...)` | CSS uses `[&>svg]:size-3.5` (direct child); both add descendant form inline |
| `BreadcrumbEllipsisComponent` | `cn('flex size-5 items-center justify-center', ...)` | `cn("cn-breadcrumb-ellipsis flex items-center justify-center", ...)` | CSS includes `size-5 [&>svg]:size-4`; equivalent |

**Theme promotion candidates:**

| Candidate | Current location | Rationale |
|-----------|-----------------|-----------|
| `[&_svg]:fill-current` on separator | Inline in both p4one and registry-angular | CSS token only has `[&>svg]:size-3.5`; fill rule missing from token — should be in `.cn-breadcrumb-separator` |
| `[&>svg]:size-3.5` → `[&_svg]:size-3.5` in CSS | `style-force-ui.css:184` | Injected icon sits in a wrapper span; direct-child selector misses it — update CSS to descendant form to match runtime usage |
| `.cn-breadcrumb {}` | Not defined | Add empty rule or document explicitly that the root carries no own token styles (p4one approach); remove the class from `BreadcrumbComponent` if no styles needed |

## Verdict

**FAIL** — Component implementation is solid, docs MDX structure is correct, registry registration is complete. Three demo files (`breadcrumb-separator.ts`, `breadcrumb-dropdown.ts`, `breadcrumb-rtl.ts`) have a blocker-level `[innerHTML]` binding on the Angular component host that breaks custom separator rendering; `breadcrumb-demo.ts` is an incomplete stub missing its DropdownMenu despite the port being available.

## Issues

1. **[blocker]** `breadcrumb-separator.ts:20`, `breadcrumb-dropdown.ts:49`, `breadcrumb-rtl.ts:40` — `<li uiBreadcrumbSeparator [innerHTML]="dot"></li>` binds `innerHTML` directly on the Angular component's host element, overwriting the component's rendered view with the raw SVG string. Fix: project via ng-content — `<li uiBreadcrumbSeparator><span [innerHTML]="safeDot"></span></li>` where `safeDot = inject(DomSanitizer).bypassSecurityTrustHtml(DOT_SVG)`.
2. **[major]** `breadcrumb-demo.ts:11-14` — hero demo comment says "dropdown-menu port pending" but the port is fully available (see `breadcrumb-dropdown.ts`). Demo renders a button-only stub. Fix: compose `DropdownMenuRoot/Trigger/Content` around the ellipsis, matching the React `BreadcrumbDemo`.
3. **[major]** `breadcrumb-rtl.ts:32` — `<svg [innerHTML]="chevronDown">` nests an SVG string inside an SVG element. Fix: use `<span [innerHTML]="safeChevron">` (matching `breadcrumb-dropdown.ts:45`).
4. **[major]** `breadcrumb-rtl.ts:22` — stale "DropdownMenu composition pending" comment; RTL demo omits the dropdown. Fix: add DropdownMenu consistent with the dropdown demo and RTL React original.
5. **[minor]** `breadcrumb.component.ts:44` — `BreadcrumbComponent` applies class `"cn-breadcrumb"` but no `.cn-breadcrumb {}` rule exists in `style-force-ui.css`. Either define the rule or remove the class (p4one root emits no own classes).
6. **[minor]** `style-force-ui.css:184` — `.cn-breadcrumb-separator { @apply [&>svg]:size-3.5; }` uses direct-child selector; SVG is injected inside a wrapper span so the selector misses it. Promote to `[&_svg]:size-3.5 [&_svg]:fill-current` to match runtime usage and eliminate the inline overrides in the component.
```

---
