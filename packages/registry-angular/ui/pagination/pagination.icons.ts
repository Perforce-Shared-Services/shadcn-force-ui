// Inline Material Symbols Rounded SVGs — single swap point for pagination icons.
// Bypassing DomSanitizer is safe: these are bundled static strings, not user input.
//
// - previous  → `chevron_left`  (registry IconPlaceholder ChevronLeft)
// - next      → `chevron_right` (registry IconPlaceholder ChevronRight)
// - ellipsis  → `more_horiz`    (registry IconPlaceholder MoreHorizontal)

/** "Previous" glyph (chevron pointing left). */
export const PAGINATION_PREVIOUS_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m406-481 177 177q9 9 8.5 21t-9.5 21q-9 9-21.5 9t-21.5-9L341-460q-5-5-7-10t-2-11q0-6 2-11t7-10l199-199q9-9 21.5-9t21.5 9q9 9 9 21.5t-9 21.5L406-481Z"/></svg>`

/** "Next" glyph (chevron pointing right). */
export const PAGINATION_NEXT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M530-481 353-658q-9-9-8.5-21t9.5-21q9-9 21.5-9t21.5 9l198 198q5 5 7 10t2 11q0 6-2 11t-7 10L396-261q-9 9-21 8.5t-21-9.5q-9-9-9-21.5t9-21.5l176-176Z"/></svg>`

/** Collapsed-pages ellipsis glyph. */
export const PAGINATION_ELLIPSIS_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M207.86-432Q188-432 174-446.14t-14-34Q160-500 174.14-514t34-14Q228-528 242-513.86t14 34Q256-460 241.86-446t-34 14Zm272 0Q460-432 446-446.14t-14-34Q432-500 446.14-514t34-14Q500-528 514-513.86t14 34Q528-460 513.86-446t-34 14Zm272 0Q732-432 718-446.14t-14-34Q704-500 718.14-514t34-14Q772-528 786-513.86t14 34Q800-460 785.86-446t-34 14Z"/></svg>`
