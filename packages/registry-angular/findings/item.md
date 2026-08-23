# item — Migration Review

## Checklist

### 1. Examples match React base?

React base has 11 demo files (`item-{demo,avatar,dropdown,group,header,icon,image,link,rtl,size,variant}`).  
Angular has all 11 present in `apps/preview-angular/src/angular/`. Set is complete.

File-by-file deviations:

| Demo | Deviation | Severity |
|------|-----------|----------|
| `item-dropdown` | `DropdownMenuContent` omits `align="end"` present on the React version. Dropdown opens start-aligned instead of end-aligned. | minor |
| `item-rtl` | React uses `useTranslation()` with EN / AR / HE toggle. Angular uses hardcoded Arabic only. Framework-appropriate (no `useTranslation` hook); acceptable simplification. | minor |
| `item-group` | React imports `ItemSeparator` but never renders it (unused import in the React source). Angular omits the unused import — correct. | note |
| `item-image` | Angular `<img>` carries explicit `class="size-full object-cover grayscale"`. The `size-full object-cover` are already applied via `cn-item-media-variant-image`'s `[&_img]:size-full [&_img]:object-cover`. Redundant but harmless. | note |
| `item-avatar` | `AvatarImage` in the React version omits `alt`; Angular adds `[alt]="person.username"`. Angular is more accessible — no issue. | note |

### 2. Docs follow the React/flat pattern?

`apps/v4/content/docs/components/angular/item.mdx` fully conforms.

- **Frontmatter**: `title`, `description`, `base: angular`, `component: true` ✓; no spurious `links.api` (Force UI original — correct) ✓
- **Hero preview**: `<ComponentPreview framework="angular" name="item-demo" />` immediately after frontmatter, before any heading ✓
- **Section order**: Installation → Usage → Composition → Item vs Field → Variant → Size → Icon → Avatar → Image → Group → Header → Link → Dropdown → **RTL** (second-to-last) → **API Reference** (last) ✓
- **Flat `##` per example**: no `## Examples` umbrella; all examples are top-level `##` headings ✓
- **API Reference form**: per-part `### PartName` tables with `| Input | Type | Default |` (Force UI original; correct choice per standard) ✓
- **One bonus correction** vs the React base page: the React doc says _"Use `ItemMedia` with `variant="avatar"` to display an avatar"_ — but no `"avatar"` variant exists. The Angular doc correctly omits that nonexistent variant name ✓

### 3. Available inside the registry?

**`_registry.ts` entry** (`name: "item"`, starting line 328):
```
ui/item/item.component.ts        ✓ exists
ui/item/item-separator.component.html  ✓ exists
ui/item/item.component.html      ✓ exists
ui/item/item.variants.ts         ✓ exists
ui/item/index.ts                 ✓ exists
```
All 5 files on disk are listed; no disk file is omitted. ✓

**`framework-components.ts`**: `"item"` is present in the `angular` Set (confirmed at line ~414, within the `angular: new Set([...])` block). ✓

**`meta.json`**: `"item"` present in `apps/v4/content/docs/components/angular/meta.json` pages array. ✓

**Demo resolution for `validate:previews`**: All 11 `item-*.ts` demo files exist flat in `apps/preview-angular/src/angular/`. Every `name` referenced in the MDX's `<ComponentPreview framework="angular" name="...">` resolves to a file. ✓

### 4. Style diff vs original p4one

Comparing `/opt/dev/pd-p4one/app/src/app/ui/item/item.{component,variants}.ts` against the registry port.

**Concrete differences:**

| Class / token | p4one (`item.variants.ts`) | Registry port | Assessment |
|---|---|---|---|
| `rounded-lg border text-sm` | Inlined in `itemVariants` base | Delegated to `cn-item` CSS token | Already promoted ✓ |
| `[a]:hover:bg-muted` | Inlined | In `cn-item` token | Already promoted ✓ |
| `motion-reduce:transition-none` | **Present** — WCAG 2.3.3 app guard | **Absent** | p4one-local; not a candidate (app-global concern) |
| `text-foreground` on `ItemTitle` | **Present** — compat for Vex global heading typography | **Absent** | p4one-local; not a candidate (Vex-specific) |
| Variant classes (`border-transparent`, `border-border`, `bg-muted/50`) | Inlined in cva map | Delegated to `cn-item-variant-*` tokens | Already promoted ✓ |
| Size classes (`gap-2.5 px-3 py-2.5`, etc.) | Inlined | Delegated to `cn-item-size-*` tokens | Already promoted ✓ |
| Group gap classes | Inlined (`gap-4 has-data-[size=...]`) | `cn-item-group` token | Already promoted ✓ |
| Content gap classes | Inlined (`gap-1 group-data-[size=xs]/item:gap-0`) | `cn-item-content` token | Already promoted ✓ |
| `SEPARATOR_BASE_CLASS` import | Imported from `separator.component` | Inlined directly | p4one reuse pattern; inlining is correct for the registry |
| `[&_svg]:fill-current` on icon media | Inlined in `itemMediaVariants` | `cn-item-media-variant-icon` token | Already promoted ✓ |

**Theme promotion candidates table:**

| Candidate | Verdict |
|-----------|---------|
| `motion-reduce:transition-none` | **Do not promote** — p4one-specific WCAG guard; belongs in the app's global stylesheet, not a per-component token |
| `text-foreground` on `ItemTitle` | **Do not promote** — Vex heading typography compat; not applicable outside p4one |
| All variant/size/layout classes | **Already promoted** — all live in `style-force-ui.css` as `cn-item*` tokens |

No new theme promotions required.

---

## Verdict

**PASS-with-notes** — All 11 demos present, docs fully conform to the flat `##` standard, registry wired correctly. Two minor demo deviations (dropdown alignment, RTL single-language) and two notes (redundant image class, unused React import cleanup) require no blocking action.

## Issues

1. *(minor)* `apps/preview-angular/src/angular/item-dropdown.ts`: `DropdownMenuContent` missing `align="end"` that the React base uses. Dropdown opens start-aligned on LTR. Add `[align]="'end'"` to the `uiDropdownMenuContent` element.
2. *(minor)* `apps/preview-angular/src/angular/item-rtl.ts`: only Arabic text; React base has a three-language toggle (AR/HE/EN). Document this as a framework exception in `check-example-parity.mts` if the RTL toggle is ever considered a parity requirement.

---

## Acceptance Contract

Acceptance level: attested
