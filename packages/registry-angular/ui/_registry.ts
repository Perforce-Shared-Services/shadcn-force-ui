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
]
