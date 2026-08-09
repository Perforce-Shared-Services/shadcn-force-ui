import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  InjectionToken,
  input,
  signal,
} from "@angular/core"

import { cn } from "@/lib/utils"

export type AvatarSize = "default" | "sm" | "lg"
export type AvatarImageStatus = "loading" | "loaded" | "error"

export const AVATAR_CONTEXT = new InjectionToken<AvatarComponent>("AvatarContext")

/**
 * Angular port of @force-ui/avatar (radix-force-ui style).
 *
 * Usage:
 *   <span uiAvatar>
 *     <img uiAvatarImage src="..." alt="Ada Lovelace" />
 *     <span uiAvatarFallback>AL</span>
 *   </span>
 *
 * AvatarImage listens to (load)/(error) and updates the shared status signal.
 * AvatarFallback is visible while the image is not yet loaded.
 */
@Component({
  selector: "span[uiAvatar]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: AVATAR_CONTEXT, useExisting: AvatarComponent }],
  host: {
    "data-slot": "avatar",
    "[attr.data-size]": "size()",
    "[class]": "classes()",
  },
})
export class AvatarComponent {
  readonly size = input<AvatarSize>("default")
  readonly className = input<string | undefined>(undefined, { alias: "class" })

  /** Shared image-loading status — updated by AvatarImageComponent. */
  readonly imageStatus = signal<AvatarImageStatus>("loading")

  protected readonly classes = computed(() =>
    cn(
      "cn-avatar group/avatar relative flex shrink-0 select-none after:absolute after:inset-0 after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten",
      this.className()
    )
  )
}

@Component({
  selector: "img[uiAvatarImage]",
  standalone: true,
  template: "",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "avatar-image",
    "[class]": "classes()",
    "(load)": "onLoad()",
    "(error)": "onError()",
  },
})
export class AvatarImageComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  private readonly ctx = inject(AVATAR_CONTEXT, { optional: true })

  protected readonly classes = computed(() =>
    cn("aspect-square size-full rounded-full object-cover", this.className())
  )

  protected onLoad() { this.ctx?.imageStatus.set("loaded") }
  protected onError() { this.ctx?.imageStatus.set("error") }
}

@Component({
  selector: "span[uiAvatarFallback]",
  standalone: true,
  template: `@if (ctx?.imageStatus() !== "loaded") {
  <ng-content />
}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "avatar-fallback",
    "[class]": "classes()",
  },
})
export class AvatarFallbackComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly ctx = inject(AVATAR_CONTEXT, { optional: true })

  protected readonly classes = computed(() =>
    cn(
      "flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs",
      this.className()
    )
  )
}

@Component({
  selector: "span[uiAvatarBadge]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "avatar-badge",
    "[class]": "classes()",
  },
})
export class AvatarBadgeComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    cn(
      "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-background select-none [&>svg]:fill-current",
      "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
      "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
      "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
      this.className()
    )
  )
}

@Component({
  selector: "div[uiAvatarGroup]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "avatar-group",
    "[class]": "classes()",
  },
})
export class AvatarGroupComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    cn("group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background", this.className())
  )
}

@Component({
  selector: "div[uiAvatarGroupCount]",
  standalone: true,
  template: "<ng-content />",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-slot": "avatar-group-count",
    "[class]": "classes()",
  },
})
export class AvatarGroupCountComponent {
  readonly className = input<string | undefined>(undefined, { alias: "class" })
  protected readonly classes = computed(() =>
    cn(
      "relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 [&>svg]:fill-current",
      this.className()
    )
  )
}
