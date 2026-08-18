/**
 * Single swap-point for carousel icons.
 *
 * Raw inline SVG from `@material-symbols/svg-400` (Material Symbols, weight
 * 400, Rounded style, outline = FILL 0) via the webpack `?raw` rule — the same
 * convention as every other ported component. Map to Figma by MEANING, not by
 * glyph name — the registry's lucide `ChevronLeftIcon`/`ChevronRightIcon`
 * become `chevron_left`/`chevron_right` here.
 *
 * To swap an icon, change the import here only.
 */
import chevronLeft from '@material-symbols/svg-400/rounded/chevron_left.svg?raw';
import chevronRight from '@material-symbols/svg-400/rounded/chevron_right.svg?raw';

/** Raw inline SVG for `CarouselPrevious`. */
export const CAROUSEL_PREVIOUS_SVG = chevronLeft;
/** Raw inline SVG for `CarouselNext`. */
export const CAROUSEL_NEXT_SVG = chevronRight;
