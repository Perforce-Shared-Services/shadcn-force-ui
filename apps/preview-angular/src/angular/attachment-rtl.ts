import { Component } from "@angular/core"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/angular-ui/attachment"
import { Spinner } from "@/angular-ui/spinner"

// Static Arabic labels + `dir="rtl"` per the established Angular port
// convention for {slug}-rtl demos (no React base attachment-rtl example).
@Component({
  selector: "preview-attachment-rtl",
  standalone: true,
  imports: [
    Attachment,
    AttachmentMedia,
    AttachmentContent,
    AttachmentTitle,
    AttachmentDescription,
    AttachmentActions,
    AttachmentAction,
    Spinner,
  ],
  template: `<div class="mx-auto flex w-full max-w-sm flex-col gap-2 py-12" dir="rtl">
    <div uiAttachment state="uploading" class="w-full">
      <div uiAttachmentMedia><span uiSpinner></span></div>
      <div uiAttachmentContent>
        <span uiAttachmentTitle>تقرير-المبيعات.pdf</span>
        <span uiAttachmentDescription>جارٍ الرفع · 64%</span>
      </div>
      <div uiAttachmentActions>
        <button uiAttachmentAction aria-label="إلغاء الرفع">
          <svg class="size-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-438 270-228q-9 9-21 9t-21-9q-9-9-9-21t9-21l210-210-210-210q-9-9-9-21t9-21q9-9 21-9t21 9l210 210 210-210q9-9 21-9t21 9q9 9 9 21t-9 21L522-480l210 210q9 9 9 21t-9 21q-9 9-21 9t-21-9L480-438Z"/></svg>
        </button>
      </div>
    </div>
    <div uiAttachment state="error" class="w-full">
      <div uiAttachmentMedia>
        <svg class="size-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm0-120q13 0 21.5-8.5T510-430v-150q0-13-8.5-21.5T480-610q-13 0-21.5 8.5T450-580v150q0 13 8.5 21.5T480-400Zm0 320q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z"/></svg>
      </div>
      <div uiAttachmentContent>
        <span uiAttachmentTitle>النموذج-المالي.xlsx</span>
        <span uiAttachmentDescription>فشل الرفع. حاول مرة أخرى.</span>
      </div>
      <div uiAttachmentActions>
        <button uiAttachmentAction aria-label="إعادة المحاولة">
          <svg class="size-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-160q-133 0-226.5-93.5T160-480q0-133 93.5-226.5T480-800q85 0 149 34.5T740-671v-99q0-13 8.5-21.5T770-800q13 0 21.5 8.5T800-770v194q0 13-8.5 21.5T770-546H576q-13 0-21.5-8.5T546-576q0-13 8.5-21.5T576-606h138q-38-60-97-97t-137-37q-109 0-184.5 75.5T220-480q0 109 75.5 184.5T480-220q75 0 140-39.5T717-366q5-11 16.5-16.5t22.5-.5q12 5 16 16.5t-1 23.5q-39 84-117.5 133.5T480-160Z"/></svg>
        </button>
      </div>
    </div>
  </div>`,
})
export class AttachmentRtlComponent {}

export default AttachmentRtlComponent
