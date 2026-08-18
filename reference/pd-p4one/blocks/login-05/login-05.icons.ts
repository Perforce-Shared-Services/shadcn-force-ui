/**
 * Login 05 block — SINGLE SWAP POINT for the block's own decorative glyph.
 *
 * Same convention as `button.icons.ts` / `accordion.icons.ts`: raw inline SVG,
 * injected as trusted HTML by the component. The upstream registry source
 * (`IconPlaceholder materialSymbols="stacks"`) is a generic placeholder — this
 * app replaces it with the real Perforce brand mark (Figma "The Force -
 * Resources" library, node 1:1253, "Theme=Brand, Style=Symbol"), fill swapped
 * to `currentColor` so it inherits the block's text color like every other
 * icon in this app.
 *
 * The Apple / Google brand marks below the fold are NOT routed through this
 * file — they're official vendor logos (fixed artwork, not part of the Force
 * UI icon set), so they stay as static inline `<svg>` markup directly in the
 * component template, copied verbatim from the shadcn registry source.
 */
const PERFORCE_MARK_SVG = `<svg viewBox="0 0 55 45" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill="currentColor" d="M37.4683 15.4442L32.3295 18.4122L33.6295 19.1634C35.1657 20.0495 35.3312 21.5213 35.3312 22.113C35.3312 22.7048 35.1657 24.1766 33.6295 25.0627L10.3758 38.4893C8.83971 39.3755 7.4814 38.7837 6.96936 38.4893C6.45731 38.195 5.26764 37.315 5.26764 35.5397V8.68331C5.26764 6.90801 6.45731 6.02802 6.96936 5.73367C7.4814 5.43932 8.83664 4.84756 10.3758 5.73367L16.5357 9.2904L21.8003 6.25185L13.0066 1.17431C10.29 -0.392494 7.04908 -0.392494 4.33554 1.17431C1.62199 2.74418 0 5.5497 0 8.68331V35.5366C0 38.6702 1.62199 41.4788 4.33554 43.0456C5.69384 43.8306 7.18092 44.22 8.67107 44.22C10.1612 44.22 11.6483 43.8275 13.0066 43.0456L36.2603 29.619C38.9738 28.0522 40.5958 25.2436 40.5958 22.11C40.5958 19.4731 39.446 17.0723 37.4683 15.4442Z"/>
  <path fill="currentColor" d="M16.6584 28.7789L21.7973 25.8108L20.4972 25.0596C18.9611 24.1735 18.7955 22.7018 18.7955 22.11C18.7955 21.5182 18.9611 20.0465 20.4972 19.1604L43.7509 5.7337C45.2871 4.84758 46.6454 5.43935 47.1574 5.7337C47.6694 6.02805 48.8591 6.90803 48.8591 8.68333V35.5367C48.8591 37.312 47.6694 38.192 47.1574 38.4863C46.6454 38.7807 45.2901 39.3724 43.7509 38.4863L37.591 34.9296L32.3264 37.9681L41.1202 43.0457C43.8337 44.6125 47.0777 44.6125 49.7912 43.0457C52.5048 41.4789 54.1268 38.6703 54.1268 35.5367V8.68333C54.1268 5.54973 52.5048 2.74114 49.7912 1.17434C48.4329 0.389401 46.9458 0 45.4557 0C43.9655 0 42.4785 0.392467 41.1202 1.17434L17.8665 14.601C15.1529 16.1678 13.5309 18.9764 13.5309 22.11C13.5309 24.7469 14.6808 27.1477 16.6584 28.7758V28.7789Z"/>
</svg>`;

/** Decorative brand-mark glyph shown above the "Welcome to Perforce" title. */
export const LOGIN_05_LOGO_SVG = PERFORCE_MARK_SVG;
