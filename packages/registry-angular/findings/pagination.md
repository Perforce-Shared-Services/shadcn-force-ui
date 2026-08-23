# pagination — Migration Review

## Checklist

### 1. Examples match React base?

React canonical set (`apps/v4/examples/base/`): 4 files —
`pagination-demo.tsx`, `pagination-simple.tsx`, `pagination-icons-only.tsx`,
`pagination-rtl.tsx`.

Angular demo set (`apps/preview-angular/src/angular/pagination-*.ts`): **0 files**.

No comparison is possible — every demo is absent.  The `pagination-icons-only`
example also composes `Field` and `Select`; both are already ported to Angular,
so no blocker beyond the missing file itself.

### 2. Docs follow the React/flat pattern?

`apps/v4/content/docs/components/angular/pagination.mdx` **does not exist**.

Reference: `apps/v4/content/docs/components/angular/breadcrumb.mdx` shows the
expected shape: `base: angular`, hero `<ComponentPreview framework="angular"
name="pagination-demo">`, flat `##` per example (no `## Examples` umbrella),
`## RTL` second-to-last with `direction="rtl"`, `## API Reference` last with
per-part `| Input | Type | Default |` tables.  None of this can be checked
because the file is missing.

### 3. Available inside the registry?

| Artifact | Expected | Actual |
|---|---|---|
| `packages/registry-angular/ui/pagination/` | exists | **missing** |
| `_registry.ts` entry `name: "pagination"` | present | **absent** |
| `framework-components.ts` angular Set | includes `"pagination"` | **absent** |
| `meta.json` pages | includes `"pagination"` | **absent** |
| Preview demos `pagination-*.ts` | 4 files | **0 files** |

`framework-components.ts` is generated from doc pages
(`pnpm --filter=v4 framework-components`), so its omission is a symptom of
the missing MDX, not an independent error.

### 4. Style diff vs original p4one

p4one expands tokens inline; the global Force UI sheet wraps them as semantic
classes.  All four Force UI tweaks are already in `style-force-ui.css:990–1002`.

| p4one class string | style-force-ui.css token | Token already in sheet? |
|---|---|---|
| `flex items-center gap-0.5` | `cn-pagination-content { @apply gap-0.5; }` | ✅ (line 990) |
| `flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4 [&_svg]:fill-current` | `cn-pagination-ellipsis` | ✅ (line 994, `[&_svg]:fill-current` tagged `[FORCE-UI]`) |
| `pl-1.5!` (Previous nudge) | `cn-pagination-previous { @apply pl-1.5!; }` | ✅ (line 998) |
| `pr-1.5!` (Next nudge) | `cn-pagination-next { @apply pr-1.5!; }` | ✅ (line 1002) |
| `cn-rtl-flip` (build-time marker → `rtl:rotate-180`) | transformer marker, not a CSS class | ✅ correct — absent from CSS |

**Theme promotion candidates:** none. Every Force UI token is already promoted.
p4one uses the raw Tailwind expansion; the Angular registry port should
reference the `cn-pagination-*` tokens instead to stay in sync with the sheet.

## Verdict

**FAIL** — migration has not started.  No source files, demos, docs, or
registry entries exist for the Angular pagination port on
`feat/angular-registry-parity`.

## Issues

1. **(blocker)** `packages/registry-angular/ui/pagination/` directory missing —
   all 9 source files (`pagination.component.ts`,
   `pagination-content.component.ts`, `pagination-item.component.ts`,
   `pagination-link.component.ts`, `pagination-previous.component.ts`,
   `pagination-next.component.ts`, `pagination-ellipsis.component.ts`,
   `pagination.icons.ts`, `index.ts`) must be created from the p4one
   reference in `reference/pd-p4one/ui/pagination/`, adapted to use
   `cn-pagination-*` token class names instead of raw Tailwind strings.

2. **(blocker)** `packages/registry-angular/ui/_registry.ts` — no
   `name: "pagination"` entry; must be added with the 9-file list
   (`.component.ts`, `.icons.ts`, `index.ts`) and a `meta.links.docs` URL,
   mirroring the `breadcrumb` entry at line 283.

3. **(blocker)** `apps/preview-angular/src/angular/` — missing
   `pagination-demo.ts`, `pagination-simple.ts`,
   `pagination-icons-only.ts`, `pagination-rtl.ts` (4 files, one per React
   canonical example).

4. **(blocker)** `apps/v4/content/docs/components/angular/pagination.mdx`
   does not exist; must be created with `base: angular`, hero preview, flat
   `##` per example, `## RTL`, and `## API Reference` with per-part prop
   tables following the breadcrumb page as a template.

5. **(blocker)** `apps/v4/content/docs/components/angular/meta.json` —
   `"pagination"` absent from the `pages` array; add it in alphabetical
   position (after `"navigation-menu"`, before `"popover"`).

6. **(minor)** After the MDX file is committed, run
   `pnpm --filter=v4 framework-components` to regenerate
   `apps/v4/lib/framework-components.ts`; the angular Set will then include
   `"pagination"` automatically.
```

---
