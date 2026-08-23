# input-otp — Migration Review

## Checklist

### 1. Examples match React base?

React base has 10 demos; all 10 have Angular counterparts. File-by-file:

| Demo | Match | Deviation |
|---|---|---|
| `input-otp-demo` | ✓ | `defaultValue` (React) → static `value` (Angular). Equivalent initial-value semantics. |
| `input-otp-pattern` | ✓ | Declares `const REGEXP_ONLY_DIGITS = "^\\d+$"` locally instead of importing from `@/angular-ui/input-otp` (the export exists in `index.ts`). |
| `input-otp-separator` | ✓ | Exact structural match. |
| `input-otp-disabled` | ✓ | Exact structural match. |
| `input-otp-controlled` | ✓ | React `value`+`onChange` → Angular `[(value)]` model. Correct idiom. |
| `input-otp-invalid` | ✓ | React uses `useState("000000")+onChange`; Angular uses `value="000000"` (static). Functional result identical — `model` holds internal state. |
| `input-otp-four-digits` | ✓ | Same local `REGEXP_ONLY_DIGITS` re-declaration as pattern demo. |
| `input-otp-alphanumeric` | ✓ | Same local `REGEXP_ONLY_DIGITS_AND_CHARS` re-declaration. |
| `input-otp-form` | ✓ | Full Card+Field+Button composition; SVG inline swap for `RefreshCwIcon`. Structural match. |
| `input-otp-rtl` | ✓ | React drives dir from `useTranslation`; Angular uses static `dir="rtl"` and Arabic label, documented in component comment. |

**Material deviation:** `input-otp-pattern.ts`, `input-otp-four-digits.ts`, and `input-otp-alphanumeric.ts` each redeclare the regex constant locally (`const REGEXP_ONLY_DIGITS = "^\\d+$"`) instead of importing `REGEXP_ONLY_DIGITS` / `REGEXP_ONLY_DIGITS_AND_CHARS` from `@/angular-ui/input-otp`. The exports exist in `packages/registry-angular/ui/input-otp/index.ts`. These demos do not exercise the public API constants.

---

### 2. Docs follow the React/flat pattern?

- **Frontmatter**: `title`, `description`, `base: angular`, `component: true`. ✓
- **Hero preview**: `<ComponentPreview framework="angular" name="input-otp-demo" />` immediately after frontmatter, before any heading. ✓
- **`## Installation`**: CLI + manual tabs with `<ComponentSource framework="angular" name="input-otp" />`. ✓
- **`## Usage`**: Import block + HTML snippet. ✓
- **`## Composition`**: Present (optional; matches base pattern). ✓
- **Flat `##` per example — no `## Examples` umbrella**: ✓ All nine example sections (`## Pattern`, `## Separator`, `## Disabled`, `## Controlled`, `## Invalid`, `## Four Digits`, `## Alphanumeric`, `## Form`, `## RTL`) are flat.
- **`## RTL`**: Second-to-last, `direction="rtl"`, `/docs/rtl` link present. ✓
- **`## API Reference` — structural deviation**: The docs standard (§ API reference) specifies that a "Force UI original" (no upstream docs link) uses `### PartName` subsections with `| Prop | Type | Default |` tables per part. The Angular page uses a single combined `| Part | Selector | Key inputs |` table instead. Four parts, minimal props — readable in practice but does not match the standard's prescribed shape.

---

### 3. Available inside the registry?

**`_registry.ts`** (lines 354–368): entry `"input-otp"` exists with all 10 files on disk listed:

```
ui/input-otp/input-otp.component.ts          ✓
ui/input-otp/input-otp.component.html        ✓
ui/input-otp/input-otp-slot.component.ts     ✓
ui/input-otp/input-otp-slot.component.html   ✓
ui/input-otp/input-otp-group.component.ts    ✓
ui/input-otp/input-otp-group.component.html  ✓
ui/input-otp/input-otp-separator.component.ts  ✓
ui/input-otp/input-otp-separator.component.html ✓
ui/input-otp/input-otp.icons.ts              ✓
ui/input-otp/index.ts                        ✓
```

No `dependencies` declared (correct — no external `input-otp` npm package used). ✓

