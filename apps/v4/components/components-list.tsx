"use client"

import Link from "next/link"

import { PAGES_NEW } from "@/lib/docs"
import {
  getPagesFromFolder,
  type PageTreeFolder,
  type PageTreePage,
} from "@/lib/page-tree"
import { cn } from "@/lib/utils"
import { useFramework } from "@/hooks/use-framework"
import { getDefaultBaseForFramework } from "@/registry/frameworks"

// [FORCE-UI] "New" is a property of the component, not of a particular
// framework port: PAGES_NEW only ever lists the React base/radix URLs, so
// matching on a full URL made the indicator wrong for every other framework
// (and would never fire for them at all once the href is framework-specific).
// Compare on the trailing slug instead.
const NEW_COMPONENT_SLUGS = new Set(
  PAGES_NEW.filter((url) => url.startsWith("/docs/components/")).map((url) =>
    url.split("/").pop()
  )
)

function isNewComponent(url: string) {
  return NEW_COMPONENT_SLUGS.has(url.split("/").pop())
}

export function ComponentsList({
  componentsFolder,
  variant = "all", // [FORCE-UI] upstream added variant prop
}: {
  componentsFolder: PageTreeFolder
  variant?: "all" | "new"
}) {
  // [FORCE-UI-START] framework awareness — upstream uses currentBase as a prop
  const { framework } = useFramework()
  const currentBase = getDefaultBaseForFramework(framework)

  // Get the canonical list (radix has all components).
  const canonicalComponents = getPagesFromFolder(componentsFolder, "radix")

  // [FORCE-UI] variant was accepted but never read, so the "New Components"
  // section on /docs/components rendered the entire component list, identical
  // to "All Components" right below it.
  const allComponents =
    variant === "new" ?
      canonicalComponents.filter((c) => isNewComponent(String(c.url)))
    : canonicalComponents

  // Get the available list for the current base.
  const availableComponents = getPagesFromFolder(componentsFolder, currentBase)
  const availableNames = new Set(availableComponents.map((p) => p.name))

  // For non-React frameworks, build a URL map for available components.
  const availableUrlMap = new Map<string, string>()
  for (const page of availableComponents) {
    availableUrlMap.set(String(page.name), String(page.url))
  }
  // [FORCE-UI-END]

  return (
    <div
      data-not-typeset
      className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-x-8 lg:gap-x-16 lg:gap-y-6 xl:gap-x-20"
    >
      {allComponents.map((component) => {
        const isAvailable = availableNames.has(component.name)
        const href =
          availableUrlMap.get(String(component.name)) ?? component.url

        if (!isAvailable) {
          return (
            <span
              key={component.$id}
              className="inline-flex items-center gap-2 text-lg font-medium text-muted-foreground/50 md:text-base"
            >
              {component.name}
              <span className="rounded-md border border-border/50 px-1.5 py-0.5 text-[10px] leading-none font-medium text-muted-foreground/50">
                Soon
              </span>
            </span>
          )
        }

        return (
          <Link
            key={component.$id}
            href={href}
            className="inline-flex items-center gap-2 text-lg font-medium underline-offset-4 hover:underline md:text-base"
          >
            {component.name}
            {isNewComponent(String(component.url)) && (
              <>
                <span className="sr-only">New</span>
                <span
                  aria-hidden="true"
                  className="flex size-2 rounded-full bg-blue-500"
                />
              </>
            )}
          </Link>
        )
      })}
    </div>
  )
}
