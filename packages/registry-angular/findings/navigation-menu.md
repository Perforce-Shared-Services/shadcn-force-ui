# navigation-menu — Migration Review

## Checklist

### 1. Examples match React base?

React baseline: `navigation-menu-demo.tsx`, `navigation-menu-rtl.tsx` (2 files).
Angular: `navigation-menu-demo.ts`, `navigation-menu-rtl.ts` (2 files — count correct, names match).

**`navigation-menu-demo.ts`** — 4 items (Getting started, Components, With Icon, Docs).
Content, descriptions, hrefs, and `navigationMenuTriggerStyle()` on the Docs `<a>` all match
React exactly. Icons are inlined as SVG strings via `[innerHTML]` — acceptable framework
adaptation. ✓

**`navigation-menu-rtl.ts`** — two material deviations:
- **"With Icon" panel**: React RTL has `<CircleAlertIcon />` / `<CircleDashedIcon />` /
  `<CircleCheckIcon />` and `class="flex-row items-center gap-2"` on each link. Angular RTL has
  bare `<a uiNavigationMenuLink href="#">قائمة الانتظار</a>` with no icons and no layout
  classes.
- **"Docs" link**: React RTL applies `className={navigationMenuTriggerStyle()}`. Angular RTL
  omits `[class]="triggerStyle"` entirely; `navigationMenuTriggerStyle` is not even imported in
  the RTL component.

### 2. Docs follow the React/flat pattern?

Page structure matches the base page and docs standard:
- Frontmatter: `title`, `description`, `base: angular`, `component: true`, `links.doc`,
  `links.api` ✓
- Hero `<ComponentPreview framework="angular" name="navigation-menu-demo" />` before any heading ✓
- `## Installation` (CodeTabs, cli + manual with ComponentSource) ✓
- `## Usage` ✓
- `## Composition` ✓
- `## Link Component` (mirrors base page section) ✓
- `## RTL` with `direction="rtl"` ✓
- `## API Reference` last ✓
- Flat `##` per example; no `## Examples` umbrella ✓

Minor: both hero and RTL `<ComponentPreview>` are missing `previewClassName="h-96"` that the
base page uses (`apps/v4/content/docs/components/base/navigation-menu.mdx`).

### 3. Available inside the registry?

`packages/registry-angular/ui/_registry.ts` (line 644):
```
name: "navigation-menu"
dependencies: ["@radix-ng/primitives"]
files: index.ts, navigation-menu.component.html, navigation-menu.component.ts,
       navigation-menu.icons.ts, navigation-menu.variants.ts
```
All five files exist on disk. ✓

`apps/v4/lib/framework-components.ts` angular `Set` (line 384): `"navigation-menu"` present at
line 422. ✓

`apps/v4/content/docs/components/angular/meta.json` pages array: `"navigation-menu"` present. ✓

Demo selectors follow the `preview-*` convention (`preview-navigation-menu-demo`,
`preview-navigation-menu-rtl`). `validate:previews` should resolve both. ✓

### 4. Style diff vs original p4one

`/opt/dev/pd-p4one` used fully inline Tailwind strings with no `cn-*` tokens (it predates the
token layer). The registry port splits structural layout into the variant constants and
interactive/state styles into `cn-*` CSS tokens. The design is correct in principle but
**several token classes are never applied to their elements**.

| Part | p4one classes (key extracts) | Registry constant | Token class applied? |
|---|---|---|---|
| Root | `max-w-max flex flex-1 …` (inline) | `group/navigation-menu relative flex flex-1 …` | **No** — `cn-navigation-menu` missing |
| List | `gap-0 flex flex-1 …` (inline) | `group flex flex-1 list-none …` | **No** — `cn-navigation-menu-list` missing |
| Trigger | `rounded-lg px-2.5 py-1.5 text-sm hover:bg-muted focus-visible:ring-3 data-open:bg-muted/50 …` (inline) | structural only (`inline-flex h-9 w-max …`) | **No** — `cn-navigation-menu-trigger` missing |
| Trigger | `role="menuitem"` | not set | N/A |
| Content | `p-1 data-open:animate-in data-closed:zoom-out-95 **:data-[slot=…]:focus:ring-0 …` | `top-0 left-0 w-full md:absolute … data-open:animate-in …` | **No** — `cn-navigation-menu-content` missing |
| Viewport panel | `bg-popover shadow ring-1 rounded-lg data-open:zoom-in-90 …` (inline) | `origin-top-center relative mt-1.5 h-(--…) w-full overflow-hidden …` | **No** — `cn-navigation-menu-viewport` missing |
| Link | full inline string | `cn-navigation-menu-link` | **Yes** ✓ |
| Trigger icon | inline span class | `cn-navigation-menu-trigger-icon …` | **Yes** ✓ |

