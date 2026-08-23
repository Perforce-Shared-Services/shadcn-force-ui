import { Component } from "@angular/core"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@/angular-ui/attachment"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/angular-ui/dialog"

@Component({
  selector: "preview-attachment-trigger",
  standalone: true,
  imports: [
    Attachment,
    AttachmentMedia,
    AttachmentContent,
    AttachmentTitle,
    AttachmentDescription,
    AttachmentActions,
    AttachmentAction,
    AttachmentTrigger,
    DialogRoot,
    DialogTrigger,
    DialogPortal,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
  ],
  template: `<div class="mx-auto w-full max-w-sm py-12" uiDialogRoot>
    <div uiAttachment class="w-full">
      <div uiAttachmentMedia>
        <svg
          class="size-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
        ><path d="M80-775v-85q0-24.75 17.63-42.38Q115.25-920 140-920h85q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5h-85v85q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63Q80-762.25 80-775Zm740 0v-85h-85q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h85q24.75 0 42.38 17.62Q880-884.75 880-860v85q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37ZM80-100v-85q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v55h55q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32Q199.25-40 186.5-40H140q-24.75 0-42.37-17.63Q80-75.25 80-100Zm740 30v-85h-85q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h85v-85q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v85q0 24.75-17.62 42.37Q884.75-40 860-40h-55q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5ZM140-160h680v-480H140v480Zm0 0v-480 480Zm100-100h480L572-469 452-311l-92-121-120 172Z"/></svg>
      </div>
      <div uiAttachmentContent>
        <span uiAttachmentTitle>research-summary.pdf</span>
        <span uiAttachmentDescription>Open preview dialog</span>
      </div>
      <div uiAttachmentActions>
        <button uiAttachmentAction aria-label="Copy link">
          <svg
            class="size-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
          ><path d="M300-200q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h440q24 0 42 18t18 42v560q0 24-18 42t-42 18H300Zm0-60h440v-560H300v560ZM180-80q-24 0-42-18t-18-42v-590q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v590h470q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32Q662.75-80 650-80H180Zm120-180v-560 560Z"/></svg>
        </button>
        <button uiAttachmentAction aria-label="Remove research-summary.pdf">
          <svg
            class="size-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
          ><path d="M480-438 270-228q-9 9-21 9t-21-9q-9-9-9-21t9-21l210-210-210-210q-9-9-9-21t9-21q9-9 21-9t21 9l210 210 210-210q9-9 21-9t21 9q9 9 9 21t-9 21L522-480l210 210q9 9 9 21t-9 21q-9 9-21 9t-21-9L480-438Z"/></svg>
        </button>
      </div>
      <button
        uiDialogTrigger
        uiAttachmentTrigger
        type="button"
        aria-label="Preview research-summary.pdf"
      ></button>
    </div>
    <ng-template uiDialogPortal>
      <div uiDialogOverlay></div>
      <div uiDialogContent class="sm:max-w-md">
        <div uiDialogHeader>
          <h2 uiDialogTitle>research-summary.pdf</h2>
          <p uiDialogDescription>
            The attachment trigger fills the card and opens the dialog, while the actions stay independently clickable above it.
          </p>
        </div>
      </div>
    </ng-template>
  </div>`,
})
export class AttachmentTriggerDemoComponent {}

export default AttachmentTriggerDemoComponent
