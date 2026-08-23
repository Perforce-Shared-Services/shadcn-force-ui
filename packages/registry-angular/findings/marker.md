# marker — Migration Review

## Checklist

### 1. Examples match React base?

React base has 8 examples: `marker-demo`, `marker-variants`, `marker-icon`, `marker-link-button`, `marker-separator`, `marker-shimmer`, `marker-border`, `marker-status`. The Angular port has all 8 **plus** `marker-rtl.ts` (Angular-added, acceptable).

Content fidelity:
- **marker-demo** — All four rows match (branch-switch, spinner/shimmer, separator, search). Lucide icons replaced with Material Symbols SVGs: expected Angular pattern. ✓
- **marker-variants** — Identical text content, all three variants. ✓
- **marker-icon** — Three rows, `flex-col` on third, text content matches. ✓
- **marker-link-button** — `<a uiMarker>` + `<button uiMarker>` idiom matches intent of React `render={<a/>}` / `render={<button/>}`. ✓
- **marker-separator** — Three rows, identical content. ✓
- **marker-shimmer** — Two rows, `class="shimmer"` on content, `role="status"`. ✓
- **marker-border** — Three rows with `variant="border"`. ✓
- **marker-status** — Two rows with `uiSpinner` + `role="status"`. ✓

Two copy-paste defects across the demo set (both minor):

**Defect A — stray `{}{}` empty block.** Eight of nine demo files have a trailing empty block after the class declaration, e.g. `marker-demo.ts:28: export class MarkerDemoComponent {}{}`. The `{}` is a legal-but-meaningless block statement in TypeScript. The sole exception is `marker-link-button.ts` (has a real class body). Files: `marker-demo`, `marker-variants`, `marker-icon`, `marker-border`, `marker-separator`, `marker-shimmer`, `marker-status`, `marker-rtl`.

**Defect B — doubled closing quote in SVG `d` attributes.** Four demo files produce `d="...Z""/>` (an extra `"` before `/>`) in inline SVG `<path>` elements: `marker-demo.ts`, `marker-icon.ts`, `marker-border.ts`, `marker-rtl.ts`. `marker-link-button.ts` uses the correct `d="...Z"/>`. Browsers recover from this parse error silently, and the SVG renders correctly, but it is malformed HTML. The Angular template compiler may warn at build time.

### 2. Docs follow the React/flat pattern?

Checked against `docs/component-docs-standard.md` and the React base `marker.mdx`:

| Check | Result |
|---|---|
| Frontmatter (`title`, `description`, `base`, `component: true`) | ✓ |
| Hero `<ComponentPreview framework="angular" name="marker-demo">` before any heading | ✓ |
| `## Installation` with CLI + manual tabs | ✓ |
| `## Usage` | ✓ |
| `## Composition` | ✓ |
| Flat `##` per example (no `## Examples` umbrella) | ✓ |
| `## RTL` second to last | ✗ — `## Accessibility` appears between `## Links and Buttons` and `## RTL`, making RTL **third** to last |
| `direction="rtl"` on RTL `<ComponentPreview>` | ✗ — attribute missing: `<ComponentPreview framework="angular" name="marker-rtl" previewClassName="h-auto" />` |
| `## API Reference` last | ✓ |
| API table is Force UI–original style (no upstream link-out) | ✓ — correct; marker wraps no upstream primitive |

The extra `## Features` section (between `## Composition` and `## Variants`) is additive and not structurally prohibited.

### 3. Available inside the registry?

- **`_registry.ts`** (`packages/registry-angular/ui/_registry.ts:717–725`): entry present, all four on-disk files listed (`index.ts`, `marker.component.html`, `marker.component.ts`, `marker.variants.ts`). No `registryDependencies` declared — correct, marker has no component-level registry peer deps (CVA/cn are framework utilities).
- **`framework-components.ts`** (`apps/v4/lib/framework-components.ts:417`): `"marker"` is present in the `angular` `Set`. ✓
- **`meta.json`** (`apps/v4/content/docs/components/angular/meta.json:36`): `"marker"` entry present. ✓
- **Demo resolution** (`validate:previews`): all nine demo files exist under `apps/preview-angular/src/angular/marker-*.ts`. No shell commands were run; resolution verified by file listing.

### 4. Style diff vs original p4one

Comparing `/opt/dev/pd-p4one/app/src/app/ui/marker/marker.variants.ts` + `marker.component.ts` with the registry port and `style-force-ui.css`.

