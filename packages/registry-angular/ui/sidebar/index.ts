// Angular port of @force-ui/sidebar — the composable app-shell sidebar
// (radix-force-ui style). Provider owns the shared state; `[uiSidebar]` hosts
// the mobile Sheet via radix-ng's dialog root; menu/group/layout parts are
// attribute directives riding native elements. Exported names mirror the
// registry.
export type {
  SidebarMenuButtonVariants,
  SidebarMenuButtonVariant,
  SidebarMenuButtonSize,
} from "./sidebar.variants"
export { sidebarMenuButtonVariants } from "./sidebar.variants"
export { injectIsMobile } from "./use-mobile"
export {
  SIDEBAR_CONTEXT,
  SidebarProviderComponent as SidebarProvider,
  injectSidebar,
  type SidebarState,
} from "./sidebar-provider.component"
export { SidebarComponent as Sidebar, type SidebarSide, type SidebarVariant, type SidebarCollapsible } from "./sidebar.component"
export {
  SidebarTriggerDirective as SidebarTrigger,
  SidebarRailComponent as SidebarRail,
  SidebarInsetComponent as SidebarInset,
  SidebarInputDirective as SidebarInput,
  SidebarHeaderDirective as SidebarHeader,
  SidebarFooterDirective as SidebarFooter,
  SidebarSeparatorDirective as SidebarSeparator,
  SidebarContentDirective as SidebarContent,
} from "./sidebar-layout.component"
export {
  SidebarGroupDirective as SidebarGroup,
  SidebarGroupLabelDirective as SidebarGroupLabel,
  SidebarGroupActionComponent as SidebarGroupAction,
  SidebarGroupContentDirective as SidebarGroupContent,
} from "./sidebar-group.component"
export {
  SidebarMenuDirective as SidebarMenu,
  SidebarMenuItemComponent as SidebarMenuItem,
  SidebarMenuButtonComponent as SidebarMenuButton,
  SidebarMenuActionComponent as SidebarMenuAction,
  SidebarMenuBadgeDirective as SidebarMenuBadge,
  SidebarMenuSkeletonComponent as SidebarMenuSkeleton,
  SidebarMenuSubDirective as SidebarMenuSub,
  SidebarMenuSubItemDirective as SidebarMenuSubItem,
  SidebarMenuSubButtonDirective as SidebarMenuSubButton,
} from "./sidebar-menu.component"
