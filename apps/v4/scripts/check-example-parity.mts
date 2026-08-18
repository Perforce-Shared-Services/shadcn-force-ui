// [FORCE-UI] Reports example-set parity between the `base` React docs and the
// framework ports (Vue, Svelte, Ember, Angular).
//
// `framework-components:check` only proves that a component *doc page* exists
// for a base. It says nothing about whether that page documents the same set
// of examples the Base UI reference page does, which is where the ports
// actually drift (see docs/component-docs-standard.md).
//
// This script compares example *file counts* per component slug:
//
//   reference: apps/v4/examples/base/{slug}-*.tsx
//   port:      apps/preview-{fw}/src/{demoDir}/{slug}-*.{demoExt}
//
// Only slugs that the framework already claims to have ported (its entry in
// FRAMEWORK_COMPONENTS, i.e. it has a doc page) are compared - a component
// that was never ported is a gap for the porting backlog, not a parity
// finding. File counts are a proxy, not proof: a matching count does not mean
// the examples are the same ones. It is deliberately cheap and mechanical, and
// it is enough to surface the big structural gaps.
//
// Reporting only: this always exits 0. There is a large, known pre-existing
// gap (mostly Angular), so failing here would block unrelated PRs. See the
// `validate-previews` job in .github/workflows/code-check.yml for when to flip
// it to blocking.
//
// Usage: npx tsx --tsconfig ./tsconfig.scripts.json ./scripts/check-example-parity.mts
// (wired up as the `example-parity:check` npm script)
import { type Dirent, promises as fs } from "node:fs"
import * as path from "node:path"
import { fileURLToPath } from "node:url"

import { FRAMEWORK_COMPONENTS } from "../lib/framework-components.ts"
import { PREVIEW_FRAMEWORKS } from "../registry/frameworks.ts"

const V4_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const REPO_ROOT = path.resolve(V4_DIR, "../..")

// The Base UI React variant is the reference every port is measured against.
const REFERENCE_BASE = "base"
const REFERENCE_DIR = path.join(V4_DIR, "examples", REFERENCE_BASE)
const REFERENCE_EXT = "tsx"

// [FORCE-UI] Known, deliberate gaps: "<framework>:<slug>" entries that the
// report should stay quiet about. Mirrors the STYLELESS_SLOT_HOOKS pattern in
// validate-previews.mts - every entry needs a comment saying why it is fine,
// otherwise it is just a silenced bug. Empty for now: the current gaps are all
// real backlog, tracked as the follow-up migration, not accepted differences.
const DOCUMENTED_EXCEPTIONS = new Set<string>([
  // e.g. "ember:chart", // charts render through a different addon; no 1:1 demos
])

// Every slug known to any base, used to attribute an example file to a
// component. Attribution is longest-match: `button-group-demo.tsx` belongs to
// `button-group`, not to `button`, because `button-group` is itself a slug.
const ALL_SLUGS: string[] = Array.from(
  new Set(Object.values(FRAMEWORK_COMPONENTS).flatMap((set) => Array.from(set)))
)
  .filter((slug) => slug !== "*")
  .sort((a, b) => b.length - a.length)

function slugForStem(stem: string): string | undefined {
  return ALL_SLUGS.find((slug) => stem.startsWith(`${slug}-`))
}

type DirScan = {
  /** slug -> number of example files attributed to it */
  counts: Map<string, number>
  /** subdirectories found in the demo dir (the standard wants a flat tree) */
  nestedDirs: string[]
  exists: boolean
}

async function scanDemoDir(dir: string, ext: string): Promise<DirScan> {
  let entries: Dirent[]
  try {
    entries = await fs.readdir(dir, { withFileTypes: true })
  } catch {
    return { counts: new Map(), nestedDirs: [], exists: false }
  }

  const counts = new Map<string, number>()
  const nestedDirs: string[] = []
  const suffix = `.${ext}`

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue
    if (entry.isDirectory()) {
      nestedDirs.push(entry.name)
      continue
    }
    if (!entry.name.endsWith(suffix)) continue
    const stem = entry.name.slice(0, -suffix.length)
    const slug = slugForStem(stem)
    if (!slug) continue
    counts.set(slug, (counts.get(slug) ?? 0) + 1)
  }

  return { counts, nestedDirs, exists: true }
}

type Finding = {
  slug: string
  reference: number
  actual: number
}