**`framework-components.ts`**: `"input-otp"` present in the `angular` Set. ✓

**`meta.json`** (`apps/v4/content/docs/components/angular/meta.json`): `"input-otp"` in `pages`. ✓

**`apps/preview-angular/src/angular/`**: All 10 `input-otp-*.ts` demo files present. `pnpm --filter=v4 validate:previews` should resolve all `<ComponentPreview framework="angular" name="input-otp-*" />` references. ✓

---

### 4. Style diff vs original p4one

The structural change is: p4one stores all Tailwind classes **inline** in host/template; the registry moves them to **CSS tokens** (`cn-input-otp*` in `style-force-ui.css`). The component TypeScript then applies only the token class plus structural layout utilities.

| Location | p4one class string | Registry approach | Note |
|---|---|---|---|
| **Slot host** | Full inline: `relative flex size-8 items-center justify-center border-y border-r border-border … data-[disabled=true]:bg-muted` | `cn-input-otp-slot relative flex items-center justify-center data-[active=true]:z-10` | Token carries sizing, borders, all state variants |
| **Slot resting border** | `border-border` (Figma fix: changed from upstream `border-input`) | `border-border` in `.cn-input-otp-slot` `[FORCE-UI]` | Figma parity fix already promoted |
| **Caret line** | `animate-caret-blink motion-reduce:animate-none bg-foreground h-4 w-px` inline | `cn-input-otp-caret-line` token | `[FORCE-UI]` WCAG 2.3.3 guard already promoted |
| **Group host** | `flex items-center rounded-lg has-aria-invalid:border-destructive has-aria-invalid:ring-3 …` inline | `cn-input-otp-group flex items-center` | Token carries ring/border |
| **Separator host** | `flex items-center [&_svg:not([class*='size-'])]:size-4 [&_svg]:fill-current` inline; `<span>` innerHTML wrapper | `cn-input-otp-separator flex items-center [&_svg]:fill-current`; `<div>` innerHTML wrapper | `size-4` moved to token; wrapper tag differs (`span` → `div`) |
| **Icons** | `import removeSvg from '@material-symbols/svg-400/rounded/remove.svg?raw'` (webpack raw import) | Hardcoded SVG string in `input-otp.icons.ts` | Registry approach is build-tool-agnostic |

**Theme promotion candidates**

| Class/token | Status |
|---|---|
| `border-border` (resting slot border, Figma fix) | Already in `.cn-input-otp-slot` `[FORCE-UI]` |
| `motion-reduce:transition-none` (WCAG 2.3.3 slot guard) | Already in `.cn-input-otp-slot` `[FORCE-UI]` |
| `motion-reduce:animate-none` (WCAG 2.3.3 caret guard) | Already in `.cn-input-otp-caret-line` `[FORCE-UI]` |

No additional promotion candidates — all p4one Figma/WCAG fixes were correctly absorbed into the global token.

---

## Verdict

**PASS-with-notes** — all 10 demos present, registry fully wired, docs structurally sound. Three minor notes prevent a clean PASS.

---

## Issues

1. **(minor)** `input-otp-pattern.ts:4`, `input-otp-four-digits.ts:4`, `input-otp-alphanumeric.ts:4` — Each declares a local `const REGEXP_ONLY_*` string instead of importing the identical constant from `@/angular-ui/input-otp`. The exports exist in `index.ts`. Demos don't demonstrate the public API constants and will silently diverge if the regex ever changes.

2. **(minor)** `apps/v4/content/docs/components/angular/input-otp.mdx` — `## API Reference` uses a combined single table (`| Part | Selector | Key inputs |`) rather than `### PartName` subsections with `| Prop | Type | Default |` as the docs standard specifies for Force UI originals. Functional but structurally non-conforming.

3. **(minor)** `packages/registry-angular/ui/input-otp/input-otp-separator.component.html` — Uses `<div [innerHTML]="icon">` as the SVG wrapper; p4one uses `<span [innerHTML]="icon">`. Both are `aria-hidden`; `<div>` is slightly inappropriate inside a flex separator context (block vs inline) but has no functional or accessibility impact.
```

---
