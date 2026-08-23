import { Component } from "@angular/core"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuContentAnchor,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/angular-ui/navigation-menu"

// apps/v4/examples/base/navigation-menu-rtl.tsx — the React example drives
// dir/labels from the language-selector translations (ar). Static Arabic
// labels + dir="rtl" render the same visual state (same convention as
// dropdown-menu-rtl.ts).
@Component({
  selector: "preview-navigation-menu-rtl",
  standalone: true,
  imports: [
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContentAnchor,
    NavigationMenuContent,
    NavigationMenuLink,
    NavigationMenuViewport,
  ],
  template: `<div uiNavigationMenu dir="rtl">
  <ul uiNavigationMenuList>
    <li uiNavigationMenuItem value="getting-started">
      <button uiNavigationMenuTrigger>البدء</button>
      <ng-template uiNavigationMenuContent>
        <div uiNavigationMenuContent>
          <ul class="w-96">
            <li>
              <a uiNavigationMenuLink href="/docs">
                <div class="flex flex-col gap-1 text-sm">
                  <div class="leading-none font-medium">مقدمة</div>
                  <div class="line-clamp-2 text-muted-foreground">مكونات قابلة لإعادة الاستخدام مبنية باستخدام Tailwind CSS.</div>
                </div>
              </a>
            </li>
            <li>
              <a uiNavigationMenuLink href="/docs/installation">
                <div class="flex flex-col gap-1 text-sm">
                  <div class="leading-none font-medium">التثبيت</div>
                  <div class="line-clamp-2 text-muted-foreground">كيفية تثبيت التبعيات وتنظيم تطبيقك.</div>
                </div>
              </a>
            </li>
            <li>
              <a uiNavigationMenuLink href="/docs/primitives/typography">
                <div class="flex flex-col gap-1 text-sm">
                  <div class="leading-none font-medium">الطباعة</div>
                  <div class="line-clamp-2 text-muted-foreground">أنماط للعناوين والفقرات والقوائم...إلخ</div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </ng-template>
    </li>

    <li uiNavigationMenuItem value="components" class="hidden md:flex">
      <button uiNavigationMenuTrigger>المكونات</button>
      <ng-template uiNavigationMenuContent>
        <div uiNavigationMenuContent>
          <ul class="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
            <li>
              <a uiNavigationMenuLink href="/docs/primitives/alert-dialog">
                <div class="flex flex-col gap-1 text-sm">
                  <div class="leading-none font-medium">حوار التنبيه</div>
                  <div class="line-clamp-2 text-muted-foreground">حوار نافذة يقطع المستخدم بمحتوى مهم ويتوقع استجابة.</div>
                </div>
              </a>
            </li>
            <li>
              <a uiNavigationMenuLink href="/docs/primitives/hover-card">
                <div class="flex flex-col gap-1 text-sm">
                  <div class="leading-none font-medium">بطاقة التحويم</div>
                  <div class="line-clamp-2 text-muted-foreground">للمستخدمين المبصرين لمعاينة المحتوى المتاح خلف الرابط.</div>
                </div>
              </a>
            </li>
            <li>
              <a uiNavigationMenuLink href="/docs/primitives/progress">
                <div class="flex flex-col gap-1 text-sm">
                  <div class="leading-none font-medium">التقدم</div>
                  <div class="line-clamp-2 text-muted-foreground">يعرض مؤشرًا يوضح تقدم إتمام المهمة، عادةً يتم عرضه كشريط تقدم.</div>
                </div>
              </a>
            </li>
            <li>
              <a uiNavigationMenuLink href="/docs/primitives/scroll-area">
                <div class="flex flex-col gap-1 text-sm">
                  <div class="leading-none font-medium">منطقة التمرير</div>
                  <div class="line-clamp-2 text-muted-foreground">يفصل المحتوى بصريًا أو دلاليًا.</div>
                </div>
              </a>
            </li>
            <li>
              <a uiNavigationMenuLink href="/docs/primitives/tabs">
                <div class="flex flex-col gap-1 text-sm">
                  <div class="leading-none font-medium">التبويبات</div>
                  <div class="line-clamp-2 text-muted-foreground">مجموعة من أقسام المحتوى المتعددة الطبقات—المعروفة بألواح التبويب—التي يتم عرضها واحدة في كل مرة.</div>
                </div>
              </a>
            </li>
            <li>
              <a uiNavigationMenuLink href="/docs/primitives/tooltip">
                <div class="flex flex-col gap-1 text-sm">
                  <div class="leading-none font-medium">تلميح</div>
                  <div class="line-clamp-2 text-muted-foreground">نافذة منبثقة تعرض معلومات متعلقة بعنصر عندما يتلقى العنصر التركيز على لوحة المفاتيح أو عند تحويم الماوس فوقه.</div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </ng-template>
    </li>

    <li uiNavigationMenuItem value="with-icon">
      <button uiNavigationMenuTrigger>مع أيقونة</button>
      <ng-template uiNavigationMenuContent>
        <div uiNavigationMenuContent>
          <ul class="grid w-[200px]">
            <li>
              <a uiNavigationMenuLink href="#" class="flex-row items-center gap-2 [&_svg]:fill-current">
                <svg aria-hidden="true" class="size-4" [innerHTML]="circleAlert"></svg>
                قائمة الانتظار
              </a>
              <a uiNavigationMenuLink href="#" class="flex-row items-center gap-2 [&_svg]:fill-current">
                <svg aria-hidden="true" class="size-4" [innerHTML]="circleDashed"></svg>
                المهام
              </a>
              <a uiNavigationMenuLink href="#" class="flex-row items-center gap-2 [&_svg]:fill-current">
                <svg aria-hidden="true" class="size-4" [innerHTML]="circleCheck"></svg>
                منجز
              </a>
            </li>
          </ul>
        </div>
      </ng-template>
    </li>

    <li uiNavigationMenuItem value="docs">
      <a uiNavigationMenuLink href="/docs" [class]="triggerStyle">الوثائق</a>
    </li>
  </ul>
  <div uiNavigationMenuViewport></div>
</div>`,
})
export class NavigationMenuRtlComponent {
  protected readonly circleAlert = CIRCLE_ALERT_SVG
  protected readonly circleDashed = CIRCLE_DASHED_SVG
  protected readonly circleCheck = CIRCLE_CHECK_SVG
  protected readonly triggerStyle = navigationMenuTriggerStyle()
}

