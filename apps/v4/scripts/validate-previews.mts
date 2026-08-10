/**
 * Validates the mechanical checks documented in
 * .claude/commands/review-force-ui-variants.md that were previously only
 * ever run by hand as ad-hoc shell one-liners:
 *
 *   1. Every "cn-..." marker class referenced by a component source (React
 *      bases + framework ports) has a matching `.cn-...` rule in
 *      registry/styles/style-force-ui.css. A referenced-but-undefined class
 *      is a silent no-op: the variant renders identically for every value
 *      and the build still passes.
 *   2. Every `<ComponentPreview framework="X" name="Y" />` in the docs
 *      resolves to a real demo file in apps/preview-X/src/{demoDir}/Y.{ext}.
 *   3. Every `<ComponentSource framework="X" name="Y" />` in the docs
 *      resolves to a real registry component in packages/registry-X/ui.
 *   4. (warning only) Cross-framework variant drift: components whose set
 *      of cn-<comp>-variant-<value> classes differs between frameworks.
 *
 * Framework identity (previewDir/demoDir/demoExt/registryPackage/bases) is
 * derived from registry/frameworks.ts - the single source of truth - never
 * hardcoded here.
 *
 * Usage: npx tsx --tsconfig ./tsconfig.scripts.json ./scripts/validate-previews.mts
 * (wired up as the `validate:previews` npm script)
 */
import { promises as fs } from "fs"
import path from "path"
import { fileURLToPath } from "url"

import { FRAMEWORKS, PREVIEW_FRAMEWORKS } from "../registry/frameworks.ts"

const V4_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const REPO_ROOT = path.resolve(V4_DIR, "../..")

const SOURCE_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".vue",
  ".svelte",
  ".gts",
  ".html",
])

// [FORCE-UI] Documented in review-force-ui-variants.md as deliberate
// styleless slot hooks: their appearance comes from a composed component
// (e.g. a Button), so they intentionally have no `.cn-...` rule.
const STYLELESS_SLOT_HOOKS = new Set([
  "cn-pagination-link",
  "cn-alert-dialog-action",
  "cn-combobox-clear",
  "cn-sidebar-trigger",
  "cn-breadcrumb",
])

const CSS_FILE = path.join(V4_DIR, "registry/styles/style-force-ui.css")

type Bucket = { label: string; uiDir: string }

// React bases (base/aria/radix) are one framework in frameworks.ts but each
// base has its own `ui/` tree, so each gets its own bucket. Every preview
// framework's registry package gets a bucket too.
const react = FRAMEWORKS.find((f) => f.name === "react")!
const BUCKETS: Bucket[] = [
  ...react.bases.map((base) => ({
    label: base,
    uiDir: path.join(V4_DIR, "registry/bases", base, "ui"),
  })),
  ...PREVIEW_FRAMEWORKS.map((fw) => ({
    label: fw.name,
    uiDir: path.join(REPO_ROOT, "packages", fw.registryPackage, "ui"),
  })),
]

let hasErrors = false
const warnings: string[] = []

function fail(message: string) {
  hasErrors = true
  console.error(`❌ ${message}`)
}

function warn(message: string) {
  warnings.push(message)
}

async function pathExists(p: string) {
  try {
    await fs.stat(p)
    return true
  } catch {
    return false
  }
}

async function walkFiles(dir: string): Promise<string[]> {
  let entries: Awaited<ReturnType<typeof fs.readdir>>
  try {
    entries = await fs.readdir(dir, { withFileTypes: true })
  } catch {
    return []
  }

  const files: string[] = []
  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) {
      continue
    }
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walkFiles(full)))
    } else if (SOURCE_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(full)
    }
  }
  return files
}

// Top-level entries directly under a bucket's ui/ dir are "components":
// either a directory (multi-file component) or a single source file
// (e.g. registry-ember's ui/badge.gts). Excludes the generated _registry.ts.
async function listComponentEntries(uiDir: string) {
  let entries: Awaited<ReturnType<typeof fs.readdir>>
  try {
    entries = await fs.readdir(uiDir, { withFileTypes: true })
  } catch {
    return [] as { name: string; absPath: string; isDir: boolean }[]
  }

  const result: { name: string; absPath: string; isDir: boolean }[] = []
  for (const entry of entries) {
    if (entry.name === "_registry.ts" || entry.name.startsWith(".")) continue
    const absPath = path.join(uiDir, entry.name)
    if (entry.isDirectory()) {
      result.push({ name: entry.name, absPath, isDir: true })
      continue
    }
    const ext = path.extname(entry.name)
    if (!SOURCE_EXTENSIONS.has(ext)) continue
    result.push({
      name: entry.name.slice(0, -ext.length),
      absPath,
      isDir: false,
    })
  }
  return result
}

