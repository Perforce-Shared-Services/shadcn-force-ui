// [FORCE-UI] Reports per-component example-set gaps between the React `base`
// reference (apps/v4/examples/base) and each framework port's demo directory.
//
// `framework-components:check` only guarantees that a component's *doc page*
// exists for a base. Nothing checked that the port actually ships the same set
// of examples the page is supposed to document, which is how Angular ended up
// with a single `accordion-demo` against base's seven accordion examples.
// docs/component-docs-standard.md is the written rule this script measures.
//
// What it does, per preview framework and per component slug the framework has
// already ported (per FRAMEWORK_COMPONENTS, the generated manifest):
//
//   * counts the flat, top-level demo files under
//     apps/preview-{previewDir}/src/{demoDir}/*.{demoExt}
//   * counts the same-slug example files under apps/v4/examples/base
//   * reports the slugs where the port has fewer examples than base
//
// Framework identity (previewDir/demoDir/demoExt/bases) comes from
// registry/frameworks.ts and the component lists come from
// lib/framework-components.ts - neither is re-hardcoded here, per the rule in
// CONTRIBUTING.md's "Previews and examples" section.
//
// Reporting only: it always exits 0. The Angular port (and, to a lesser
// extent, Ember) carries a large, known, pre-existing gap that is being closed
// component-by-component, so failing on it would block every unrelated PR. CI
// runs it with `continue-on-error: true`; see .github/workflows/code-check.yml
// for the condition to make it blocking.
//
// Usage: npx tsx --tsconfig ./tsconfig.scripts.json ./scripts/check-example-parity.mts
// (wired up as the `example-parity:check` npm script)
import { promises as fs } from "node:fs"
import * as path from "node:path"
import { fileURLToPath } from "node:url"

import { FRAMEWORK_COMPONENTS } from "../lib/framework-components.ts"
import { PREVIEW_FRAMEWORKS } from "../registry/frameworks.ts"

const V4_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const REPO_ROOT = path.resolve(V4_DIR, "../..")

// The React Base UI base is the reference every port is measured against - it
// is the one base/example set docs/component-docs-standard.md is derived from.
const REFERENCE_BASE = "base"
const REFERENCE_DIR = path.join(V4_DIR, "examples", REFERENCE_BASE)
const REFERENCE_EXT = "tsx"

// [FORCE-UI] Documented exceptions: `framework:slug` entries whose example
// count is deliberately allowed to differ from base, with the reason. Mirrors
// the STYLELESS_SLOT_HOOKS pattern in validate-previews.mts - an entry here is
// a decision, not a snooze button, so add one only for genuine framework
// behaviour differences and keep the reason with it.
//
// A framework being generally behind is NOT an exception: that is the backlog
// this script exists to report. Only per-component, per-framework facts belong
// here, e.g.
//
//   ["ember:combobox", "Ember port intentionally ships one composed demo: ..."]
//
// Empty on purpose today: every current gap is an unported example, not a
// documented framework difference. See the "Documenting a deviation" section
// of docs/component-docs-standard.md before adding one.
const DOCUMENTED_EXCEPTIONS = new Map<string, string>()

type SlugCounts = Map<string, number>

async function listFiles(dir: string, ext: string): Promise<string[]> {
  let entries: Awaited<ReturnType<typeof fs.readdir>>
  try {
    entries = await fs.readdir(dir, { withFileTypes: true })
  } catch {
    return []
  }
  // Only flat, top-level files count as examples. Per-component
  // subdirectories (e.g. apps/preview-ember/src/ember/sidebar-07/) hold the
  // parts a demo composes, not demos - the preview apps' `import.meta.glob`
  // only picks up the top level too.
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(`.${ext}`))
    .map((entry) => entry.name.slice(0, -(ext.length + 1)))
}

