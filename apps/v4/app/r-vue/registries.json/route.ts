import { NextResponse } from "next/server"

import { buildRegistriesPayload } from "@/lib/force-ui-registries"
import { getAppUrl } from "@/lib/utils"

export const dynamic = "force-dynamic"

export async function GET() {
  // Use the configured public app URL (NEXT_PUBLIC_APP_URL), not the request
  // origin: behind a reverse proxy the request origin is the container's
  // internal bind (e.g. http://0.0.0.0:4000), which would advertise unusable
  // install URLs in the registries payload.
  return NextResponse.json(buildRegistriesPayload(getAppUrl(), "vue"))
}
