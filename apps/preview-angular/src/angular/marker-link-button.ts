import { toast } from "@/angular-ui/sonner"
import { Marker, MarkerContent, MarkerIcon } from "@/angular-ui/marker"
import { Component } from "@angular/core"

// apps/v4/examples/base/marker-link-button.tsx — React composes via
// `render={<a/>}` / `render={<button/>}`; the Angular attribute selector
// decorates the native element the caller writes instead.
@Component({
  selector: "preview-marker-link-button",
  standalone: true,
  imports: [Marker, MarkerContent, MarkerIcon],
  template: `
    <div class="flex w-full flex-col gap-8 py-12 sm:max-w-sm">
      <a uiMarker href="#links-and-buttons">
        <span uiMarkerIcon><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M481-415 364-298q11 17 13.5 33t2.5 35q0 64-43 107T230-80q-64 0-107-43T80-230q0-64 43-107t107-43q18 0 35.5 5t36.5 15l116-116-118-118q-17 8-34.5 11t-35.5 3q-64 0-107-43T80-730q0-64 43-107t107-43q64 0 107 43t43 107q0 19-2.5 36T367-662l468 468q23 23 10.5 51.5T801-114q-9 0-17.5-3.5T768-128L481-415Zm118-112-66-66 235-235q7-7 15.5-10.5T801-842q32 0 43.5 29T834-762L599-527ZM294-666q26-26 26-64t-26-64q-26-26-64-26t-64 26q-26 26-26 64t26 64q26 26 64 26t64-26Zm202.5 203.5Q502-468 502-476t-5.5-13.5Q491-495 483-495t-13.5 5.5Q464-484 464-476t5.5 13.5Q475-457 483-457t13.5-5.5ZM294-166q26-26 26-64t-26-64q-26-26-64-26t-64 26q-26 26-26 64t26 64q26 26 64 26t64-26Z"/></svg></span>
        <span uiMarkerContent>View the pull request</span>
      </a>
      <button uiMarker type="button" class="transition-colors hover:text-foreground" (click)="toast('You clicked the revert button')">
        <span uiMarkerIcon><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M323-111q-73-31-127-85t-85-127q-31-73-31-157t31-157q31-73 85-127t127-85q73-31 157-31 12 0 21 9t9 21q0 12-9 21t-21 9q-141 0-240.5 99.5T140-480q0 141 99.5 240.5T480-140q141 0 240.5-99.5T820-480q0-12 9-21t21-9q12 0 21 9t9 21q0 84-31 157t-85 127q-54 54-127 85T480-80q-84 0-157-31Z"/></svg></span>
        <span uiMarkerContent>Revert this change</span>
      </button>
    </div>
  `
})
export class MarkerLinkButtonComponent {
  protected toast = toast
}

export default MarkerLinkButtonComponent
