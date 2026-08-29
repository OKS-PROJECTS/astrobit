const crumb = (trail, current) => ({ trail: trail.map((t) => ({ label: t })), current });

const R = { required: true };

export const FORM_CONFIGS = {
  "/forms/elements": {
    title: "Form elements",
    subtitle: "Every oks-ui field type, rendered through Form + FormFieldSet.",
    breadcrumb: crumb(["Tables & Forms"], "Form Elements"),
    submitLabel: "Submit",
    sections: [
      {
        title: "Text inputs",
        fields: [
          { type: "text", name: "text", label: "Default input", placeholder: "Type something" },
          { type: "search", name: "search", label: "Search field", placeholder: "Search" },
          { type: "email", name: "email", label: "Email", variant: "soft", placeholder: "you@astrobit.app" },
          { type: "url", name: "url", label: "Website", prefix: "https://" },
          { type: "number", name: "amount", label: "Amount", prefix: "$" },
          { type: "textarea", name: "message", label: "Message", showLengthCounter: true, maxLength: 200, full: true },
        ],
      },
      {
        title: "Selection",
        fields: [
          { type: "select", name: "plan", label: "Plan", options: ["Starter", "Growth", "Scale"].map((v) => ({ label: v, value: v })) },
          { type: "checkbox", name: "topics", label: "Email me about", options: [{ label: "Product updates", value: "updates" }, { label: "Weekly digest", value: "digest" }] },
          { type: "radio", name: "billing", label: "Billing period", options: [{ label: "Monthly", value: "m" }, { label: "Annual", value: "a" }] },
          { type: "switch", name: "twoFactor", label: "Two-factor authentication", showStateText: true },
        ],
      },
      {
        title: "Advanced",
        fields: [
          { type: "range", name: "budget", label: "Budget", min: 0, max: 100, showValue: true, formatValue: (n) => `$${n}k` },
          { type: "otp", name: "code", label: "Verification code", length: 6 },
          { type: "datepicker", name: "start", label: "Start date", clearable: true },
          { type: "phone", name: "phone", label: "Phone", defaultCountryCode: "US" },
          { type: "file", name: "docs", label: "Attachments", ui: "dropzone", isDroppable: true, preview: "thumbnails", maxFiles: 3, full: true },
        ],
      },
    ],
  },

  "/users/new": {
    title: "Add user",
    subtitle: "Invite a teammate and set their access.",
    breadcrumb: crumb(["User Management"], "Add User"),
    submitLabel: "Send invite",
    sections: [
      {
        title: "Identity",
        description: "Basic profile details for the new member.",
        fields: [
          { type: "text", name: "firstName", label: "First name", validation: { rules: R }, placeholder: "Ada" },
          { type: "text", name: "lastName", label: "Last name", validation: { rules: R }, placeholder: "Novak" },
          { type: "email", name: "email", label: "Work email", validation: { rules: { required: true, email: true } }, full: true, placeholder: "ada@astrobit.app" },
          { type: "phone", name: "phone", label: "Phone", defaultCountryCode: "US" },
        ],
      },
      {
        title: "Access",
        description: "Role and team assignment. Can be changed later.",
        fields: [
          { type: "select", name: "role", label: "Role", placeholder: "Select a role", options: ["Owner", "Admin", "Manager", "Editor", "Analyst", "Viewer"].map((v) => ({ label: v, value: v })), validation: { rules: R } },
          { type: "select", name: "team", label: "Team", placeholder: "Select a team", options: ["Growth", "Platform", "Design", "Revenue", "Support", "Data"].map((v) => ({ label: v, value: v })) },
          { type: "switch", name: "notify", label: "Email the invite immediately", checkedText: "On", uncheckedText: "Off", showStateText: true, full: true },
        ],
      },
    ],
  },

  "/products/new": {
    title: "Add product",
    subtitle: "Create a new catalogue item.",
    breadcrumb: crumb(["Ecommerce"], "Add Product"),
    submitLabel: "Publish product",
    sections: [
      {
        title: "Details",
        fields: [
          { type: "text", name: "name", label: "Product name", validation: { rules: R }, full: true },
          { type: "textarea", name: "description", label: "Description", showLengthCounter: true, maxLength: 280, full: true },
          { type: "select", name: "category", label: "Category", placeholder: "Choose category", options: ["Audio", "Lighting", "Bags", "Wearables", "Peripherals", "Furniture", "Home", "Accessories"].map((v) => ({ label: v, value: v })) },
          { type: "text", name: "sku", label: "SKU", prefix: "AB-", placeholder: "1042" },
        ],
      },
      {
        title: "Pricing & stock",
        columns: 2,
        fields: [
          { type: "number", name: "price", label: "Price", prefix: "$", validation: { rules: { required: true, min: 0 } } },
          { type: "number", name: "stock", label: "Stock on hand", validation: { rules: { min: 0 } } },
          { type: "range", name: "margin", label: "Target margin", min: 0, max: 80, showValue: true, formatValue: (n) => `${n}%` },
          { type: "switch", name: "active", label: "Available for sale", showStateText: true },
        ],
      },
      {
        title: "Media",
        fields: [
          { type: "file", name: "images", label: "Product images", ui: "dropzone", isDroppable: true, preview: "thumbnails", maxFiles: 4, full: true },
        ],
      },
    ],
  },

  "/projects/new": {
    title: "Create project",
    subtitle: "Spin up a new initiative and assign a lead.",
    breadcrumb: crumb(["Projects"], "Create Project"),
    submitLabel: "Create project",
    sections: [
      {
        title: "Overview",
        fields: [
          { type: "text", name: "name", label: "Project name", validation: { rules: R }, full: true },
          { type: "textarea", name: "goal", label: "Goal", full: true },
          { type: "select", name: "lead", label: "Project lead", placeholder: "Assign a lead", options: ["Priya Raman", "Theo Lindqvist", "Mara Devlin", "Ivan Petrov"].map((v) => ({ label: v, value: v })) },
          { type: "datepicker", name: "due", label: "Target date", clearable: true },
        ],
      },
      {
        title: "Setup",
        fields: [
          { type: "radio", name: "visibility", label: "Visibility", options: [{ label: "Workspace", value: "workspace" }, { label: "Private", value: "private" }] },
          { type: "checkbox", name: "features", label: "Enable", options: [{ label: "Kanban board", value: "kanban" }, { label: "Time tracking", value: "time" }, { label: "Client access", value: "client" }] },
        ],
      },
    ],
  },

  "/ecommerce/orders/new": {
    title: "Create order",
    subtitle: "Manually enter an order on a customer's behalf.",
    breadcrumb: crumb(["Ecommerce"], "Create Order"),
    submitLabel: "Place order",
    sections: [
      {
        title: "Customer",
        fields: [
          { type: "text", name: "customer", label: "Customer name", validation: { rules: R } },
          { type: "email", name: "email", label: "Email", validation: { rules: { email: true } } },
          { type: "select", name: "channel", label: "Channel", options: ["Online store", "Marketplace", "Retail partner", "Wholesale"].map((v) => ({ label: v, value: v })) },
          { type: "select", name: "payment", label: "Payment method", options: ["Card", "PayPal", "Bank transfer", "Wallet"].map((v) => ({ label: v, value: v })) },
        ],
      },
      {
        title: "Line items",
        fields: [
          { type: "text", name: "sku", label: "SKU" },
          { type: "number", name: "qty", label: "Quantity", defaultValue: 1 },
          { type: "textarea", name: "notes", label: "Order notes", full: true },
        ],
      },
    ],
  },

  "/forms/layouts": {
    title: "Form layouts",
    subtitle: "Section cards, two-column grids and full-width fields.",
    breadcrumb: crumb(["Tables & Forms"], "Form Layouts"),
    sections: [
      {
        title: "Account",
        description: "A typical two-column profile form.",
        fields: [
          { type: "text", name: "displayName", label: "Display name" },
          { type: "text", name: "handle", label: "Handle", prefix: "@" },
          { type: "email", name: "email", label: "Email", full: true },
          { type: "url", name: "website", label: "Website", full: true },
          { type: "textarea", name: "bio", label: "Bio", showLengthCounter: true, maxLength: 160, full: true },
        ],
      },
      {
        title: "Preferences",
        fields: [
          { type: "select", name: "timezone", label: "Timezone", options: ["UTC", "CET", "EST", "PST", "SGT"].map((v) => ({ label: v, value: v })) },
          { type: "select", name: "language", label: "Language", options: ["English", "Deutsch", "Français", "日本語"].map((v) => ({ label: v, value: v })) },
          { type: "switch", name: "digest", label: "Weekly digest", showStateText: true, full: true },
        ],
      },
    ],
  },

  "/forms/validation": {
    title: "Form validation",
    subtitle: "oks-ui VALIDATION_RULES wired through FormFieldSet — no external form library.",
    breadcrumb: crumb(["Tables & Forms"], "Form Validation"),
    submitLabel: "Validate & submit",
    sections: [
      {
        title: "Required & format rules",
        fields: [
          { type: "text", name: "fullName", label: "Full name", description: "Required", validation: { rules: { required: true, minLength: 2 } } },
          { type: "email", name: "email", label: "Email", description: "Required · must be an email", validation: { rules: { required: true, email: true } } },
          { type: "password", name: "password", label: "Password", description: "Strong password required", validation: { rules: { required: true, strongPassword: true } } },
          { type: "password", name: "confirm", label: "Confirm password", validation: { rules: { required: true, matchField: "password" } } },
          { type: "number", name: "seats", label: "Seats", description: "Between 1 and 50", validation: { rules: { required: true, min: 1, max: 50 } } },
          { type: "text", name: "code", label: "Invite code", description: "Alphanumeric", validation: { rules: { alphanumeric: true } } },
        ],
      },
    ],
  },
};
