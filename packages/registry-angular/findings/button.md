# button — Migration Review

## Checklist

### 1. Examples match React base?

React base (`apps/v4/examples/base/button-*.tsx`) has 14 files; Angular
(`apps/preview-angular/src/angular/button-*.ts`) has 14 files — same count,
but three deviate materially:

| Demo | Deviation | Severity |
|---|---|---|
| `button-size.ts` | Shows only 3 size rows (sm, default, lg + icon pairs). React shows **4** rows: xs/icon-xs, sm/icon-sm, default/icon, lg/icon-lg. `xs` and `icon-xs` are in the Angular `buttonVariants` but not demonstrated. | major |
| `button-with-icon.ts` | One button with leading save icon ("Save version"). React shows **two** buttons: GitBranch `data-icon="inline-start"` ("New Branch") **and** Fork `data-icon="inline-end"` ("Fork"). Trailing-icon case is absent. | minor |
| `button-spinner.ts` | Angular uses the built-in `loading` input; React uses external `<Spinner data-icon="inline-start">` with `disabled` prop. Valid Angular adaptation — not a defect — but counts as a documented deviation (see issue 5). | note |

Non-material text deviations: `button-default` uses "Default" (React: "Button");
`button-destructive` uses "Delete" (React: "Destructive"). Inconsequential.

### 2. Docs follow the React/flat pattern?

`apps/v4/content/docs/components/angular/button.mdx`:

- ✅ Frontmatter: `title`, `description`, `featured: true`, `base: angular`, `component: true`.
- ✅ Hero preview: `<ComponentPreview framework="angular" name="button-demo" />` immediately after frontmatter, before any heading.
- ✅ Flat `##` per example — no `## Examples` umbrella.
- ✅ Installation with CLI + manual tabs; Usage with import + snippet.
- ✅ API Reference is last; hand-maintained table is correct (button is a Force UI original, not an upstream wrapper).
- ⚠ `## RTL` preview missing `direction="rtl"` attribute. React base: `<ComponentPreview styleName="base-force-ui" name="button-rtl" direction="rtl" />`. Angular: `<ComponentPreview framework="angular" name="button-rtl" />`.
- ⚠ Section heading `## Loading` should be `## Spinner` to match React base (docs standard: heading names are shared across frameworks).
- ⚠ No `<Callout>` under `## Loading` explaining that Angular uses the built-in `loading` input rather than manual `<Spinner>` composition — required by docs standard for documented deviations.
- ⚠ No `## Button Group` cross-reference section (React base has it linking to the button-group component). Angular has a separate button-group MDX page so the cross-reference belongs here too.

### 3. Available inside the registry?

`packages/registry-angular/ui/_registry.ts` (lines 4–16):
- ✅ Entry `name: "button"` exists.
- ✅ `files` lists all 4 on-disk paths: `button.variants.ts`, `button.component.ts`, `button.component.html`, `index.ts`.
- ✅ No `registryDependencies` — correct; button is self-contained.
- ✅ `meta.links.docs` set.

`apps/v4/lib/framework-components.ts` line ~394: `"button"` present in `angular` Set. ✅
`apps/v4/content/docs/components/angular/meta.json`: `"button"` in `pages` array. ✅
All 14 preview names in the MDX resolve to `.ts` files under
`apps/preview-angular/src/angular/`. ✅ (`validate:previews` should pass clean.)

### 4. Style diff vs original p4one

| Class / token (p4one `button.variants.ts`) | Registry approach | Promote? |
|---|---|---|
| `bg-primary text-primary-foreground hover:bg-primary-hover` | → `cn-button-variant-default` | Already in `style-force-ui.css` ✅ |
| `text-muted-foreground border-border bg-background hover:bg-primary-subtle hover:text-foreground focus-visible:text-muted-foreground aria-expanded:...` | → `cn-button-variant-outline` | Already in `style-force-ui.css` ✅ |
| `bg-secondary text-secondary-foreground hover:bg-primary-subtle aria-expanded:...` | → `cn-button-variant-secondary` | Already in `style-force-ui.css` ✅ |
| `text-muted-foreground hover:bg-primary-subtle hover:text-foreground ...` | → `cn-button-variant-ghost` | Already in `style-force-ui.css` ✅ |
| `bg-error-subtle text-error hover:border-destructive focus-visible:...` | → `cn-button-variant-destructive` | Already in `style-force-ui.css` ✅ |
| `text-link underline-offset-4 hover:underline` | → `cn-button-variant-link` | Already in `style-force-ui.css` ✅ |
| `active:not-aria-[haspopup]:opacity-60 disabled:opacity-100! disabled:bg-muted disabled:text-muted-foreground` | → `cn-button` base | Already in `style-force-ui.css` ✅ |
| `[&_svg]:fill-current` | Added to `button.variants.ts` base class | N/A — Angular/Material Symbols only |

**Structural differences vs p4one:**
- p4one uses `button.icons.ts` which imports `progress_activity.svg?raw` from `@material-symbols/svg-400/rounded/` (rounded end-caps). Registry inlines a different spinner SVG path in `button.component.ts` (sharp-ended arc from `@material-symbols/svg-400`, not rounded). Visual difference: rounded vs. default weight spinner arc.
- p4one has `button.stories.ts` (Storybook) — not in registry (correct; stories are app-local).
- p4one inlines expanded Tailwind strings; registry delegates to `cn-button-*` tokens via `style-force-ui.css` (correct per CLAUDE.md).

**Theme promotion candidates table:**

| Token | Status |
|---|---|
| `hover:bg-primary-hover` | Promoted ✅ |
| `hover:bg-primary-subtle` | Promoted ✅ |
| `text-link` | Promoted ✅ |
| `bg-error-subtle` / `text-error` | Promoted ✅ |
| `active:not-aria-[haspopup]:opacity-60` | Promoted ✅ |
| `disabled:opacity-100!` / `disabled:bg-muted` / `disabled:text-muted-foreground` | Promoted ✅ |

No new candidates. All p4one deviations are absorbed by `style-force-ui.css`.

---

## Verdict

**PASS-with-notes** — Registry wiring, component implementation, and docs structure
are correct. Three minor/major doc and example gaps must be addressed before
the page is at full parity with the React base.

## Issues

1. **(major)** `button-size.ts` — missing `xs` / `icon-xs` row; Angular `buttonVariants` exposes both sizes but the demo only shows sm/default/lg. Add a first row pairing `size="xs"` + `size="icon-xs"` buttons.
2. **(minor)** `button-with-icon.ts` — trailing icon (`data-icon="inline-end"`) case not shown; add a second button with an inline-end icon to match React's two-button layout.
3. **(minor)** `angular/button.mdx` `## RTL` `<ComponentPreview>` missing `direction="rtl"` attribute.
4. **(minor)** `angular/button.mdx` `## Loading` heading should be `## Spinner` (docs standard: section names are shared across frameworks).
5. **(minor)** `angular/button.mdx` `## Loading` / `## Spinner` section needs a `<Callout>` documenting that Angular uses the built-in `loading` input instead of manual `<Spinner>` composition (required by docs standard for framework deviations).
6. **(minor)** `angular/button.mdx` has no `## Button Group` cross-reference section (React base has it; Angular button-group page exists separately and deserves a pointer here).
7. **(trivial)** Spinner SVG in `button.component.ts` uses default-weight arc; p4one uses the rounded variant (`progress_activity` from `@material-symbols/svg-400/rounded/`). Verify intended glyph matches the Figma "State=Loading" spec.
```

---
