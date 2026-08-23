import { Component } from "@angular/core"

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/angular-ui/alert-dialog"
import { Button } from "@/angular-ui/button"

@Component({
  selector: "preview-alert-dialog-rtl",
  standalone: true,
  imports: [
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogPortal,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
    Button,
  ],
  template: `<div class="flex gap-4" dir="rtl">
    <div uiAlertDialog>
      <button uiButton variant="outline" uiAlertDialogTrigger>إظهار الحوار</button>
      <ng-template uiAlertDialogPortal>
        <div uiAlertDialogOverlay></div>
        <div uiAlertDialogContent dir="rtl">
          <div uiAlertDialogHeader>
            <h2 uiAlertDialogTitle>هل أنت متأكد تمامًا؟</h2>
            <p uiAlertDialogDescription>
              لا يمكن التراجع عن هذا الإجراء. سيؤدي هذا إلى حذف حسابك نهائيًا من خوادمنا.
            </p>
          </div>
          <div uiAlertDialogFooter>
            <button uiButton variant="outline" uiAlertDialogCancel>إلغاء</button>
            <button uiButton uiAlertDialogAction>متابعة</button>
          </div>
        </div>
      </ng-template>
    </div>
    <div uiAlertDialog>
      <button uiButton variant="outline" uiAlertDialogTrigger>إظهار الحوار (صغير)</button>
      <ng-template uiAlertDialogPortal>
        <div uiAlertDialogOverlay></div>
        <div uiAlertDialogContent size="sm" dir="rtl">
          <div uiAlertDialogHeader>
            <div uiAlertDialogMedia>
              <!-- Material Symbols "bluetooth" -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M450-94v-314L256-214l-42-42 224-224-224-224 42-42 194 194v-314h30l214 214-172 172 172 172L480-94h-30Zm60-458 100-100-100-98v198Zm0 342 100-98-100-100v198Z"/></svg>
            </div>
            <h2 uiAlertDialogTitle>السماح للملحق بالاتصال؟</h2>
            <p uiAlertDialogDescription>
              هل تريد السماح لملحق USB بالاتصال بهذا الجهاز؟
            </p>
          </div>
          <div uiAlertDialogFooter>
            <button uiButton variant="outline" uiAlertDialogCancel>عدم السماح</button>
            <button uiButton uiAlertDialogAction>السماح</button>
          </div>
        </div>
      </ng-template>
    </div>
  </div>`,
})
export class AlertDialogRtlComponent {}

export default AlertDialogRtlComponent