// Extracts every `cn-...` token that appears inside a quoted string
// ("...", '...', or `...`) on a single line. Restricting to quoted strings
// (rather than the whole line) avoids false positives from prose comments
// like "// Uses cn-badge-* tokens from style-force-ui.css."
function extractCnTokensFromLine(line: string): string[] {
  return extractCnStringsFromLine(line).flatMap((s) => s.cnTokens)
}

// [FORCE-UI] Same extraction, but keeping each quoted string intact so callers
// can tell whether a cn-* class was the string's ONLY content.
//
// This distinction is what separates a real bug from noise. Per the decision
// process in .claude/commands/review-force-ui-variants.md, an undefined cn-*
// class only causes a silent no-op when the cva value has nothing else to
// distinguish it:
//
//   default: "cn-marker-variant-default"              <- BUG: renders nothing
//   default: "cn-tabs-list-variant-default bg-muted"  <- fine: bg-muted still applies
//
// Treating both as failures buries ~3 real bugs under ~88 harmless unused
// hooks, which is why this started out too noisy to gate on.
function extractCnStringsFromLine(
  line: string
): { cnTokens: string[]; hasOtherUtilities: boolean }[] {
  const result: { cnTokens: string[]; hasOtherUtilities: boolean }[] = []
  const stringRegex = /"([^"]*)"|'([^']*)'|`([^`]*)`/g
  let stringMatch: RegExpExecArray | null
  while ((stringMatch = stringRegex.exec(line))) {
    const str = stringMatch[1] ?? stringMatch[2] ?? stringMatch[3] ?? ""
    const cnTokens: string[] = []
    const others: string[] = []
    for (const word of str.split(/\s+/)) {
      if (!word) continue
      if (/^cn-[a-zA-Z0-9-]+$/.test(word)) {
        cnTokens.push(word.replace(/-+$/, ""))
        continue
      }
      const embedded = word.match(/cn-[a-zA-Z0-9-]+/g)
      if (embedded) {
        // A cn-* token inside a larger selector/variant expression, e.g.
        // "[&_.cn-foo]:hidden" — not a bare class, and the surrounding
        // expression is itself a real utility.
        cnTokens.push(...embedded.map((t) => t.replace(/-+$/, "")))
        others.push(word)
        continue
      }
      others.push(word)
    }
    if (cnTokens.length > 0) {
      result.push({ cnTokens, hasOtherUtilities: others.length > 0 })
    }
  }
  return result
}

