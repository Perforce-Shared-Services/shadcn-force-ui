export function syncTheme() {
  const params = new URLSearchParams(window.location.search)
  const themeParam = params.get("theme")

  if (themeParam === "dark") {
    document.documentElement.classList.add("dark")
    return
  }
  if (themeParam === "light") {
    document.documentElement.classList.remove("dark")
    return
  }

  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.classList.add("dark")
  }

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    document.documentElement.classList.toggle("dark", e.matches)
  })

  window.addEventListener("message", (e) => {
    if (e.data?.type === "theme-change") {
      document.documentElement.classList.toggle("dark", e.data.theme === "dark")
    }
  })
}

export function reportOverlays() {
  if (window.parent === window) return

  const OVERLAY_SELECTOR =
    "[data-slot=dialog-overlay],[data-slot=alert-dialog-overlay],[data-slot=sheet-overlay],[data-slot=drawer-overlay]"

  let lastOpen = false
  const send = () => {
    const open = !!document.querySelector(OVERLAY_SELECTOR)
    if (open === lastOpen) return
    lastOpen = open
    window.parent.postMessage(
      { type: "preview-modal", state: open ? "open" : "closed" },
      "*"
    )
  }

  new MutationObserver(send).observe(document.body, { childList: true, subtree: true })
}

export function getComponentName(): string | null {
  const base = import.meta.env.BASE_URL ?? "/"
  const path = window.location.pathname.replace(
    new RegExp(`^${base.replace(/\/$/, "")}`),
    ""
  )
  const segments = path.split("/").filter(Boolean)
  return segments[0] || null
}
