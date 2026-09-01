import { useState } from "react";
import {
  Alert,
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  ButtonGroup,
  Chip,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Loader,
  PageTitle,
  Tab,
  Tabs,
  Tooltip,
  toast,
} from "oks-ui";
import { Check, ChevronDown, Download, Heart, Plus, Settings, Star, Trash2 } from "lucide-react";
import {
  Accordion,
  Breadcrumbs,
  EmptyState,
  EntityCell,
  MeterList,
  Pagination,
  StatusChip,
  Timeline,
  TrendChip,
} from "../Components/ui";

const Row = ({ children }) => <div className="flex flex-wrap items-center gap-3">{children}</div>;

/**
 * Component gallery registry. Every entry is `primitive: true` — a raw oks-ui
 * export (some via a thin src/Components/ui wrapper that only renames props).
 * The one thing Astrobit still composes by hand is the app shell
 * (Sidebar + Header + content frame) — deliberately not an oks-ui component.
 */
export const GALLERY = {
  buttons: {
    title: "Buttons",
    group: "Actions",
    primitive: true,
    description: "Every variant, colour, size and state of the oks-ui Button, plus ButtonGroup.",
    render: () => (
      <div className="space-y-4">
        <Row>
          <Button color="primary">Solid</Button>
          <Button variant="soft" color="primary">Soft</Button>
          <Button variant="bordered">Bordered</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link" color="primary">Link</Button>
        </Row>
        <Row>
          <Button color="success">Success</Button>
          <Button color="warning">Warning</Button>
          <Button color="danger">Danger</Button>
          <Button color="info">Info</Button>
        </Row>
        <Row>
          <Button size="xs">XS</Button>
          <Button size="sm">SM</Button>
          <Button size="md">MD</Button>
          <Button size="lg">LG</Button>
        </Row>
        <Row>
          <Button color="primary" startContent={<Plus size={15} />}>New item</Button>
          <Button variant="bordered" endContent={<Download size={15} />}>Export</Button>
          <Button color="primary" isLoading>Saving</Button>
          <Button isDisabled>Disabled</Button>
          <Button isIconOnly variant="bordered" aria-label="Settings"><Settings size={15} /></Button>
        </Row>
        <ButtonGroup variant="bordered">
          <Button>Day</Button>
          <Button>Week</Button>
          <Button>Month</Button>
        </ButtonGroup>
      </div>
    ),
    code: `<Button color="primary" startContent={<Plus size={15} />}>New item</Button>
<Button color="primary" isLoading>Saving</Button>
<ButtonGroup variant="bordered"><Button>Day</Button><Button>Week</Button></ButtonGroup>`,
  },

  alerts: {
    title: "Alerts",
    group: "Feedback",
    primitive: true,
    description: "Inline banners across every colour and variant, with actions and dismissal.",
    render: () => (
      <div className="space-y-3">
        <Alert color="info" variant="soft" title="Heads up" description="A new workspace report is ready to review." />
        <Alert color="success" variant="soft" title="Payment received" description="Invoice INV-2026-0112 was paid in full." />
        <Alert color="warning" variant="bordered" title="Usage at 82%" description="You're approaching your plan's monthly limit." />
        <Alert
          color="danger"
          variant="soft"
          title="Sync failed"
          description="The warehouse connection timed out."
          isClosable
          actions={<Button size="xs" color="danger" variant="soft">Retry</Button>}
        />
      </div>
    ),
    code: `<Alert color="success" variant="soft" title="Payment received" description="Invoice paid in full." />
<Alert color="danger" isClosable actions={<Button size="xs">Retry</Button>} />`,
  },

  cards: {
    title: "Cards",
    group: "Data display",
    primitive: true,
    description: "oks-ui Card + CardHeader/CardBody/CardFooter (Astrobit's Surface wrapper). The panel behind every screen.",
    render: () => (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-[var(--app-card-radius)] border p-5" style={{ background: "var(--app-surface)", borderColor: "var(--app-border)", boxShadow: "var(--app-card-shadow)" }}>
          <p className="text-[14px] font-semibold" style={{ color: "var(--app-fg-strong)" }}>Standard surface</p>
          <p className="mt-1 text-[12.5px]" style={{ color: "var(--app-fg-muted)" }}>Border, radius and shadow all from tokens.</p>
        </div>
        <div className="rounded-[var(--app-card-radius)] border p-5" style={{ background: "var(--app-surface-inset)", borderColor: "var(--app-border)" }}>
          <p className="text-[14px] font-semibold" style={{ color: "var(--app-fg-strong)" }}>Inset surface</p>
          <p className="mt-1 text-[12.5px]" style={{ color: "var(--app-fg-muted)" }}>No shadow, recessed background.</p>
        </div>
      </div>
    ),
    code: `<Surface>Standard card</Surface>
<Surface tone="inset" padded="sm">Inset card</Surface>`,
  },

  tabs: {
    title: "Tabs",
    group: "Navigation",
    primitive: true,
    description: "oks-ui Tabs — solid, bordered, underlined and light variants.",
    render: () => (
      <div className="space-y-5">
        <Tabs variant="solid" color="primary" defaultSelectedKey="overview">
          <Tab key="overview" title="Overview" />
          <Tab key="activity" title="Activity" />
          <Tab key="settings" title="Settings" />
        </Tabs>
        <Tabs variant="underlined" color="primary" defaultSelectedKey="a">
          <Tab key="a" title="Revenue" />
          <Tab key="b" title="Orders" />
          <Tab key="c" title="Sessions" />
        </Tabs>
        <Tabs variant="bordered" defaultSelectedKey="1">
          <Tab key="1" title="Day" />
          <Tab key="2" title="Week" />
          <Tab key="3" title="Month" />
        </Tabs>
      </div>
    ),
    code: `<Tabs variant="underlined" color="primary" defaultSelectedKey="a">
  <Tab key="a" title="Revenue" />
  <Tab key="b" title="Orders" />
</Tabs>`,
  },

  accordions: {
    title: "Accordions",
    group: "Navigation",
    primitive: true,
    description: "oks-ui Accordion + AccordionItem — single / multiple, grid-rows height transition. Powers the FAQ page.",
    render: () => (
      <Accordion
        single
        defaultOpen={["a"]}
        items={[
          { id: "a", title: "How is Astrobit themed?", content: "Every colour, radius and shadow is a CSS variable in one theme.css file. Light and dark flip the same --app-* layer." },
          { id: "b", title: "Which charting library does it use?", content: "Only oks-ui's <Chart>. No ApexCharts, Chart.js or Recharts anywhere." },
          { id: "c", title: "Can I add my own pages?", content: "Yes — most screens are config objects consumed by an archetype component." },
        ]}
      />
    ),
    code: `<Accordion single items={[{ id: "a", title: "…", content: "…" }]} />`,
  },

  avatars: {
    title: "Avatars",
    group: "Data display",
    primitive: true,
    description: "Image avatars, initials fallback, status dots and overflow groups.",
    render: () => (
      <div className="space-y-4">
        <Row>
          <Avatar name="Nadia Okafor" size="sm" />
          <Avatar name="Theo Lindqvist" size="md" />
          <Avatar name="Priya Raman" size="lg" isBordered />
          <Avatar name="Ivan Petrov" status="online" />
          <Avatar name="Mara Devlin" status="dnd" radius="md" />
        </Row>
        <AvatarGroup max={4}>
          {["Ada Novak", "Kenji Sato", "Lena Fischer", "Omar Haddad", "Sofia Rossi", "Diego Marin"].map((n) => (
            <Avatar key={n} name={n} />
          ))}
        </AvatarGroup>
        <EntityCell name="Northwind Labs" sub="Enterprise · North America" square />
      </div>
    ),
    code: `<Avatar name="Ivan Petrov" status="online" />
<AvatarGroup max={4}>{names.map(n => <Avatar key={n} name={n} />)}</AvatarGroup>`,
  },

  badges: {
    title: "Badges",
    group: "Data display",
    primitive: true,
    description: "Count and status indicators anchored to a child element.",
    render: () => (
      <Row>
        <Badge content={5} color="danger"><Button variant="bordered" isIconOnly aria-label="Inbox"><Heart size={16} /></Button></Badge>
        <Badge content={128} max={99} color="primary"><Button variant="bordered">Messages</Button></Badge>
        <Badge isDot color="success" placement="top-right"><Avatar name="Ada Novak" /></Badge>
        <Badge content="NEW" color="warning" shape="rectangle"><Button variant="soft">Reports</Button></Badge>
      </Row>
    ),
    code: `<Badge content={5} color="danger"><Button isIconOnly><Bell/></Button></Badge>
<Badge isDot color="success"><Avatar name="Ada Novak" /></Badge>`,
  },

  breadcrumbs: {
    title: "Breadcrumbs",
    group: "Navigation",
    primitive: true,
    description: "oks-ui Breadcrumbs + BreadcrumbItem (router links via as={Link}). Part of every PageHeader.",
    render: () => (
      <div className="space-y-3">
        <Breadcrumbs trail={[{ label: "Dashboards", to: "/dashboards/analytics" }, { label: "Ecommerce" }]} current="Orders" />
        <Breadcrumbs trail={[{ label: "Settings", to: "/settings/general" }]} current="Localization" />
      </div>
    ),
    code: `<Breadcrumbs trail={[{ label: "Dashboards", to: "/dashboards/analytics" }]} current="Orders" />`,
  },

  dropdowns: {
    title: "Dropdowns",
    group: "Navigation",
    primitive: true,
    description: "Menus with sections, descriptions, icons, shortcuts and destructive items.",
    render: () => (
      <Row>
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered" endContent={<ChevronDown size={14} />}>Actions</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Actions">
            <DropdownItem key="edit" startContent={<Settings size={15} />} textValue="Edit">Edit</DropdownItem>
            <DropdownItem key="dup" startContent={<Plus size={15} />} shortcut="⌘D" textValue="Duplicate">Duplicate</DropdownItem>
            <DropdownItem key="del" color="danger" startContent={<Trash2 size={15} />} textValue="Delete" showDivider>Delete</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <DropdownTrigger>
            <Button variant="soft" color="primary">Assignee</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Assignee" selectionMode="single">
            {["Nadia Okafor", "Theo Lindqvist", "Priya Raman"].map((n) => (
              <DropdownItem key={n} textValue={n}>{n}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </Row>
    ),
    code: `<Dropdown>
  <DropdownTrigger><Button>Actions</Button></DropdownTrigger>
  <DropdownMenu aria-label="Actions">
    <DropdownItem key="del" color="danger">Delete</DropdownItem>
  </DropdownMenu>
</Dropdown>`,
  },

  pagination: {
    title: "Pagination",
    group: "Navigation",
    primitive: true,
    description: "oks-ui Pagination + PaginationSummary (MUI-style windowing). Drives every DataTable footer.",
    render: () => <PaginationDemo />,
    code: `<Pagination page={page} pageCount={12} total={238} pageSize={20} onPage={setPage} />`,
  },

  progress: {
    title: "Progress",
    group: "Feedback",
    primitive: true,
    description: "oks-ui Progress / CircularProgress (Astrobit's Meter + MeterList). Determinate and indeterminate.",
    render: () => (
      <MeterList
        items={[
          { label: "Storage used", value: 64, display: "64 GB / 100 GB" },
          { label: "API quota", value: 38, tone: "info", display: "38%" },
          { label: "Seats", value: 88, tone: "warning", display: "88 / 100" },
          { label: "Overdue tasks", value: 12, tone: "danger", display: "12%" },
        ]}
      />
    ),
    code: `<MeterList items={[{ label: "Storage used", value: 64, display: "64 GB / 100 GB" }]} />`,
  },

  tooltips: {
    title: "Tooltips",
    group: "Overlays",
    primitive: true,
    description: "Hover and focus tips across placements and colours.",
    render: () => (
      <Row>
        <Tooltip content="Add a new widget" placement="top"><Button variant="bordered" isIconOnly aria-label="Add"><Plus size={15} /></Button></Tooltip>
        <Tooltip content="Download CSV" placement="bottom" color="primary"><Button variant="bordered">Export</Button></Tooltip>
        <Tooltip content="This action can't be undone" placement="right" color="danger"><Button variant="soft" color="danger">Delete</Button></Tooltip>
      </Row>
    ),
    code: `<Tooltip content="Add a new widget" placement="top">
  <Button isIconOnly><Plus/></Button>
</Tooltip>`,
  },

  toasts: {
    title: "Toasts",
    group: "Feedback",
    primitive: true,
    description: "Transient notifications via the toast client. ToastProvider is wired once in main.jsx.",
    render: () => (
      <Row>
        <Button variant="bordered" onPress={() => toast.success("Changes saved")}>Success</Button>
        <Button variant="bordered" onPress={() => toast.info("A new report is ready")}>Info</Button>
        <Button variant="bordered" onPress={() => toast.warning("Storage almost full")}>Warning</Button>
        <Button variant="bordered" onPress={() => toast.error("Something went wrong")}>Error</Button>
        <Button
          variant="bordered"
          onPress={() => toast.promise(new Promise((r) => setTimeout(r, 1200)), { loading: "Syncing…", success: "Synced", error: "Failed" })}
        >
          Promise
        </Button>
      </Row>
    ),
    code: `toast.success("Changes saved");
toast.promise(save(), { loading: "Syncing…", success: "Synced", error: "Failed" });`,
  },

  timeline: {
    title: "Timeline",
    group: "Data display",
    primitive: true,
    description: "oks-ui Timeline + TimelineItem — rail, connector, icon / avatar markers. Used on dashboards and detail pages.",
    render: () => (
      <Timeline
        items={[
          { id: "1", name: "Priya Raman", title: "Published the Q3 revenue report.", time: "12m ago" },
          { id: "2", icon: Check, tone: "success", title: "Deployment to production succeeded.", time: "1h ago" },
          { id: "3", icon: Star, tone: "warning", title: "New 5-star review from Northwind Labs.", time: "3h ago" },
          { id: "4", name: "Theo Lindqvist", title: "Closed the autumn launch campaign.", time: "Yesterday" },
        ]}
      />
    ),
    code: `<Timeline items={[{ id: "1", name: "Priya Raman", title: "…", time: "12m ago" }]} />`,
  },

  loaders: {
    title: "Loaders",
    group: "Feedback",
    primitive: true,
    description: "Spinners and activity indicators across variants and sizes.",
    render: () => (
      <Row>
        <Loader />
        <Loader variant="dots-roll" />
        <Loader variant="ring-dual" color="primary" />
        <Loader variant="pulse" size={28} />
        <Loader label="Loading data…" />
      </Row>
    ),
    code: `<Loader variant="ring-dual" color="primary" />
<Loader variant="dots-roll" label="Loading data…" />`,
  },

  "empty-states": {
    title: "Empty states",
    group: "Feedback",
    primitive: true,
    description: "oks-ui EmptyState — icon, title, description, actions. The default for an empty Table body.",
    render: () => (
      <div className="rounded-[var(--app-card-radius)] border" style={{ borderColor: "var(--app-border)" }}>
        <EmptyState
          title="No invoices yet"
          description="When you bill a customer, their invoices will show up here."
          action={<Button size="sm" color="primary">Create invoice</Button>}
        />
      </div>
    ),
    code: `<EmptyState title="No invoices yet" description="…" action={<Button>Create invoice</Button>} />`,
  },

  chips: {
    title: "Chips & status",
    group: "Data display",
    primitive: true,
    description: "oks-ui Chip as tags, filters and toggles, plus the shared StatusChip and TrendChip.",
    render: () => (
      <div className="space-y-4">
        <Row>
          <Chip color="primary">Primary</Chip>
          <Chip variant="soft" color="success">Soft</Chip>
          <Chip variant="bordered">Bordered</Chip>
          <Chip variant="dot" color="warning">Dot</Chip>
          <Chip onClose={() => {}}>Dismissible</Chip>
        </Row>
        <Row>
          <StatusChip status="Active" />
          <StatusChip status="Pending" />
          <StatusChip status="Overdue" />
          <StatusChip status="Draft" />
          <TrendChip value={12.4} />
          <TrendChip value={-3.1} positiveIsGood={false} />
        </Row>
      </div>
    ),
    code: `<Chip variant="soft" color="success">Soft</Chip>
<StatusChip status="Overdue" />
<TrendChip value={12.4} />`,
  },

  divider: {
    title: "Divider & PageTitle",
    group: "Data display",
    primitive: true,
    description: "Rules with optional labels, and the polymorphic PageTitle heading.",
    render: () => (
      <div className="space-y-4">
        <PageTitle as="h3" title="Section heading" subtitle="A short supporting sentence." />
        <Divider />
        <Divider>OR</Divider>
        <Divider lineStyle="dashed" labelPlacement="start">Older items</Divider>
      </div>
    ),
    code: `<PageTitle as="h3" title="Section heading" subtitle="…" />
<Divider>OR</Divider>`,
  },
};

function PaginationDemo() {
  const [page, setPage] = useState(3);
  return <Pagination page={page} pageCount={12} total={238} pageSize={20} onPage={setPage} />;
}

export const GALLERY_SLUGS = Object.keys(GALLERY);
