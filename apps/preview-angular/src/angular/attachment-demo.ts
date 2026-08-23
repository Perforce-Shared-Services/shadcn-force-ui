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
  selector: "preview-attachment-demo",
  standalone: true,
  imports: [Attachment, AttachmentGroup, AttachmentMedia, AttachmentContent, AttachmentTitle, AttachmentDescription, AttachmentActions, AttachmentAction, Spinner],
  template: `<div class="mx-auto flex w-full max-w-sm flex-col gap-3 py-12">
    <div uiAttachmentGroup>
      <div uiAttachment orientation="vertical">
        <div uiAttachmentMedia variant="image">
          <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80" alt="Workspace" />
        </div>
        <div uiAttachmentContent>
          <span uiAttachmentTitle>workspace.png</span>
          <span uiAttachmentDescription>PNG · 820 KB</span>
        </div>
      </div>
      <div uiAttachment orientation="vertical">
        <div uiAttachmentMedia variant="image">
          <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80" alt="Desk" />
        </div>
        <div uiAttachmentContent>
          <span uiAttachmentTitle>desk-reference.jpg</span>
          <span uiAttachmentDescription>JPG · 1.1 MB</span>
        </div>
      </div>
      <div uiAttachment orientation="vertical">
        <div uiAttachmentMedia variant="image">
          <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80" alt="Office" />
        </div>
        <div uiAttachmentContent>
          <span uiAttachmentTitle>office-reference.jpg</span>
          <span uiAttachmentDescription>JPG · 940 KB</span>
        </div>
      </div>
    </div>
    <div uiAttachment state="uploading" class="w-full">
      <div uiAttachmentMedia><span uiSpinner></span></div>
      <div uiAttachmentContent>
        <span uiAttachmentTitle>sales-dashboard.pdf</span>
        <span uiAttachmentDescription>Uploading · 64%</span>
      </div>
      <div uiAttachmentActions>
        <button uiAttachmentAction aria-label="Cancel upload"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-438 270-228q-9 9-21 9t-21-9q-9-9-9-21t9-21l210-210-210-210q-9-9-9-21t9-21q9-9 21-9t21 9l210 210 210-210q9-9 21-9t21 9q9 9 9 21t-9 21L522-480l210 210q9 9 9 21t-9 21q-9 9-21 9t-21-9L480-438Z"/></svg></button>
      </div>
    </div>
    <div uiAttachment class="w-full">
      <div uiAttachmentMedia><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M600-160q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h90q21.25 0 35.63-14.38Q740-248.75 740-270v-100q0-37 22.5-66t57.5-40v-8q-35-10-57.5-39.5T740-590v-100q0-21.25-14.37-35.63Q711.25-740 690-740h-90q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h90q45.83 0 77.92 32.08Q800-735.83 800-690v100q0 21.25 14.38 35.62Q828.75-540 850-540q12.75 0 21.38 8.65 8.62 8.64 8.62 21.42v60.15q0 12.78-8.62 21.28-8.63 8.5-21.38 8.5-21.25 0-35.62 14.37Q800-391.25 800-370v100q0 45.83-32.08 77.92Q735.83-160 690-160h-90Zm-330 0q-45.83 0-77.92-32.08Q160-224.17 160-270v-100q0-21.25-14.37-35.63Q131.25-420 110-420q-12.75 0-21.37-8.65Q80-437.29 80-450.07v-60.15q0-12.78 8.63-21.28Q97.25-540 110-540q21.25 0 35.63-14.38Q160-568.75 160-590v-100q0-45.83 32.08-77.92Q224.17-800 270-800h90q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5h-90q-21.25 0-35.62 14.37Q220-711.25 220-690v100q0 37-22.5 66.5T140-484v8q35 11 57.5 40t22.5 66v100q0 21.25 14.38 35.62Q248.75-220 270-220h90q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5h-90Z"/></svg></div>
      <div uiAttachmentContent>
        <span uiAttachmentTitle>message-renderer.tsx</span>
        <span uiAttachmentDescription>TypeScript · 12 KB</span>
      </div>
      <div uiAttachmentActions>
        <button uiAttachmentAction aria-label="Remove message-renderer.tsx"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-438 270-228q-9 9-21 9t-21-9q-9-9-9-21t9-21l210-210-210-210q-9-9-9-21t9-21q9-9 21-9t21 9l210 210 210-210q9-9 21-9t21 9q9 9 9 21t-9 21L522-480l210 210q9 9 9 21t-9 21q-9 9-21 9t-21-9L480-438Z"/></svg></button>
      </div>
    </div>
  </div>`,
})
export class AttachmentDemoComponent {}

export default AttachmentDemoComponent
