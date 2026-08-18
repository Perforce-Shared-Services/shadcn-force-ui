/**
 * Sidebar icon set — SINGLE SWAP POINT for the icon system.
 *
 * Only `SidebarTrigger` owns a built-in glyph (the registry's `IconPlaceholder
 * materialSymbols="left_panel_open"`, mapped by MEANING — the Figma sidebar
 * keeps its own icon). `cn-rtl-flip` (registry-verbatim) mirrors the glyph in
 * RTL layouts since "panel on the left" visually flips.
 */
import leftPanelOpen from '@material-symbols/svg-400/rounded/left_panel_open.svg?raw';

/** Raw inline SVG for the sidebar toggle trigger. */
export const SIDEBAR_TRIGGER_SVG = leftPanelOpen;
