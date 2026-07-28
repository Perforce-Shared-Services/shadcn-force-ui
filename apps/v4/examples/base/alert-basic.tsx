import { CheckCircle2Icon } from "@/examples/material-symbols"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/bases/base/ui/alert"

export default function AlertBasic() {
  return (
    <Alert className="max-w-md">
      <CheckCircle2Icon />
      <AlertTitle>Account updated successfully</AlertTitle>
      <AlertDescription>
        Your profile information has been saved. Changes will be reflected
        immediately.
      </AlertDescription>
    </Alert>
  )
}
