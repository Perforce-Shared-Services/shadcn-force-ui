import { Button } from "@/styles/aria-force-ui/ui/button"
import { Spinner } from "@/styles/aria-force-ui/ui/spinner"

export default function ButtonLoading() {
  return (
    <div className="flex gap-2">
      <Button variant="outline" isDisabled>
        <Spinner data-icon="inline-start" />
        Generating
      </Button>
      <Button variant="secondary" isDisabled>
        Downloading
        <Spinner data-icon="inline-start" />
      </Button>
    </div>
  )
}
