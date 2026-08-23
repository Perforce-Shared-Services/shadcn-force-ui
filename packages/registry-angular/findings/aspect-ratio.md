# aspect-ratio — Migration Review

## Checklist

### 1. Examples match React base?

All four Angular demo files have counterparts in `apps/v4/examples/base/`:

| File | Status | Notes |
|------|--------|-------|
| `aspect-ratio-demo.ts` | ⚠ Deviates | Image URL is `images.unsplash.com/…` (Mountain photo); React canonical uses `avatar.vercel.sh/shadcn1`. Alt text is `"Mountain"` vs React's `"Photo"`. Image classes omit `grayscale dark:brightness-20` present in the React source. |
| `aspect-ratio-portrait.ts` | ✅ Matches | Correct `9/16` ratio, vercel.sh URL, `grayscale dark:brightness-20`. |
| `aspect-ratio-rtl.ts` | ✅ Equivalent | Hardcoded Arabic caption `"منظر طبيعي جميل"` and `dir="rtl"` — appropriate Angular simplification of React's `useTranslation` hook (React version also defaults to `"ar"`). |
| `aspect-ratio-square.ts` | ✅ Matches | Correct `1/1` ratio, vercel.sh URL. |

**Demo deviation detail (`aspect-ratio-demo.ts`):**
- URL: `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800` should be `https://avatar.vercel.sh/shadcn1`.
- Missing image classes: `grayscale dark:brightness-20` (present on all three other Angular demos and all four React demos).
- Alt: `"Mountain"` → `"Photo"`.

### 2. Docs follow the React/flat pattern?

`apps/v4/content/docs/components/angular/aspect-ratio.mdx` is structurally correct:

- ✅ Frontmatter: `title`, `description`, `base: angular`, `component: true`.
- ✅ Hero `<ComponentPreview framework="angular" name="aspect-ratio-demo" />` before any heading.
- ✅ `## Installation` with CLI + manual tabs and `<ComponentSource>`.
- ✅ `## Usage` with import line and HTML snippet.
- ✅ Flat `## Square`, `## Portrait` — no `## Examples` umbrella.
- ✅ `## RTL` second-to-last with `direction="rtl"` and `previewClassName="h-96"`.
- ✅ `## API Reference` is last.

API table is hand-written (no `links.api` in frontmatter) — correct per the standard since this is a plain-element wrapper, not a documented upstream primitive page. Table covers `ratio` and `class`, which matches the component's public inputs.

One note: the `ratio` type is documented as `number | string` (Angular port accepts CSS strings like `"4/3"`), which is an intentional Angular-specific extension not present in the React page. The deviation is correctly reflected in the table.

### 3. Available inside the registry?

`packages/registry-angular/ui/_registry.ts` (lines 248–255):

```
name: "aspect-ratio",
files: [
  { path: "ui/aspect-ratio/aspect-ratio.component.ts", type: "registry:ui" },
  { path: "ui/aspect-ratio/aspect-ratio.component.html", type: "registry:ui" },
  { path: "ui/aspect-ratio/index.ts", type: "registry:ui" },
]
```

All three paths exist on disk. ✅

**However — dead HTML file (major):** `aspect-ratio.component.ts` declares:

```ts
template: "<ng-content />",
```

It does **not** use `templateUrl`. The file `aspect-ratio.component.html` (contents: `<ng-content />`) is therefore never loaded by Angular — it is dead code. Every comparable simple component in this registry (`separator`, `skeleton`) uses `templateUrl: "./…component.html"`. The registered HTML file will be installed by the CLI but silently ignored by the compiler, misleading consumers.

Fix: either change to `templateUrl: "./aspect-ratio.component.html"` (consistent with other components) **or** delete `aspect-ratio.component.html` and remove it from the registry `files` list.

- ✅ `"aspect-ratio"` is in the `angular` Set in `apps/v4/lib/framework-components.ts` (line ~388).
- ✅ `"aspect-ratio"` is in `apps/v4/content/docs/components/angular/meta.json` `pages` array.
- ✅ All four Angular demo files exist for `validate:previews` resolution.

No `dependencies` listed in the registry entry — correct, because the Angular port uses CSS `aspect-ratio` natively (no `@radix-ng/primitives/aspect-ratio` dependency) and `cn` is a project-level util.

### 4. Style diff vs original p4one

| Dimension | p4one (`/opt/dev/pd-p4one/…`) | Angular port |
|-----------|-------------------------------|--------------|
| Primitive | `RdxAspectRatioDirective` hostDirective (padding-bottom + absolute child positioning) | CSS `aspect-ratio` native property via `[style.aspectRatio]` |
| Default ratio | `1` (directive default) | `16 / 9` (explicit input default) |
| Base host classes | `cn(this.className())` only — directive handles `position:relative; width:100%` | `cn("relative w-full", this.className())` |
| `ratio` type | `number` (forwarded to directive) | `number \| string` (CSS string `"4/3"` also accepted) |
| Dev-mode guard | `AfterViewInit` warns if first child is not `IMG/VIDEO/CANVAS/PICTURE` | Omitted |
| External dep | `@radix-ng/primitives/aspect-ratio` | None |

No `cn-aspect-ratio-*` tokens exist in either implementation. Both apply only vanilla Tailwind utilities. No global `style-force-ui.css` entries to create.

**Theme promotion candidates**

| Class/token | Source | Candidate? |
|-------------|--------|------------|
| *(none)* | — | — |

This component carries no custom design tokens; no promotions are needed.

---

## Verdict

**PASS-with-notes** — the component and docs structure are correct; one major quality issue (dead HTML file shipped to consumers) and one minor demo fidelity gap must be addressed before the branch can be considered fully clean.

## Issues

1. **[major]** `aspect-ratio.component.ts` uses `template: "<ng-content />"` (inline), but `aspect-ratio.component.html` is registered in `_registry.ts` as a distributed file. The HTML file is never referenced via `templateUrl:` and will be dead code in every consumer install. Inconsistent with `separator.component.ts`, `skeleton.component.ts`, and others that use `templateUrl:`. Fix: switch to `templateUrl: "./aspect-ratio.component.html"` or remove the HTML file and its registry entry.

2. **[minor]** `apps/preview-angular/src/angular/aspect-ratio-demo.ts` uses a different image URL (`unsplash.com/…`), different alt text (`"Mountain"` vs `"Photo"`), and omits `grayscale dark:brightness-20` from the image class. The other three Angular demos and all four React demos use `avatar.vercel.sh/shadcn1` with `grayscale dark:brightness-20`. Align `aspect-ratio-demo.ts` with the React canonical.

3. **[minor]** p4one's dev-mode `AfterViewInit` child-element type guard (`FILLABLE_TAGS` check) was omitted. Not a runtime regression, but it was a useful authoring hint that prevented the wrong element from being absolutely positioned. Consider reinstating if the adoption baseline moves to the native CSS approach rather than the Rdx directive.
```

---
