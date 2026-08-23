import type { source } from "@/lib/source"
import { BASES } from "@/registry/bases"

export type PageTreeNode = (typeof source.pageTree)["children"][number]
export type PageTreeFolder = Extract<PageTreeNode, { type: "folder" }>
export type PageTreePage = Extract<PageTreeNode, { type: "page" }>

// Recursively find all pages in a folder tree.
export function getAllPagesFromFolder(folder: PageTreeFolder): PageTreePage[] {
  const pages: PageTreePage[] = []

  for (const child of folder.children) {
    if (child.type === "page") {
      pages.push(child)
    } else if (child.type === "folder") {
      pages.push(...getAllPagesFromFolder(child))
    }
  }

  return pages
}

// Get the pages from a folder, handling nested base folders (radix/base).
export function getPagesFromFolder(
  folder: PageTreeFolder,
  currentBase: string
): PageTreePage[] {
  // For the components folder, find the base subfolder.
  if (folder.$id === "components" || folder.name === "Components") {
    const baseTitle = BASES.find((b) => b.name === currentBase)?.title

    for (const child of folder.children) {
      if (child.type === "folder") {
        // [FORCE-UI] Derived from BASES rather than one hardcoded branch per
        // base. The hardcoded version never got an "angular" branch, so with
        // Angular selected nothing matched and this fell through to the
        // "return every page from every base" fallback below - which made all
        // components look available and pointed hrefs at arbitrary frameworks.
        if (child.$id === currentBase || child.name === baseTitle) {
          return child.children.filter(
            (c): c is PageTreePage => c.type === "page"
          )
        }
      }
    }

    // Fallback: return all pages from nested folders.
    return getAllPagesFromFolder(folder).filter(
      (page) => !page.url.endsWith("/components")
    )
  }

  // For other folders, return direct page children.
  return folder.children.filter(
    (child): child is PageTreePage => child.type === "page"
  )
}

// Get the current base from a pathname.
// [FORCE-UI] Alternation built from BASES so a newly ported framework cannot be
// missed here - the hardcoded list had already gone stale on "angular".
const BASE_PATH_RE = new RegExp(
  `/docs/components/(${BASES.map((b) =>
    b.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  ).join("|")})/`
)

export function getCurrentBase(pathname: string): string {
  const baseMatch = pathname.match(BASE_PATH_RE)
  return baseMatch ? baseMatch[1] : "base" // [FORCE-UI] default to base (was radix)
}
