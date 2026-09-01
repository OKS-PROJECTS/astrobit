import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, Check, Copy, Layers, Puzzle } from "lucide-react";
import { Button, Chip } from "oks-ui";
import { CardHeader, PageHeader, Surface } from "../../Components/ui";
import { GALLERY, GALLERY_SLUGS } from "../../data/gallery";

export function GalleryIndex() {
  const groups = {};
  GALLERY_SLUGS.forEach((slug) => {
    const e = GALLERY[slug];
    (groups[e.group] ||= []).push({ slug, ...e });
  });

  return (
    <div>
      <PageHeader
        title="Component gallery"
        subtitle="Every screen in Astrobit is built from these oks-ui components — used as shipped, no second UI library."
        breadcrumb={{ trail: [{ label: "Components" }], current: "Overview" }}
        actions={<Button as={Link} to="/components/kitchen-sink" color="primary" endContent={<ArrowRight size={15} />}>Kitchen sink</Button>}
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Surface className="flex items-start gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-[11px]" style={{ background: "var(--app-accent-soft)", color: "var(--app-accent)" }}>
            <Puzzle size={17} />
          </span>
          <div>
            <p className="text-[14px] font-semibold" style={{ color: "var(--app-fg-strong)" }}>oks-ui primitives</p>
            <p className="mt-1 text-[12px]" style={{ color: "var(--app-fg-muted)" }}>Buttons, forms, overlays, charts — used as shipped.</p>
          </div>
        </Surface>
        <Surface className="flex items-start gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-[11px]" style={{ background: "var(--app-info-soft)", color: "var(--app-info)" }}>
            <Layers size={17} />
          </span>
          <div>
            <p className="text-[14px] font-semibold" style={{ color: "var(--app-fg-strong)" }}>Data & app layer</p>
            <p className="mt-1 text-[12px]" style={{ color: "var(--app-fg-muted)" }}>Card, Table, Nav, Board, CommandPalette — all shipped by oks-ui.</p>
          </div>
        </Surface>
        <Surface className="flex items-start gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-[11px]" style={{ background: "var(--app-ok-soft)", color: "var(--app-ok)" }}>
            <Check size={17} />
          </span>
          <div>
            <p className="text-[14px] font-semibold" style={{ color: "var(--app-fg-strong)" }}>Zero other libraries</p>
            <p className="mt-1 text-[12px]" style={{ color: "var(--app-fg-muted)" }}>No second UI library. No second charting library.</p>
          </div>
        </Surface>
      </div>

      {Object.entries(groups).map(([group, entries]) => (
        <section key={group} className="mb-8">
          <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.06em]" style={{ color: "var(--app-fg-subtle)" }}>{group}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {entries.map((e) => (
              <Link key={e.slug} to={`/components/${e.slug}`}>
                <Surface interactive className="h-full">
                  <div className="flex items-center justify-between">
                    <p className="text-[14px] font-semibold" style={{ color: "var(--app-fg-strong)" }}>{e.title}</p>
                    <Chip size="xs" variant="soft" color="primary">oks-ui</Chip>
                  </div>
                  <p className="mt-1.5 text-[12px] leading-snug" style={{ color: "var(--app-fg-muted)" }}>{e.description}</p>
                </Surface>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export function GalleryDetail() {
  const { slug } = useParams();
  const entry = GALLERY[slug];
  const [copied, setCopied] = useState(false);
  if (!entry) return <Navigate to="/components" replace />;

  const idx = GALLERY_SLUGS.indexOf(slug);
  const next = GALLERY_SLUGS[(idx + 1) % GALLERY_SLUGS.length];

  const copy = () => {
    navigator.clipboard?.writeText(entry.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div>
      <PageHeader
        title={entry.title}
        subtitle={entry.description}
        breadcrumb={{ trail: [{ label: "Components", to: "/components" }], current: entry.title }}
        actions={
          <Chip variant="soft" color="primary">oks-ui</Chip>
        }
      />

      <Surface className="mb-5">
        <CardHeader title="Live example" divider />
        <div className="pt-1">{entry.render()}</div>
      </Surface>

      <Surface padded={false}>
        <CardHeader
          title="Usage"
          className="p-4"
          actions={
            <Button size="xs" variant="bordered" startContent={copied ? <Check size={13} /> : <Copy size={13} />} onPress={copy}>
              {copied ? "Copied" : "Copy"}
            </Button>
          }
        />
        <pre
          className="overflow-x-auto border-t px-4 py-4 text-[12px] leading-relaxed"
          style={{ borderColor: "var(--app-border)", background: "var(--app-surface-inset)", color: "var(--app-fg)", fontFamily: "var(--font-mono)" }}
        >
          <code>{entry.code}</code>
        </pre>
      </Surface>

      <div className="mt-6 flex justify-end">
        <Button as={Link} to={`/components/${next}`} variant="bordered" endContent={<ArrowRight size={14} />}>
          Next: {GALLERY[next].title}
        </Button>
      </div>
    </div>
  );
}
