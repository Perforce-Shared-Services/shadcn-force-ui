import fs from "fs"
import path from "path"
import { ExamplesIndex } from "@/examples/__index__"

import { PAGES_NEW } from "@/lib/docs"
import { getPagesFromFolder, type PageTreeFolder } from "@/lib/page-tree"
import { source } from "@/lib/source"
import { absoluteUrl } from "@/lib/utils"
import { Index as StylesIndex } from "@/registry/__index__"
import { type Style } from "@/registry/_legacy-styles"
import { BASES } from "@/registry/bases"
import { Index as BasesIndex } from "@/registry/bases/__index__"

function getBaseForStyle(styleName: string) {
  for (const base of BASES) {
    if (styleName.startsWith(`${base.name}-`)) {
      return base.name
    }
  }
  return null
}

function getDemoFilePath(name: string, styleName: string) {
  const base = getBaseForStyle(styleName)
  const demo =
    ExamplesIndex[styleName]?.[name] ??
    (base ? ExamplesIndex[base]?.[name] : undefined)
  if (!demo) {
    return null
  }
  return demo.filePath
}

function getRegistryEntry(name: string, styleName: string) {
  const base = getBaseForStyle(styleName)
  return (
    StylesIndex[styleName]?.[name] ??
    (base ? BasesIndex[base]?.[name] : undefined)
  )
}

// [FORCE-UI-START] Limit Turbopack tracing to known source roots.
function readSourceFile(src: string) {
  const normalizedPath = src.replace(/^\/+/, "")
  const [root, ...segments] = normalizedPath.split("/")

  if (segments.includes("..")) {
    return null
  }

  switch (root) {
    case "examples":
      return fs.readFileSync(
        path.join(process.cwd(), "examples", ...segments),
        "utf8"
      )
    case "registry":
      return fs.readFileSync(
        path.join(process.cwd(), "registry", ...segments),
        "utf8"
      )
    case "styles":
      return fs.readFileSync(
        path.join(process.cwd(), "styles", ...segments),
        "utf8"
      )
    default:
      return null
  }
}
// [FORCE-UI-END]

function getComponentsList(variant: "all" | "new") {
  const componentsFolder = source.pageTree.children.find(
    (page) => page.$id === "components"
  )

  if (componentsFolder?.type !== "folder") {
    return ""
  }

  return getPagesFromFolder(componentsFolder as PageTreeFolder, "base")
    .filter(
      (component) => variant === "all" || PAGES_NEW.includes(component.url)
    )
    .map((component) => {
      const slug = component.url.replace(/^\/docs\//, "").split("/")
      const description = source.getPage(slug)?.data.description?.trim()
      const url = absoluteUrl(component.url.replace("/base/", "/"))
      return `- [${component.name}](${url})${
        description ? `: ${description}` : ""
      }`
    })
    .join("\n")
}

export function replaceComponentsList(content: string) {
  return content
    .replace(
      /<ComponentsList\s+variant=["']new["']\s*\/>/g,
      getComponentsList("new")
    )
    .replace(/<ComponentsList\s*\/>/g, getComponentsList("all"))
}

export function processMdxForLLMs(content: string, style: Style["name"]) {
  content = replaceComponentsList(content)

  const componentPreviewRegex =
    /<ComponentPreview[\s\S]*?name="([^"]+)"[\s\S]*?\/>/g

  return content.replace(componentPreviewRegex, (match, name) => {
    try {
      // Try to extract styleName from the match.
      const styleNameMatch = match.match(/styleName="([^"]+)"/)
      const effectiveStyle = styleNameMatch ? styleNameMatch[1] : style

      let src = getDemoFilePath(name, effectiveStyle)

      if (!src) {
        const component = getRegistryEntry(name, effectiveStyle)
        if (!component?.files) {
          return match
        }
        src = component.files[0]?.path
      }

      if (!src) {
        return match
      }

      let source = readSourceFile(src)

      if (!source) {
        return match
      }

      // Replace all base-specific paths.
      for (const base of BASES) {
        source = source.replaceAll(
          `@/registry/bases/${base.name}/`,
          "@/components/"
        )
        source = source.replaceAll(
          `@/examples/${base.name}/ui-rtl/`,
          "@/components/ui/"
        )
        source = source.replaceAll(
          `@/examples/${base.name}/ui/`,
          "@/components/ui/"
        )
        source = source.replaceAll(`@/examples/${base.name}/lib/`, "@/lib/")
        source = source.replaceAll(`@/examples/${base.name}/hooks/`, "@/hooks/")
      }
      source = source.replace(
        /@\/styles\/([\w-]+)\/(ui-rtl|ui)\/([\w-]+)/g,
        (match, _styleName, type, component) => {
          if (type === "ui" || type === "ui-rtl") {
            return `@/components/ui/${component}`
          }

          return match
        }
      )
      source = source.replaceAll(
        `@/registry/${effectiveStyle}/`,
        "@/components/"
      )
      source = source.replaceAll("export default", "export")

      return `\`\`\`tsx
${source}
\`\`\``
    } catch (error) {
      console.error(`Error processing ComponentPreview ${name}:`, error)
      return match
    }
  })
}
