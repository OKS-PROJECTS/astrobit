import { useMemo, useState } from "react";
import {
  Archive,
  ChevronLeft,
  ChevronRight,
  File as FileIcon,
  FileArchive,
  FileImage,
  FileSpreadsheet,
  FileText,
  FileVideo,
  Filter,
  Folder,
  Hash,
  Inbox,
  MoreVertical,
  Paperclip,
  Phone,
  Plus,
  Send,
  Star,
  Trash2,
  Video,
} from "lucide-react";
import { Avatar, Badge, Button, Chip, TextField } from "oks-ui";
import { CardHeader, EntityCell, PageHeader, SearchInput, StatusChip, Surface } from "../../Components/ui";
import {
  CHANNELS,
  CONTACTS,
  CONVERSATIONS,
  EMAILS,
  EMAIL_FOLDERS,
  FILES,
  NOTES,
  buildThread,
} from "../../data/appData";
import { TICKETS } from "../../data/entities";
import { cx } from "../../lib/cx";

/* ============================== Chat ============================== */
function ChatBase({ title, subtitle, breadcrumb, channels }) {
  const list = channels ? CHANNELS : CONVERSATIONS;
  const [activeId, setActiveId] = useState(list[0].id);
  const [draft, setDraft] = useState("");
  const idx = list.findIndex((c) => c.id === activeId);
  const thread = useMemo(() => buildThread(idx + 1), [idx]);
  const active = list[idx];

  return (
    <div>
      <PageHeader title={title} subtitle={subtitle} breadcrumb={breadcrumb} />
      <Surface padded={false} className="overflow-hidden">
        <div className="grid h-[560px] grid-cols-1 sm:grid-cols-[260px_1fr]">
          <div className="hidden flex-col border-r sm:flex" style={{ borderColor: "var(--app-border)" }}>
            <div className="p-3">
              <SearchInput placeholder={channels ? "Search channels" : "Search messages"} />
            </div>
            <ul className="flex-1 overflow-y-auto px-2 pb-2">
              {list.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(c.id)}
                    className={cx("flex w-full items-center gap-3 rounded-[10px] px-2 py-2 text-left")}
                    style={{ background: c.id === activeId ? "var(--app-menu-hover-bg)" : "transparent" }}
                  >
                    {channels ? (
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px]" style={{ background: "var(--app-surface-2)", color: "var(--app-fg-muted)" }}>
                        <Hash size={15} />
                      </span>
                    ) : (
                      <span className="relative shrink-0">
                        <Avatar src={c.avatar} name={c.name} classNames={{ base: "!h-8 !w-8" }} />
                        {c.online && <span className="absolute -bottom-0 -right-0 h-2.5 w-2.5 rounded-full border-2" style={{ background: "var(--app-ok)", borderColor: "var(--app-surface)" }} />}
                      </span>
                    )}
                    <span className="block min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="truncate text-[12.5px] font-medium" style={{ color: "var(--app-fg-strong)" }}>
                          {channels ? `#${c.name}` : c.name}
                        </span>
                        <span className="shrink-0 text-[10.5px]" style={{ color: "var(--app-fg-subtle)" }}>{c.time || `${c.members}`}</span>
                      </span>
                      <span className="block truncate text-[11.5px]" style={{ color: "var(--app-fg-muted)" }}>
                        {channels ? `${c.members} members` : c.last}
                      </span>
                    </span>
                    {c.unread > 0 && <Badge content={c.unread} color="primary" size="sm" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: "var(--app-border)" }}>
              <div className="flex items-center gap-3">
                {channels ? <Hash size={16} style={{ color: "var(--app-fg-muted)" }} /> : <Avatar src={active.avatar} name={active.name} classNames={{ base: "!h-8 !w-8" }} />}
                <div>
                  <p className="text-[13px] font-semibold" style={{ color: "var(--app-fg-strong)" }}>{channels ? `#${active.name}` : active.name}</p>
                  <p className="text-[11px]" style={{ color: "var(--app-fg-subtle)" }}>{channels ? `${active.members} members` : active.online ? "Online" : "Last seen 2h ago"}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" isIconOnly aria-label="Call"><Phone size={15} /></Button>
                <Button size="sm" variant="ghost" isIconOnly aria-label="Video"><Video size={15} /></Button>
                <Button size="sm" variant="ghost" isIconOnly aria-label="More"><MoreVertical size={15} /></Button>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-4" style={{ background: "var(--app-surface-inset)" }}>
              {thread.map((m) => (
                <div key={m.id} className={cx("flex items-end gap-2", m.mine && "flex-row-reverse")}>
                  <Avatar src={m.avatar} name={m.name} classNames={{ base: "!h-6 !w-6" }} />
                  <div className={cx("max-w-[70%] rounded-2xl px-3 py-2 text-[12.5px]")}
                    style={{
                      background: m.mine ? "var(--app-accent)" : "var(--app-surface)",
                      color: m.mine ? "#fff" : "var(--app-fg)",
                      border: m.mine ? "none" : "1px solid var(--app-border)",
                    }}
                  >
                    {m.text}
                    <span className={cx("mt-1 block text-[10px]")} style={{ color: m.mine ? "rgba(255,255,255,.7)" : "var(--app-fg-subtle)" }}>{m.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <form
              className="flex items-center gap-2 border-t p-3"
              style={{ borderColor: "var(--app-border)" }}
              onSubmit={(e) => { e.preventDefault(); setDraft(""); }}
            >
              <Button type="button" size="sm" variant="ghost" isIconOnly aria-label="Attach"><Paperclip size={16} /></Button>
              <TextField value={draft} onChange={setDraft} placeholder="Write a message…" variant="soft" className="flex-1" aria-label="Message" />
              <Button type="submit" size="sm" color="primary" isIconOnly aria-label="Send"><Send size={15} /></Button>
            </form>
          </div>
        </div>
      </Surface>
    </div>
  );
}

export const ChatPage = () => (
  <ChatBase title="Chat" subtitle="Direct messages with your team." breadcrumb={{ trail: [{ label: "Apps" }], current: "Chat" }} />
);
export const GroupChatPage = () => (
  <ChatBase title="Group chat" subtitle="Channels for the whole workspace." breadcrumb={{ trail: [{ label: "Apps" }], current: "Group Chat" }} channels />
);

/* ============================== Email ============================== */
const LABEL_TONE = { Work: "primary", Finance: "success", Team: "info", Product: "warning", System: "default", Design: "danger" };

export function EmailPage() {
  const [folder, setFolder] = useState("inbox");
  const [openId, setOpenId] = useState(EMAILS[0].id);
  const open = EMAILS.find((e) => e.id === openId);

  return (
    <div>
      <PageHeader
        title="Email"
        subtitle="A unified inbox for your workspace."
        breadcrumb={{ trail: [{ label: "Apps" }], current: "Email" }}
        actions={<Button size="sm" color="primary" startContent={<Plus size={15} />}>Compose</Button>}
      />
      <Surface padded={false} className="overflow-hidden">
        <div className="grid h-[600px] grid-cols-1 lg:grid-cols-[180px_320px_1fr]">
          <div className="hidden flex-col gap-0.5 border-r p-3 lg:flex" style={{ borderColor: "var(--app-border)" }}>
            {EMAIL_FOLDERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFolder(f.id)}
                className="flex items-center justify-between rounded-[9px] px-2.5 py-2 text-[12.5px]"
                style={{ background: folder === f.id ? "var(--app-menu-active-bg)" : "transparent", color: folder === f.id ? "var(--app-menu-active-fg)" : "var(--app-fg-muted)" }}
              >
                <span className="flex items-center gap-2">
                  {f.id === "inbox" ? <Inbox size={15} /> : f.id === "starred" ? <Star size={15} /> : f.id === "sent" ? <Send size={15} /> : f.id === "drafts" ? <FileText size={15} /> : f.id === "archive" ? <Archive size={15} /> : <Trash2 size={15} />}
                  {f.name}
                </span>
                {f.count > 0 && <span className="tnum text-[11px]">{f.count}</span>}
              </button>
            ))}
          </div>

          <div className="flex flex-col border-r" style={{ borderColor: "var(--app-border)" }}>
            <div className="border-b p-3" style={{ borderColor: "var(--app-border)" }}>
              <SearchInput placeholder="Search mail" className="!w-full" />
            </div>
            <ul className="flex-1 overflow-y-auto">
              {EMAILS.map((e) => (
                <li key={e.id}>
                  <button
                    type="button"
                    onClick={() => setOpenId(e.id)}
                    className="flex w-full gap-3 border-b px-3 py-3 text-left"
                    style={{ borderColor: "var(--app-border)", background: e.id === openId ? "var(--app-menu-hover-bg)" : "transparent" }}
                  >
                    <Avatar src={e.avatar} name={e.from} classNames={{ base: "!h-8 !w-8 shrink-0" }} />
                    <span className="block min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="truncate text-[12.5px]" style={{ color: "var(--app-fg-strong)", fontWeight: e.read ? 400 : 600 }}>{e.from}</span>
                        <span className="shrink-0 text-[10.5px]" style={{ color: "var(--app-fg-subtle)" }}>{e.time}</span>
                      </span>
                      <span className="block truncate text-[12px]" style={{ color: "var(--app-fg)", fontWeight: e.read ? 400 : 500 }}>{e.subject}</span>
                      <span className="block truncate text-[11.5px]" style={{ color: "var(--app-fg-subtle)" }}>{e.preview}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden flex-col lg:flex">
            <div className="flex items-start justify-between border-b p-4" style={{ borderColor: "var(--app-border)" }}>
              <div>
                <h3 className="text-[16px] font-semibold" style={{ color: "var(--app-fg-strong)" }}>{open.subject}</h3>
                <div className="mt-2 flex items-center gap-2">
                  <Avatar src={open.avatar} name={open.from} classNames={{ base: "!h-7 !w-7" }} />
                  <span className="text-[12px]" style={{ color: "var(--app-fg-muted)" }}>{open.from} · {open.time}</span>
                  <Chip size="xs" variant="soft" color={LABEL_TONE[open.label]}>{open.label}</Chip>
                </div>
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" isIconOnly aria-label="Archive"><Archive size={15} /></Button>
                <Button size="sm" variant="ghost" isIconOnly aria-label="Delete"><Trash2 size={15} /></Button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6 text-[13px] leading-relaxed" style={{ color: "var(--app-fg)" }}>
              <p>Hi Nadia,</p>
              <p className="mt-3">{open.preview} Let me know if you have any questions — happy to jump on a quick call this week.</p>
              <p className="mt-3">The summary is attached. Everything is on track for the date we discussed, and the numbers look strong across every channel.</p>
              <p className="mt-3">Best,<br />{open.from}</p>
              <div className="mt-5 flex items-center gap-2 rounded-[10px] border p-3" style={{ borderColor: "var(--app-border)" }}>
                <FileText size={16} style={{ color: "var(--app-fg-muted)" }} />
                <span className="text-[12px]" style={{ color: "var(--app-fg)" }}>summary-august.pdf</span>
                <span className="text-[11px]" style={{ color: "var(--app-fg-subtle)" }}>2.1 MB</span>
              </div>
            </div>
            <div className="border-t p-3" style={{ borderColor: "var(--app-border)" }}>
              <Button size="sm" variant="bordered">Reply</Button>
            </div>
          </div>
        </div>
      </Surface>
    </div>
  );
}

/* ============================== Calendar ============================== */
const EVENTS = {
  4: [{ t: "Standup", tone: "primary" }],
  6: [{ t: "Design review", tone: "info" }, { t: "1:1 Nadia", tone: "success" }],
  11: [{ t: "Board prep", tone: "warning" }],
  14: [{ t: "Launch", tone: "danger" }],
  18: [{ t: "Sprint demo", tone: "primary" }],
  21: [{ t: "Customer call", tone: "info" }],
  25: [{ t: "Team offsite", tone: "success" }],
};

export function CalendarPage() {
  const [month] = useState(new Date(2026, 7, 1));
  const first = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  while (cells.length % 7) cells.push(null);

  return (
    <div>
      <PageHeader
        title="Calendar"
        subtitle="August 2026"
        breadcrumb={{ trail: [{ label: "Apps" }], current: "Calendar" }}
        actions={
          <>
            <Button size="sm" variant="bordered" isIconOnly aria-label="Previous month"><ChevronLeft size={15} /></Button>
            <Button size="sm" variant="bordered" isIconOnly aria-label="Next month"><ChevronRight size={15} /></Button>
            <Button size="sm" color="primary" startContent={<Plus size={15} />}>New event</Button>
          </>
        }
      />
      <Surface padded={false} className="overflow-hidden">
        <div className="grid grid-cols-7 border-b text-center text-[11px] font-semibold uppercase tracking-[0.04em]" style={{ borderColor: "var(--app-border)", color: "var(--app-fg-subtle)" }}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="py-2.5">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {cells.map((d, i) => (
            <div
              key={i}
              className="min-h-[104px] border-b border-r p-2 last:border-r-0"
              style={{ borderColor: "var(--app-border)", background: d === 29 ? "var(--app-accent-soft)" : "transparent" }}
            >
              {d && (
                <>
                  <span className="text-[12px] font-medium tnum" style={{ color: d === 29 ? "var(--app-accent)" : "var(--app-fg-muted)" }}>{d}</span>
                  <div className="mt-1 space-y-1">
                    {(EVENTS[d] || []).map((e, j) => (
                      <div
                        key={j}
                        className="truncate rounded px-1.5 py-0.5 text-[10.5px] font-medium"
                        style={{ background: `var(--app-${e.tone === "primary" ? "accent" : e.tone}-soft)`, color: `var(--app-${e.tone === "primary" ? "accent" : e.tone})` }}
                      >
                        {e.t}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </Surface>
    </div>
  );
}

/* ============================== Contacts ============================== */
export function ContactsPage() {
  const [q, setQ] = useState("");
  const rows = CONTACTS.filter((c) => (c.name + c.company + c.role).toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <PageHeader
        title="Contacts"
        subtitle="People across your accounts and team."
        breadcrumb={{ trail: [{ label: "Apps" }], current: "Contacts" }}
        actions={<Button size="sm" color="primary" startContent={<Plus size={15} />}>Add contact</Button>}
      />
      <div className="mb-4"><SearchInput value={q} onChange={setQ} placeholder="Search contacts" /></div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((c) => (
          <Surface key={c.id} className="flex flex-col items-center text-center" interactive>
            <div className="flex w-full justify-end">
              <Star size={15} style={{ color: c.favorite ? "var(--app-warn)" : "var(--app-fg-subtle)" }} fill={c.favorite ? "currentColor" : "none"} />
            </div>
            <Avatar src={c.avatar} name={c.name} classNames={{ base: "!h-14 !w-14" }} />
            <p className="mt-2 text-[13.5px] font-semibold" style={{ color: "var(--app-fg-strong)" }}>{c.name}</p>
            <p className="text-[11.5px]" style={{ color: "var(--app-fg-muted)" }}>{c.role} · {c.company}</p>
            <div className="mt-3 flex w-full flex-col gap-1 text-[11.5px]" style={{ color: "var(--app-fg-muted)" }}>
              <span className="truncate">{c.email}</span>
              <span>{c.phone}</span>
            </div>
          </Surface>
        ))}
      </div>
    </div>
  );
}

/* ============================== Notes ============================== */
export function NotesPage() {
  const [id, setId] = useState(NOTES[0].id);
  const note = NOTES.find((n) => n.id === id);
  return (
    <div>
      <PageHeader
        title="Notes"
        subtitle="Personal and shared notes."
        breadcrumb={{ trail: [{ label: "Apps" }], current: "Notes" }}
        actions={<Button size="sm" color="primary" startContent={<Plus size={15} />}>New note</Button>}
      />
      <Surface padded={false} className="overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-[260px_1fr]">
          <ul className="border-r sm:max-h-[560px] sm:overflow-y-auto" style={{ borderColor: "var(--app-border)" }}>
            {NOTES.map((n) => (
              <li key={n.id}>
                <button
                  type="button"
                  onClick={() => setId(n.id)}
                  className="w-full border-b px-4 py-3 text-left"
                  style={{ borderColor: "var(--app-border)", background: n.id === id ? "var(--app-menu-hover-bg)" : "transparent" }}
                >
                  <p className="text-[12.5px] font-medium" style={{ color: "var(--app-fg-strong)" }}>{n.title}</p>
                  <p className="mt-0.5 truncate text-[11.5px]" style={{ color: "var(--app-fg-muted)" }}>{n.body}</p>
                  <p className="mt-1 text-[10.5px]" style={{ color: "var(--app-fg-subtle)" }}>{n.tag} · {n.updated}</p>
                </button>
              </li>
            ))}
          </ul>
          <div className="p-6">
            <div className="flex items-center gap-2">
              <h3 className="text-[18px] font-bold" style={{ color: "var(--app-fg-strong)" }}>{note.title}</h3>
              <Chip size="xs" variant="soft" color="primary">{note.tag}</Chip>
            </div>
            <p className="mt-1 text-[11px]" style={{ color: "var(--app-fg-subtle)" }}>Updated {note.updated}</p>
            <p className="mt-4 whitespace-pre-line text-[13px] leading-relaxed" style={{ color: "var(--app-fg)" }}>{note.body}</p>
          </div>
        </div>
      </Surface>
    </div>
  );
}

/* ============================== File manager ============================== */
const TYPE_ICON = { folder: Folder, pdf: FileText, design: FileImage, sheet: FileSpreadsheet, video: FileVideo, archive: FileArchive, doc: FileText, image: FileImage };

export function FileManagerPage() {
  return (
    <div>
      <PageHeader
        title="File manager"
        subtitle="Workspace / Shared"
        breadcrumb={{ trail: [{ label: "Apps" }], current: "File Manager" }}
        actions={
          <>
            <Button size="sm" variant="bordered" startContent={<Filter size={15} />}>Filter</Button>
            <Button size="sm" color="primary" startContent={<Plus size={15} />}>Upload</Button>
          </>
        }
      />
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Storage used", value: "142 GB", hint: "of 250 GB" },
          { label: "Files", value: "1,284", hint: "across 38 folders" },
          { label: "Shared with me", value: "62", hint: "12 new this week" },
        ].map((s) => (
          <Surface key={s.label}>
            <p className="text-[12px]" style={{ color: "var(--app-fg-muted)" }}>{s.label}</p>
            <p className="mt-1 text-[20px] font-bold tnum" style={{ color: "var(--app-fg-strong)" }}>{s.value}</p>
            <p className="text-[11px]" style={{ color: "var(--app-fg-subtle)" }}>{s.hint}</p>
          </Surface>
        ))}
      </div>
      <Surface padded={false}>
        <CardHeader title="Files" className="p-4" />
        <div className="grid grid-cols-2 gap-3 p-4 pt-0 sm:grid-cols-3 lg:grid-cols-5">
          {FILES.map((f) => {
            const Icon = TYPE_ICON[f.type] || FileIcon;
            return (
              <button
                key={f.id}
                type="button"
                className="flex flex-col items-center gap-2 rounded-[12px] border p-4 text-center transition-colors hover:bg-[var(--app-surface-2)]"
                style={{ borderColor: "var(--app-border)" }}
              >
                <Icon size={26} style={{ color: f.type === "folder" ? "var(--app-accent)" : "var(--app-fg-muted)" }} />
                <span className="w-full truncate text-[12px] font-medium" style={{ color: "var(--app-fg-strong)" }}>{f.name}</span>
                <span className="text-[10.5px]" style={{ color: "var(--app-fg-subtle)" }}>
                  {f.type === "folder" ? `${f.items} items` : f.size} · {f.modified}
                </span>
              </button>
            );
          })}
        </div>
      </Surface>
    </div>
  );
}

/* ============================== Help desk ============================== */
export function HelpDeskPage() {
  const stats = [
    { label: "Open", value: "146", tone: "primary" },
    { label: "Waiting on us", value: "38", tone: "warning" },
    { label: "Resolved today", value: "51", tone: "success" },
    { label: "Avg. first reply", value: "42m", tone: "info" },
  ];
  const cols = [
    { key: "open", title: "Open", tickets: TICKETS.filter((t) => t.status === "Open").slice(0, 5) },
    { key: "prog", title: "In progress", tickets: TICKETS.filter((t) => t.status === "In progress").slice(0, 4) },
    { key: "pending", title: "Pending", tickets: TICKETS.filter((t) => t.status === "Pending").slice(0, 3) },
    { key: "resolved", title: "Resolved", tickets: TICKETS.filter((t) => t.status === "Resolved").slice(0, 4) },
  ];
  return (
    <div>
      <PageHeader
        title="Help desk"
        subtitle="Support queue across every channel."
        breadcrumb={{ trail: [{ label: "Apps" }], current: "Help Desk" }}
        actions={<Button size="sm" color="primary" startContent={<Plus size={15} />}>New ticket</Button>}
      />
      <div className="mb-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Surface key={s.label}>
            <p className="text-[12px]" style={{ color: "var(--app-fg-muted)" }}>{s.label}</p>
            <p className="mt-1 text-[22px] font-bold tnum" style={{ color: `var(--app-${s.tone === "primary" ? "accent" : s.tone})` }}>{s.value}</p>
          </Surface>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        {cols.map((col) => (
          <div key={col.key} className="flex flex-col gap-3">
            <div className="flex items-center gap-2 px-1 text-[12.5px] font-semibold" style={{ color: "var(--app-fg-strong)" }}>
              {col.title}<Badge content={col.tickets.length} variant="soft" color="default" size="sm" />
            </div>
            {col.tickets.map((t) => (
              <Surface key={t.id} padded="sm" interactive>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] tnum" style={{ color: "var(--app-fg-subtle)" }}>{t.id}</span>
                  <StatusChip status={t.priority} size="sm" />
                </div>
                <p className="mt-1.5 text-[12.5px] font-medium leading-snug" style={{ color: "var(--app-fg-strong)" }}>{t.subject}</p>
                <div className="mt-2.5">
                  <EntityCell name={t.assignee} sub={`from ${t.requester}`} />
                </div>
              </Surface>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
