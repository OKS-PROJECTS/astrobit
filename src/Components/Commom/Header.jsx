import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Bell,
  Check,
  LogOut,
  Menu,
  Moon,
  PanelLeftOpen,
  Search,
  Settings,
  Sun,
  UserRound,
} from "lucide-react";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Tooltip,
} from "oks-ui";
import { useTheme } from "../../context/ThemeContext";
import { useLayout } from "../../context/LayoutContext";
import { NOTIFICATIONS } from "../../data/app";
import { cx } from "../../lib/cx";

export function Header({ onOpenCommand }) {
  const { theme, toggleTheme } = useTheme();
  const { collapsed, toggleCollapsed, openMobile } = useLayout();
  const [unread, setUnread] = useState(NOTIFICATIONS.filter((n) => n.unread).length);

  return (
    <header
      className="sticky top-0 z-30 flex h-[61px] items-center gap-2 border-b px-4 backdrop-blur-md sm:px-6"
      style={{ background: "var(--app-header-bg)", borderColor: "var(--app-header-border)" }}
    >
      <Button size="sm" variant="bordered" isIconOnly className="lg:hidden" onPress={openMobile} aria-label="Open menu">
        <Menu size={17} />
      </Button>
      <Button
        size="sm"
        variant="bordered"
        isIconOnly
        className="hidden lg:inline-flex"
        onPress={toggleCollapsed}
        aria-label="Toggle sidebar"
      >
        {collapsed ? <PanelLeftOpen size={16} /> : <Menu size={17} />}
      </Button>

      <button
        type="button"
        onClick={onOpenCommand}
        className="ml-1 flex h-9 min-w-0 flex-1 items-center gap-2 rounded-[10px] border px-3 text-[12.5px] sm:max-w-sm"
        style={{ background: "var(--app-surface-inset)", borderColor: "var(--app-border)", color: "var(--app-fg-subtle)" }}
      >
        <Search size={15} />
        <span className="flex-1 text-left">Search anything…</span>
        <kbd
          className="hidden rounded border px-1.5 py-0.5 text-[10px] font-medium sm:inline"
          style={{ borderColor: "var(--app-border)", color: "var(--app-fg-muted)" }}
        >
          ⌘K
        </kbd>
      </button>

      <div className="ml-auto flex items-center gap-1">
        <Tooltip content={theme === "dark" ? "Light mode" : "Dark mode"} placement="bottom">
          <Button size="sm" variant="ghost" isIconOnly onPress={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </Button>
        </Tooltip>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button size="sm" variant="ghost" isIconOnly aria-label="Notifications" className="relative">
              <Badge isDot color="danger" size="sm" isInvisible={unread === 0} placement="top-right" ariaLabel={`${unread} unread notifications`}>
                <Bell size={17} />
              </Badge>
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Notifications"
            className="w-80"
            topContent={
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-[13px] font-semibold" style={{ color: "var(--app-fg-strong)" }}>
                  Notifications
                </span>
                <button
                  type="button"
                  onClick={() => setUnread(0)}
                  className="flex items-center gap-1 text-[11.5px]"
                  style={{ color: "var(--app-accent)" }}
                >
                  <Check size={12} /> Mark all read
                </button>
              </div>
            }
          >
            {NOTIFICATIONS.slice(0, 5).map((n) => (
              <DropdownItem key={n.id} textValue={n.title} description={n.time}>
                <span className="flex items-start gap-2">
                  <span
                    className={cx("mt-1 h-1.5 w-1.5 shrink-0 rounded-full")}
                    style={{ background: n.unread ? "var(--app-accent)" : "transparent" }}
                  />
                  <span className="text-[12.5px]">{n.title}</span>
                </span>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <button type="button" className="ml-1 flex items-center gap-2 rounded-full py-1 pl-1 pr-2" aria-label="Account menu">
              <Avatar name="Nadia Okafor" src="https://i.pravatar.cc/120?img=47" size="sm" classNames={{ base: "!h-8 !w-8" }} />
              <span className="hidden text-left leading-tight sm:block">
                <span className="block text-[12.5px] font-semibold" style={{ color: "var(--app-fg-strong)" }}>
                  Nadia Okafor
                </span>
                <span className="block text-[10.5px]" style={{ color: "var(--app-fg-subtle)" }}>
                  Workspace admin
                </span>
              </span>
            </button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Account" className="w-56">
            <DropdownSection title="Signed in as nadia@astrobit.app">
              <DropdownItem key="profile" as={NavLink} href="/account/profile" startContent={<UserRound size={15} />} textValue="Profile">
                Profile
              </DropdownItem>
              <DropdownItem key="settings" as={NavLink} href="/account/settings" startContent={<Settings size={15} />} textValue="Settings">
                Account settings
              </DropdownItem>
            </DropdownSection>
            <DropdownSection>
              <DropdownItem key="signout" as={NavLink} href="/auth/login" color="danger" startContent={<LogOut size={15} />} textValue="Sign out">
                Sign out
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  );
}
