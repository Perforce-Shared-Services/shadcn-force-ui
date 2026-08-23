import * as React from "react"
import Image from "next/image"

import { getRegistryComponent } from "@/lib/registry"
import { ComponentPreviewTabs } from "@/components/component-preview-tabs"
import { ComponentSource } from "@/components/component-source"
import { FrameworkPreviewIframe } from "@/components/framework-preview-iframe"
import {
  getPreviewFramework,
  type PreviewFramework,
} from "@/registry/frameworks"

// [FORCE-UI-START] per-framework dev preview server support
// NEXT_PUBLIC_PREVIEW_SERVER_URL is a legacy override escape hatch: if set, it is
// used verbatim as the base URL for every framework (useful for pointing at a
// single ad-hoc server). Prefer NEXT_PUBLIC_PREVIEW_DEV_SERVERS=1 for local dev,
// which derives the correct per-framework port (and the vite "base" of
// "/preview/{framework}/") from the frameworks table instead.
const PREVIEW_SERVER_URL_OVERRIDE = process.env.NEXT_PUBLIC_PREVIEW_SERVER_URL
const PREVIEW_DEV_SERVERS = process.env.NEXT_PUBLIC_PREVIEW_DEV_SERVERS === "1"

function getIframeSrc(framework: PreviewFramework["name"], name: string) {
  if (PREVIEW_SERVER_URL_OVERRIDE) {
    return `${PREVIEW_SERVER_URL_OVERRIDE}/${framework}/${name}`
  }

  const fw = getPreviewFramework(framework)

  if (PREVIEW_DEV_SERVERS && fw) {
    return `http://localhost:${fw.devPort}/preview/${framework}/${name}`
  }

  return `/preview/${framework}/${name}`
}
// [FORCE-UI-END]

export function ComponentPreview({
  name,
  type,
  className,
  previewClassName,
  align = "center",
  hideCode = false,
  chromeLessOnMobile = false,
  styleName = "base-force-ui", // [FORCE-UI]
  framework,
  direction = "ltr",
  caption,
  ...props
}: React.ComponentProps<"div"> & {
  name: string
  styleName?: string
  framework?: PreviewFramework["name"] // [FORCE-UI]
  align?: "center" | "start" | "end"
  description?: string
  hideCode?: boolean
  type?: "block" | "component" | "example"
  chromeLessOnMobile?: boolean
  previewClassName?: string
  direction?: "ltr" | "rtl"
  caption?: string
}) {
  if (type === "block") {
    const content = (
      <div className="relative mt-6 aspect-[4/2.5] w-full overflow-hidden rounded-2xl border md:-mx-1">
        <Image
          src={`/r/styles/new-york-v4/${name}-light.png`}
          alt={name}
          width={1440}
          height={900}
          className="absolute top-0 left-0 z-20 w-[970px] max-w-none bg-background sm:w-[1280px] md:hidden dark:hidden md:dark:hidden"
        />
        <Image
          src={`/r/styles/new-york-v4/${name}-dark.png`}
          alt={name}
          width={1440}
          height={900}
          className="absolute top-0 left-0 z-20 hidden w-[970px] max-w-none bg-background sm:w-[1280px] md:hidden dark:block md:dark:hidden"
        />
        <div className="absolute inset-0 hidden w-[1600px] bg-background md:block">
          <iframe src={`/view/${styleName}/${name}`} className="size-full" />
        </div>
      </div>
    )

    if (caption) {
      return (
        <figure className="flex flex-col gap-4">
          {content}
          <figcaption className="text-center text-sm text-muted-foreground">
            {caption}
          </figcaption>
        </figure>
      )
    }

    return content
  }

  if (framework) {
    const iframeSrc = getIframeSrc(framework, name)
    const ext = getPreviewFramework(framework)?.demoExt ?? "ts"
    // [FORCE-UI] No leading "../": readFileFromRoot allowlists sibling preview
    // apps by their previewDir name and rejects any path containing "..".
    const srcPath = `preview-${framework}/src/${framework}/${name}.${ext}`
    const content = (
      <ComponentPreviewTabs
        className={className}
        previewClassName={previewClassName}
        align={align}
        hideCode={hideCode}
        component={
          <FrameworkPreviewIframe
            src={iframeSrc}
            title={`${framework} preview: ${name}`}
          />
        }
        source={
          <ComponentSource
            src={srcPath}
            title={`${name}.${ext}`}
            language={ext}
            collapsible={false}
          />
        }
        sourcePreview={
          <ComponentSource
            src={srcPath}
            title={`${name}.${ext}`}
            language={ext}
            collapsible={false}
            maxLines={3}
          />
        }
        chromeLessOnMobile={chromeLessOnMobile}
        direction={direction}
        {...props}
      />
    )

    if (caption) {
      return (
        <figure
          data-hide-code={hideCode}
          className="flex flex-col data-[hide-code=true]:gap-4"
        >
          {content}
          <figcaption className="-mt-8 text-center text-sm text-muted-foreground data-[hide-code=true]:mt-0">
            {caption}
          </figcaption>
        </figure>
      )
    }

    return content
  }

  const Component = getRegistryComponent(name, styleName)

  if (!Component) {
    return (
      <p className="mt-6 text-sm text-muted-foreground">
        Component{" "}
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {name}
        </code>{" "}
        not found in registry.
      </p>
    )
  }

  const content = (
    <ComponentPreviewTabs
      className={className}
      previewClassName={previewClassName}
      align={align}
      hideCode={hideCode}
      component={React.createElement(Component)}
      source={
        <ComponentSource
          name={name}
          collapsible={false}
          styleName={styleName}
        />
      }
      sourcePreview={
        <ComponentSource
          name={name}
          collapsible={false}
          styleName={styleName}
          maxLines={3}
        />
      }
      chromeLessOnMobile={chromeLessOnMobile}
      direction={direction}
      styleName={styleName}
      {...props}
    />
  )

  if (caption) {
    return (
      <figure
        data-hide-code={hideCode}
        className="flex flex-col data-[hide-code=true]:gap-4"
      >
        {content}
        <figcaption className="-mt-8 text-center text-sm text-muted-foreground data-[hide-code=true]:mt-0">
          {caption}
        </figcaption>
      </figure>
    )
  }

  return content
}
