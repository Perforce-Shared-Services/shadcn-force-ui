#!/usr/bin/env node
// [FORCE-UI] Generates packages/registry-angular/examples/*.ts + examples/_registry.ts
// from the per-file Angular demo components in apps/preview-angular/src/angular/*.ts.
//
// The preview app imports demos via the "@/angular-ui/<component>" alias (wired in
// apps/preview-angular/vite.config.ts straight to packages/registry-angular/ui/<component>).
// The registry convention used by the other framework registries (vue/svelte/ember) for
// this same alias is "@/ui/<component>", which is what a user's project resolves to after
// `shadcn init`. This script rewrites that one import prefix and derives each example's
// registryDependencies from the ui components it actually imports - no hand-maintained list.
//
// Usage: node packages/registry-angular/scripts/generate-examples.mjs
// (Regenerate whenever apps/preview-angular/src/angular/*.ts demos are added/changed.)

import { readdirSync, readFileSync, writeFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PACKAGE_ROOT = path.resolve(__dirname, "..")
const SOURCE_DIR = path.resolve(PACKAGE_ROOT, "../../apps/preview-angular/src/angular")
const OUT_DIR = path.resolve(PACKAGE_ROOT, "examples")

const IMPORT_SPECIFIER_RE = /@\/angular-ui\/([a-z0-9-]+)/g

function titleCase(slug) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

function generate() {
  const files = readdirSync(SOURCE_DIR)
    .filter((f) => f.endsWith(".ts"))
    .sort()

  const items = []

  for (const filename of files) {
    const srcPath = path.join(SOURCE_DIR, filename)
    const source = readFileSync(srcPath, "utf8")

    const registryDependencies = new Set()
    for (const match of source.matchAll(IMPORT_SPECIFIER_RE)) {
      registryDependencies.add(match[1])
    }

    const transformed = source.replace(IMPORT_SPECIFIER_RE, "@/ui/$1")
    writeFileSync(path.join(OUT_DIR, filename), transformed)

    const name = filename.replace(/\.ts$/, "")
    items.push({
      name,
      title: titleCase(name),
      registryDependencies: [...registryDependencies].sort(),
      files: [{ path: `examples/${filename}`, type: "registry:example" }],
    })
  }

  const body = items
    .map(
      (item) => `  {
    name: "${item.name}",
    title: "${item.title}",
    type: "registry:example",
    files: [
      {
        path: "${item.files[0].path}",
        type: "registry:example",
      },
    ],
    registryDependencies: [
${item.registryDependencies.map((d) => `      "${d}",`).join("\n")}
    ],
    dependencies: [],
  },`
    )
    .join("\n")

  const output = `import type { Registry } from "shadcn/schema"

export const examples: Registry["items"] = [
${body}
]
`

  writeFileSync(path.join(OUT_DIR, "_registry.ts"), output)

  console.log(`Generated ${items.length} examples -> ${path.relative(PACKAGE_ROOT, OUT_DIR)}`)
}

generate()