async function main() {
  // ---------------------------------------------------------------------
  // Check 1: undefined cn-* classes, plus data collection for check 4.
  // ---------------------------------------------------------------------
  const cssContent = await fs.readFile(CSS_FILE, "utf-8")
  const definedClasses = new Set(
    Array.from(cssContent.matchAll(/\.cn-[a-zA-Z0-9-]+/g)).map((m) =>
      m[0].slice(1)
    )
  )

  // token -> first place it was referenced (for error messages)
  const referenced = new Map<string, { file: string; line: number }>()
  // [FORCE-UI] tokens that appeared at least once as the ENTIRE class string,
  // with no other utility alongside them. If such a token has no CSS rule, the
  // value it encodes renders nothing at all - a real silent no-op.
  const bareOnly = new Set<string>()
  // componentName -> bucket label -> set of variant values
  const variantsByComponent = new Map<string, Map<string, Set<string>>>()

  for (const bucket of BUCKETS) {
    const components = await listComponentEntries(bucket.uiDir)
    for (const component of components) {
      const files = component.isDir
        ? await walkFiles(component.absPath)
        : [component.absPath]

      const variantPrefix = `cn-${component.name}-variant-`
      let variantSet: Set<string> | undefined

      for (const file of files) {
        const content = await fs.readFile(file, "utf-8")
        const lines = content.split("\n")
        for (let i = 0; i < lines.length; i++) {
          const strings = extractCnStringsFromLine(lines[i])
          const tokens = strings.flatMap((s) => s.cnTokens)
          for (const s of strings) {
            if (s.hasOtherUtilities) continue
            if (s.cnTokens.length === 1) {
              bareOnly.add(s.cnTokens[0])
            }
          }
          for (const token of tokens) {
            if (!referenced.has(token)) {
              referenced.set(token, {
                file: path.relative(REPO_ROOT, file),
                line: i + 1,
              })
            }
            if (token.startsWith(variantPrefix)) {
              variantSet ??= new Set()
              variantSet.add(token.slice(variantPrefix.length))
            }
          }
        }
      }

      if (variantSet) {
        let byBucket = variantsByComponent.get(component.name)
        if (!byBucket) {
          byBucket = new Map()
          variantsByComponent.set(component.name, byBucket)
        }
        byBucket.set(bucket.label, variantSet)
      }
    }
  }

  const undefinedClasses = Array.from(referenced.keys())
    .filter((token) => !definedClasses.has(token))
    .filter((token) => !STYLELESS_SLOT_HOOKS.has(token))
    .sort()

  // [FORCE-UI] Split by severity. A token that is the entire class string and
  // has no CSS rule renders nothing - a real bug. A token that sits alongside
  // other utilities is just an unused styling hook, which is an intentional
  // pattern here, so report it as a warning and do not fail the build on it.
  // A bare, undefined class on a plain slot may be deliberate - the slot needs
  // no styling and the class is only there for consumers to hook. But on a
  // variant/size/color AXIS it is unambiguous: that value of the axis renders
  // nothing while its siblings style themselves, which is the exact recurring
  // bug review-force-ui-variants exists to catch. Only the axis case fails.
  const isAxisValue = (t: string) => /-(variant|size|color)-[a-zA-Z0-9-]+$/.test(t)
  const silentNoOps = undefinedClasses.filter(
    (t) => bareOnly.has(t) && isAxisValue(t)
  )
  const bareSlots = undefinedClasses.filter(
    (t) => bareOnly.has(t) && !isAxisValue(t)
  )
  const unusedHooks = undefinedClasses.filter((t) => !bareOnly.has(t))

  if (silentNoOps.length > 0) {
    for (const token of silentNoOps) {
      const loc = referenced.get(token)!
      fail(
        `Check 1: "${token}" (${loc.file}:${loc.line}) is a variant-axis value ` +
          `whose ENTIRE class string is this one class, but there is no ` +
          `".${token}" rule in ${path.relative(REPO_ROOT, CSS_FILE)} - so this ` +
          `value renders nothing while its sibling values style themselves. ` +
          `Add the CSS rule (or give the value real utilities).`
      )
    }
  } else {
    console.log("✅ Check 1: no variant-axis value renders as a silent no-op")
  }

  if (bareSlots.length > 0) {
    warn(
      `Check 1: ${bareSlots.length} slot class(es) are the entire class string ` +
        `with no CSS rule - deliberate hooks if the slot needs no styling, ` +
        `dead weight otherwise: ${bareSlots.slice(0, 8).join(", ")}` +
        (bareSlots.length > 8 ? `, +${bareSlots.length - 8} more` : "")
    )
  }

  if (unusedHooks.length > 0) {
    warn(
      `Check 1: ${unusedHooks.length} cn-* class(es) have no CSS rule but sit ` +
        `alongside other utilities, so they are unused styling hooks rather ` +
        `than no-ops: ${unusedHooks.slice(0, 8).join(", ")}` +
        (unusedHooks.length > 8 ? `, +${unusedHooks.length - 8} more` : "")
    )
  }

  // ---------------------------------------------------------------------
  // Checks 2 & 3: MDX <ComponentPreview>/<ComponentSource framework=...>
  // ---------------------------------------------------------------------
  const docsDir = path.join(V4_DIR, "content/docs")
  const mdxFiles = (await walkAllFiles(docsDir)).filter((f) =>
    f.endsWith(".mdx")
  )

  let check2Count = 0
  let check3Count = 0

  for (const mdxFile of mdxFiles) {
    const content = await fs.readFile(mdxFile, "utf-8")
    const relFile = path.relative(REPO_ROOT, mdxFile)
    const lineOf = (index: number) => content.slice(0, index).split("\n").length

    for (const { tag, regex } of [
      { tag: "ComponentPreview", regex: /<ComponentPreview\b([\s\S]*?)\/>/g },
      { tag: "ComponentSource", regex: /<ComponentSource\b([\s\S]*?)\/>/g },
    ]) {
      let match: RegExpExecArray | null
      while ((match = regex.exec(content))) {
        const attrs = match[1]
        const frameworkMatch = attrs.match(/\bframework="([^"]+)"/)
        const nameMatch = attrs.match(/\bname="([^"]+)"/)
        if (!frameworkMatch || !nameMatch) continue

        const frameworkName = frameworkMatch[1]
        const name = nameMatch[1]
        const line = lineOf(match.index)
        const fw = PREVIEW_FRAMEWORKS.find((f) => f.name === frameworkName)

        if (!fw) {
          fail(
            `Check ${tag === "ComponentPreview" ? 2 : 3}: ${relFile}:${line} ` +
              `<${tag} framework="${frameworkName}" name="${name}" /> references ` +
              `unknown preview framework "${frameworkName}" (not in PREVIEW_FRAMEWORKS).`
          )
          continue
        }

        if (tag === "ComponentPreview") {
          check2Count++
          const demoPath = path.join(
            REPO_ROOT,
            "apps",
            fw.previewDir,
            "src",
            fw.demoDir,
            `${name}.${fw.demoExt}`
          )
          if (!(await pathExists(demoPath))) {
            fail(
              `Check 2: ${relFile}:${line} <ComponentPreview framework="${frameworkName}" ` +
                `name="${name}" /> has no demo file at ${path.relative(REPO_ROOT, demoPath)}.`
            )
          }
        } else {
          check3Count++
          const uiDir = path.join(
            REPO_ROOT,
            "packages",
            fw.registryPackage,
            "ui"
          )
          const componentPath = path.join(uiDir, name)
          const existsAsDir = await pathExists(componentPath)
          let existsAsFile = false
          if (!existsAsDir) {
            const siblings = await fs.readdir(uiDir).catch(() => [] as string[])
            existsAsFile = siblings.some(
              (entry) => entry.slice(0, entry.lastIndexOf(".")) === name
            )
          }
          if (!existsAsDir && !existsAsFile) {
            fail(
              `Check 3: ${relFile}:${line} <ComponentSource framework="${frameworkName}" ` +
                `name="${name}" /> has no registry component at ` +
                `${path.relative(REPO_ROOT, uiDir)}/${name}.`
            )
          }
        }
      }
    }
  }

  console.log(
    `✅ Check 2: verified ${check2Count} <ComponentPreview framework=... /> call sites`
  )
  console.log(
    `✅ Check 3: verified ${check3Count} <ComponentSource framework=... /> call sites`
  )

  // ---------------------------------------------------------------------
  // Check 4 (warning only): cross-framework variant drift.
  // ---------------------------------------------------------------------
  const sortedComponents = Array.from(variantsByComponent.keys()).sort()
  for (const componentName of sortedComponents) {
    const byBucket = variantsByComponent.get(componentName)!
    if (byBucket.size < 2) continue

    const entries = Array.from(byBucket.entries())
    const [, firstSet] = entries[0]
    const allSame = entries.every(
      ([, set]) =>
        set.size === firstSet.size &&
        Array.from(set).every((v) => firstSet.has(v))
    )

    if (!allSame) {
      const description = entries
        .map(
          ([label, set]) => `${label}=[${Array.from(set).sort().join(", ")}]`
        )
        .join(" · ")
      warn(`Check 4: "${componentName}" variant sets differ: ${description}`)
    }
  }

  if (warnings.length > 0) {
    console.warn(
      `\n⚠️  ${warnings.length} cross-framework variant drift warning(s):`
    )
    for (const w of warnings) {
      console.warn(`  - ${w}`)
    }
  } else {
    console.log("✅ Check 4: no cross-framework variant drift detected")
  }

  if (hasErrors) {
    console.error("\n❌ Preview validation failed. See errors above.")
    process.exit(1)
  }

  console.log("\n✅ All preview validation checks passed.")
}

async function walkAllFiles(dir: string): Promise<string[]> {
  let entries: Awaited<ReturnType<typeof fs.readdir>>
  try {
    entries = await fs.readdir(dir, { withFileTypes: true })
  } catch {
    return []
  }

  const files: string[] = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walkAllFiles(full)))
    } else {
      files.push(full)
    }
  }
  return files
}

main().catch((error) => {
  console.error("❌ Error:", error instanceof Error ? error.stack : error)
  process.exit(1)
})