| Class or group | p4one (inline) | Registry approach | Verdict |
|---|---|---|---|
| `gap-2 text-sm text-muted-foreground min-h-4 text-left` | inline in cva base | absorbed into `cn-marker` | Promoted ✓ |
| `[&_svg:not([class*='size-'])]:size-4` | inline | `cn-marker` | Promoted ✓ |
| `[a]:underline [a]:underline-offset-3 [a]:hover:text-foreground` | inline | `cn-marker` | Promoted ✓ |
| `[a]:transition-colors [a]:motion-reduce:transition-none` (WCAG 2.3.3) | inline in cva | kept inline in `marker.variants.ts` | App-compat, correctly retained inline |
| `[a]:outline-none [a]:focus-visible:ring-3 [a]:focus-visible:ring-ring/50` (WCAG 2.4.7, host `<a>`) | inline in cva | kept inline in `marker.variants.ts` | App-compat, correctly retained inline |
| `cn-marker-variant-separator` pseudo-elements | inline | `cn-marker-variant-separator` | Promoted ✓ |
| `cn-marker-variant-border` | inline | `cn-marker-variant-border` | Promoted ✓ |
| `size-4 [&_svg:not([class*='size-'])]:size-4` (icon) | inline in `MarkerIconComponent` | `cn-marker-icon` | Promoted ✓ |
| `shrink-0 [&_svg]:fill-current` (icon) | inline | kept inline in `MarkerIconComponent` | Correct — not shared |
| `group-data-[variant=separator]/marker:flex-none text-center` (content) | inline | `cn-marker-content` | Promoted ✓ |
| `*:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground` (inline child anchors) | inline | `cn-marker-content` | Promoted ✓ |
| `*:[a]:transition-colors *:[a]:motion-reduce:transition-none` (inline child anchors, WCAG 2.3.3) | inline in `MarkerContentComponent` | **missing** from both `cn-marker-content` and the registry component | Gap — not promoted, not retained |
| `*:[a]:outline-none *:[a]:focus-visible:ring-3 *:[a]:focus-visible:ring-ring/50` (inline child anchors, WCAG 2.4.7) | inline in `MarkerContentComponent` | **missing** from both `cn-marker-content` and registry component | Gap — not promoted, not retained |

**Theme promotion candidates**

| Candidate | Currently in | Promote to | Priority |
|---|---|---|---|
| `*:[a]:transition-colors *:[a]:motion-reduce:transition-none` (child anchor in content) | p4one only | `cn-marker-content` in `style-force-ui.css` | Low — inline-child-anchor use case undocumented in registry; no example exercises it |
| `*:[a]:outline-none *:[a]:focus-visible:ring-3 *:[a]:focus-visible:ring-ring/50` (child anchor focus ring) | p4one only | `cn-marker-content` in `style-force-ui.css` | Low — same caveat; but WCAG 2.4.7 risk if the use case is adopted |

---

## Verdict

**PASS-with-notes** — registry entry, file set, and slug registration are complete; all eight React base examples are ported with correct behavior; docs follow the flat `##` structure. Four minor issues require cleanup but none block the component from shipping.

## Issues

1. **(minor)** `marker-demo.ts`, `marker-icon.ts`, `marker-border.ts`, `marker-rtl.ts`: SVG `<path d="...Z""/>` has a doubled closing quote. Malformed HTML; browser silently recovers but Angular template compiler may emit warnings at build time.
2. **(minor)** Eight demo files (`marker-demo.ts`, `marker-variants.ts`, `marker-icon.ts`, `marker-border.ts`, `marker-separator.ts`, `marker-shimmer.ts`, `marker-status.ts`, `marker-rtl.ts`): `export class Foo {}{}` — stray empty block statement after class body. Functionally harmless but a copy-paste artifact that should be removed.
3. **(minor)** `apps/v4/content/docs/components/angular/marker.mdx`: `## RTL` is third to last (after `## Accessibility`). Docs standard requires it second to last (immediately before `## API Reference`).
4. **(minor)** `marker.mdx`: `<ComponentPreview framework="angular" name="marker-rtl" ...>` is missing the `direction="rtl"` attribute required by the docs standard.
5. **(minor)** `MarkerContentComponent` in `marker.component.ts`: the child-anchor a11y classes `*:[a]:transition-colors *:[a]:motion-reduce:transition-none *:[a]:outline-none *:[a]:focus-visible:ring-3 *:[a]:focus-visible:ring-ring/50` are present in p4one but absent from both `cn-marker-content` (`style-force-ui.css:1668`) and the registry component. Low impact while no example puts `<a>` inside `uiMarkerContent`, but constitutes a WCAG 2.3.3/2.4.7 gap for that use case if adopted.

---
