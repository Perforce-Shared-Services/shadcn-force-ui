import { cva, type VariantProps } from "class-variance-authority"

/**
 * Angular port of the Force UI attachment CVA.
 *
 * Uses `cn-*` CSS tokens from `style-force-ui.css`; structural classes that
 * live outside the token system stay inline (mirroring the React registry
 * source). App-specific styling from the p4one reference (border-border,
 * motion-reduce guards, error-token swaps) stays at the component level —
 * see attachment.component.ts host strings.
 */

/** Lifecycle state — drives border/background color and the title's shimmer. */
export type AttachmentState = "idle" | "uploading" | "processing" | "error" | "done"

export const attachmentVariants = cva(
  "cn-attachment group/attachment relative flex max-w-full min-w-0 shrink-0 flex-wrap border bg-card text-card-foreground transition-colors has-[>a,>button]:hover:bg-muted/50 data-[state=error]:border-destructive/30 data-[state=idle]:border-dashed",
  {
    variants: {
      size: {
        default: "cn-attachment-size-default",
        sm: "cn-attachment-size-sm",
        xs: "cn-attachment-size-xs",
      },
      orientation: {
        horizontal: "cn-attachment-orientation-horizontal items-center",
        vertical: "cn-attachment-orientation-vertical flex-col",
      },
    },
  },
)

export type AttachmentVariants = VariantProps<typeof attachmentVariants>
export type AttachmentSize = NonNullable<AttachmentVariants["size"]>
export type AttachmentOrientation = NonNullable<AttachmentVariants["orientation"]>

export const attachmentMediaVariants = cva(
  // [&_svg]:fill-current per DIVERGENCES.md §button-2 — Material Symbols are fill-based.
  "cn-attachment-media relative flex aspect-square shrink-0 items-center justify-center overflow-hidden group-data-[state=error]/attachment:bg-destructive/10 group-data-[state=error]/attachment:text-destructive [&_svg]:pointer-events-none [&_svg]:fill-current",
  {
    variants: {
      variant: {
        icon: "",
        image:
          "cn-attachment-media-variant-image *:[img]:aspect-square *:[img]:w-full *:[img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "icon",
    },
  },
)

export type AttachmentMediaVariants = VariantProps<typeof attachmentMediaVariants>
export type AttachmentMediaVariant = NonNullable<AttachmentMediaVariants["variant"]>
