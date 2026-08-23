import { cva, type VariantProps } from "class-variance-authority"

// Uses cn-native-select* tokens from style-force-ui.css.
// The compact size is keyed off the data-[size=sm] attribute inside the
// cn-native-select token (matches React), so the size variants are
// intentionally empty — components still emit data-size for parity with the
// React/Vue/Svelte siblings.
export const nativeSelectVariants = cva(
  "cn-native-select outline-none disabled:pointer-events-none disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        default: "",
        sm: "",
      },
    },
    defaultVariants: { size: "default" },
  }
)

export type NativeSelectVariants = VariantProps<typeof nativeSelectVariants>
export type NativeSelectSize = NonNullable<NativeSelectVariants["size"]>
