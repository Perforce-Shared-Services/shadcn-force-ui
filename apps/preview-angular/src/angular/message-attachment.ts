import { Attachment } from "@/angular-ui/attachment"
import { Bubble, BubbleContent } from "@/angular-ui/bubble"
import { Message, MessageContent } from "@/angular-ui/message"
import { Component } from "@angular/core"

// apps/v4/examples/base/message-attachment.tsx
// Material Symbols (DownloadIcon → "download", FileTextIcon → "description").
const svg = (d: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="${d}"/></svg>`

const DOWNLOAD = svg("M469-327q-5-2-10-7L308-485q-9-9.27-8.5-21.64.5-12.36 9.11-21.36 9.39-9 21.89-9t21.5 9l98 99v-341q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v341l99-99q8.8-9 20.9-8.5 12.1.5 21.49 9.5 8.61 9 8.61 21.5t-9 21.5L501-334q-5 5-10.13 7-5.14 2-11 2-5.87 0-10.87-2ZM220-160q-24 0-42-18t-18-42v-113q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v113h520v-113q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v113q0 24-18 42t-42 18H220Z")
const FILE = svg("M349-250h262q12.75 0 21.38-8.68 8.62-8.67 8.62-21.5 0-12.82-8.62-21.32-8.63-8.5-21.38-8.5H349q-12.75 0-21.37 8.68-8.63 8.67-8.63 21.5 0 12.82 8.63 21.32 8.62 8.5 21.37 8.5Zm0-170h262q12.75 0 21.38-8.68 8.62-8.67 8.62-21.5 0-12.82-8.62-21.32-8.63-8.5-21.38-8.5H349q-12.75 0-21.37 8.68-8.63 8.67-8.63 21.5 0 12.82 8.63 21.32 8.62 8.5 21.37 8.5ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h336q12.44 0 23.72 5T599-862l183 183q8 8 13 19.28 5 11.28 5 23.72v496q0 24-18 42t-42 18H220Zm331-584v-156H220v680h520v-494H581q-12.75 0-21.37-8.63Q551-651.25 551-664ZM220-820v186-186 680-680Z")

@Component({
  selector: "preview-message-attachment",
  standalone: true,
  imports: [Message, MessageContent, Bubble, BubbleContent, Attachment],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-8 py-12">
      <div uiMessage align="end">
        <div uiMessageContent>
          <div uiAttachment orientation="vertical">
            <div uiAttachmentMedia variant="image">
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
                alt="Workspace"
              />
            </div>
          </div>
          <div uiBubble>
            <div uiBubbleContent>Here's the image. Can you add it to the PDF? Use it for the cover page.</div>
          </div>
        </div>
      </div>
      <div uiMessage>
        <div uiMessageContent>
          <div uiBubble variant="muted">
            <div uiBubbleContent>Done. Here's the PDF with the image added as the cover page.</div>
          </div>
          <div uiAttachment>
            <div uiAttachmentMedia [innerHTML]="file"></div>
            <div uiAttachmentContent>
              <div uiAttachmentTitle>sales-dashboard.pdf</div>
              <div uiAttachmentDescription>PDF · 2.4 MB</div>
            </div>
            <div uiAttachmentActions>
              <button uiAttachmentAction type="button" title="Download" aria-label="Download" size="icon-sm" variant="secondary" [innerHTML]="download"></button>
            </div>
          </div>
        </div>
      </div>
      <div uiMessage align="end">
        <div uiMessageContent>
          <div uiBubble><div uiBubbleContent>Thanks. Looks good.</div></div>
        </div>
      </div>
    </div>
  `,
})
export class MessageAttachmentComponent {
  protected readonly file = FILE
  protected readonly download = DOWNLOAD
}

export default MessageAttachmentComponent
