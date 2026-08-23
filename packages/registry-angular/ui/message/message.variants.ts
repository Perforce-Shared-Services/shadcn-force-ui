import { cva, type VariantProps } from "class-variance-authority"

// [FORCE-UI] cn-message* tokens from style-force-ui.css — never expanded Tailwind.
export const messageVariants = cva(
  "cn-message group/message relative flex w-full min-w-0 data-[align=end]:flex-row-reverse",
  {
    variants: {
      align: {
        start: "",
        end: "",
      },
    },
    defaultVariants: {
      align: "start",
    },
  }
)

export const messageGroupVariants = cva("cn-message-group flex min-w-0 flex-col")

export const messageAvatarVariants = cva(
  "cn-message-avatar flex w-fit shrink-0 items-center justify-center self-end overflow-hidden rounded-full bg-muted"
)

export const messageContentVariants = cva(
  "cn-message-content flex w-full min-w-0 flex-col wrap-break-word"
)

export const messageHeaderVariants = cva(
  "cn-message-header flex max-w-full min-w-0 items-center"
)

// p4one adds a footer `variant` input ("text" | "action") so MessageAvatar's
// sibling group-has selectors can compensate each footer's height exactly;
// upstream has no variant prop. Component-level addition, kept out of the token.
export const messageFooterVariants = cva(
  "cn-message-footer flex max-w-full min-w-0 items-center group-data-[align=end]/message:justify-end"
)

export type MessageVariants = VariantProps<typeof messageVariants>
export type MessageAlign = NonNullable<MessageVariants["align"]>
export type MessageFooterVariant = "text" | "action"
