/**
 * Builds every framework preview app and copies its output into
 * apps/v4/public/preview/{framework}/ for the docs site to iframe.
 *
 * Usage: npx tsx --tsconfig ./tsconfig.scripts.json ./scripts/build-previews.mts
 * (wired up as the `preview-server:build` npm script)
 *
 * Framework list is derived from PREVIEW_FRAMEWORKS in registry/frameworks.ts
 * (the single source of truth for framework identity) instead of being
 * hardcoded here.
 *
 * Runs `turbo run preview:build` for the preview packages with
 * --concurrency=1. Building the preview apps one at a time (rather than in
 * parallel) keeps peak memory usage inside the Vercel build container.
 */
import { execFileSync } from "node:child_process"
import * as fs from "node:fs"
import * as path from "node:path"
import { fileURLToPath } from "node:url"

import { PREVIEW_FRAMEWORKS } from "../registry/frameworks.ts"

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const PUBLIC_PREVIEW_DIR = path.join(ROOT_DIR, "public/preview")

function main() {
  if (PREVIEW_FRAMEWORKS.length === 0) {
    throw new Error("No PREVIEW_FRAMEWORKS registered in registry/frameworks.ts")
  }

  const filterArgs = PREVIEW_FRAMEWORKS.map(
    (f) => `--filter=${f.previewPackage}`
  )

  console.log(
    `\n🏗️  Building preview apps: ${PREVIEW_FRAMEWORKS.map((f) => f.name).join(", ")}\n`
  )

  execFileSync(
    "pnpm",
    ["exec", "turbo", "run", "preview:build", ...filterArgs, "--concurrency=1"],
    { cwd: ROOT_DIR, stdio: "inherit" }
  )

  for (const framework of PREVIEW_FRAMEWORKS) {
    const distDir = path.join(
      ROOT_DIR,
      `../${framework.previewDir}/dist`
    )
    const targetDir = path.join(PUBLIC_PREVIEW_DIR, framework.name)

    if (!fs.existsSync(distDir)) {
      throw new Error(
        `Expected build output at ${path.relative(ROOT_DIR, distDir)} but it does not exist`
      )
    }

    fs.rmSync(targetDir, { recursive: true, force: true })
    fs.mkdirSync(targetDir, { recursive: true })
    fs.cpSync(distDir, targetDir, { recursive: true })
    console.log(`Copied ${framework.previewDir}/dist -> public/preview/${framework.name}/`)
  }

  console.log("\n✅ Preview apps built successfully.\n")
}

main()
