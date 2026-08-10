import * as React from "react"

import { formatCode } from "@/lib/format-code"
import { highlightCode } from "@/lib/highlight-code"
import { readFileFromRoot } from "@/lib/read-file"
import { getDemoItem, getRegistryItem } from "@/lib/registry"
import { cn } from "@/lib/utils"
import { CodeCollapsibleWrapper } from "@/components/code-collapsible-wrapper"
import {
  ComponentSourceFiles,
  type ComponentSourceFile,
} from "@/components/component-source-files"
import { CopyButton } from "@/components/copy-button"
import { getIconForLanguageExtension } from "@/components/icons"
import { getPreviewFramework } from "@/registry/frameworks" // [FORCE-UI]

export async function ComponentSource({
  name,
  src,
  title,
  language,
  collapsible = true,
  className,
  styleName = "base-force-ui", // [FORCE-UI] "base-nova" no longer exists.
  framework, // [FORCE-UI]
  maxLines,
}: React.ComponentProps<"div"> & {
  name?: string
  src?: string
  title?: string
  language?: string
  collapsible?: boolean
  styleName?: string
  framework?: string // [FORCE-UI]
  maxLines?: number
}) {
  if (!name && !src) {
    return null
  }

  // [FORCE-UI] MDX call sites pass `framework="vue"` etc. Resolve that to
  // the framework's own preview style instead of silently falling back to
  // the default (React) styleName.
  const resolvedStyleName = framework
    ? (getPreviewFramework(framework)?.previewStyle ?? styleName)
    : styleName

  if (src) {
    const code = await readFileFromRoot(src)
    return renderSingleFile({
      code,
      title,
      language,
      styleName: resolvedStyleName,
      maxLines,
      collapsible,
      className,
    })
  }

  const item =
    (await getDemoItem(name!, resolvedStyleName)) ??
    (await getRegistryItem(name!, resolvedStyleName))

  const rawFiles = (item?.files ?? []).filter(
    (file: { path: string; content?: unknown }): file is {
      path: string
      content: string
    } => typeof file.content === "string"
  )

  if (rawFiles.length === 0) {
    return null
  }

  // [FORCE-UI] Single-file items keep rendering exactly as before (no
  // visual change).
  if (rawFiles.length === 1) {
    return renderSingleFile({
      code: rawFiles[0].content,
      title,
      language,
      styleName: resolvedStyleName,
      maxLines,
      collapsible,
      className,
    })
  }

  // [FORCE-UI] The collapsed preview shows maxLines of ONE file with no
  // switcher, so formatting and highlighting every file there is pure waste -
  // and it is rendered on every statically generated component page. Narrow to
  // the file that would be shown.
  const filesToProcess =
    maxLines ?
      [pickDefaultRawFile(rawFiles, item?.name)]
    : rawFiles

  // [FORCE-UI] Multi-file items (framework ports especially) need every
  // file rendered behind a file switcher, not just the first one.
  const processedFiles: ComponentSourceFile[] = await Promise.all(
    filesToProcess.map(async (file: { path: string; content: string }) => {
      const lang = language ?? file.path.split(".").pop() ?? "tsx"
      let fileCode = file.content

      if (["tsx", "ts", "jsx", "js"].includes(lang)) {
        fileCode = await formatCode(fileCode, resolvedStyleName)
        fileCode = fileCode.replaceAll(
          "/* eslint-disable react/no-children-prop */\n",
          ""
        )
      }

      if (maxLines) {
        fileCode = fileCode.split("\n").slice(0, maxLines).join("\n")
      }

      const highlightedCode = await highlightCode(fileCode, lang)

      return {
        path: file.path,
        language: lang,
        code: fileCode,
        highlightedCode,
      }
    })
  )

  const defaultFile = pickDefaultFile(processedFiles, item?.name)

  const filesElement = (
    <ComponentSourceFiles
      files={processedFiles}
      defaultPath={defaultFile.path}
    />
  )

  if (!collapsible) {
    return <div className={cn("relative", className)}>{filesElement}</div>
  }

  return (
    <CodeCollapsibleWrapper className={className}>
      {filesElement}
    </CodeCollapsibleWrapper>
  )
}

// [FORCE-UI] Prefer the file whose basename (minus extension) matches the
// item name (e.g. Accordion.vue for "accordion"); otherwise prefer the
// first file that isn't a ".variants" or "index" file (Angular ships
// button.variants.ts first, which isn't the component itself); otherwise
// fall back to the first file.
function pickDefaultFile(files: ComponentSourceFile[], itemName?: string) {
  return pickDefaultByPath(files, itemName)
}

// [FORCE-UI] Same selection over anything carrying a `path`, so the collapsed
// preview can choose its single file BEFORE paying to format/highlight.
function pickDefaultRawFile<T extends { path: string }>(
  files: T[],
  itemName?: string
) {
  return pickDefaultByPath(files, itemName)
}

function pickDefaultByPath<T extends { path: string }>(
  files: T[],
  itemName?: string
): T {
  const stem = (filePath: string) => {
    const fileName = filePath.split("/").pop() ?? filePath
    const lastDot = fileName.lastIndexOf(".")
    return lastDot > 0 ? fileName.slice(0, lastDot) : fileName
  }

  if (itemName) {
    const nameMatch = files.find(
      (file) => stem(file.path).toLowerCase() === itemName.toLowerCase()
    )
    if (nameMatch) {
      return nameMatch
    }
  }

  const preferred = files.find((file) => {
    const fileStem = stem(file.path)
    return fileStem !== "index" && !fileStem.endsWith(".variants")
  })

  return preferred ?? files[0]
}

async function renderSingleFile({
  code,
  title,
  language,
  styleName,
  maxLines,
  collapsible,
  className,
}: {
  code: string | undefined // [FORCE-UI] readFileFromRoot() may return undefined.
  title?: string
  language?: string
  styleName: string
  maxLines?: number
  collapsible: boolean
  className?: string
}) {
  if (!code) {
    return null
  }

  const lang = language ?? title?.split(".").pop() ?? "tsx"

  if (["tsx", "ts", "jsx", "js"].includes(lang)) {
    code = await formatCode(code, styleName)
    code = code.replaceAll("/* eslint-disable react/no-children-prop */\n", "")
  }

  // Truncate code if maxLines is set.
  if (maxLines) {
    code = code.split("\n").slice(0, maxLines).join("\n")
  }
  const highlightedCode = await highlightCode(code, lang)

  if (!collapsible) {
    return (
      <div className={cn("relative", className)}>
        <ComponentCode
          code={code}
          highlightedCode={highlightedCode}
          language={lang}
          title={title}
        />
      </div>
    )
  }

  return (
    <CodeCollapsibleWrapper className={className}>
      <ComponentCode
        code={code}
        highlightedCode={highlightedCode}
        language={lang}
        title={title}
      />
    </CodeCollapsibleWrapper>
  )
}

function ComponentCode({
  code,
  highlightedCode,
  language,
  title,
}: {
  code: string
  highlightedCode: string
  language: string
  title: string | undefined
}) {
  return (
    <figure data-rehype-pretty-code-figure="" className="[&>pre]:max-h-96">
      {title && (
        <figcaption
          data-rehype-pretty-code-title=""
          className="flex items-center gap-2 text-code-foreground [&_svg]:size-4 [&_svg]:text-code-foreground [&_svg]:opacity-70"
          data-language={language}
        >
          {getIconForLanguageExtension(language)}
          {title}
        </figcaption>
      )}
      <CopyButton value={code} />
      <div
        data-not-typeset
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </figure>
  )
}
