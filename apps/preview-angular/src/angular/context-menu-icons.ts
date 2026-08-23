import { Component } from "@angular/core"

import {
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuRoot,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/angular-ui/context-menu"

// apps/v4/examples/base/context-menu-icons.tsx
// Material Symbols (CopyIcon → "content_copy", ScissorsIcon → "content_cut",
// ClipboardPasteIcon → "content_paste", TrashIcon → "delete" via
// apps/v4/examples/material-symbols-map.ts).
const svg = (d: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="${d}"/></svg>`

const COPY = svg("M300-200q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h440q24 0 42 18t18 42v560q0 24-18 42t-42 18H300Zm0-60h440v-560H300v560ZM180-80q-24 0-42-18t-18-42v-590q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v590h470q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32Q662.75-80 650-80H180Zm120-180v-560 560Z")
const SCISSORS = svg("M481-415 364-298q11 17 13.5 33t2.5 35q0 64-43 107T230-80q-64 0-107-43T80-230q0-64 43-107t107-43q18 0 35.5 5t36.5 15l116-116-118-118q-17 8-34.5 11t-35.5 3q-64 0-107-43T80-730q0-64 43-107t107-43q64 0 107 43t43 107q0 19-2.5 36T367-662l468 468q23 23 10.5 51.5T801-114q-9 0-17.5-3.5T768-128L481-415Zm118-112-66-66 235-235q7-7 15.5-10.5T801-842q32 0 43.5 29T834-762L599-527ZM294-666q26-26 26-64t-26-64q-26-26-64-26t-64 26q-26 26-26 64t26 64q26 26 64 26t64-26Zm202.5 203.5Q502-468 502-476t-5.5-13.5Q491-495 483-495t-13.5 5.5Q464-484 464-476t5.5 13.5Q475-457 483-457t13.5-5.5ZM294-166q26-26 26-64t-26-64q-26-26-64-26t-64 26q-26 26-26 64t26 64q26 26 64 26t64-26Z")
const PASTE = svg("M180-120q-26 0-43-17t-17-43v-600q0-26 17-43t43-17h202q7-35 34.5-57.5T480-920q36 0 63.5 22.5T578-840h202q26 0 43 17t17 43v600q0 26-17 43t-43 17H180Zm0-60h600v-600h-60v60q0 12.75-8.62 21.37Q702.75-690 690-690H270q-12.75 0-21.37-8.63Q240-707.25 240-720v-60h-60v600Zm328.5-611.5Q520-803 520-820t-11.5-28.5Q497-860 480-860t-28.5 11.5Q440-837 440-820t11.5 28.5Q463-780 480-780t28.5-11.5Z")
const TRASH = svg("M261-120q-24.75 0-42.37-17.63Q201-155.25 201-180v-570h-11q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h158q0-13 8.63-21.5 8.62-8.5 21.37-8.5h204q12.75 0 21.38 8.62Q612-822.75 612-810h158q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5h-11v570q0 24.75-17.62 42.37Q723.75-120 699-120H261Zm438-630H261v570h438v-570ZM418.5-274.63q8.5-8.62 8.5-21.37v-339q0-12.75-8.68-21.38-8.67-8.62-21.5-8.62-12.82 0-21.32 8.62-8.5 8.63-8.5 21.38v339q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63 12.82 0 21.32-8.63Zm166 0q8.5-8.62 8.5-21.37v-339q0-12.75-8.68-21.38-8.67-8.62-21.5-8.62-12.82 0-21.32 8.62-8.5 8.63-8.5 21.38v339q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63 12.82 0 21.32-8.63ZM261-750v570-570Z")

@Component({
  selector: "preview-context-menu-icons",
  standalone: true,
  imports: [ContextMenuRoot, ContextMenuTrigger, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuSeparator],
  template: `<div uiContextMenuRoot>
    <div
      uiContextMenuTrigger
      class="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm"
    >
      <span class="hidden pointer-fine:inline-block">Right click here</span>
      <span class="hidden pointer-coarse:inline-block">Long press here</span>
    </div>
    <div uiContextMenuContent>
      <div uiContextMenuGroup>
        <button uiContextMenuItem>
          <svg aria-hidden="true" focusable="false" [innerHTML]="copy"></svg>
          Copy
        </button>
        <button uiContextMenuItem>
          <svg aria-hidden="true" focusable="false" [innerHTML]="scissors"></svg>
          Cut
        </button>
        <button uiContextMenuItem>
          <svg aria-hidden="true" focusable="false" [innerHTML]="paste"></svg>
          Paste
        </button>
      </div>
      <div uiContextMenuSeparator></div>
      <div uiContextMenuGroup>
        <button uiContextMenuItem variant="destructive">
          <svg aria-hidden="true" focusable="false" [innerHTML]="trash"></svg>
          Delete
        </button>
      </div>
    </div>
  </div>`,
})
export class ContextMenuIconsComponent {
  protected readonly copy = COPY
  protected readonly scissors = SCISSORS
  protected readonly paste = PASTE
  protected readonly trash = TRASH
}

export default ContextMenuIconsComponent
