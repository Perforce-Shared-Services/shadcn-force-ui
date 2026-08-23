# tabs — Migration Review

## Checklist

### 1. Examples match React base?

| Angular demo | React canonical | Status |
|---|---|---|
| `tabs-demo.ts` — 2 tabs (account/password), plain text | `tabs-demo.tsx` — 4 tabs (overview/analytics/reports/settings), Card composition | ❌ Material deviation |
| `tabs-disabled.ts` | `tabs-disabled.tsx` | ✅ match |
| `tabs-icons.ts` — inline SVG paths | `tabs-icons.tsx` — imported icon components | ✅ acceptable (framework constraint) |
| `tabs-line.ts` — 3 triggers | `tabs-line.tsx` — 3 triggers | ✅ match |
| `tabs-rtl.ts` — 2 Arabic triggers, no `TabsContent` | `tabs-rtl.tsx` — 4 tabs, Card content, dynamic i18n | ❌ Material deviation; panel RTL behaviour not demonstrated |
| `tabs-vertical.ts` | `tabs-vertical.tsx` | ✅ match (extra `max-w-sm` is fine) |

`tabs-demo.ts` reproduces the *usage snippet* (2 tabs, plain text) rather than the full hero demo. `tabs-rtl.ts` omits all `TabsContent` panels.

### 2. Docs follow the React/flat pattern?

- Frontmatter: ✅ `title`, `description`, `base`, `component: true`, `links.doc`+`links.api` both pointing to radix-ng.
- Hero preview: ✅ `<ComponentPreview framework="angular" name="tabs-demo" />` before any heading.
- Installation: ✅ cli + manual steps.
- Usage: ✅ import line + minimal snippet.
- Example sections: ✅ flat `##` per example — no `## Examples` umbrella.
- Section order vs base: Angular places **Icons before Disabled**; base is Disabled → Icons. Minor deviation.
- RTL section: ❌ `<ComponentPreview framework="angular" name="tabs-rtl" />` is missing the required `direction="rtl"` prop (docs standard § RTL).
- API Reference: ✅ link-out to radix-ng (correct form for a primitive wrapper).

### 3. Available inside the registry?

- `_registry.ts` entry `"tabs"` at line 161: ✅ lists all three disk files (`tabs.variants.ts`, `tabs.component.ts`, `index.ts`). Dependency `@radix-ng/primitives` declared. ✅
- `framework-components.ts` angular `Set`: ✅ `"tabs"` present (line 440 approx).
- `meta.json` pages array: ✅ `"tabs"` present.
- Demos resolve: six `tabs-*.ts` files exist in `apps/preview-angular/src/angular/`. No stray subdirectories. ✅

### 4. Style diff vs original p4one

| Feature | p4one class | Registry class/token | Verdict |
|---|---|---|---|
| Active-state bg, text, border on trigger | `data-active:bg-background` etc. (custom variant) | `data-[active]:bg-background` etc. (arbitrary attr variant) | **Bug** — wrong syntax; radix-ng never sets `data-active` attr, it sets `data-state="active"` |
| Line-variant underline reveal | `group-data-[variant=line]/tabs-list:data-active:after:opacity-100` | `group-data-[variant=line]/tabs-list:data-[active]:after:opacity-100` | **Bug** — same mismatch; underline never appears |
| Line-variant active bg reset | `group-data-[variant=line]/tabs-list:bg-transparent data-active:bg-transparent` | absent | p4one-local → promote to `cn-tabs-trigger` |
| Focus ring on trigger | `focus-visible:border-ring focus-visible:ring-ring/50` | `focus-visible:ring-[3px]` only (no color class) | Promote `ring-ring/50` + `border-ring` to `cn-tabs-trigger` |
| SVG pointer/shrink helpers | `[&_svg]:pointer-events-none [&_svg]:shrink-0` | absent | Promote to `cn-tabs-trigger` |
| Enter animation on content | `data-active:animate-in fade-in-0 slide-in-from-bottom-1 duration-150` | absent | p4one-local; WCAG 2.3.3 guarded |
| `getBaseId()` memoization fix | `inject(RdxTabsRootDirective)` + stable ID | absent (comment: "not needed in v1.x") | Verify with v1.1.2; silent a11y gap if bug persists |
| `dir` forwarded to primitive | `inputs: ['dir']` in hostDirectives | not forwarded | p4one-local but needed for RTL keyboard nav |
| Spurious host attr | absent | `"nativeButton": "true"` | Bug — remove |

**Theme promotion candidates**

| Class string | Promote to | Reason |
|---|---|---|
| `focus-visible:border-ring focus-visible:ring-ring/50` | `.cn-tabs-trigger` | WCAG 2.4.7 focus indicator |
| `group-data-[variant=line]/tabs-list:bg-transparent` + dark resets | `.cn-tabs-trigger` | Line-variant correctness |
| `[&_svg]:pointer-events-none [&_svg]:shrink-0` | `.cn-tabs-trigger` | Consistent SVG helpers |

## Verdict

**FAIL** — the active-tab visual state (background, text colour) and line-variant underline are silently broken because `data-[active]:` (arbitrary attr variant) is used instead of the `data-active:` custom variant; radix-ng never sets the `data-active` attribute.

## Issues

1. **blocker** `tabs.component.ts:TabsTriggerComponent` — Seven classes use `data-[active]:` (e.g. `data-[active]:bg-background`, `group-data-[variant=line]/tabs-list:data-[active]:after:opacity-100`). Must be `data-active:` to match radix-ng's `data-state="active"`. The `@custom-variant data-active` in `shadcn/tailwind.css` covers `[data-state="active"]`; the arbitrary variant does not.

2. **major** `tabs.component.ts:TabsTriggerComponent` host — `"nativeButton": "true"` renders as `nativebutton="true"` HTML attribute on every trigger button. Remove it.

3. **major** `tabs.component.ts:TabsComponent` hostDirectives — `dir` not in `inputs` list; radix-ng primitive won't receive `dir` through Angular, which can break RTL keyboard-nav ordering inside the primitive.

4. **major** `tabs-demo.ts` — Two tabs with plain text instead of the four-tab Card-composition demo (`tabs-demo.tsx`). Upgrade to match the React canonical.

5. **major** `tabs-rtl.ts` — No `TabsContent` rendered; only shows the trigger list. React RTL demo has full panel content. The demo does not demonstrate RTL panel behaviour.

6. **minor** `tabs.mdx` — RTL `<ComponentPreview>` missing `direction="rtl"` (docs standard requires it).

7. **minor** `tabs.mdx` — Section order: Icons appears before Disabled; base order is Disabled → Icons.

8. **minor** `tabs.component.ts:TabsTriggerComponent` — Missing `focus-visible:ring-ring/50 focus-visible:border-ring` (not in CSS token or inline class). Ring width is set but ring colour is implicit.

9. **minor** `tabs.component.ts:TabsComponent` — `getBaseId()` memoization absent; comment asserts v1.x doesn't need it. Verify that trigger `aria-controls` IDs are stable across the component tree in v1.1.2 before closing.