// Attributes a file name to the component slug that owns it, using the longest
// matching slug so `button-group-demo` counts for `button-group` and not for
// `button`. Files that match no known slug (shared helpers, app-level demos)
// are ignored.
function countBySlug(names: string[], vocabulary: string[]): SlugCounts {
  const counts: SlugCounts = new Map()
  for (const name of names) {
    let owner: string | undefined
    for (const slug of vocabulary) {
      if (name !== slug && !name.startsWith(`${slug}-`)) continue
      if (!owner || slug.length > owner.length) owner = slug
    }
    if (!owner) continue
    counts.set(owner, (counts.get(owner) ?? 0) + 1)
  }
  return counts
}

function slugsForBases(bases: readonly string[]): string[] {
  const slugs = new Set<string>()
  for (const base of bases) {
    for (const slug of FRAMEWORK_COMPONENTS[base] ?? []) {
      if (slug === "*") continue
      slugs.add(slug)
    }
  }
  return Array.from(slugs).sort()
}

async function main() {
  // The slug vocabulary used for file attribution is every slug known to any
  // base, so a longer slug always wins even in a directory whose own base has
  // not ported it yet.
  const vocabulary = Array.from(
    new Set(
      Object.keys(FRAMEWORK_COMPONENTS).flatMap((base) => slugsForBases([base]))
    )
  ).sort()

  const referenceCounts = countBySlug(
    await listFiles(REFERENCE_DIR, REFERENCE_EXT),
    vocabulary
  )

  console.log(
    `Example parity vs ${path.relative(REPO_ROOT, REFERENCE_DIR)} ` +
      `(${referenceCounts.size} components with examples)\n`
  )

  let totalGaps = 0
  let totalMissing = 0
  let totalExceptions = 0

  for (const framework of PREVIEW_FRAMEWORKS) {
    const demoDir = path.join(
      REPO_ROOT,
      "apps",
      framework.previewDir,
      "src",
      framework.demoDir
    )
    const portedSlugs = slugsForBases(framework.bases)
    const counts = countBySlug(
      await listFiles(demoDir, framework.demoExt),
      vocabulary
    )

    const gaps: { slug: string; have: number; want: number }[] = []
    const missing: { slug: string; want: number }[] = []
    const excepted: string[] = []

    for (const slug of portedSlugs) {
      const want = referenceCounts.get(slug) ?? 0
      // A slug base itself has no examples for (framework-only ports such as
      // `form` or `sonner`) has no reference to compare against.
      if (want === 0) continue

      const exception = DOCUMENTED_EXCEPTIONS.get(`${framework.name}:${slug}`)
      if (exception) {
        excepted.push(`${slug} (${exception})`)
        continue
      }

      const have = counts.get(slug) ?? 0
      if (have === 0) {
        missing.push({ slug, want })
      } else if (have < want) {
        gaps.push({ slug, have, want })
      }
    }

    totalGaps += gaps.length
    totalMissing += missing.length
    totalExceptions += excepted.length

    const shortBy =
      gaps.reduce((sum, g) => sum + (g.want - g.have), 0) +
      missing.reduce((sum, m) => sum + m.want, 0)

    const header =
      `${framework.title}: ${portedSlugs.length} ported component(s), ` +
      `${gaps.length} with fewer examples than base, ` +
      `${missing.length} with none, ${shortBy} example(s) short`

    if (gaps.length === 0 && missing.length === 0) {
      console.log(`✅ ${header}`)
    } else {
      console.log(`⚠️  ${header}`)
      for (const { slug, have, want } of gaps) {
        console.log(`     ${slug}: ${have}/${want}`)
      }
      for (const { slug, want } of missing) {
        console.log(`     ${slug}: 0/${want} (no demo file at all)`)
      }
    }

    for (const entry of excepted) {
      console.log(`     ↳ documented exception: ${entry}`)
    }
    console.log("")
  }

  console.log(
    `${totalGaps} component(s) short of base, ${totalMissing} with no ` +
      `examples at all, ${totalExceptions} documented exception(s) skipped.`
  )
  console.log(
    "Reporting only - see docs/component-docs-standard.md for the parity rules."
  )
}

await main()
