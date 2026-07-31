import "./styles.css"
import {
  AfterViewInit,
  Component,
  EnvironmentInjector,
  inject,
  ViewChild,
  ViewContainerRef,
} from "@angular/core"
import { bootstrapApplication } from "@angular/platform-browser"
import { EXAMPLES } from "./examples"
import { getComponentName, reportOverlays, syncTheme } from "./preview-shell"

@Component({
  selector: "app-root",
  standalone: true,
  template: `<ng-container #outlet></ng-container>`,
})
class AppComponent implements AfterViewInit {
  @ViewChild("outlet", { read: ViewContainerRef }) outlet!: ViewContainerRef
  private injector = inject(EnvironmentInjector)

  ngAfterViewInit() {
    const name = getComponentName()
    if (!name) {
      this.outlet.element.nativeElement.insertAdjacentHTML(
        "afterend",
        "<p style='padding:1rem'>Usage: /preview/angular/{component-name}</p>"
      )
      return
    }

    const component = EXAMPLES[name]
    if (!component) {
      this.outlet.element.nativeElement.insertAdjacentHTML(
        "afterend",
        `<p style='padding:1rem'>Angular component "${name}" not found.</p>`
      )
      return
    }

    this.outlet.createComponent(component, { environmentInjector: this.injector })
  }
}

syncTheme()
reportOverlays()
bootstrapApplication(AppComponent)
