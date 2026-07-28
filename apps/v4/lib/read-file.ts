import { promises as fs } from "fs"
import path from "path"

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
        return undefined
    }
  } catch {
    return undefined
  }
  // [FORCE-UI-END]
}
