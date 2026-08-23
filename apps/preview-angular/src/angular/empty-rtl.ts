import { Button } from "@/angular-ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/angular-ui/empty"
import { Component } from "@angular/core"

// RTL convention for Angular previews: static Arabic labels + dir="rtl"
// (the React example uses the language-selector translation hook).
@Component({
  selector: "preview-empty-rtl",
  standalone: true,
  imports: [Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent, Button],
  template: ` <div uiEmpty dir="rtl">
    <div uiEmptyHeader>
      <div uiEmptyMedia variant="icon">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M140-220v-520 550-30Zm0 60q-24 0-42-18.5T80-220v-520q0-23 18-41.5t42-18.5h256q12.44 0 23.72 5t19.37 13.09L481-740h339q23 0 41.5 18.5T880-680v271q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63-8.5-8.62-8.5-21.37v-271H456l-60-60H140v520h265q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H140Zm440-30 66 66q9 9 9 21t-9.05 21q-9.06 9-21.5 9Q612-73 603-82l-87-87q-9-9-9-21t9-21l87-87q9.07-9 21.53-9 12.47 0 21.47 9 9 9 9 21t-9 21l-66 66Zm254 0-66-66q-9-9-9-21t9.05-21q9.06-9 21.5-9 12.45 0 21.45 9l87 87q9 9 9 21t-9 21l-87 87q-9.07 9-21.53 9Q777-73 768-82q-9-9-9-21t9-21l66-66Z" /></svg>
      </div>
      <h3 uiEmptyTitle>لا توجد مشاريع بعد</h3>
      <p uiEmptyDescription>لم تقم بإنشاء أي مشاريع بعد. ابدأ بإنشاء مشروعك الأول.</p>
    </div>
    <div uiEmptyContent class="flex-row justify-center gap-2">
      <button uiButton>إنشاء مشروع</button>
      <button uiButton variant="outline">استيراد مشروع</button>
    </div>
    <a href="#" uiButton variant="link" size="sm" class="text-muted-foreground">
      تعرف على المزيد
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        data-icon="inline-end"
        class="rtl:rotate-270"
      ><path d="M700-658 223-181q-9 9-21 9t-21-9q-9-9-9-21t9-21l477-477H394q-13 0-21.5-8.5T364-730q0-13 8.5-21.5T394-760h336q13 0 21.5 8.5T760-730v336q0 13-8.5 21.5T730-364q-13 0-21.5-8.5T700-394v-264Z" /></svg>
    </a>
  </div>`,
})
export class EmptyRtlComponent {}

export default EmptyRtlComponent
