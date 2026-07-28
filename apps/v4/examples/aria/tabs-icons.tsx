import { AppWindowIcon, CodeIcon } from "lucide-react"

import { Tabs, TabsList, TabsTrigger } from "@/registry/bases/aria/ui/tabs"

export function TabsIcons() {
  return (
    <Tabs defaultSelectedKey="preview">
      <TabsList>
        <TabsTrigger id="preview">
          <AppWindowIcon />
          Preview
        </TabsTrigger>
        <TabsTrigger id="code">
          <CodeIcon />
          Code
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
