import { type Registry } from "shadcn/schema"

export const ui: Registry["items"] = [
  {
    name: "button",
    type: "registry:ui",
    files: [
      { path: "ui/button/button.variants.ts", type: "registry:ui" },
      { path: "ui/button/button.component.ts", type: "registry:ui" },
      { path: "ui/button/button.component.html", type: "registry:ui" },
      { path: "ui/button/index.ts", type: "registry:ui" },
    ],
    meta: {
      links: {
        docs: "https://forceui.public.prd.shared.perforce.com/docs/components/angular/button",
      },
    },
  },
  {
    name: "badge",
    type: "registry:ui",
    files: [
      { path: "ui/badge/badge.variants.ts", type: "registry:ui" },
      { path: "ui/badge/badge.component.ts", type: "registry:ui" },
      { path: "ui/badge/badge.component.html", type: "registry:ui" },
      { path: "ui/badge/index.ts", type: "registry:ui" },
    ],
    meta: {
      links: {
        docs: "https://forceui.public.prd.shared.perforce.com/docs/components/angular/badge",
      },
    },
  },
  {
    name: "card",
    type: "registry:ui",
    files: [
      { path: "ui/card/card.component.ts", type: "registry:ui" },
      { path: "ui/card/card.component.html", type: "registry:ui" },
      { path: "ui/card/index.ts", type: "registry:ui" },
    ],
    meta: {
      links: {
        docs: "https://forceui.public.prd.shared.perforce.com/docs/components/angular/card",
      },
    },
  },
  {
    name: "separator",
    type: "registry:ui",
    files: [
      { path: "ui/separator/separator.component.ts", type: "registry:ui" },
      { path: "ui/separator/separator.component.html", type: "registry:ui" },
      { path: "ui/separator/index.ts", type: "registry:ui" },
    ],
    meta: {
      links: {
        docs: "https://forceui.public.prd.shared.perforce.com/docs/components/angular/separator",
      },
    },
  },
  {
    name: "skeleton",
    type: "registry:ui",
    files: [
      { path: "ui/skeleton/skeleton.component.ts", type: "registry:ui" },
      { path: "ui/skeleton/skeleton.component.html", type: "registry:ui" },
      { path: "ui/skeleton/index.ts", type: "registry:ui" },
    ],
    meta: {
      links: {
        docs: "https://forceui.public.prd.shared.perforce.com/docs/components/angular/skeleton",
      },
    },
  },
  {
    name: "label",
    type: "registry:ui",
    files: [
      { path: "ui/label/label.component.ts", type: "registry:ui" },
      { path: "ui/label/label.component.html", type: "registry:ui" },
      { path: "ui/label/index.ts", type: "registry:ui" },
    ],
    meta: {
      links: {
        docs: "https://forceui.public.prd.shared.perforce.com/docs/components/angular/label",
      },
    },
  },
  {
    name: "kbd",
    type: "registry:ui",
    files: [
      { path: "ui/kbd/kbd.variants.ts", type: "registry:ui" },
      { path: "ui/kbd/kbd.component.ts", type: "registry:ui" },
      { path: "ui/kbd/kbd.component.html", type: "registry:ui" },
      { path: "ui/kbd/index.ts", type: "registry:ui" },
    ],
    meta: {
      links: {
        docs: "https://forceui.public.prd.shared.perforce.com/docs/components/angular/kbd",
      },
    },
  },
  {
    name: "accordion",
    type: "registry:ui",
    dependencies: ["@radix-ng/primitives"],
    files: [
      { path: "ui/accordion/accordion.component.ts", type: "registry:ui" },
      { path: "ui/accordion/accordion-trigger.component.html", type: "registry:ui" },
      { path: "ui/accordion/accordion-content.component.html", type: "registry:ui" },
      { path: "ui/accordion/index.ts", type: "registry:ui" },
    ],
    meta: { links: { docs: "https://forceui.public.prd.shared.perforce.com/docs/components/angular/accordion" } },
  },
  {
    name: "checkbox",
    type: "registry:ui",
    dependencies: ["@radix-ng/primitives"],
    files: [
      { path: "ui/checkbox/checkbox.component.ts", type: "registry:ui" },
      { path: "ui/checkbox/checkbox.component.html", type: "registry:ui" },
      { path: "ui/checkbox/index.ts", type: "registry:ui" },
    ],
    meta: { links: { docs: "https://forceui.public.prd.shared.perforce.com/docs/components/angular/checkbox" } },
  },
  {
    name: "collapsible",
    type: "registry:ui",
    dependencies: ["@radix-ng/primitives"],
    files: [
      { path: "ui/collapsible/collapsible.component.ts", type: "registry:ui" },
      { path: "ui/collapsible/index.ts", type: "registry:ui" },
    ],
    meta: { links: { docs: "https://forceui.public.prd.shared.perforce.com/docs/components/angular/collapsible" } },
  },
  {
    name: "radio-group",
    type: "registry:ui",
    dependencies: ["@radix-ng/primitives"],
    files: [
      { path: "ui/radio-group/radio-group.component.ts", type: "registry:ui" },
      { path: "ui/radio-group/radio-group-item.component.html", type: "registry:ui" },
      { path: "ui/radio-group/index.ts", type: "registry:ui" },
    ],
    meta: { links: { docs: "https://forceui.public.prd.shared.perforce.com/docs/components/angular/radio-group" } },
  },
  {
    name: "switch",
    type: "registry:ui",
    dependencies: ["@radix-ng/primitives"],
    files: [
      { path: "ui/switch/switch.component.ts", type: "registry:ui" },
      { path: "ui/switch/switch.component.html", type: "registry:ui" },
      { path: "ui/switch/index.ts", type: "registry:ui" },
    ],
    meta: { links: { docs: "https://forceui.public.prd.shared.perforce.com/docs/components/angular/switch" } },
  },
  {
    name: "tabs",
    type: "registry:ui",
    dependencies: ["@radix-ng/primitives"],
    files: [
      { path: "ui/tabs/tabs.variants.ts", type: "registry:ui" },
      { path: "ui/tabs/tabs.component.ts", type: "registry:ui" },
      { path: "ui/tabs/index.ts", type: "registry:ui" },
    ],
    meta: { links: { docs: "https://forceui.public.prd.shared.perforce.com/docs/components/angular/tabs" } },
  },
  {
    name: "toggle",
    type: "registry:ui",
    dependencies: ["@radix-ng/primitives"],
    files: [
      { path: "ui/toggle/toggle.variants.ts", type: "registry:ui" },
      { path: "ui/toggle/toggle.component.ts", type: "registry:ui" },
      { path: "ui/toggle/index.ts", type: "registry:ui" },
    ],
    meta: { links: { docs: "https://forceui.public.prd.shared.perforce.com/docs/components/angular/toggle" } },
  },
  {
    name: "toggle-group",
    type: "registry:ui",
    dependencies: ["@radix-ng/primitives"],
    registryDependencies: ["toggle"],
    files: [
      { path: "ui/toggle-group/toggle-group.component.ts", type: "registry:ui" },
      { path: "ui/toggle-group/index.ts", type: "registry:ui" },
    ],
    meta: { links: { docs: "https://forceui.public.prd.shared.perforce.com/docs/components/angular/toggle-group" } },
  },
  {
    name: "alert",
    type: "registry:ui",
    files: [
      { path: "ui/alert/alert.variants.ts", type: "registry:ui" },
      { path: "ui/alert/alert.icons.ts", type: "registry:ui" },
      { path: "ui/alert/alert.component.ts", type: "registry:ui" },
      { path: "ui/alert/alert.component.html", type: "registry:ui" },
      { path: "ui/alert/index.ts", type: "registry:ui" },
    ],
    meta: { links: { docs: "https://forceui.public.prd.shared.perforce.com/docs/components/angular/alert" } },
  },
  {
    name: "avatar",
    type: "registry:ui",
    files: [
      { path: "ui/avatar/avatar.component.ts", type: "registry:ui" },
      { path: "ui/avatar/avatar-fallback.component.html", type: "registry:ui" },
      { path: "ui/avatar/index.ts", type: "registry:ui" },
    ],
    meta: { links: { docs: "https://forceui.public.prd.shared.perforce.com/docs/components/angular/avatar" } },
  },
  {
    name: "input",
    type: "registry:ui",
    files: [
      { path: "ui/input/input.variants.ts", type: "registry:ui" },
      { path: "ui/input/input.component.ts", type: "registry:ui" },
      { path: "ui/input/input.component.html", type: "registry:ui" },
      { path: "ui/input/index.ts", type: "registry:ui" },
    ],
    meta: { links: { docs: "https://forceui.public.prd.shared.perforce.com/docs/components/angular/input" } },
  },
  {
    name: "textarea",
    type: "registry:ui",
    files: [
      { path: "ui/textarea/textarea.variants.ts", type: "registry:ui" },
      { path: "ui/textarea/textarea.component.ts", type: "registry:ui" },
      { path: "ui/textarea/textarea.component.html", type: "registry:ui" },
      { path: "ui/textarea/index.ts", type: "registry:ui" },
    ],
    meta: { links: { docs: "https://forceui.public.prd.shared.perforce.com/docs/components/angular/textarea" } },
  },
  {
    name: "progress",
    type: "registry:ui",
    files: [
      { path: "ui/progress/progress.component.ts", type: "registry:ui" },
      { path: "ui/progress/progress.component.html", type: "registry:ui" },
      { path: "ui/progress/index.ts", type: "registry:ui" },
    ],
    meta: { links: { docs: "https://forceui.public.prd.shared.perforce.com/docs/components/angular/progress" } },
  },
  {
    name: "aspect-ratio",
    type: "registry:ui",
    files: [
      { path: "ui/aspect-ratio/aspect-ratio.component.ts", type: "registry:ui" },
      { path: "ui/aspect-ratio/aspect-ratio.component.html", type: "registry:ui" },
      { path: "ui/aspect-ratio/index.ts", type: "registry:ui" },
    ],
    meta: { links: { docs: "https://forceui.public.prd.shared.perforce.com/docs/components/angular/aspect-ratio" } },
  },
  {
    name: "empty",
    type: "registry:ui",
    files: [
      { path: "ui/empty/empty.variants.ts", type: "registry:ui" },
      { path: "ui/empty/empty.component.ts", type: "registry:ui" },
      { path: "ui/empty/index.ts", type: "registry:ui" },
    ],
    meta: { links: { docs: "https://forceui.public.prd.shared.perforce.com/docs/components/angular/empty" } },
  },
  {
    name: "spinner",
    type: "registry:ui",
    files: [
      { path: "ui/spinner/spinner.variants.ts", type: "registry:ui" },
      { path: "ui/spinner/spinner.component.ts", type: "registry:ui" },
      { path: "ui/spinner/spinner.component.html", type: "registry:ui" },
      { path: "ui/spinner/index.ts", type: "registry:ui" },
    ],
    meta: {
      links: {
        docs: "https://forceui.public.prd.shared.perforce.com/docs/components/angular/spinner",
      },
    },
  },
  {
    name: "stepper",
    type: "registry:ui",
    files: [
      { path: "ui/stepper/stepper.component.ts", type: "registry:ui" },
      { path: "ui/stepper/index.ts", type: "registry:ui" },
    ],
    meta: {
      links: {
        docs: "https://forceui.public.prd.shared.perforce.com/docs/components/angular/stepper",
      },
    },
  },
]
