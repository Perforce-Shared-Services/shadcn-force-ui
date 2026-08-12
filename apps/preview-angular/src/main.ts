// [FORCE-UI] zone.js must load before @angular/core, or bootstrapApplication
// throws NG0908 ("Angular requires Zone.js") and nothing renders at all. This
// app is a plain Vite SPA, so there is no angular.json "polyfills" entry to
// supply it - the import has to be here, and first.
import "zone.js"
import "./styles.css"

import {
  AfterViewInit,
  Component,
  EnvironmentInjector,
  inject,
  Type,
  ViewChild,
  ViewContainerRef,
} from "@angular/core"
import { bootstrapApplication } from "@angular/platform-browser"
import {
  getComponentName,
  reportOverlays,
  syncTheme,
} from "@force-ui/preview-shell"

const modules = import.meta.glob("./angular/*.ts")

@Component({
  selector: "app-root",
  standalone: true,
  template: `<ng-container #outlet></ng-container>`,
})
class AppComponent implements AfterViewInit {
  @ViewChild("outlet", { read: ViewContainerRef }) outlet!: ViewContainerRef
  private injector = inject(EnvironmentInjector)

  async ngAfterViewInit() {
    const name = getComponentName()
    if (!name) {
      this.outlet.element.nativeElement.insertAdjacentHTML(
        "afterend",
        "<p style='padding:1rem'>Usage: /preview/angular/{component-name}</p>"
      )
      return
    }

    const modulePath = `./angular/${name}.ts`
    const loadModule = modules[modulePath]
    if (!loadModule) {
      this.outlet.element.nativeElement.insertAdjacentHTML(
        "afterend",
        `<p style='padding:1rem'>Angular component "${name}" not found.</p>`
      )
      return
    }

    const mod = (await loadModule()) as { default: Type<unknown> }
    this.outlet.createComponent(mod.default, {
      environmentInjector: this.injector,
    })
  }
}

syncTheme()
reportOverlays()
bootstrapApplication(AppComponent)
