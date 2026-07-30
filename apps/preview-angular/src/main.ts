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
import { getComponentName, reportOverlays, syncTheme } from "./preview-shell"

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

    const modules = import.meta.glob<{ default: Type<unknown> }>("./angular/*.ts")
    const modulePath = `./angular/${name}.ts`

    if (!modules[modulePath]) {
      this.outlet.element.nativeElement.insertAdjacentHTML(
        "afterend",
        `<p style='padding:1rem'>Angular component "${name}" not found.</p>`
      )
      return
    }

    const mod = await modules[modulePath]()
    this.outlet.createComponent(mod.default, { environmentInjector: this.injector })
  }
}

syncTheme()
reportOverlays()
bootstrapApplication(AppComponent)
