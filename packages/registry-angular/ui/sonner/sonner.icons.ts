// Single swap-point for Sonner status icons.
//
// Maps the registry `sonner.tsx` IconPlaceholder set (`materialSymbols` prop)
// to Material Symbols Rounded, FILL 1 (`-fill`) per the Figma "Sonner / Icon"
// component — toast icons render solid/filled:
//   success -> check_circle, info -> info, warning -> warning,
//   error -> dangerous, loading -> progress_activity (spun via CSS).
//
// Raw inline SVG strings (same treatment as `dialog.icons.ts`); injected into
// ngx-sonner's icon slots via sanitized `[innerHTML]`. Sizing/colour are
// class-driven (`size-4`, `fill-current`) on the wrapper span, so the
// `width`/`height` attributes are omitted here.
//
// Parity gap (cosmetic): ngx-sonner's internal `[data-icon] > svg` entrance
// fade targets a direct-child `<svg>`; the span wrapper makes it a grandchild,
// so icons appear without the 300ms fade.

/** Raw inline SVG for the success toast icon (Material Symbols check_circle, fill). */
export const SONNER_SUCCESS_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m421-389-98-98q-9-9-22-9t-23 10q-9 9-9 22t9 22l122 123q9 9 21 9t21-9l239-239q10-10 10-23t-10-23q-10-9-23.5-8.5T635-603L421-389Zm59 309q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Z"/></svg>`

/** Raw inline SVG for the info toast icon (Material Symbols info, fill). */
export const SONNER_INFO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M504.5-288.63q8.5-8.62 8.5-21.37v-180q0-12.75-8.68-21.38-8.67-8.62-21.5-8.62-12.82 0-21.32 8.62-8.5 8.63-8.5 21.38v180q0 12.75 8.68 21.37 8.67 8.63 21.5 8.63 12.82 0 21.32-8.63Zm-1-314.57q9.5-9.2 9.5-22.8 0-14.45-9.48-24.22-9.48-9.78-23.5-9.78t-23.52 9.78Q447-640.45 447-626q0 13.6 9.48 22.8 9.48 9.2 23.5 9.2t23.52-9.2ZM480.27-80q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.31-127 86Q563-80 480.27-80Z"/></svg>`

/** Raw inline SVG for the warning toast icon (Material Symbols warning, fill). */
export const SONNER_WARNING_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M92-120q-9 0-15.5-4T66-135q-4-7-4.5-14.5T66-165l388-670q5-8 11.5-11.5T480-850q8 0 14.5 3.5T506-835l388 670q5 8 4.5 15.5T894-135q-4 7-10.5 11t-15.5 4H92Zm413.5-125.5Q514-254 514-267t-8.5-21.5Q497-297 484-297t-21.5 8.5Q454-280 454-267t8.5 21.5Q471-237 484-237t21.5-8.5Zm0-111Q514-365 514-378v-164q0-13-8.5-21.5T484-572q-13 0-21.5 8.5T454-542v164q0 13 8.5 21.5T484-348q13 0 21.5-8.5Z"/></svg>`

/** Raw inline SVG for the error toast icon (Material Symbols dangerous, fill). */
export const SONNER_ERROR_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M355-120q-12 0-23.5-5T312-138L138-312q-8-8-13-19.5t-5-23.5v-250q0-12 5-23.5t13-19.5l174-174q8-8 19.5-13t23.5-5h250q12 0 23.5 5t19.5 13l174 174q8 8 13 19.5t5 23.5v250q0 12-5 23.5T822-312L648-138q-8 8-19.5 13t-23.5 5H355Zm125-318 102 102q9 9 21 9t21-9q9-9 9-21t-9-21L522-480l102-102q9-9 9-21t-9-21q-9-9-21-9t-21 9L480-522 378-624q-9-9-21-9t-21 9q-9 9-9 21t9 21l102 102-102 102q-9 9-9 21t9 21q9 9 21 9t21-9l102-102Z"/></svg>`

/** Raw inline SVG for the loading toast icon (Material Symbols progress_activity, fill; spun via CSS). */
export const SONNER_LOADING_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M323-111q-73-31-127-85t-85-127q-31-73-31-157t31-157q31-73 85-127t127-85q73-31 157-31 12 0 21 9t9 21q0 12-9 21t-21 9q-141 0-240.5 99.5T140-480q0 141 99.5 240.5T480-140q141 0 240.5-99.5T820-480q0-12 9-21t21-9q12 0 21 9t9 21q0 84-31 157t-85 127q-54 54-127 85T480-80q-84 0-157-31Z"/></svg>`
