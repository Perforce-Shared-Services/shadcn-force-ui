"use client"

import { lazy, Suspense } from "react"
import { SquareIcon } from "lucide-react"
import type { IconLibraryName } from "shadcn/icons"

import { useDesignSystemSearchParams } from "@/app/(app)/(create)/lib/search-params"

const IconLucide = lazy(() =>
  import("@/registry/icons/icon-lucide").then((mod) => ({
    default: mod.IconLucide,
  }))
)

const IconTabler = lazy(() =>
  import("@/registry/icons/icon-tabler").then((mod) => ({
    default: mod.IconTabler,
  }))
)

const IconHugeicons = lazy(() =>
  import("@/registry/icons/icon-hugeicons").then((mod) => ({
    default: mod.IconHugeicons,
  }))
)

const IconPhosphor = lazy(() =>
  import("@/registry/icons/icon-phosphor").then((mod) => ({
    default: mod.IconPhosphor,
  }))
)

const IconRemixicon = lazy(() =>
  import("@/registry/icons/icon-remixicon").then((mod) => ({
    default: mod.IconRemixicon,
  }))
)

// [FORCE-UI]
const IconMaterialSymbols = lazy(() =>
  import("@/registry/icons/icon-material-symbols").then((mod) => ({
    default: mod.IconMaterialSymbols,
  }))
)

// Preload all icon renderer modules so switching libraries is instant.
// These warm the browser module cache; React.lazy resolves immediately
// for modules that are already loaded.
void import("@/registry/icons/icon-lucide")
void import("@/registry/icons/icon-tabler")
void import("@/registry/icons/icon-hugeicons")
void import("@/registry/icons/icon-phosphor")
void import("@/registry/icons/icon-remixicon")
void import("@/registry/icons/icon-material-symbols") // [FORCE-UI]

export function IconPlaceholder({
  lucide,
  tabler,
  hugeicons,
  phosphor,
  remixicon,
  materialSymbols, // [FORCE-UI]
  ...svgProps
}: {
  [K in IconLibraryName]?: string // [FORCE-UI] partial: upstream examples only pass known icon libraries
} & React.ComponentProps<"svg">) {
  const [{ iconLibrary }] = useDesignSystemSearchParams()
  const namesByLibrary: Record<IconLibraryName, string | undefined> = {
    lucide,
    tabler,
    hugeicons,
    phosphor,
    remixicon,
    materialSymbols, // [FORCE-UI]
  }
  const iconName = namesByLibrary[iconLibrary]

  if (!iconName) {
    return null
  }

  return (
    <Suspense fallback={<SquareIcon {...svgProps} />}>
      {iconLibrary === "lucide" && <IconLucide name={iconName} {...svgProps} />}
      {iconLibrary === "tabler" && <IconTabler name={iconName} {...svgProps} />}
      {iconLibrary === "hugeicons" && (
        <IconHugeicons name={iconName} {...svgProps} />
      )}
      {iconLibrary === "phosphor" && (
        <IconPhosphor name={iconName} {...svgProps} />
      )}
      {iconLibrary === "remixicon" && (
        <IconRemixicon name={iconName} {...svgProps} />
      )}
      {/* [FORCE-UI] */}
      {iconLibrary === "materialSymbols" && (
        <IconMaterialSymbols name={iconName} {...svgProps} />
      )}
    </Suspense>
  )
}
