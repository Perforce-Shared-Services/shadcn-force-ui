/**
 * Message-scroller icon set — single swap point (see the icon-swap-strategy
 * memory / `button.icons.ts` for the convention). One glyph, rotated 180°
 * via CSS for the `start` direction rather than a second asset — same call
 * the registry itself makes with its rotated Lucide `ArrowDown`.
 */
import arrowDownward from '@material-symbols/svg-400/rounded/arrow_downward.svg?raw';

/** Raw inline SVG for `MessageScrollerButton` — rotated 180° when `direction="start"`. */
export const MESSAGE_SCROLLER_ARROW_SVG = arrowDownward;
