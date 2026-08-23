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
  AttachmentTrigger,
} from "@/angular-ui/attachment"

@Component({
  selector: "preview-attachment-image",
  standalone: true,
  imports: [Attachment, AttachmentGroup, AttachmentMedia, AttachmentContent, AttachmentTitle, AttachmentDescription, AttachmentActions, AttachmentAction, AttachmentTrigger],
  template: `<div class="mx-auto w-full max-w-sm py-12">
    <div uiAttachmentGroup class="w-full">
      <div uiAttachment orientation="vertical">
        <div uiAttachmentMedia variant="image">
          <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80" alt="Workspace" />
        </div>
        <div uiAttachmentContent>
          <span uiAttachmentTitle>workspace.png</span>
          <span uiAttachmentDescription>PNG · 820 KB</span>
        </div>
        <div uiAttachmentActions>
          <button uiAttachmentAction aria-label="Remove workspace.png"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-438 270-228q-9 9-21 9t-21-9q-9-9-9-21t9-21l210-210-210-210q-9-9-9-21t9-21q9-9 21-9t21 9l210 210 210-210q9-9 21-9t21 9q9 9 9 21t-9 21L522-480l210 210q9 9 9 21t-9 21q-9 9-21 9t-21-9L480-438Z"/></svg></button>
        </div>
        <a uiAttachmentTrigger href="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80" target="_blank" rel="noreferrer" aria-label="Open workspace.png"></a>
      </div>
      <div uiAttachment orientation="vertical">
        <div uiAttachmentMedia variant="image">
          <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80" alt="Desk" />
        </div>
        <div uiAttachmentContent>
          <span uiAttachmentTitle>desk-reference.jpg</span>
          <span uiAttachmentDescription>JPG · 1.1 MB</span>
        </div>
        <div uiAttachmentActions>
          <button uiAttachmentAction aria-label="Remove desk-reference.jpg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-438 270-228q-9 9-21 9t-21-9q-9-9-9-21t9-21l210-210-210-210q-9-9-9-21t9-21q9-9 21-9t21 9l210 210 210-210q9-9 21-9t21 9q9 9 9 21t-9 21L522-480l210 210q9 9 9 21t-9 21q-9 9-21 9t-21-9L480-438Z"/></svg></button>
        </div>
        <a uiAttachmentTrigger href="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80" target="_blank" rel="noreferrer" aria-label="Open desk-reference.jpg"></a>
      </div>
      <div uiAttachment orientation="vertical">
        <div uiAttachmentMedia variant="image">
          <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80" alt="Office" />
        </div>
        <div uiAttachmentContent>
          <span uiAttachmentTitle>office-reference.jpg</span>
          <span uiAttachmentDescription>JPG · 940 KB</span>
        </div>
        <div uiAttachmentActions>
          <button uiAttachmentAction aria-label="Remove office-reference.jpg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-438 270-228q-9 9-21 9t-21-9q-9-9-9-21t9-21l210-210-210-210q-9-9-9-21t9-21q9-9 21-9t21 9l210 210 210-210q9-9 21-9t21 9q9 9 9 21t-9 21L522-480l210 210q9 9 9 21t-9 21q-9 9-21 9t-21-9L480-438Z"/></svg></button>
        </div>
        <a uiAttachmentTrigger href="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80" target="_blank" rel="noreferrer" aria-label="Open office-reference.jpg"></a>
      </div>
    </div>
  </div>`,
})
export class AttachmentImageComponent {}

export default AttachmentImageComponent
