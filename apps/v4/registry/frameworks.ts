export const FRAMEWORKS = [
  {
    name: "react",
    title: "React",
    bases: ["base", "aria", "radix"], // [FORCE-UI] base default + react-aria
    registry: "@force-ui",
    // [FORCE-UI-START] framework identity metadata
    previewPackage: null,
    previewDir: null,
    devPort: null,
    demoExt: null,
    demoDir: null,
    registryPackage: null,
    previewStyle: null,
    // [FORCE-UI-END]
  },
  {
    name: "vue",
    title: "Vue",
    bases: ["vue"],
    registry: "@force-ui-vue",
    // [FORCE-UI-START] framework identity metadata
    previewPackage: "preview-vue",
    previewDir: "preview-vue",
    devPort: 3001,
    demoExt: "vue",
    demoDir: "vue",
    registryPackage: "registry-vue",
    previewStyle: "vue-force-ui",
    // [FORCE-UI-END]
  },
  {
    name: "svelte",
    title: "Svelte",
    bases: ["svelte"],
    registry: "@force-ui-svelte",
    // [FORCE-UI-START] framework identity metadata
    previewPackage: "preview-svelte",
    previewDir: "preview-svelte",
    devPort: 3002,
    demoExt: "svelte",
    demoDir: "svelte",
    registryPackage: "registry-svelte",
    previewStyle: "svelte-force-ui",
    // [FORCE-UI-END]
  },
  {
    name: "ember",
    title: "Ember",
    bases: ["ember"],
    registry: "@force-ui-ember",
    // [FORCE-UI-START] framework identity metadata
    previewPackage: "preview-ember",
    previewDir: "preview-ember",
    devPort: 3003,
    demoExt: "gts",
    demoDir: "ember",
    registryPackage: "registry-ember",
    previewStyle: "ember-force-ui",
    // [FORCE-UI-END]
  },
  // [FORCE-UI-START] angular framework port
  {
    name: "angular",
    title: "Angular",
    bases: ["angular"],
    registry: "@force-ui-angular",
    previewPackage: "preview-angular",
    previewDir: "preview-angular",
    devPort: 3004,
    demoExt: "ts",
    demoDir: "angular",
    registryPackage: "registry-angular",
    previewStyle: "angular-force-ui",
  },
  // [FORCE-UI-END]
] as const

export type Framework = (typeof FRAMEWORKS)[number]
export type FrameworkName = (typeof FRAMEWORKS)[number]["name"]

// [FORCE-UI-START] preview framework helpers derived from FRAMEWORKS
export const PREVIEW_FRAMEWORKS = FRAMEWORKS.filter(
  (f): f is Extract<Framework, { previewPackage: string }> =>
    f.previewPackage !== null
)

export type PreviewFramework = (typeof PREVIEW_FRAMEWORKS)[number]

export function isFrameworkName(v: string): v is FrameworkName {
  return (FRAMEWORKS as readonly Framework[]).some((f) => f.name === v)
}

export function isPreviewFramework(v: string): v is PreviewFramework["name"] {
  return PREVIEW_FRAMEWORKS.some((f) => f.name === v)
}

export function getPreviewFramework(
  name: string
): PreviewFramework | undefined {
  return PREVIEW_FRAMEWORKS.find((f) => f.name === name)
}
// [FORCE-UI-END]

const REACT_BASES = new Set(["radix", "base", "aria"]) // [FORCE-UI] react-aria

export function getFrameworkForBase(base: string): Framework {
  if (REACT_BASES.has(base)) {
    return FRAMEWORKS[0]
  }
  const fw = FRAMEWORKS.find((f) =>
    (f.bases as readonly string[]).includes(base)
  )
  return fw ?? FRAMEWORKS[0]
}

export function isReactBase(base: string): boolean {
  return REACT_BASES.has(base)
}

export function getDefaultBaseForFramework(framework: string): string {
  switch (framework) {
    case "react":
      return "base" // [FORCE-UI] base is the default react base
    case "vue":
      return "vue"
    case "svelte":
      return "svelte"
    case "ember":
      return "ember"
    case "angular": // [FORCE-UI]
      return "angular"
    default:
      return "radix"
  }
}

export function getRegistryForFramework(framework: string): string {
  const fw = FRAMEWORKS.find((f) => f.name === framework)
  return fw?.registry ?? "@force-ui"
}

export function getFrameworkByName(name: string): Framework {
  return FRAMEWORKS.find((f) => f.name === name) ?? FRAMEWORKS[0]
}
