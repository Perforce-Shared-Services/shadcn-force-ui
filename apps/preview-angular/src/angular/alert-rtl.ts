import { Alert, AlertDescription, AlertTitle } from "@/angular-ui/alert"
import { Component } from "@angular/core"

// apps/v4/examples/base/alert-rtl.tsx — the React example drives dir/labels
// from the language-selector translations (ar). Static Arabic labels +
// dir="rtl" render the same visual state.
@Component({
  selector: "preview-alert-rtl",
  standalone: true,
  imports: [Alert, AlertTitle, AlertDescription],
  template: `<div class="grid w-full max-w-md items-start gap-4" dir="rtl">
    <div uiAlert icon="success">
      <div uiAlertTitle>تم الدفع بنجاح</div>
      <div uiAlertDescription>
        تمت معالجة دفعتك البالغة 29.99 دولارًا. تم إرسال إيصال إلى عنوان بريدك الإلكتروني.
      </div>
    </div>
    <div uiAlert icon="info">
      <div uiAlertTitle>ميزة جديدة متاحة</div>
      <div uiAlertDescription>
        لقد أضفنا دعم الوضع الداكن. يمكنك تفعيله في إعدادات حسابك.
      </div>
    </div>
  </div>`,
})
export class AlertRtlComponent {}

export default AlertRtlComponent
