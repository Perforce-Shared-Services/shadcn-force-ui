import type { Registry } from "shadcn/schema"

export const blocks: Registry["items"] = [
  {
    name: "login-01",
    type: "registry:block",
    description: "A simple login form.",
    registryDependencies: ["button", "card", "field", "input"],
    files: [
      {
        path: "blocks/login-01/LoginPage.vue",
        target: "login-01/page.vue",
        type: "registry:page",
      },
      {
        path: "blocks/login-01/LoginForm.vue",
        type: "registry:component",
      },
    ],
  },
  {
    name: "login-02",
    type: "registry:block",
    description: "A login form with a split screen layout.",
    registryDependencies: ["button", "field", "input", "label"],
    files: [
      {
        path: "blocks/login-02/LoginPage.vue",
        target: "login-02/page.vue",
        type: "registry:page",
      },
      {
        path: "blocks/login-02/LoginForm.vue",
        type: "registry:component",
      },
    ],
  },
  {
    name: "login-03",
    type: "registry:block",
    description: "A login form with social auth options.",
    registryDependencies: ["button", "card", "field", "input", "label"],
    files: [
      {
        path: "blocks/login-03/LoginPage.vue",
        target: "login-03/page.vue",
        type: "registry:page",
      },
      {
        path: "blocks/login-03/LoginForm.vue",
        type: "registry:component",
      },
    ],
  },
  {
    name: "login-04",
    type: "registry:block",
    description: "A login form with an image panel.",
    registryDependencies: ["button", "card", "field", "input", "label"],
    files: [
      {
        path: "blocks/login-04/LoginPage.vue",
        target: "login-04/page.vue",
        type: "registry:page",
      },
      {
        path: "blocks/login-04/LoginForm.vue",
        type: "registry:component",
      },
    ],
  },
  {
    name: "login-05",
    type: "registry:block",
    description: "A centered login form.",
    registryDependencies: ["button", "field", "input", "label"],
    files: [
      {
        path: "blocks/login-05/LoginPage.vue",
        target: "login-05/page.vue",
        type: "registry:page",
      },
      {
        path: "blocks/login-05/LoginForm.vue",
        type: "registry:component",
      },
    ],
  },
  {
    name: "signup-01",
    type: "registry:block",
    description: "A simple signup form.",
    registryDependencies: ["button", "card", "field", "input"],
    files: [
      {
        path: "blocks/signup-01/SignupPage.vue",
        target: "signup-01/page.vue",
        type: "registry:page",
      },
      {
        path: "blocks/signup-01/SignupForm.vue",
        type: "registry:component",
      },
    ],
  },
  {
    name: "signup-02",
    type: "registry:block",
    description: "A signup form with a split screen layout.",
    registryDependencies: ["button", "field", "input", "label"],
    files: [
      {
        path: "blocks/signup-02/SignupPage.vue",
        target: "signup-02/page.vue",
        type: "registry:page",
      },
      {
        path: "blocks/signup-02/SignupForm.vue",
        type: "registry:component",
      },
    ],
  },
  {
    name: "signup-03",
    type: "registry:block",
    description: "A signup form with a two column password row.",
    registryDependencies: ["button", "card", "field", "input", "label"],
    files: [
      {
        path: "blocks/signup-03/SignupPage.vue",
        target: "signup-03/page.vue",
        type: "registry:page",
      },
      {
        path: "blocks/signup-03/SignupForm.vue",
        type: "registry:component",
      },
    ],
  },
  {
    name: "signup-04",
    type: "registry:block",
    description: "A signup form with an image panel.",
    registryDependencies: ["button", "card", "field", "input", "label"],
    files: [
      {
        path: "blocks/signup-04/SignupPage.vue",
        target: "signup-04/page.vue",
        type: "registry:page",
      },
      {
        path: "blocks/signup-04/SignupForm.vue",
        type: "registry:component",
      },
    ],
  },
  {
    name: "signup-05",
    type: "registry:block",
    description: "A centered signup form.",
    registryDependencies: ["button", "field", "input", "label"],
    files: [
      {
        path: "blocks/signup-05/SignupPage.vue",
        target: "signup-05/page.vue",
        type: "registry:page",
      },
      {
        path: "blocks/signup-05/SignupForm.vue",
        type: "registry:component",
      },
    ],
  },
  {
    name: "sidebar-01",
    type: "registry:block",
    description: "A simple sidebar with navigation groups.",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "skeleton",
    ],
    files: [
      {
        path: "blocks/sidebar-01/SidebarPage.vue",
        target: "sidebar-01/page.vue",
        type: "registry:page",
      },
      {
        path: "blocks/sidebar-01/AppSidebar.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-01/SearchForm.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-01/VersionSwitcher.vue",
        type: "registry:component",
      },
    ],
  },
  {
    name: "sidebar-02",
    type: "registry:block",
    description: "A sidebar with collapsible sections.",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "skeleton",
    ],
    files: [
      {
        path: "blocks/sidebar-02/SidebarPage.vue",
        target: "sidebar-02/page.vue",
        type: "registry:page",
      },
      {
        path: "blocks/sidebar-02/AppSidebar.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-02/SearchForm.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-02/VersionSwitcher.vue",
        type: "registry:component",
      },
    ],
  },
  {
    name: "sidebar-03",
    type: "registry:block",
    description: "A sidebar with sub-components nested in a collapsible group.",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "skeleton",
    ],
    files: [
      {
        path: "blocks/sidebar-03/SidebarPage.vue",
        target: "sidebar-03/page.vue",
        type: "registry:page",
      },
      {
        path: "blocks/sidebar-03/AppSidebar.vue",
        type: "registry:component",
      },
    ],
  },
  {
    name: "sidebar-04",
    type: "registry:block",
    description: "A floating sidebar with sub-components.",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "skeleton",
    ],
    files: [
      {
        path: "blocks/sidebar-04/SidebarPage.vue",
        target: "sidebar-04/page.vue",
        type: "registry:page",
      },
      {
        path: "blocks/sidebar-04/AppSidebar.vue",
        type: "registry:component",
      },
    ],
  },
  {
    name: "sidebar-05",
    type: "registry:block",
    description: "A sidebar with collapsible submenus.",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "skeleton",
    ],
    files: [
      {
        path: "blocks/sidebar-05/SidebarPage.vue",
        target: "sidebar-05/page.vue",
        type: "registry:page",
      },
      {
        path: "blocks/sidebar-05/AppSidebar.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-05/SearchForm.vue",
        type: "registry:component",
      },
    ],
  },
  {
    name: "sidebar-06",
    type: "registry:block",
    description: "A sidebar with a footer and opt-in form.",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "skeleton",
    ],
    files: [
      {
        path: "blocks/sidebar-06/SidebarPage.vue",
        target: "sidebar-06/page.vue",
        type: "registry:page",
      },
      {
        path: "blocks/sidebar-06/AppSidebar.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-06/NavMain.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-06/SidebarOptInForm.vue",
        type: "registry:component",
      },
    ],
  },
  {
    name: "sidebar-07",
    type: "registry:block",
    description: "A sidebar with a header, content, footer, and rail (collapsible to icons).",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "skeleton",
    ],
    files: [
      {
        path: "blocks/sidebar-07/SidebarPage.vue",
        target: "sidebar-07/page.vue",
        type: "registry:page",
      },
      {
        path: "blocks/sidebar-07/AppSidebar.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-07/NavMain.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-07/NavProjects.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-07/NavUser.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-07/TeamSwitcher.vue",
        type: "registry:component",
      },
    ],
  },
  {
    name: "sidebar-08",
    type: "registry:block",
    description: "An inset sidebar with secondary navigation menus.",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "skeleton",
    ],
    files: [
      {
        path: "blocks/sidebar-08/SidebarPage.vue",
        target: "sidebar-08/page.vue",
        type: "registry:page",
      },
      {
        path: "blocks/sidebar-08/AppSidebar.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-08/NavMain.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-08/NavProjects.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-08/NavSecondary.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-08/NavUser.vue",
        type: "registry:component",
      },
    ],
  },
  {
    name: "sidebar-09",
    type: "registry:block",
    description: "A sidebar with a dual layout (icon rail + panel).",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "skeleton",
    ],
    files: [
      {
        path: "blocks/sidebar-09/SidebarPage.vue",
        target: "sidebar-09/page.vue",
        type: "registry:page",
      },
      {
        path: "blocks/sidebar-09/AppSidebar.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-09/NavUser.vue",
        type: "registry:component",
      },
    ],
  },
  {
    name: "sidebar-10",
    type: "registry:block",
    description: "A sidebar in a pop-over dialog with favorites, workspaces and actions.",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "skeleton",
    ],
    files: [
      {
        path: "blocks/sidebar-10/SidebarPage.vue",
        target: "sidebar-10/page.vue",
        type: "registry:page",
      },
      {
        path: "blocks/sidebar-10/AppSidebar.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-10/NavActions.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-10/NavFavorites.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-10/NavMain.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-10/NavSecondary.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-10/NavWorkspaces.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-10/TeamSwitcher.vue",
        type: "registry:component",
      },
    ],
  },
  {
    name: "sidebar-11",
    type: "registry:block",
    description: "A sidebar with a collapsible file tree.",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "skeleton",
    ],
    files: [
      {
        path: "blocks/sidebar-11/SidebarPage.vue",
        target: "sidebar-11/page.vue",
        type: "registry:page",
      },
      {
        path: "blocks/sidebar-11/AppSidebar.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-11/TreeItem.vue",
        type: "registry:component",
      },
    ],
  },
  {
    name: "sidebar-12",
    type: "registry:block",
    description: "A sidebar with a calendar.",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "skeleton",
    ],
    files: [
      {
        path: "blocks/sidebar-12/SidebarPage.vue",
        target: "sidebar-12/page.vue",
        type: "registry:page",
      },
      {
        path: "blocks/sidebar-12/AppSidebar.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-12/Calendars.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-12/DatePicker.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-12/NavUser.vue",
        type: "registry:component",
      },
    ],
  },
  {
    name: "sidebar-13",
    type: "registry:block",
    description: "A settings dialog built on top of the sidebar.",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "skeleton",
    ],
    files: [
      {
        path: "blocks/sidebar-13/SettingsPage.vue",
        target: "sidebar-13/page.vue",
        type: "registry:page",
      },
      {
        path: "blocks/sidebar-13/SettingsDialog.vue",
        type: "registry:component",
      },
    ],
  },
  {
    name: "sidebar-14",
    type: "registry:block",
    description: "A right-side sidebar with sub-nested navigation.",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "skeleton",
    ],
    files: [
      {
        path: "blocks/sidebar-14/SidebarPage.vue",
        target: "sidebar-14/page.vue",
        type: "registry:page",
      },
      {
        path: "blocks/sidebar-14/AppSidebar.vue",
        type: "registry:component",
      },
    ],
  },
  {
    name: "sidebar-15",
    type: "registry:block",
    description: "Left/right sidebars with calendar support.",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "skeleton",
    ],
    files: [
      {
        path: "blocks/sidebar-15/SidebarPage.vue",
        target: "sidebar-15/page.vue",
        type: "registry:page",
      },
      {
        path: "blocks/sidebar-15/Calendars.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-15/DatePicker.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-15/NavFavorites.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-15/NavMain.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-15/NavSecondary.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-15/NavUser.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-15/NavWorkspaces.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-15/SidebarLeft.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-15/SidebarRight.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-15/TeamSwitcher.vue",
        type: "registry:component",
      },
    ],
  },
  {
    name: "sidebar-16",
    type: "registry:block",
    description: "A sidebar with a sticky site header and search form.",
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "skeleton",
    ],
    files: [
      {
        path: "blocks/sidebar-16/SidebarPage.vue",
        target: "sidebar-16/page.vue",
        type: "registry:page",
      },
      {
        path: "blocks/sidebar-16/AppSidebar.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-16/NavMain.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-16/NavProjects.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-16/NavSecondary.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-16/NavUser.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-16/SearchForm.vue",
        type: "registry:component",
      },
      {
        path: "blocks/sidebar-16/SiteHeader.vue",
        type: "registry:component",
      },
    ],
  },
  {
    name: "dashboard-01",
    type: "registry:block",
    description: "A dashboard with sidebar, charts and data table.",
    dependencies: ["zod", "@tanstack/vue-table", "@unovis/vue"],
    registryDependencies: [
      "sidebar",
      "breadcrumb",
      "separator",
      "label",
      "chart",
      "card",
      "select",
      "tabs",
      "table",
      "toggle-group",
      "badge",
      "button",
      "checkbox",
      "dropdown-menu",
      "drawer",
      "input",
      "avatar",
      "sheet",
      "sonner",
    ],
    files: [
      {
        path: "blocks/dashboard-01/DashboardPage.vue",
        target: "dashboard-01/page.vue",
        type: "registry:page",
      },
      {
        path: "blocks/dashboard-01/data.json",
        target: "dashboard-01/data.json",
        type: "registry:file",
      },
      {
        path: "blocks/dashboard-01/AppSidebar.vue",
        type: "registry:component",
      },
      {
        path: "blocks/dashboard-01/ChartAreaInteractive.vue",
        type: "registry:component",
      },
      {
        path: "blocks/dashboard-01/DataTable.vue",
        type: "registry:component",
      },
      {
        path: "blocks/dashboard-01/NavDocuments.vue",
        type: "registry:component",
      },
      {
        path: "blocks/dashboard-01/NavMain.vue",
        type: "registry:component",
      },
      {
        path: "blocks/dashboard-01/NavSecondary.vue",
        type: "registry:component",
      },
      {
        path: "blocks/dashboard-01/NavUser.vue",
        type: "registry:component",
      },
      {
        path: "blocks/dashboard-01/SectionCards.vue",
        type: "registry:component",
      },
      {
        path: "blocks/dashboard-01/SiteHeader.vue",
        type: "registry:component",
      },
    ],
  },
]
