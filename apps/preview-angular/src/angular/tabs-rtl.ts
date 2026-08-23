import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/angular-ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/angular-ui/tabs"
import { Component } from "@angular/core"

// apps/v4/examples/base/tabs-rtl.tsx — static Arabic rendering of the ar
// translation (Angular previews have no language-switcher hook; the React
// version cycles en/ar/he). Full panel composition is preserved so RTL panel
// behaviour is demonstrated.
@Component({
  selector: "preview-tabs-rtl",
  standalone: true,
  imports: [Tabs, TabsList, TabsTrigger, TabsContent, Card, CardHeader, CardTitle, CardDescription, CardContent],
  template: `
    <div uiTabs defaultValue="overview" dir="rtl" class="w-full max-w-sm">
      <div uiTabsList dir="rtl" class="w-full">
        <button uiTabsTrigger value="overview">نظرة عامة</button>
        <button uiTabsTrigger value="analytics">التحليلات</button>
        <button uiTabsTrigger value="reports">التقارير</button>
        <button uiTabsTrigger value="settings">الإعدادات</button>
      </div>
      <div uiTabsContent value="overview">
        <div uiCard dir="rtl">
          <div uiCardHeader>
            <div uiCardTitle>نظرة عامة</div>
            <div uiCardDescription>
              عرض مقاييسك الرئيسية وأنشطة المشروع الأخيرة. تتبع التقدم عبر جميع
              مشاريعك النشطة.
            </div>
          </div>
          <div uiCardContent class="text-sm text-muted-foreground">
            لديك ١٢ مشروعًا نشطًا و٣ مهام معلقة.
          </div>
        </div>
      </div>
      <div uiTabsContent value="analytics">
        <div uiCard dir="rtl">
          <div uiCardHeader>
            <div uiCardTitle>التحليلات</div>
            <div uiCardDescription>
              تتبع مقاييس الأداء ومشاركة المستخدمين. راقب الاتجاهات وحدد فرص
              النمو.
            </div>
          </div>
          <div uiCardContent class="text-sm text-muted-foreground">
            زادت مشاهدات الصفحة بنسبة ٢٥٪ مقارنة بالشهر الماضي.
          </div>
        </div>
      </div>
      <div uiTabsContent value="reports">
        <div uiCard dir="rtl">
          <div uiCardHeader>
            <div uiCardTitle>التقارير</div>
            <div uiCardDescription>
              إنشاء وتنزيل تقاريرك التفصيلية. تصدير البيانات بتنسيقات متعددة
              للتحليل.
            </div>
          </div>
          <div uiCardContent class="text-sm text-muted-foreground">
            لديك ٥ تقارير جاهزة ومتاحة للتصدير.
          </div>
        </div>
      </div>
      <div uiTabsContent value="settings">
        <div uiCard dir="rtl">
          <div uiCardHeader>
            <div uiCardTitle>الإعدادات</div>
            <div uiCardDescription>
              إدارة تفضيلات حسابك وخياراته. تخصيص تجربتك لتناسب احتياجاتك.
            </div>
          </div>
          <div uiCardContent class="text-sm text-muted-foreground">
            تكوين الإشعارات والأمان والسمات.
          </div>
        </div>
      </div>
    </div>
  `,
})
export class TabsRtlComponent {}

export default TabsRtlComponent
