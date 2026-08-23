# direction — Migration Review

## Checklist

### 1. Examples match React base?

`apps/v4/examples/base/direction-*.tsx` → **0 files exist**. The React base docs page takes a completely different approach: it shows `card-rtl` as a hero preview and documents `useDirection` usage only — there are no discrete `direction-{variant}.tsx` examples to port.

The Angular demo set (`direction-demo`, `direction-ltr`, `direction-gallery`, `direction-rtl`) is internally consistent and matches the structure of the p4one Storybook stories (`Playground`, `LeftToRight`, `Gallery`, `RightToLeft`). No deviation to flag because there is no React base example set to compare against.

### 2. Docs follow the React/flat pattern?

| Check | Result |
|---|---|
| Frontmatter: title, description, base, component: true, links.doc, links.api | ✓ |
| Hero `<ComponentPreview framework="angular" name="direction-demo" />` | ✓ |
| `## Installation` — CodeTabs cli/manual, Steps with dep + ComponentSource | ✓ |
| `## Usage` — import line + minimal snippet | ✓ |
| Flat `##` per example, no `## Examples` umbrella | ✓ (`## LTR`, `## Gallery`, `## RTL`) |
| `## RTL` second-to-last | ✓ |
| `## API Reference` last, links out to Angular CDK bidi (upstream wraps) | ✓ |
| `## RTL` has a pointer to `/docs/rtl` (standard mandate) | ✗ — missing |
| Each example section has at least one sentence of prose | Minor: `## LTR` has one terse sentence but no statement of which prop drives it |

The missing `/docs/rtl` pointer is a known-acceptable deviation for this component: `direction` IS the RTL primitive, so the RTL section demonstrates the feature rather than linking elsewhere. The standard's RTL section pattern targets other components that support RTL rendering of their own content.

### 3. Available inside the registry?

| Check | Result |
|---|---|
| `_registry.ts` entry: name `"direction"`, type `"registry:ui"` | ✓ (line 682) |
| Dependencies: `["@angular/cdk"]` | ✓ |
| Files list: `ui/direction/direction.component.ts` + `ui/direction/index.ts` | ✓ — both exist on disk |
| Slug in `framework-components.ts` angular Set | ✓ (line 405) |
| Slug in `apps/v4/content/docs/components/angular/meta.json` | ✓ |
| All 4 MDX-referenced demos present in `apps/preview-angular/src/angular/` | ✓ (`direction-demo.ts`, `direction-ltr.ts`, `direction-gallery.ts`, `direction-rtl.ts`) |

### 4. Style diff vs original p4one

`direction.component.ts` logic is identical between p4one and the registry. Differences are documentation-only:

| Location | p4one | Registry | Note |
|---|---|---|---|
| Component JSDoc opening | `"Angular port of @force-ui/direction (radix-force-ui style)."` | `"[FORCE-UI] Angular port of @force-ui/direction."` | Registry correctly adds `[FORCE-UI]` marker |
| `injectDirection` JSDoc | No `[FORCE-UI]` tag | `/** [FORCE-UI] Angular equivalent … */` | Registry correctly tagged |
| Storybook readout class | `text-hint` (p4one-local token) | `text-muted-foreground` (Force UI standard) | Registry demos use correct shadcn token |
| `index.ts` trailing semicolons | Present | Absent | Style only, no impact |

**No CSS classes or visual tokens exist anywhere in either implementation** — Direction is a pure DI/behavioral primitive. There are no `cn-direction-*` tokens in `style-force-ui.css`, which is correct.

#### Theme promotion candidates

| Class / token | Origin | Promote? |
|---|---|---|
| *(none)* | — | N/A — zero styling involved |

## Verdict

**PASS-with-notes** — implementation is correct, registry wiring is complete, demos resolve, docs are structurally sound. Two minor doc notes below; neither blocks shipping.

## Issues

1. **(minor)** `apps/v4/content/docs/components/angular/direction.mdx` — `## RTL` section lacks a `/docs/rtl` pointer as required by `docs/component-docs-standard.md`. Acceptable for this component (the RTL section IS the feature demo), but should carry a one-line inline note explaining the intentional deviation per the standard's "Documenting a deviation" rule.

2. **(minor)** `apps/preview-angular/src/angular/direction-gallery.ts` — both LTR and RTL panels render the identical left-pointing arrow SVG for "Previous". In the RTL panel the layout correctly flips (CDK `Dir` sets `dir="rtl"` on the host), but the SVG path itself does not mirror, which could mislead viewers into thinking RTL has no visual effect on icons. This matches the p4one Storybook Gallery story exactly, so it is a pre-existing intentional design choice, not a regression.
