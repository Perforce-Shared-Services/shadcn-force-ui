import { Component } from "@angular/core"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@/angular-ui/attachment"
import { Spinner } from "@/angular-ui/spinner"

@Component({
  selector: "preview-attachment-states",
  standalone: true,
  imports: [Attachment, AttachmentMedia, AttachmentContent, AttachmentTitle, AttachmentDescription, AttachmentActions, AttachmentAction, Spinner],
  template: `<div class="mx-auto flex w-full max-w-sm flex-col gap-2 py-12">
    <div uiAttachment state="idle" class="w-full">
      <div uiAttachmentMedia><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M513-492v-171q0-13-8.5-21.5T483-693q-13 0-21.5 8.5T453-663v183q0 6 2 11t6 10l144 149q9 10 22.5 9.5T650-310q9-9 9-22t-9-22L513-492ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-82 31.5-155t86-127.5Q252-817 325-848.5T480-880q82 0 155 31.5t127.5 86Q817-708 848.5-635T880-480q0 82-31.5 155t-86 127.5Q708-143 635-111.5T480-80Zm0-400Zm0 340q140 0 240-100t100-240q0-140-100-240T480-820q-140 0-240 100T140-480q0 140 100 240t240 100Z"/></svg></div>
      <div uiAttachmentContent>
        <span uiAttachmentTitle>selected-file.pdf</span>
        <span uiAttachmentDescription>Ready to upload</span>
      </div>
      <div uiAttachmentActions>
        <button uiAttachmentAction aria-label="Remove selected-file.pdf"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-438 270-228q-9 9-21 9t-21-9q-9-9-9-21t9-21l210-210-210-210q-9-9-9-21t9-21q9-9 21-9t21 9l210 210 210-210q9-9 21-9t21 9q9 9 9 21t-9 21L522-480l210 210q9 9 9 21t-9 21q-9 9-21 9t-21-9L480-438Z"/></svg></button>
      </div>
    </div>
    <div uiAttachment state="uploading" class="w-full">
      <div uiAttachmentMedia><span uiSpinner></span></div>
      <div uiAttachmentContent>
        <span uiAttachmentTitle>design-system.zip</span>
        <span uiAttachmentDescription>Uploading · 64%</span>
      </div>
      <div uiAttachmentActions>
        <button uiAttachmentAction aria-label="Cancel upload"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-438 270-228q-9 9-21 9t-21-9q-9-9-9-21t9-21l210-210-210-210q-9-9-9-21t9-21q9-9 21-9t21 9l210 210 210-210q9-9 21-9t21 9q9 9 9 21t-9 21L522-480l210 210q9 9 9 21t-9 21q-9 9-21 9t-21-9L480-438Z"/></svg></button>
      </div>
    </div>
    <div uiAttachment state="processing" class="w-full">
      <div uiAttachmentMedia><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M349-250h262q12.75 0 21.38-8.68 8.62-8.67 8.62-21.5 0-12.82-8.62-21.32-8.63-8.5-21.38-8.5H349q-12.75 0-21.37 8.68-8.63 8.67-8.63 21.5 0 12.82 8.63 21.32 8.62 8.5 21.37 8.5Zm0-170h262q12.75 0 21.38-8.68 8.62-8.67 8.62-21.5 0-12.82-8.62-21.32-8.63-8.5-21.38-8.5H349q-12.75 0-21.37 8.68-8.63 8.67-8.63 21.5 0 12.82 8.63 21.32 8.62 8.5 21.37 8.5ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h336q12.44 0 23.72 5T599-862l183 183q8 8 13 19.28 5 11.28 5 23.72v496q0 24-18 42t-42 18H220Zm331-584v-156H220v680h520v-494H581q-12.75 0-21.37-8.63Q551-651.25 551-664ZM220-820v186-186 680-680Z"/></svg></div>
      <div uiAttachmentContent>
        <span uiAttachmentTitle>market-research.pdf</span>
        <span uiAttachmentDescription>Processing document</span>
      </div>
      <div uiAttachmentActions>
        <button uiAttachmentAction aria-label="Remove market-research.pdf"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-438 270-228q-9 9-21 9t-21-9q-9-9-9-21t9-21l210-210-210-210q-9-9-9-21t9-21q9-9 21-9t21 9l210 210 210-210q9-9 21-9t21 9q9 9 9 21t-9 21L522-480l210 210q9 9 9 21t-9 21q-9 9-21 9t-21-9L480-438Z"/></svg></button>
      </div>
    </div>
    <div uiAttachment state="error" class="w-full">
      <div uiAttachmentMedia><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M503.5-289.48q9.5-9.48 9.5-23.5t-9.48-23.52q-9.48-9.5-23.5-9.5t-23.52 9.48q-9.5 9.48-9.5 23.5t9.48 23.52q9.48 9.5 23.5 9.5t23.52-9.48Zm1-152.15q8.5-8.62 8.5-21.37v-193q0-12.75-8.68-21.38-8.67-8.62-21.5-8.62-12.82 0-21.32 8.62-8.5 8.63-8.5 21.38v193q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63 12.82 0 21.32-8.63ZM480.27-80q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.31-127 86Q563-80 480.27-80Zm.23-60Q622-140 721-239.5t99-241Q820-622 721.19-721T480-820q-141 0-240.5 98.81T140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z"/></svg></div>
      <div uiAttachmentContent>
        <span uiAttachmentTitle>financial-model.xlsx</span>
        <span uiAttachmentDescription>Upload failed. Try again.</span>
      </div>
      <div uiAttachmentActions>
        <button uiAttachmentAction aria-label="Retry upload"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-160q-133 0-226.5-93.5T160-480q0-133 93.5-226.5T480-800q85 0 149 34.5T740-671v-99q0-13 8.5-21.5T770-800q13 0 21.5 8.5T800-770v194q0 13-8.5 21.5T770-546H576q-13 0-21.5-8.5T546-576q0-13 8.5-21.5T576-606h138q-38-60-97-97t-137-37q-109 0-184.5 75.5T220-480q0 109 75.5 184.5T480-220q75 0 140-39.5T717-366q5-11 16.5-16.5t22.5-.5q12 5 16 16.5t-1 23.5q-39 84-117.5 133.5T480-160Z"/></svg></button>
        <button uiAttachmentAction aria-label="Remove financial-model.xlsx"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-438 270-228q-9 9-21 9t-21-9q-9-9-9-21t9-21l210-210-210-210q-9-9-9-21t9-21q9-9 21-9t21 9l210 210 210-210q9-9 21-9t21 9q9 9 9 21t-9 21L522-480l210 210q9 9 9 21t-9 21q-9 9-21 9t-21-9L480-438Z"/></svg></button>
      </div>
    </div>
    <div uiAttachment state="done" class="w-full">
      <div uiAttachmentMedia><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m378-332 363-363q9-9 21.5-9t21.5 9q9 9 9 21.5t-9 21.5L399-267q-9 9-21 9t-21-9L175-449q-9-9-8.5-21.5T176-492q9-9 21.5-9t21.5 9l159 160Z"/></svg></div>
      <div uiAttachmentContent>
        <span uiAttachmentTitle>uploaded-report.pdf</span>
        <span uiAttachmentDescription>Uploaded · 1.8 MB</span>
      </div>
      <div uiAttachmentActions>
        <button uiAttachmentAction aria-label="Remove uploaded-report.pdf"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-438 270-228q-9 9-21 9t-21-9q-9-9-9-21t9-21l210-210-210-210q-9-9-9-21t9-21q9-9 21-9t21 9l210 210 210-210q9-9 21-9t21 9q9 9 9 21t-9 21L522-480l210 210q9 9 9 21t-9 21q-9 9-21 9t-21-9L480-438Z"/></svg></button>
      </div>
    </div>
  </div>`,
})
export class AttachmentStatesComponent {}

export default AttachmentStatesComponent