// Material Symbols inline SVGs (same paths as navigation-menu-demo.ts).
const CIRCLE_ALERT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>`
const CIRCLE_DASHED_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-80q-26 0-51-2t-49-8l14-80q22 5 43 7.5t43 2.5v80Zm80 0v-80q22-1 42.5-6.5T644-181l24 77q-27 9-55.5 15.5T560-80Zm164-45-37-68q19-11 36-25.5t32-31.5l58 56q-20 21-43 39.5T724-125Zm116-142-70-41q10-18 16.5-38t9.5-42l82 6q-4 31-14.5 59.5T840-267ZM862-420h-82q-2-22-8-42.5T757-500l72-42q13 23 21 48t12 74Zm-105-166q-11-19-25-35t-30-29l54-64q21 19 39 42t30 50l-68 36ZM160-260q-19-27-33-57t-21-63l81-11q5 25 14.5 47T224-303L160-260Zm-53-180q1-17 3.5-34t8.5-34l80 20q-4 15-6 29t-3 29l-83-10Zm92-186q16-22 36-41.5T277-700l55 61q-16 14-30 30.5T277-573l-78-53Zm243-93q-24 5-46 13.5T353-704l-42-71q26-16 55-27.5t60-17.5l-19 74Zm138 2-20-76q31-5 62-5t62 5l-20 76q-21-4-42-4t-42 4Z"/></svg>`
const CIRCLE_CHECK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>`

export default NavigationMenuRtlComponent
