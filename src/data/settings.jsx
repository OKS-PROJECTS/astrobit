const crumb = (trail, current) => ({ trail: trail.map((t) => ({ label: t })), current });

const opt = (arr) => arr.map((v) => ({ label: v, value: v }));

export const SETTINGS_CONFIGS = {
  "/settings/general": {
    title: "Settings",
    subtitle: "Workspace configuration and defaults.",
    breadcrumb: crumb(["Settings"], "General"),
    groups: [
      {
        key: "workspace",
        label: "Workspace",
        description: "How Astrobit appears to everyone in this workspace.",
        fields: [
          { type: "text", name: "name", label: "Workspace name", defaultValue: "Astrobit" },
          { type: "text", name: "url", label: "Workspace URL", prefix: "astrobit.app/", defaultValue: "team" },
          { type: "select", name: "industry", label: "Industry", options: opt(["Software", "Retail", "Finance", "Healthcare", "Education"]) },
          { type: "select", name: "size", label: "Team size", options: opt(["1–10", "11–50", "51–200", "200+"]) },
          { type: "textarea", name: "about", label: "About", full: true },
        ],
      },
      {
        key: "localization",
        label: "Localization",
        description: "Regional formats applied across the app.",
        fields: [
          { type: "select", name: "language", label: "Default language", options: opt(["English", "Deutsch", "Français", "日本語"]) },
          { type: "select", name: "timezone", label: "Timezone", options: opt(["UTC", "CET", "EST", "PST", "SGT"]) },
          { type: "select", name: "dateFormat", label: "Date format", options: opt(["DD MMM YYYY", "MM/DD/YYYY", "YYYY-MM-DD"]) },
          { type: "select", name: "currency", label: "Currency", options: opt(["USD", "EUR", "GBP", "JPY"]) },
        ],
      },
      {
        key: "danger",
        label: "Advanced",
        description: "Irreversible and workspace-wide actions.",
        fields: [
          { type: "switch", name: "beta", label: "Join the beta programme", showStateText: true },
          { type: "switch", name: "telemetry", label: "Share anonymous usage analytics", showStateText: true, defaultChecked: true },
          { type: "text", name: "transfer", label: "Transfer ownership to", placeholder: "teammate@astrobit.app", full: true },
        ],
      },
    ],
  },

  "/account/settings": {
    title: "Account settings",
    subtitle: "Your personal preferences on this device.",
    breadcrumb: crumb(["Account"], "Settings"),
    groups: [
      {
        key: "profile",
        label: "Profile",
        description: "Shown to your teammates.",
        fields: [
          { type: "text", name: "firstName", label: "First name", defaultValue: "Nadia" },
          { type: "text", name: "lastName", label: "Last name", defaultValue: "Okafor" },
          { type: "email", name: "email", label: "Email", defaultValue: "nadia@astrobit.app", full: true },
          { type: "phone", name: "phone", label: "Phone", defaultCountryCode: "PT" },
        ],
      },
      {
        key: "notifications",
        label: "Notifications",
        description: "Choose what reaches your inbox.",
        fields: [
          { type: "checkbox", name: "email", label: "Email me about", options: [{ label: "Mentions", value: "mentions" }, { label: "Assigned tasks", value: "tasks" }, { label: "Weekly summary", value: "summary" }] },
          { type: "switch", name: "desktop", label: "Desktop notifications", showStateText: true, full: true },
        ],
      },
      {
        key: "appearance",
        label: "Appearance",
        description: "Theme and density.",
        fields: [
          { type: "radio", name: "theme", label: "Theme", options: [{ label: "System", value: "system" }, { label: "Light", value: "light" }, { label: "Dark", value: "dark" }] },
          { type: "radio", name: "density", label: "Density", options: [{ label: "Comfortable", value: "comfortable" }, { label: "Compact", value: "compact" }] },
        ],
      },
    ],
  },
};

SETTINGS_CONFIGS["/settings/company"] = { ...SETTINGS_CONFIGS["/settings/general"], breadcrumb: crumb(["Settings"], "Company"), title: "Company settings" };
SETTINGS_CONFIGS["/settings/notifications"] = { ...SETTINGS_CONFIGS["/account/settings"], breadcrumb: crumb(["Settings"], "Notifications"), title: "Notification settings" };

