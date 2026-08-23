# stepper — Migration Review

## Checklist

### 1. Examples match React base?

No React base examples exist (`apps/v4/examples/base/stepper-*.tsx` → none found). The stepper is a Force UI original (documented in the callout on the Angular docs page and in the component's JSDoc). The Angular demos derive from p4one Storybook stories:

| Angular demo file | p4one story | Match? |
|---|---|---|
| `stepper-demo.ts` | `Playground` | ✓ content identical (step=2, linear, 3-step wizard) |
| `stepper-vertical.ts` | `Vertical` | ✓ identical |
| `stepper-with-descriptions.ts` | `WithDescriptions` | ✓ identical (vertical, value=2, 3 steps with descriptions) |
| `stepper-non-interactive.ts` | `NonInteractive` | ✓ identical (vertical, no trigger, p-1 padding) |
| `stepper-disabled-step.ts` | `DisabledStep` | ✓ identical (step=1, step 2 disabled) |
| `stepper-rtl.ts` | _(none — added for RTL section)_ | ✓ correct addition |
| _(none)_ | `Gallery` | Omitted — Storybook meta/visual story, not a preview demo |

No material deviations found.

### 2. Docs follow the React/flat pattern?

`apps/v4/content/docs/components/angular/stepper.mdx` structure:

- Frontmatter: `title`, `description`, `base: angular`, `component: true` ✓
- Hero `<ComponentPreview framework="angular" name="stepper-demo" />` before first heading ✓
- `## Installation` with `cli` + `manual` CodeTabs ✓
- `## Usage` import + HTML snippet ✓
- `## Composition` ASCII tree (appropriate for multi-part component) ✓
- Flat `##` per example — `## Linear`, `## Vertical`, `## With Descriptions`, `## Non-Interactive`, `## Disabled Step` — no `## Examples` umbrella ✓
- `## RTL` second-to-last ✓
- `## API Reference` last, hand-written per-part tables (correct: Force UI original, no upstream primitive to link out to) ✓

**Minor**: `## Linear` section references `name="stepper-demo"` — same name as the hero preview. No dedicated `stepper-linear.ts` exists. This doesn't fail `validate:previews` (the file exists), but the section text and prose carry the explanation and the `linear` behavior IS the hero demo's default behavior, so the duplication is cosmetically redundant rather than broken.

### 3. Available inside the registry?

**`packages/registry-angular/ui/_registry.ts`** entry at line 382:

```ts
{ path: "ui/stepper/stepper.component.ts", type: "registry:ui" },        // ✓ on disk
{ path: "ui/stepper/stepper-indicator.component.html", type: "registry:ui" }, // ✓ on disk
{ path: "ui/stepper/stepper.component.html", type: "registry:ui" },      // ✓ on disk
{ path: "ui/stepper/stepper.variants.ts", type: "registry:ui" },         // ✓ on disk
{ path: "ui/stepper/stepper.icons.ts", type: "registry:ui" },            // ✓ on disk
{ path: "ui/stepper/index.ts", type: "registry:ui" },                    // ✓ on disk
```

All 6 disk files are listed; no file missing from the registry, no entry without a disk file. No `dependencies` field — correct, `class-variance-authority` is a workspace-level dep shared by all Angular components.

**`apps/v4/lib/framework-components.ts`**: `"stepper"` present in the Angular `Set` (line 437) ✓

**`apps/v4/content/docs/components/angular/meta.json`**: `"stepper"` in `pages` array ✓

**Preview resolution**: all 6 demo files exist in `apps/preview-angular/src/angular/` matching the 6 `name=` values in the MDX. `validate:previews` expected to pass (not run — read-only review).

### 4. Style diff vs original p4one

p4one (`/opt/dev/pd-p4one/app/src/app/ui/stepper/`) used Tailwind custom shorthand variants (`data-vertical:`, `data-horizontal:`). The registry port converts these to standard arbitrary-variant syntax, consistent with how `ui/item-separator` handles the same pattern.

| Location | p4one class | Registry class | Assessment |
|---|---|---|---|
| Stepper root | `data-vertical:flex-col` | `data-[orientation=vertical]:flex-col` | Correct translation |
| Trigger orient | `data-vertical:flex-row data-vertical:items-center data-vertical:gap-2 data-vertical:text-left` | Same with `data-[orientation=vertical]:` | Correct |
| Trigger focus | `focus-visible:ring-3` | `focus-visible:ring-[3px]` | Equivalent (both 3 px) |
| Trigger | _(absent)_ | `[&_svg]:pointer-events-none [&_svg]:fill-current` | Added; correct for SVG projection |
| Indicator SVG | `[&>svg]:size-4 [&>svg]:fill-current` on inner `<span>` | `[&_svg]:size-4 [&_svg]:fill-current` on host | Selector broadened from direct child (`>`) to descendant; equivalent since only one SVG is present |
| Separator horizontal | `data-horizontal:mt-4` | `data-[orientation=horizontal]:mt-4` | Correct (physical top margin, direction-neutral) |
| Separator vertical | `data-vertical:ml-4` | `data-[orientation=vertical]:ml-4` | **Physical** — see Issue 2 |

p4one's completed-indicator icon is imported via `@material-symbols/svg-400/rounded/check.svg?raw` (Vite raw import); the registry inlines the identical SVG path as a static string — correct choice for a portable registry component.

**Theme promotion candidates**

| Class group | p4one-local? | Promote to `style-force-ui.css`? |
|---|---|---|
| `bg-primary / text-primary-foreground` (active indicator) | No — generic shadcn tokens | No — already global |
| `bg-success-solid / text-on-success / border-success-solid` (completed indicator) | Yes — Force semantic pair | **Yes** — `cn-stepper-indicator-completed`; same pairing used by `badge`'s `success-solid` variant |
| `group-data-[state=active]:font-semibold / text-foreground` (active title) | Force convention | Borderline; low priority |
| `inline-flex h-8 w-8 rounded-full` (indicator circle shape) | Force-specific sizing | Promote if a second component reuses the same indicator circle (YAGNI until then) |

The `success-solid / on-success` triplet is the strongest promotion candidate: it encodes Force's semantic completion colour and is already shared conceptually with `badge`.

---

## Verdict

**PASS-with-notes** — implementation is correct and complete; two minor code-quality gaps and one redundant docs section, no blockers.

## Issues

1. **(minor)** `StepperItemComponent` in `packages/registry-angular/ui/stepper/stepper.component.ts` declares `ngOnDestroy()` but does not implement the `OnDestroy` interface. Works at runtime; loses type-safety and IDE completeness. p4one has `implements OnDestroy`. Fix: add `implements OnDestroy` to the class declaration.

2. **(minor)** `stepperSeparatorVariants` (`packages/registry-angular/ui/stepper/stepper.variants.ts`): vertical separator uses `data-[orientation=vertical]:ml-4` (physical left margin). In RTL+vertical mode the connector will not align with the circles on the right side. Should be `ms-4` (logical inline-start). The `stepper-rtl.ts` comment acknowledges this as a known divergence but it is not marked as a documented exception in `check-example-parity.mts`.

3. **(minor)** `apps/v4/content/docs/components/angular/stepper.mdx` `## Linear` section references `name="stepper-demo"` — the same demo as the hero. No `stepper-linear.ts` demo file exists. Not a `validate:previews` failure, but the section does not satisfy the "one unique demo per `##` section" rule from `docs/component-docs-standard.md`. Low priority since the prose explains `linear` clearly and the demo correctly shows linear behavior.
```

---
