# Contributing to Force UI

Force UI is an internal brand kit built on top of [shadcn/ui](https://ui.shadcn.com). This document covers how to work with the fork safely — adding features without making future upstream merges painful.

## Repository structure

```
apps/
├── v4/                        # Docs & registry site (Next.js)
│   ├── app/                   # Next.js app
│   ├── content/docs/          # MDX documentation
│   ├── registry/
│   │   ├── bases/
│   │   │   ├── radix/         # ← upstream React (Radix UI) — track closely
│   │   │   └── base/          # ← upstream React (Base UI)  — track closely
│   │   ├── styles/
│   │   │   └── style-force-ui.css  # Force UI component styles
│   │   └── themes.ts          # Imports force-ui theme + upstream themes
│   └── scripts/
│       └── build-registry.mts # Registry build pipeline
├── preview-ember/             # Ember preview server (Vite SPA)
├── preview-vue/               # Vue preview server (Vite SPA)
├── preview-svelte/            # Svelte preview server (Vite SPA)
├── preview-angular/           # Angular preview server (Vite SPA)
└── preview-shared/            # Stylesheet shared by all preview-* apps

packages/
├── shadcn/                    # shadcn CLI (upstream, minimal changes)
├── theme-force-ui/            # Force UI brand tokens (OKLCH palette)
│   └── src/index.ts           # Edit here to change brand colors
├── preview-shell/             # Shared iframe/docs bridge for preview-* apps
├── registry-ember/            # Ember component registry
├── registry-vue/              # Vue component registry
├── registry-svelte/           # Svelte component registry
└── registry-angular/          # Angular component registry
```

## Development

```bash
pnpm install
pnpm --filter=v4 dev        # docs site on :4000
pnpm --filter=v4 registry:build  # rebuild registry
```

## This is a fork — read this before making changes

Force UI forks [shadcn-ui/ui](https://github.com/shadcn-ui/ui). Upstream ships new components, fixes, and docs regularly. The goal is to make merges from `upstream/main` as painless as possible.

### The [FORCE-UI] marker system

Every file we modify that upstream also owns must have markers so we can find our changes instantly after a merge:

```bash
# After any upstream merge, run this to find every conflict hotspot:
grep -rn "\[FORCE-UI\]" apps/v4/
```

- **CSS/MDX**: `/* [FORCE-UI] */` or `{/* [FORCE-UI] */}` inline, or `/* [FORCE-UI-START] */ ... /* [FORCE-UI-END] */` for blocks
- **TypeScript**: `// [FORCE-UI]` inline or `// [FORCE-UI-START] / // [FORCE-UI-END]` for blocks

### What lives where

| Change type | Where it goes | Conflict risk |
|---|---|---|
| Brand color/token update | `packages/theme-force-ui/src/index.ts` | None |
| New variant style (CSS) | `apps/v4/registry/styles/style-force-ui.css` | None |
| New variant prop (`variant="warning"`) | One line in the component `.tsx` + `// [FORCE-UI]` | Very low |
| New component (no upstream equivalent) | `apps/v4/registry/bases/radix/ui/` **for now**, or create `packages/registry-force-ui/` | Low |
| Framework port changes (Ember/Vue/Svelte/Angular) | `packages/registry-{ember,vue,svelte,angular}/` | None |
| Docs for Force UI-specific features | `apps/v4/content/docs/force-ui/` | None |
| Docs for existing components | `apps/v4/content/docs/components/{radix,base}/` + `// [FORCE-UI]` block | Low |

## Adding a custom variant to an existing component

Use the three-step pattern. Example: adding `warning` to Badge.

**Step 1 — Add the CSS** in `style-force-ui.css`:
```css
.cn-badge-variant-warning {
  @apply bg-warning/10 text-warning dark:bg-warning/20;
}
```

**Step 2 — Add one line** to the component's `cva` map:
```tsx
// apps/v4/registry/bases/radix/ui/badge.tsx
variants: {
  variant: {
    default: "cn-badge-variant-default",
    // ... upstream variants ...
    warning: "cn-badge-variant-warning",  // [FORCE-UI]
  }
}
```

**Step 3 — Update the docs** in the component's MDX files (both `radix/` and `base/`):
```mdx
| `variant` | `"default" \| ... \| "warning"` | `"default"` |
```

A PR that adds a variant without updating the docs table will be rejected.

## Adding a new component

If the component has no upstream equivalent (e.g. `Spinner`, `Field`, `Empty`):

1. Add the source to `apps/v4/registry/bases/radix/ui/` and `apps/v4/registry/bases/base/ui/`
2. Register it in `apps/v4/registry/bases/radix/ui/_registry.ts`
3. Add docs at `apps/v4/content/docs/components/radix/{name}.mdx`
4. Run `pnpm --filter=v4 registry:build`

This covers React only. To make the component available for Vue/Svelte/Ember/Angular
too, port it into the matching `packages/registry-{fw}/ui/` package and add its slug to
`FRAMEWORK_COMPONENTS` in `apps/v4/lib/framework-components.ts` — see
[Previews and examples](#previews-and-examples) below.

A framework port is expected to reach **example-set and MDX-structure parity with the
`base` (Base UI React) page** — the same examples, in the same order, under the same flat
`##` headings, backed by demo files with the same names. The canonical structure and its
worked examples are in [docs/component-docs-standard.md](docs/component-docs-standard.md);
read it before writing a port's docs. Framework-specific differences (Ember's `@arg`
invocation, Angular's `[input]` bindings, a primitive that doesn't exist in a framework)
must be **documented inline in the matching section**, and are never a reason to fork the
page structure — no `## Examples` wrapper, no per-framework props table on a page whose
`base` page links out to upstream docs. `pnpm --filter=v4 example-parity:check` reports the
current gaps per framework and component; it runs in CI as a report today (there is a large
pre-existing backlog, mostly Angular), so read its output rather than assuming a green job
means parity.

## Previews and examples

React component previews render inline in `apps/v4` using the demo files under
`apps/v4/examples/{radix,base}/`. Every other framework (Vue, Svelte, Ember, Angular)
instead renders in an `<iframe>` pointing at a small per-framework Vite SPA in
`apps/preview-{vue,svelte,ember,angular}/`. A single parameterized rewrite in
`apps/v4/next.config.mjs` (`/preview/:framework/:path` → `/preview/:framework/index.html`)
deep-links the iframe straight to one demo inside that SPA. In production the SPAs are
built and their output is copied into `apps/v4/public/preview/{framework}/`
(`preview-server:build` in `apps/v4/package.json`); in dev, each SPA runs on its own port
(see `devPort` below) and the iframe points at `localhost:{devPort}` instead.

Demos are auto-discovered per framework with `import.meta.glob` — one file per demo under
`apps/preview-{fw}/src/{demoDir}/` (e.g. `apps/preview-vue/src/vue/button-demo.vue`). There
is no manifest to hand-maintain; adding a demo file is enough for it to show up.

`apps/v4/registry/frameworks.ts` is the single source of truth for framework identity
(name, title, bases, registry name, `previewPackage`/`previewDir`/`devPort`/`demoExt`/
`demoDir`/`registryPackage`/`previewStyle`). Adding a new framework means editing this
file, adding its component slugs to `FRAMEWORK_COMPONENTS` in
`apps/v4/lib/framework-components.ts`, and creating the two new packages
(`apps/preview-{fw}/`, `packages/registry-{fw}/`) — never re-hardcode a framework list
elsewhere.

**Preview apps do not keep their own copy of components — adding a component means
adding it to the registry package, not the preview app.** Angular is the reference: its
Vite config aliases `@/angular-ui` and `@/lib` straight at `packages/registry-angular/ui`
and `packages/registry-angular/lib`, so demos always exercise whatever the CLI actually
installs. Vue, Svelte and Ember still carry their own `src/ui/` copy inside the preview
app as a legacy from before this was cleaned up — those copies drift from the registry
package and are a known follow-up to dedupe the same way Angular was. Don't add to that
drift: when touching Vue/Svelte/Ember components, prefer updating `packages/registry-{fw}/ui/`
and treat the preview app's local copy as something to delete, not extend.

The iframe/docs message bridge (theme sync, "is a modal open" signalling so overlays
aren't clipped by the iframe box) is shared code in `packages/preview-shell/`, imported by
every preview app as `@force-ui/preview-shell`. The Tailwind stylesheet all four preview
apps import is the single `apps/preview-shared/styles.css`, regenerated (together with
`app/globals.css`) by `apps/v4/scripts/sync-theme-css.mts` — never hand-edit it or let a
preview app keep its own copy.

## Updating the brand theme

Brand colors live in `packages/theme-force-ui/src/index.ts` as OKLCH values. Changing them here automatically propagates to the registry on the next build. Do **not** edit the `:root` vars in `globals.css` directly — that block is generated from the theme package and marked `[FORCE-UI-START]`.

## Syncing from upstream shadcn

Preferred: run the scripted workflow, which merges, enforces the style
allowlist, regenerates the lockfile + registry, and runs typecheck/lint:

```bash
./scripts/sync-upstream.sh            # full workflow (--dry-run to preview)
```

Manual equivalent:

```bash
git fetch upstream
git merge upstream/main
grep -rn "\[FORCE-UI\]" apps/v4/      # find every block that may need attention
node scripts/strip-styles.mjs         # strip non-force-ui demo styles (idempotent)
git checkout --theirs pnpm-lock.yaml && pnpm install   # regenerate lockfile
pnpm --filter=v4 registry:build
pnpm --filter=v4 typecheck && pnpm --filter=v4 lint
```

Upstream regularly ships new demo styles (vega/nova/maia/lyra/mira/luma/sera/rhea/…).
`scripts/strip-styles.mjs` removes all of them from the v4 app and rewrites stray
`@/styles/<base>-<demo>` imports to `force-ui`, so most of the per-style merge
noise resolves itself. Conflicts in deleted style files are resolved by keeping
them deleted (`git rm`).

The files most likely to have conflicts after a merge are:
- `apps/v4/app/globals.css` — look for `[FORCE-UI]` blocks
- `apps/v4/registry/themes.ts` — we add `forceUITheme` import at the top
- `apps/v4/registry/styles.tsx` — we add the `force-ui` style entry
- `apps/v4/registry/bases.ts` — we add ember/vue/svelte/angular base entries

Framework ports (`packages/registry-{ember,vue,svelte,angular}/`) and the theme package (`packages/theme-force-ui/`) are never touched by upstream merges.

## Documentation rules

- Component docs in `content/docs/components/radix/` and `content/docs/components/base/` are **100% ours** — don't auto-sync with upstream prose. Cherry-pick relevant upstream doc improvements manually.
- When upstream adds a new component prop or example, review their docs and update ours if relevant.
- Force UI-specific docs (theming, custom components, framework guides) go in `content/docs/force-ui/`.
- The `styleName` prop in `<ComponentPreview>` must always be `radix-force-ui` or `base-force-ui`. Never reference a removed style.

## Commit convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(components): add warning variant to badge
fix(docs): update badge API table with warning variant
refactor(registry): move ember port to packages/registry-ember
```

Categories: `feat`, `fix`, `refactor`, `docs`, `build`, `test`, `ci`, `chore`

## Keeping `sync/upstream-main` current

`sync/upstream-main` is a local branch that mirrors `upstream/main` exactly — it never receives our commits. It exists so you can run `git log sync/upstream-main` or `git diff main...sync/upstream-main` without needing the upstream remote configured.

The sync script updates it automatically. To update it manually:

```bash
git fetch upstream
git checkout sync/upstream-main
git reset --hard upstream/main
git checkout main
```

Never commit directly to `sync/upstream-main`. If you find it ahead of `upstream/main`, reset it.

## Running tests

```bash
pnpm test
```