async function main() {
  const reference = await scanDemoDir(REFERENCE_DIR, REFERENCE_EXT)
  if (!reference.exists) {
    console.error(
      `❌ Reference example dir not found: ${path.relative(REPO_ROOT, REFERENCE_DIR)}`
    )
    process.exit(1)
  }

  console.log(
    `Example-set parity vs examples/${REFERENCE_BASE} (reporting only, never fails).\n` +
      `Standard: docs/component-docs-standard.md\n`
  )

  let totalMissing = 0
  let totalFindings = 0

  for (const fw of PREVIEW_FRAMEWORKS) {
    const demoDir = path.join(
      REPO_ROOT,
      "apps",
      fw.previewDir,
      "src",
      fw.demoDir
    )
    const scan = await scanDemoDir(demoDir, fw.demoExt)
    const relDemoDir = path.relative(REPO_ROOT, demoDir)

    if (!scan.exists) {
      console.log(`\n## ${fw.title}\n  ⚠️  No demo dir at ${relDemoDir}`)
      continue
    }

    // A framework's ported slugs are the ones with a doc page, per the
    // generated manifest. Each preview framework owns exactly one base.
    const ported = new Set<string>(
      fw.bases.flatMap((base) => Array.from(FRAMEWORK_COMPONENTS[base] ?? []))
    )

    const findings: Finding[] = []
    const ahead: Finding[] = []
    let compared = 0
    let skippedNoReference = 0
    let silenced = 0

    for (const slug of Array.from(ported).sort()) {
      if (slug === "*") continue
      const referenceCount = reference.counts.get(slug) ?? 0
      if (referenceCount === 0) {
        // Nothing to measure against: the component has no base examples
        // (framework-only component, or a page that is prose only).
        skippedNoReference++
        continue
      }
      compared++

      const actual = scan.counts.get(slug) ?? 0
      if (actual === referenceCount) continue

      if (DOCUMENTED_EXCEPTIONS.has(`${fw.name}:${slug}`)) {
        silenced++
        continue
      }

      const finding = { slug, reference: referenceCount, actual }
      if (actual < referenceCount) {
        findings.push(finding)
      } else {
        ahead.push(finding)
      }
    }

    // Components documented for the reference base that this framework has no
    // doc page for at all. Not a parity finding (nothing to compare), but it
    // is the honest headline number for how far a port has to go.
    const unported = Array.from(FRAMEWORK_COMPONENTS[REFERENCE_BASE] ?? []).filter(
      (slug) => slug !== "*" && !ported.has(slug)
    ).length

    const missing = findings.reduce(
      (sum, f) => sum + (f.reference - f.actual),
      0
    )
    totalMissing += missing
    totalFindings += findings.length

    console.log(`\n## ${fw.title} (${relDemoDir})`)
    console.log(
      `  ${compared} component(s) compared, ${findings.length} short of ` +
        `${REFERENCE_BASE}, ${missing} example file(s) missing` +
        (silenced > 0 ? `, ${silenced} silenced by exception` : "") +
        (skippedNoReference > 0
          ? `, ${skippedNoReference} skipped (no ${REFERENCE_BASE} examples)`
          : "")
    )

    if (unported > 0) {
      console.log(
        `  \u2139\ufe0f  ${unported} ${REFERENCE_BASE} component(s) have no ${fw.name} ` +
          `doc page at all (not compared)`
      )
    }

    for (const f of findings) {
      console.log(
        `  - ${f.slug}: ${REFERENCE_BASE}=${f.reference} ${fw.name}=${f.actual} ` +
          `(missing ${f.reference - f.actual})`
      )
    }

    if (ahead.length > 0) {
      console.log(
        `  ℹ️  ahead of ${REFERENCE_BASE} (extra framework-specific examples): ` +
          ahead.map((f) => `${f.slug} ${f.actual}/${f.reference}`).join(", ")
      )
    }

    if (scan.nestedDirs.length > 0) {
      // The standard calls for a flat, kebab-case demo dir; nested folders are
      // layout drift, tracked with the migration backlog.
      console.log(
        `  ℹ️  non-flat demo dir(s), see docs/component-docs-standard.md: ` +
          scan.nestedDirs.sort().join(", ")
      )
    }
  }

  console.log(
    `\nTotal: ${totalFindings} component(s) short of ${REFERENCE_BASE} across ` +
      `${PREVIEW_FRAMEWORKS.length} framework(s), ${totalMissing} example file(s) missing.`
  )
  console.log(
    "Reporting only - this check never fails the build. See " +
      "docs/component-docs-standard.md for the target structure."
  )
}

main().catch((error) => {
  console.error("❌ Error:", error instanceof Error ? error.stack : error)
  process.exit(1)
})
