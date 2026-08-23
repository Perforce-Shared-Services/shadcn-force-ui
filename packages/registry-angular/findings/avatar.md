# avatar — Migration Review

## Checklist

### 1. Examples match React base?

File-by-file comparison against `apps/v4/examples/base/avatar-*.tsx`:

| Angular demo | React base | Verdict |
|---|---|---|
| `avatar-demo.ts` | `avatar-demo.tsx` | **DEVIATES** — Angular shows only a single plain avatar; React shows three variants (grayscale image avatar, badge avatar, avatar group with count). Hero preview is materially stripped down. |
| `avatar-basic.ts` | `avatar-basic.tsx` | Match ✓ |
| `avatar-badge.ts` | `avatar-badge.tsx` | Match ✓ |
| `avatar-badge-icon.ts` | `avatar-badge-icon.tsx` | Match ✓ (inline SVG is correct Material Symbols equivalent of `PlusIcon`) |
| `avatar-group.ts` | `avatar-group.tsx` | **DEVIATES** — Angular uses fallback-only avatars (no `AvatarImage`) and includes `<div uiAvatarGroupCount>+3</div>`. The React demo uses real images and no count; the count is reserved for `avatar-group-count.tsx`. Demo conflates two distinct examples. |
| `avatar-group-count.ts` | `avatar-group-count.tsx` | Match ✓ |
| `avatar-group-count-icon.ts` | `avatar-group-count-icon.tsx` | Match ✓ |
| `avatar-size.ts` | `avatar-size.tsx` | Match ✓ |
| `avatar-dropdown.ts` | `avatar-dropdown.tsx` | Match ✓ |
| `avatar-rtl.ts` | `avatar-rtl.tsx` | Match ✓ (static `dir="rtl"` + Arabic numeral is an acceptable Angular simplification of the translation hook) |

### 2. Docs follow the React/flat pattern?

`apps/v4/content/docs/components/angular/avatar.mdx`:

- **Frontmatter**: `title`, `description`, `base: angular`, `component: true` ✓
- **Hero preview**: `<ComponentPreview framework="angular" name="avatar-demo" />` immediately after frontmatter ✓; missing `previewClassName="h-72"` that the base page uses (minor).
- **Installation** CodeTabs with `cli` and `manual` tabs ✓
- **Usage** section ✓
- **Composition** section absent — base page has it; the standard marks it "optional, only for components assembled from several parts." Avatar qualifies, but absence is not a blocker.
- **Flat `##` per example**: all ten example sections are flat `##` — no `## Examples` umbrella ✓
- **`## RTL`** present; missing `previewClassName="h-72"` on the RTL `<ComponentPreview>` (minor).
- **`## API Reference` last** ✓; documents `AvatarComponent`, `AvatarImageComponent`, `AvatarFallbackComponent`, `AvatarBadgeComponent` — **missing `AvatarGroupComponent` and `AvatarGroupCountComponent`** (both exported, both used in demos).

### 3. Available inside the registry?

`packages/registry-angular/ui/_registry.ts` entry (line 206):

```ts
{ name: "avatar", type: "registry:ui", files: [
  { path: "ui/avatar/avatar.component.ts",             type: "registry:ui" },
  { path: "ui/avatar/avatar-fallback.component.html",  type: "registry:ui" },
  { path: "ui/avatar/index.ts",                        type: "registry:ui" },
]}
```

Files on disk in `packages/registry-angular/ui/avatar/`:
- `avatar.component.ts` ✓ (listed)
- `avatar-fallback.component.html` ✓ (listed)
- `index.ts` ✓ (listed)

No missing or phantom entries. No `registryDependencies` needed (component itself has no peer deps). ✓

`framework-components.ts` angular Set — `"avatar"` present (line 390 area). ✓  
`meta.json` pages — `"avatar"` present. ✓  
All ten preview demos exist as flat `.ts` files in `apps/preview-angular/src/angular/`. ✓

### 4. Style diff vs original p4one

| Component | p4one class | Angular registry | Assessment |
|---|---|---|---|
| `AvatarComponent` | Full explicit string incl. `size-8 rounded-full after:rounded-full data-[size=*]` | `cn-avatar` + structural classes | Functionally equivalent — `cn-avatar` in `style-force-ui.css:88` covers the missing tokens |
| `AvatarImageComponent` | Uses `RdxAvatarImageDirective` (Radix) | `(load)`/`(error)` events on host | Behavioural difference: no `delayMs` fallback control; otherwise equivalent |
| `AvatarFallbackComponent` | Uses `RdxAvatarFallbackDirective` | Custom signal + `@if` template | Behavioural difference: no `delayMs`; otherwise equivalent |
| `AvatarBadgeComponent` | Adds `bg-blend-color` | Absent | p4one-local; not in `cn-avatar-badge` CSS token — do not promote |
| `AvatarGroupCountComponent` | `… [&>svg]:fill-current group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3` | Stops at `[&>svg]:fill-current` | **Gap** — missing two size-responsive SVG rules |

**Theme promotion candidates**

| Class / token | In `style-force-ui.css`? | Promote? |
|---|---|---|
| `bg-blend-color` on `AvatarBadge` (p4one only) | No | No — p4one-local, no design-token rationale in registry |
| `group-has-data-[size=*]/avatar-group:[&>svg]:size-*` responsive SVG sizes | **Yes** — `cn-avatar-group-count` already has them | Not a new promotion; Angular registry inline string must match the CSS token |

## Verdict

**PASS-with-notes** — Registry registration is complete and correct; docs structure follows the flat-`##` standard. Two quality gaps prevent a clean PASS: (a) the hero demo is stripped relative to React and (b) `AvatarGroupCountComponent` is missing two responsive SVG-size classes.

## Issues

1. **(major)** `apps/preview-angular/src/angular/avatar-demo.ts` — hero demo shows only a single plain avatar; React `avatar-demo.tsx` shows three variants (grayscale image, badge, group with count). The Angular docs hero preview is not representative of the component.

2. **(major)** `packages/registry-angular/ui/avatar/avatar.component.ts` : `AvatarGroupCountComponent.classes` — inline class string is missing `group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3`. Present in both p4one and `cn-avatar-group-count` (style-force-ui.css:104). SVG icon inside `AvatarGroupCount` does not scale for `size="sm"` or `size="lg"` groups.

3. **(minor)** `apps/preview-angular/src/angular/avatar-group.ts` — deviates from `avatar-group.tsx`: uses fallback-only avatars (no images) and includes `AvatarGroupCount "+3"`, which the React version omits. Conflates the `avatar-group` and `avatar-group-count` examples.

4. **(minor)** `apps/v4/content/docs/components/angular/avatar.mdx` — `## API Reference` omits `AvatarGroupComponent` and `AvatarGroupCountComponent` prop tables, though both are exported and demonstrated.

5. **(minor)** `avatar.mdx` — hero `<ComponentPreview>` and RTL `<ComponentPreview>` both missing `previewClassName="h-72"` present on the base page.
```

---
