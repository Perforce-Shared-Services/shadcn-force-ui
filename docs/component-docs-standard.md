# Component docs & examples standard

This is the written standard for what a component doc page and its example set
must look like, in **every** framework Force UI ships (React `base`/`radix`/`aria`,
Vue, Svelte, Ember, Angular).

The reference is the Base UI React variant: `apps/v4/content/docs/components/base/`
and its demo files in `apps/v4/examples/base/`. A framework port is "done" when
its page documents the same examples, in the same order, with the same heading
structure, as the `base` page for that component — with framework-specific
behavior called out inline.

Related: [CONTRIBUTING.md → Adding a new component](../CONTRIBUTING.md#adding-a-new-component)
and [Previews and examples](../CONTRIBUTING.md#previews-and-examples).

## Why this exists

Every component is ported from React to four other frameworks by hand. Without a
written target, each port invented its own page shape: the ports wrap all their
examples in a single `## Examples` heading with `###` sub-headings, embed
hand-maintained props tables that drift per framework, and drop examples that
exist on the `base` page without saying why. The result is four structurally
different documentation sites for one design system.

`framework-components:check` only proves a page *exists*. This document plus
`example-parity:check` (see [Checking your work](#checking-your-work)) covers
what the page *contains*.

## Page anatomy

The canonical order, derived from `base/accordion.mdx`, `base/tooltip.mdx`,
`base/badge.mdx` and `base/button.mdx`:

1. **Frontmatter** — `title`, `description`, `base`, `component: true`, and for a
   component that wraps an upstream primitive, a `links:` block with `doc` and
   `api` URLs.
2. **Hero preview** — a single `<ComponentPreview name="{slug}-demo" />` directly
   under the frontmatter, before any heading. No heading of its own.
3. **`## Installation`** — the `<CodeTabs>` block with a `cli` tab (the
   `npx shadcn@latest add ...` command) and a `manual` tab (`<Steps>` with the
   dependency install, `<ComponentSource>`, and the "update import paths" step).
4. **`## Usage`** — import snippet, then a minimal markup snippet.
5. **`## Composition`** *(when the component is multi-part)* — an ASCII tree of
   the parts, e.g. `Accordion → AccordionItem → AccordionTrigger/AccordionContent`.
   Used by 44 of the 63 `base` pages; skip it for single-element components like
   `Badge`.
6. **One `## <Example name>` per example** — flat H2s, in the order they should
   be read, each with one or two sentences of prose and one
   `<ComponentPreview>`.
7. **`## RTL`** — the RTL example, always last of the examples, always with the
   line linking to `/docs/rtl` and a preview with `direction="rtl"`.
8. **`## API Reference`** — see [API reference](#api-reference) below.

### Flat H2 per example

This is the rule the ports most often break:

```mdx
## Basic

A basic accordion that shows one item at a time.

<ComponentPreview styleName="base-force-ui" name="accordion-basic" align="start" />

## Multiple

Use the `multiple` prop to allow multiple items to be open at the same time.

<ComponentPreview styleName="base-force-ui" name="accordion-multiple" align="start" />
```

Not this:

```mdx
## Examples

### Basic

<ComponentPreview framework="vue" name="accordion-basic" />

### Multiple

<ComponentPreview framework="vue" name="accordion-multiple" />
```

No `## Examples` wrapper exists on any of the 63 `base` pages. Every example is
its own H2 so it gets its own entry in the page's table of contents and its own
anchor. Sub-headings (`###`) inside an example section are allowed only to split
a *variation* of that example — `base/badge.mdx` uses `### Status Variants`
under `## Variants` — never to hold the examples themselves.

Heading text matches the `base` page word for word (`## With Icon`, not
`## Icon Example`), so anchors are stable across frameworks.

### API reference

Two shapes, and which one you use is decided by the `base` page for that
component — do not invent a third:

- **Wraps an upstream primitive** (Accordion, Tooltip, Dialog, …): a one-line
  link out to that library's API docs. No table.

  ```mdx
  ## API Reference

  See the [Base UI](https://base-ui.com/react/components/accordion#api-reference) documentation for more information.
  ```

- **Force UI owns the API surface** (Badge, Button, Input, Kbd, Item, …, 21 of
  the 63 `base` pages): an `### <ComponentName>` sub-heading, one sentence, and
  a `| Prop | Type | Default |` table. This is the case CONTRIBUTING.md's custom
  variant rule refers to — adding a variant without updating this table is
  rejected.

Framework ports **must not** add a props table to a page whose `base` page links
out. A per-framework table is exactly the thing that drifts: it duplicates
upstream's API in five places and goes stale in four of them. When a port's
invocation syntax genuinely differs (Ember's `@arg` invocation, Angular's
`[input]` bindings), document that once, inline, as described next — not by
re-tabulating the whole API.

## Example files

- One example per file, in the framework's demo directory:
  - React: `apps/v4/examples/{base,radix,aria}/`
  - Everything else: `apps/preview-{fw}/src/{demoDir}/`, where `demoDir` and the
    file extension come from `apps/v4/registry/frameworks.ts` (`demoDir`,
    `demoExt`) — never hardcode them.
- **Flat and kebab-case.** `accordion-basic.vue`, not `Accordion/Basic.vue` and
  not `accordion/basic.vue`. There are no per-component subdirectories: the
  demo dirs are auto-discovered with a single flat `import.meta.glob`, and the
  parity check counts top-level files only.
- **Name is `{slug}-{example}`**, where `{slug}` is the component's doc page slug
  and `{example}` is a short kebab-case descriptor of the example. It does not
  have to be a literal slugification of the heading — `base/badge.mdx` shows
  `badge-icon` under `## With Icon` — but it must be the *same* name in every
  framework. The hero preview is always `{slug}-demo`.
- **Same file name in every framework.** `accordion-basic` exists as
  `accordion-basic.tsx`, `.vue`, `.svelte`, `.gts` and `.ts`. That is what makes
  the framework switcher land on the same example, and what the parity check
  counts.
- A demo that needs helper files (a columns definition, a sub-component) keeps
  them as sibling flat files with the same slug prefix
  (`data-table-columns.vue`), not in a folder.

## Documenting framework-specific behavior

Frameworks differ. Handle it **inline, inside the matching section**, so the page
structure stays identical:

```mdx
## Multiple

Use the `@type="multiple"` argument to allow multiple items to be open at the
same time. Ember passes component arguments with `@`, so the React `multiple`
prop is `@type="multiple"` here.

<ComponentPreview framework="ember" name="accordion-multiple" />
```

Rules:

- Keep the heading, keep the order, change the prose.
- If an example cannot exist in a framework (no equivalent primitive), keep the
  H2, and replace the preview with one or two sentences saying what to use
  instead and why. Silently dropping the section is not allowed — a missing
  heading looks identical to an unfinished port.
- If a framework needs an example the `base` page does not have (a
  framework-only idiom), add it as an extra H2 *after* the shared ones and
  before `## RTL`.
- A framework-specific difference is never a reason to restructure the page. If
  you believe a whole framework needs a different page shape, change this
  document first, for all frameworks, in its own PR.

## Preview call sites

- React pages: `<ComponentPreview styleName="base-force-ui" ... />`. The
  `styleName` prop must be exactly `radix-force-ui` or `base-force-ui`, and it
  must match the base of the page it is on.
- Framework pages: `<ComponentPreview framework="vue" name="accordion-basic" />`
  — `framework` must be one of the `PREVIEW_FRAMEWORKS` names in
  `apps/v4/registry/frameworks.ts`.
- `validate:previews` fails on a preview whose `name` has no demo file, so a
  heading added ahead of its demo file will be caught.

## Checking your work

```bash
pnpm --filter=v4 framework-components:check   # blocking: doc page manifest is current
pnpm --filter=v4 example-parity:check         # reporting only: example-set gaps vs base
pnpm --filter=v4 validate:previews            # reporting only: dead preview/source refs
```

`example-parity:check` (`apps/v4/scripts/check-example-parity.mts`) counts
example files per component slug in each framework's demo dir and compares them
against `apps/v4/examples/base/`. It compares only components the framework has
already ported (it has a doc page for them), reports how many `base` components
have no page at all, and flags non-flat demo directories. It is a proxy: equal
counts do not prove the examples are the same ones, so the structural rules
above still need a human reviewer.

Known gaps that should be silenced deliberately (not just left to make noise
forever) go in that script's `DOCUMENTED_EXCEPTIONS` set, each with a comment
saying why the gap is correct.

## Known exceptions, pending migration

These are the current, deliberate deviations. They are backlog for the port
migration, **not** bugs to fix opportunistically in an unrelated PR:

- **All four ports use the `## Examples` + `###` shape** described above, and
  Vue/Svelte/Ember pages carry per-framework props tables where the `base` page
  links out. Converting them is the bulk of the migration.
- **Ember's `apps/preview-ember/src/ember/sidebar-07/`** holds five demo files
  (`app-sidebar.gts`, `nav-main.gts`, `nav-projects.gts`, `nav-user.gts`,
  `team-switcher.gts`) in a subfolder, where every other demo in every framework
  is a flat file.
- **Svelte's `apps/preview-svelte/src/svelte/data-table/`** nests three
  data-table helper components the same way.
- **Angular is the sparsest port**: most `base` components have no Angular page
  at all, a third of the pages that do exist stop after `## Usage` with no
  examples, and no Angular page has an RTL section. Angular is also why
  `example-parity:check` is reporting-only in CI today.

`example-parity:check` prints the current numbers; run it rather than quoting
figures from here, which age.
