import { promises as fs } from "fs"
import path from "path"

import { PREVIEW_FRAMEWORKS } from "@/registry/frameworks"

// [FORCE-UI] Framework preview demos live in sibling apps (apps/preview-vue,
// apps/preview-angular, ...), outside this app's cwd. They are allowlisted by
// exact previewDir name rather than by allowing ".." anywhere in the path, so
// the traversal guard below still holds.
const PREVIEW_ROOTS: ReadonlySet<string> = new Set(
  PREVIEW_FRAMEWORKS.map((f) => f.previewDir)
)

export async function readFileFromRoot(relativePath: string) {
  // [FORCE-UI-START] Limit Turbopack tracing to known source roots.
  const normalizedPath = relativePath.replace(/^\/+/, "")
  const [root, ...segments] = normalizedPath.split("/")

  if (segments.includes("..")) {
    return undefined
  }

  try {
    switch (root) {
      case "app":
        return await fs.readFile(
          path.join(process.cwd(), "app", ...segments),
          "utf-8"
        )
      case "examples":
        return await fs.readFile(
          path.join(process.cwd(), "examples", ...segments),
          "utf-8"
        )
      case "registry":
        return await fs.readFile(
          path.join(process.cwd(), "registry", ...segments),
          "utf-8"
        )
      case "styles":
        return await fs.readFile(
          path.join(process.cwd(), "styles", ...segments),
          "utf-8"
        )
      default:
        // [FORCE-UI] Sibling preview apps, e.g. "preview-vue/src/vue/button-demo.vue".
        if (PREVIEW_ROOTS.has(root)) {
          return await fs.readFile(
            path.join(process.cwd(), "..", root, ...segments),
            "utf-8"
          )
        }

        return undefined
    }
  } catch {
    return undefined
  }
  // [FORCE-UI-END]
}
