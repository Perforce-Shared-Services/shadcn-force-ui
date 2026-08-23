/**
 * Alert-dialog class definitions.
 *
 * Uses the shared `cn-alert-dialog*` CSS tokens from `style-force-ui.css`.
 * Classes that the React registry applies in TSX on top of the tokens
 * (overlay/content positioning) are kept here so Angular and React stay
 * visually identical.
 */

/** React adds `fixed inset-0 z-50` positioning on top of the token. */
export const alertDialogOverlayClass = "cn-alert-dialog-overlay fixed inset-0 z-50"

/**
 * React adds centering positioning (`fixed top-1/2 left-1/2 z-50 grid w-full
 * -translate-x-1/2 -translate-y-1/2 outline-none`) on top of the token. The
 * `group/alert-dialog-content` name is targeted by the header/footer/media
 * selectors inside the token classes.
 */
export const alertDialogContentClass =
  "cn-alert-dialog-content group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 outline-none"

export const alertDialogHeaderClass = "cn-alert-dialog-header"

export const alertDialogMediaClass = "cn-alert-dialog-media"

/** Force UI heading utility, same as the React title. */
export const alertDialogTitleClass = "cn-alert-dialog-title cn-font-heading [&_svg]:fill-current"

export const alertDialogDescriptionClass = "cn-alert-dialog-description"