SETTINGS_CONFIGS["/settings/appearance"] = {
  title: "Appearance",
  subtitle: "Theme, density and branding.",
  breadcrumb: crumb(["Settings"], "Appearance"),
  groups: [
    {
      key: "theme", label: "Theme", description: "Applies to everyone unless they override it.",
      fields: [
        { type: "radio", name: "mode", label: "Colour mode", options: [{ label: "System", value: "system" }, { label: "Light", value: "light" }, { label: "Dark", value: "dark" }] },
        { type: "radio", name: "density", label: "Density", options: [{ label: "Comfortable", value: "comf" }, { label: "Compact", value: "compact" }] },
        { type: "color", name: "accent", label: "Accent colour", defaultValue: "#7c5cff" },
        { type: "switch", name: "sidebarMini", label: "Collapse sidebar by default", showStateText: true, full: true },
      ],
    },
    {
      key: "branding", label: "Branding",
      fields: [
        { type: "text", name: "productName", label: "Product name", defaultValue: "Astrobit" },
        { type: "file", name: "logo", label: "Logo", ui: "inline", full: true },
      ],
    },
  ],
};

SETTINGS_CONFIGS["/settings/locale"] = {
  title: "Locale",
  subtitle: "Regional formats applied across the app.",
  breadcrumb: crumb(["Settings"], "Locale"),
  groups: [
    {
      key: "region", label: "Region",
      fields: [
        { type: "select", name: "language", label: "Language", options: opt(["English", "Deutsch", "Français", "Español", "日本語"]) },
        { type: "select", name: "timezone", label: "Timezone", options: opt(["UTC", "CET", "EST", "PST", "SGT", "AEST"]) },
        { type: "select", name: "dateFormat", label: "Date format", options: opt(["DD MMM YYYY", "MM/DD/YYYY", "YYYY-MM-DD"]) },
        { type: "select", name: "timeFormat", label: "Time format", options: opt(["24-hour", "12-hour"]) },
        { type: "select", name: "currency", label: "Currency", options: opt(["USD", "EUR", "GBP", "JPY", "AUD"]) },
        { type: "select", name: "firstDay", label: "First day of week", options: opt(["Monday", "Sunday"]) },
      ],
    },
  ],
};

SETTINGS_CONFIGS["/account/security"] = {
  title: "Security",
  subtitle: "Protect your account.",
  breadcrumb: crumb(["Account"], "Security"),
  groups: [
    {
      key: "password", label: "Password",
      fields: [
        { type: "password", name: "current", label: "Current password" },
        { type: "password", name: "next", label: "New password", validation: { rules: { strongPassword: true } } },
        { type: "password", name: "confirm", label: "Confirm new password", validation: { rules: { matchField: "next" } } },
      ],
    },
    {
      key: "2fa", label: "Two-factor", description: "An extra step at sign-in.",
      fields: [
        { type: "switch", name: "totp", label: "Authenticator app", showStateText: true, defaultChecked: true },
        { type: "switch", name: "sms", label: "SMS backup codes", showStateText: true },
        { type: "phone", name: "recovery", label: "Recovery phone", defaultCountryCode: "US" },
      ],
    },
    {
      key: "sessions", label: "Sessions",
      fields: [
        { type: "switch", name: "signoutAll", label: "Sign out of all other devices", showStateText: true },
        { type: "select", name: "timeout", label: "Auto sign-out after", options: opt(["15 minutes", "1 hour", "8 hours", "Never"]) },
      ],
    },
  ],
};

SETTINGS_CONFIGS["/account/billing"] = {
  title: "Billing",
  subtitle: "Plan, payment method and invoices.",
  breadcrumb: crumb(["Account"], "Billing"),
  groups: [
    {
      key: "plan", label: "Plan", description: "You're on the Growth plan — $24 / seat / mo.",
      fields: [
        { type: "select", name: "plan", label: "Plan", options: opt(["Starter", "Growth", "Scale", "Enterprise"]) },
        { type: "select", name: "cycle", label: "Billing cycle", options: opt(["Monthly", "Annual (save 20%)"]) },
        { type: "number", name: "seats", label: "Seats", defaultValue: 25 },
      ],
    },
    {
      key: "payment", label: "Payment method",
      fields: [
        { type: "text", name: "card", label: "Card on file", defaultValue: "Visa ···· 4218", full: true },
        { type: "text", name: "billingEmail", label: "Billing email", defaultValue: "billing@astrobit.app" },
        { type: "text", name: "vat", label: "VAT / Tax ID" },
      ],
    },
  ],
};

SETTINGS_CONFIGS["/account/notifications"] = { ...SETTINGS_CONFIGS["/account/settings"], breadcrumb: crumb(["Account"], "Notifications"), title: "Notification preferences" };
