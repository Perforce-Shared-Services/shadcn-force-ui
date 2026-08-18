# Component docs and examples standard

The canonical shape of a component's documentation page and its example files.
It is derived from the React Base UI reference — `apps/v4/content/docs/components/base/`
and `apps/v4/examples/base/` — which is the base every framework port
(Vue, Svelte, Ember, Angular) is expected to reach parity with.

Why this document exists: Force UI ports each React component to four other
frameworks, but until now nothing said what a port's docs are supposed to look
like. `pnpm --filter=v4 framework-components:check` only verifies that a doc
*page* exists for a base; it never looked at what is on the page or at how many
examples back it. The result is a per-framework drift in both example sets and
MDX structure. This file is the written target; `pnpm --filter=v4 example-parity:check`
measures the example-count half of it.

Scope: this describes the target. It is deliberately not a claim that the
repository matches it today — see [Known exceptions](#known-exceptions).

## The reference

- Doc pages: `apps/v4/content/docs/components/base/{slug}.mdx`
- Examples: `apps/v4/examples/base/{slug}-{variant}.tsx`
- Framework doc pages: `apps/v4/content/docs/components/{vue,svelte,ember,angular}/{slug}.mdx`
- Framework examples: `apps/preview-{fw}/src/{demoDir}/{slug}-{variant}.{demoExt}`,
  where `demoDir`/`demoExt` come from `apps/v4/registry/frameworks.ts` (the
  single source of truth for framework identity — never re-hardcode a framework
  list).

`base` is the reference rather than `radix` because it is the default React
base (`getDefaultBaseForFramework("react")`), and it is the one whose pages
already follow the structure below consistently.

## Page structure

Headings in this order. Everything except the example sections is required.

1. **Frontmatter** — `title`, `description`, `base`, `component: true`.
   Optional `featured: true`. `links.doc` / `links.api` point at the upstream
   primitive's documentation when the component wraps one.
2. **Hero preview** — a single `<ComponentPreview>` for `{slug}-demo`,
   immediately after the frontmatter, before any heading.
3. `## Installation` — a `<CodeTabs>` block with a `cli` tab (the
   `npx shadcn@latest add @force-ui{-fw}/{slug}` command) and a `manual` tab
   whose `<Steps>` list dependencies, a `<ComponentSource>` for the component,
   and the "update the import paths" step.
4. `## Usage` — the import line, then the smallest meaningful snippet.
5. `## Composition` — optional, only for components assembled from several
   parts. An ASCII tree of the part hierarchy (see
   `content/docs/components/base/accordion.mdx`).
6. **One `## <Example Name>` per example** — see [Example sections](#example-sections).
7. `## RTL` — second to last. A one-line pointer to `/docs/rtl` plus a
   `<ComponentPreview ... direction="rtl" />` of `{slug}-rtl`.
8. `## API Reference` — always last. See [API reference](#api-reference).

Components that are really a family of blocks rather than a single primitive
(`sidebar`, `data-table`, `chart`) legitimately grow extra prose sections
(`## Structure`, `## Theming`, `## Styling`). They still open with the hero
preview and still close with `## RTL` then `## API Reference`.

### Example sections

Each example is a flat `##` heading — never an `## Examples` umbrella with
`###` children:

```mdx
## Multiple

Use the `multiple` prop to allow multiple items to be open at the same time.

<ComponentPreview
  styleName="base-force-ui"
  name="accordion-multiple"
  align="start"
  previewClassName="*:data-[slot=accordion]:max-w-sm h-[450px]"
/>
```

Rules:

- The heading is Title Case and names the behaviour, not the file
  (`## With Icon`, not `## button-with-icon`).
- Exactly one sentence or two of prose, describing what the example shows and
  which prop drives it. No prose-free previews.
- Exactly one `<ComponentPreview>` per section, whose `name` is the example
  file's base name.
- `###` is reserved for sub-variants of one example (e.g. the four alignment
  values under `## Align` in `input-group.mdx`) and for the per-part blocks
  under `## API Reference`. It is not the level for top-level examples.
- Section order follows the example's importance: the plain/basic case first,
  variants and states next, composition-with-other-components last, then
  `## RTL`.

### Preview and source props

- React bases pass `styleName`, which must be exactly `radix-force-ui` or
  `base-force-ui` and must match the base the page documents (a `base` page
  previewing `radix-force-ui` silently shows the wrong variant). No other value
  is valid — the upstream demo styles (`nova`, `vega`, …) are not Force UI
  styles.
- Every other framework passes `framework="{name}"` instead, and the referenced
  demo must resolve to `apps/preview-{fw}/src/{demoDir}/{name}.{demoExt}`.
  `pnpm --filter=v4 validate:previews` checks that resolution.

### API reference

`## API Reference` is always the last section, and which of the two forms it
takes is determined by whether the component wraps a documented upstream
primitive:

- **Wraps an upstream primitive** (the page has `links.api` in its frontmatter,
  e.g. `accordion`, `dialog`, `select`): one sentence linking out to the
  upstream API reference. Do not copy the upstream props table into our docs —
  it goes stale silently.
- **Force UI original or a plain element wrapper** (`badge`, `button`, `card`,
  `empty`, `field`, `input-group`, `kbd`, …): a `### PartName` per exported
  part, each with a `| Prop | Type | Default |` table covering only the props
  Force UI adds on top of the native element.

A framework port inherits this choice from the component, not from the
framework: if the React page links out, the Vue/Svelte/Ember/Angular pages link
out to that framework's own primitive docs rather than growing a hand-written
props table. A hand-maintained props table per framework is how the same prop
ends up documented four different ways.

## Example files

- One example per file, flat in the framework's demo directory. No
  per-component subdirectories.
- `kebab-case`, named `{slug}-{variant}.{ext}`, where `{slug}` is exactly the
  doc page's slug: `accordion-multiple.tsx`, `button-with-icon.vue`,
  `badge-status-variants.gts`.
- `{slug}-demo` is reserved for the hero preview at the top of the page.
- `{slug}-rtl` is reserved for the `## RTL` section.
- Variant names are shared across frameworks: the Vue port of
  `accordion-multiple.tsx` is `accordion-multiple.vue`, not
  `accordion-multi.vue`. Same names are what makes parity mechanically
  checkable.
- The preview apps discover demos with `import.meta.glob("./{demoDir}/*.{ext}")`,
  i.e. top level only. A file in a subdirectory is not a demo; it is a part
  some demo imports.

### Parity expectation

A ported component is "at parity" when, for its slug, the framework's demo
directory contains a file for every example file in `apps/v4/examples/base/`,
under the same name, and its MDX page has the corresponding `##` section for
each.

`pnpm --filter=v4 example-parity:check` reports the count half of this: per
framework, per already-ported slug, the number of demo files versus the number
of `apps/v4/examples/base/` files for that slug. It is reporting-only (always
exits 0) and runs in CI with `continue-on-error: true` while the backlog below
is worked down.

## Documenting a deviation

Framework-specific behaviour is expected — Ember's `{{@arg}}` invocation,
Vue's `v-model`, Angular's inputs/outputs, a primitive whose upstream
equivalent has no `collapsible` prop. What a deviation must not do is fork the
page's structure.

To document one:

1. Keep the section, its heading text, and its position. If the example cannot
   exist at all in that framework, keep the heading and replace the preview
   with the note.
2. Add an inline note directly under the heading, stating the difference and
   why, e.g.

   ```mdx
   ## Multiple

   <Callout>
     Ember's accordion takes `@multiple` as an argument rather than a prop; the
     rendered behaviour is the same.
   </Callout>
   ```

3. If the deviation changes the example count for that slug, add the
   `framework:slug` entry with its reason to `DOCUMENTED_EXCEPTIONS` in
   `apps/v4/scripts/check-example-parity.mts`, so the parity report stays a
   list of real gaps.

Not acceptable as a deviation: renaming a section, collapsing the examples into
an `## Examples` umbrella, dropping `## RTL`, or omitting examples because they
have not been ported yet. The last one is a gap, and gaps belong in the parity
report, not in the exceptions list.

## Known exceptions

Recorded here so the migration has a checklist. These are pre-existing and are
**not** in scope for the change that introduced this document; they are the
follow-up work.

- **MDX structure across all four ports.** Vue, Svelte, Ember and Angular pages
  currently use a single `## Examples` heading with `###` children, then
  `## API Reference` with a hand-maintained props table, instead of the flat
  `##`-per-example / link-out-when-upstream pattern above. Every page needs
  converting; the frameworks should move together, component by component.
- **Angular's coverage.** Angular has far fewer doc pages than `base`, and many
  of the pages it has stop after `## Usage` or carry a short `## Examples`
  section with no RTL section. This is the largest single block of the backlog
  and the reason the parity check is non-blocking in CI.
- **`apps/preview-ember/src/ember/sidebar-07/`.** Five files
  (`app-sidebar.gts`, `nav-main.gts`, `nav-projects.gts`, `nav-user.gts`,
  `team-switcher.gts`) sit in a per-component subdirectory. They are parts of a
  composed sidebar demo rather than demos themselves, so they are invisible to
  the preview app's top-level glob; they should be flattened to
  `sidebar-07-{part}.gts` or moved next to the other shared parts.
- **`apps/preview-svelte/src/svelte/data-table/`.** Same shape as above:
  demo parts in a subdirectory rather than flat files.
- **Example gaps.** Run `pnpm --filter=v4 example-parity:check` for the current
  list. At the time of writing the largest are Angular (most ported components
  carry a fraction of base's examples), Ember (`toast` has no demo at all,
  `avatar` and `combobox` are far short), and a systematic missing
  `{slug}-rtl.{ext}` across Vue/Svelte/Ember.
