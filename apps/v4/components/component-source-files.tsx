"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"
import { getIconForLanguageExtension } from "@/components/icons"

// [FORCE-UI] Multi-file registry items (framework ports especially) ship
// more than one file. This client component owns the "which file is active"
// state so ComponentSource can stay an async server component while still
// highlighting every file on the server ahead of time.
export type ComponentSourceFile = {
  path: string
  language: string
  code: string
  highlightedCode: string
}

export function ComponentSourceFiles({
  files,
  defaultPath,
  className,
}: {
  files: ComponentSourceFile[]
  defaultPath: string
  className?: string
}) {
  const [activePath, setActivePath] = React.useState(defaultPath)

  const activeFile =
    files.find((file) => file.path === activePath) ?? files[0]

  return (
    <figure
      data-rehype-pretty-code-figure=""
      className={cn("[&>pre]:max-h-96", className)}
    >
      <div
        data-slot="component-source-files-tabs"
        className="flex items-center gap-1 overflow-x-auto border-b border-code-foreground/10 px-2 py-1.5 text-code-foreground [&_svg]:size-4 [&_svg]:opacity-70"
      >
        {files.map((file) => {
          const fileName = file.path.split("/").pop() ?? file.path
          const isActive = file.path === activeFile.path

          return (
            <button
              key={file.path}
              type="button"
              data-active={isActive}
              onClick={() => setActivePath(file.path)}
              className={cn(
                "flex items-center gap-1.5 rounded-sm px-2 py-1 text-xs whitespace-nowrap text-code-foreground/70 hover:text-code-foreground",
                "data-[active=true]:bg-code-foreground/10 data-[active=true]:text-code-foreground data-[active=true]:[&_svg]:opacity-100"
              )}
            >
              {getIconForLanguageExtension(file.language)}
              {fileName}
            </button>
          )
        })}
      </div>
      <CopyButton value={activeFile.code} />
      <div
        key={activeFile.path}
        data-not-typeset
        dangerouslySetInnerHTML={{ __html: activeFile.highlightedCode }}
      />
    </figure>
  )
}