The link and trigger-icon follow the correct "token class + structural extras" pattern. Trigger,
viewport, content, root, and list do not include their token class, so all interactive/visual
styles provided by those tokens are dead.

`p4one`-local additions **not** in the global theme:
- `**:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none`
  on the content component (prevents double focus ring inside panels).

#### Theme promotion candidates

| Pattern | Current location | In style-force-ui.css? | Recommend |
|---|---|---|---|
| `max-w-max` on root | p4one inline → `cn-navigation-menu` | Yes (`cn-navigation-menu`) | Already there; apply the class |
| `gap-0` on list | p4one inline → `cn-navigation-menu-list` | Yes | Already there; apply the class |
| `rounded-lg px-2.5 py-1.5 hover:bg-muted focus-visible:ring-3 …` on trigger | p4one inline → `cn-navigation-menu-trigger` | Yes | Already there; apply the class |
| `bg-popover shadow ring-1 rounded-lg data-open:zoom-in-90 …` on viewport | p4one inline → `cn-navigation-menu-viewport` | Yes | Already there; apply the class |
| Focus ring reset `**:data-[slot=navigation-menu-link]:focus:ring-0` | p4one content component only | **No** | Promote to `cn-navigation-menu-content` |
| `role="menuitem"` on trigger/link | p4one WAI-ARIA fix | N/A (TS, not CSS) | Fix in `navigation-menu.component.ts` |

---

## Verdict

**FAIL** — two blockers: trigger buttons render with no shape, padding, or interactive states;
viewport panel renders as a transparent unstyled box with no background, shadow, or animation.

---

## Issues

1. **[blocker]** `NAVIGATION_MENU_TRIGGER_BASE` (`navigation-menu.variants.ts`) is missing
   `cn-navigation-menu-trigger`. The trigger lacks `rounded-lg`, `px-2.5 py-1.5`, `text-sm
   font-medium`, `hover:bg-muted`, `focus:bg-muted`, `data-open:bg-muted/50`,
   `focus-visible:ring-3`, `focus-visible:border-ring`, `disabled:opacity-50`, and
   `motion-reduce:transition-none`. Fix: prepend `"cn-navigation-menu-trigger"` to the constant.

2. **[blocker]** `NAVIGATION_MENU_VIEWPORT_CLASS` (`navigation-menu.variants.ts`) is missing
   `cn-navigation-menu-viewport`. `NavigationMenuViewportPanelComponent`'s panel renders with no
   `bg-popover`, no `shadow`, no `ring-1`, no `rounded-lg`, and no open/close animation. Fix:
   prepend `"cn-navigation-menu-viewport"` to the constant.

3. **[major]** `NAVIGATION_MENU_CONTENT_CLASS` (`navigation-menu.variants.ts`) is missing
   `cn-navigation-menu-content`. Content panels lack `p-1` padding and
   `ease-[cubic-bezier(0.22,1,0.36,1)]` timing. Fix: prepend `"cn-navigation-menu-content"`.

4. **[major]** `navigation-menu-rtl.ts` "With Icon" panel: links render without icons (React RTL
   has `<CircleAlertIcon />` etc. + `class="flex-row items-center gap-2"` on each anchor). "Docs"
   link missing `navigationMenuTriggerStyle()` and the function is not imported in the component.

5. **[major]** `NavigationMenuTriggerComponent` and `NavigationMenuLinkDirective`
   (`navigation-menu.component.ts`) are missing `role: "menuitem"` in their host bindings.
   WAI-ARIA Menubar requires `menuitem`-rooted children; `axe` flags this on the p4one port
   (confirmed live). The `NavigationMenuItemDirective` correctly sets `role="none"` on the `<li>`
   wrapper but the owned children still need the role.

6. **[minor]** `NAVIGATION_MENU_ROOT_CLASS` missing `cn-navigation-menu` → root stretches to
   full container width (`max-w-max` from the token never fires).

7. **[minor]** Hero and RTL `<ComponentPreview>` in `angular/navigation-menu.mdx` missing
   `previewClassName="h-96"` used on the base page — preview container collapses to content
   height only.
```

---
