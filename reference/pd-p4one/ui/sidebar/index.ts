// Angular port of @force-ui/sidebar (radix-force-ui style) — a compound,
// non-radix primitive (no `@radix-ng/primitives/sidebar` exists; this is
// hand-built from native elements + the already-ported `ui/button`,
// `ui/separator`, `ui/sheet`, `ui/tooltip`, `ui/input`, `ui/skeleton`
// families, exactly like the registry composes `@/registry/.../ui/*`).
//
// Parity gaps (documented, intentional):
//  - `SidebarMenuButton`'s `tooltip` prop (auto-wraps in a `<Tooltip>`) has no
//    directive-only equivalent — an attribute-selector component can't add a
//    NEW parent element around its own host. Consumers compose the tooltip
//    manually; see `SidebarMenuButton`'s doc comment and the `WithTooltip`
//    story.
//  - The mobile (isMobile) branch can't render `[rdxSheetContent]` as a
//    static child of `Sidebar`'s host div (it only exists inside a
//    CDK-Dialog-portaled view) — `Sidebar` opens/closes it imperatively via
//    `SheetService`, driven by `SidebarProvider`'s `openMobile` state. See
//    `sidebar.component.ts`'s doc comment.
//  - The registry writes a `sidebar_state` cookie on every open/close but
//    never reads it back (that half lives in the surrounding Next.js SSR
//    layout, which this Angular app has no equivalent of). Reproduced
//    verbatim: write-only.
export {
  SidebarProviderComponent as SidebarProvider,
  SIDEBAR_CONTEXT,
  injectSidebar,
  type SidebarState,
} from './sidebar-provider.component';

export {
  SidebarComponent as Sidebar,
  type SidebarSide,
  type SidebarVariant,
  type SidebarCollapsible,
} from './sidebar.component';

export { SidebarTriggerComponent as SidebarTrigger } from './sidebar-trigger.component';
export { SidebarRailComponent as SidebarRail } from './sidebar-rail.component';
export { SidebarInsetComponent as SidebarInset } from './sidebar-inset.component';
export { SidebarInputComponent as SidebarInput } from './sidebar-input.component';

export {
  SidebarHeaderComponent as SidebarHeader,
  SidebarFooterComponent as SidebarFooter,
  SidebarContentComponent as SidebarContent,
  SidebarSeparatorComponent as SidebarSeparator,
} from './sidebar-layout.component';

export {
  SidebarGroupComponent as SidebarGroup,
  SidebarGroupLabelComponent as SidebarGroupLabel,
  SidebarGroupActionComponent as SidebarGroupAction,
  SidebarGroupContentComponent as SidebarGroupContent,
} from './sidebar-group.component';

export {
  SidebarMenuComponent as SidebarMenu,
  SidebarMenuItemComponent as SidebarMenuItem,
  SidebarMenuButtonComponent as SidebarMenuButton,
  SidebarMenuActionComponent as SidebarMenuAction,
  SidebarMenuBadgeComponent as SidebarMenuBadge,
  SidebarMenuSkeletonComponent as SidebarMenuSkeleton,
  SidebarMenuSubComponent as SidebarMenuSub,
  SidebarMenuSubItemComponent as SidebarMenuSubItem,
  SidebarMenuSubButtonComponent as SidebarMenuSubButton,
} from './sidebar-menu.component';

export {
  sidebarMenuButtonVariants,
  type SidebarMenuButtonVariants,
  type SidebarMenuButtonVariant,
  type SidebarMenuButtonSize,
} from './sidebar.variants';

export { injectIsMobile } from './use-mobile';
