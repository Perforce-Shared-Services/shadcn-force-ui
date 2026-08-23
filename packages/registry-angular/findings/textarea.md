# textarea — Migration Review

## Checklist

### 1. Examples match React base?

Both sets have the same 7 files: `textarea-demo`, `textarea-variants`, `textarea-disabled`,
`textarea-invalid`, `textarea-button`, `textarea-field`, `textarea-rtl`. Names match 1-to-1. ✓

Material deviations found:

| File | React base | Angular | Assessment |
|---|---|---|---|
| `textarea-demo` | Bare `<Textarea placeholder="Type your message here." />` | Wraps in `<div class="flex w-full max-w-sm flex-col gap-1.5">` with `<label uiLabel for="msg">Message</label>` + different placeholder "Write your message…" | Hero demo diverges: adds label, container, changes placeholder |
| `textarea-disabled` | `attr.data-disabled` via React prop | `attr.data-disabled="true"` (static string binding) | Inconsistent with `textarea-invalid.ts:11` which uses `[attr.data-invalid]="true"` (property binding) |
| `textarea-rtl` | `useTranslation` hook with en/ar/he | Static Arabic text + `dir="rtl"` | Expected Angular deviation, annotated with `// [FORCE-UI]` comment ✓ |

All other demos (`textarea-variants`, `textarea-button`, `textarea-field`, `textarea-invalid`)
match the React base in structure and content.

### 2. Docs follow the React/flat pattern?

Reference: `docs/component-docs-standard.md`.

| Check | Status | Detail |
|---|---|---|
| Frontmatter (`title`, `description`, `base: angular`, `component: true`) | ✓ | All required fields present |
| Hero preview `name="textarea-demo"` before first heading | ✓ | `<ComponentPreview framework="angular" name="textarea-demo" />` |
| Hero preview `previewClassName` | ✗ minor | React base has `previewClassName="*:max-w-xs"`; Angular hero omits it |
| `## Installation` → `## Usage` | ✓ | Both present with correct Angular-specific code |
| Flat `##` per example | ✗ minor | `### Variants` at `textarea.mdx:40` is `###`, making it a child of `## Button`. Standard requires a flat `## Variants` |
| `## RTL` second to last | ✓ | Present, with `direction="rtl"` |
| `## API Reference` last | ✓ | Present with `### TextareaComponent` subsection |
| API table columns | ✓ | `Input`/`Type`/`Default`; includes Angular-specific `resizable` input not on React page; uses `class` (correct for Angular) |

### 3. Available inside the registry?

- **`_registry.ts` entry** (`lines 227–236`): name `"textarea"`, all 4 disk files listed:
  `textarea.variants.ts`, `textarea.component.ts`, `textarea.component.html`, `index.ts` ✓
- **`textarea.component.html`** is an empty file on disk — valid for `template: ""` attribute-selector
  components; correctly registered ✓
- **No `registryDependencies`** declared — correct (no peer component deps; `cva` is a workspace dep) ✓
- **`framework-components.ts`**: `"textarea"` present in angular Set ✓
- **`meta.json`** (`apps/v4/content/docs/components/angular/meta.json`): `"textarea"` in `pages` array ✓
- Preview demos resolve at `apps/preview-angular/src/angular/textarea-*.ts` (7 files) ✓

### 4. Style diff vs original p4one

p4one inlines all tokens into the `cva` base/variant strings. The registry delegates to
`style-force-ui.css` `.cn-textarea` + variant classes.

| Token / class | p4one location | Registry location | Gap? |
|---|---|---|---|
| `px-2.5 py-2` | cva base string | `.cn-textarea { @apply ... px-2.5 py-2 }` | None |
| `rounded-lg border` (outline) | outline variant | `.cn-textarea-variant-outline` via CSS | None |
| `focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50` | cva base | `.cn-textarea { @apply ... focus-visible:border-ring focus-visible:ring-3 }` | None |
| `aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20` | cva base | `.cn-textarea { @apply ... aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:border-destructive }` | None |
| `[&[readonly]]:bg-muted [&[readonly]]:border-border` | cva base | `.cn-textarea { @apply ... [&[readonly]]:bg-muted [&[readonly]]:border-border }` (comment: `/* [FORCE-UI] read-only styling */`) | None |
| `disabled:bg-input/50 dark:disabled:bg-input/80` | outline variant | `.cn-textarea { @apply ... disabled:bg-input/50 dark:disabled:bg-input/80 }` | None |
| **`text-foreground`** | **cva base** | **Absent** from `.cn-textarea` CSS and registry cva base | **Gap** — typed text color relies on inheritance |
| `border-border hover:border-input` border tier (Option B) | cva per variant | `.cn-textarea-variant-outline { @apply border-border hover:border-input }` | None |
| `dark:bg-transparent` on underline | absent in p4one underline | present in `.cn-textarea-variant-underline` | Registry adds it (harmless, transparent = transparent) |

**Theme promotion candidates:**

| Token | Currently | Action |
|---|---|---|
| `text-foreground` on base | p4one only | Promote: add `text-foreground` to `.cn-textarea` in `style-force-ui.css` |
| `[&[readonly]]` styling | Already promoted | Done ✓ |
| `disabled:bg-input/*` dark variants | Already promoted | Done ✓ |
| `border-border hover:border-input` Option-B tier | Already promoted | Done ✓ |

---

## Verdict

**PASS-with-notes** — Registry wiring is complete and correct; all 7 demos exist and resolve;
API table covers all inputs. Four minor issues require clean-up before docs are canonical.

## Issues

1. **(minor)** `textarea.mdx:40` — `### Variants` must be `## Variants`. The docs standard
   forbids `###` for top-level examples; it currently nests Variants under `## Button`.

2. **(minor)** `textarea-demo.ts` — Hero demo diverges from React base: adds a `<label>`, a
   flex wrapper, and changes placeholder text. React base is a bare `<Textarea>`. Makes the
   Angular hero visually richer but breaks parity.

3. **(minor)** `textarea-disabled.ts:9` — `attr.data-disabled="true"` (static string) while
   `textarea-invalid.ts:11` uses `[attr.data-invalid]="true"` (property binding). Use
   `[attr.data-disabled]="true"` for consistency.

4. **(minor)** `textarea.mdx` hero `<ComponentPreview>` missing `previewClassName="*:max-w-xs"`
   that the React base page carries; the textarea appears unconstrained in width in preview.

5. **(note)** `text-foreground` is explicit in the p4one cva base string but absent from the
   registry's `.cn-textarea` CSS and cva base. Typed text colour depends on inheritance. No
   visual regression expected in practice, but it is a theme-promotion candidate.
```

---
