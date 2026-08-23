// [FORCE-UI] Fails if any installed dependency declares an @angular/core
// peerDependencies range that excludes the @angular/core version actually
// resolved for this app.
//
// Why: @radix-ng/primitives@1.1.2 shipped peer `@angular/core ^21 || ^22`
// while we ran Angular 20. tsc and the AOT build both pass on that mismatch;
// it only explodes at render time ("Cannot read properties of undefined
// (reading 'transformFn')"). This script makes the mismatch a build failure.
//
// Usage: pnpm run peer-deps:check   (from apps/preview-angular)

import { execSync } from "node:child_process"
import { createRequire } from "node:module"
import path from "node:path"

const require = createRequire(import.meta.url)
const semver = require("semver")

const coreVersion = require("@angular/core/package.json").version
console.log(`@angular/core ${coreVersion}`)

// App dependency graph via pnpm; `dependencies` is a keyed object.
let trees
try {
  trees = JSON.parse(
    execSync("pnpm ls --json --depth Infinity", {
      cwd: import.meta.dirname,
      maxBuffer: 512 * 1024 * 1024,
    }).toString(),
  )
} catch (e) {
  console.error("pnpm ls failed:", e.message)
  process.exit(1)
}

const seen = new Set()
const failures = []
const check = (entry) => {
  if (!entry || seen.has(entry.path)) return
  seen.add(entry.path)
  try {
    const pkg = require(path.join(entry.path, "package.json"))
    const range = pkg.peerDependencies?.["@angular/core"]
    if (
      range &&
      range !== "*" &&
      !semver.satisfies(coreVersion, range, { includePrerelease: true })
    ) {
      failures.push(`${pkg.name}@${pkg.version} requires @angular/core ${range}`)
    }
  } catch {
    /* linked workspace packages without peers etc. — ignore */
  }
  for (const child of Object.values(entry.dependencies ?? {})) check(child)
}
for (const tree of trees) check(tree)

if (failures.length > 0) {
  for (const f of failures) console.error(`✗ ${f} — installed @angular/core is ${coreVersion}`)
  console.error(
    `\n${failures.length} peer-dependency conflict(s). These compile fine but break at render time.`,
  )
  process.exit(1)
}
console.log("✅ all @angular/core peer ranges satisfied")
