import { useMemo, useState } from "react";
import { Download, Plus } from "lucide-react";
import { Button } from "oks-ui";
import {
  DataTable,
  EmptyState,
  KpiCard,
  PageHeader,
  StatGroup,
  Surface,
  TableToolbar,
} from "../../Components/ui";

/**
 * ListPage — config-driven CRUD table archetype.
 *
 * config: {
 *   title, subtitle, breadcrumb, columns, rows, getRowKey?, pageSize?,
 *   searchKeys?, filters?: [{key,label,test}], stats?: [{label,value,delta,icon}],
 *   primaryAction?: { label, to }, selectable?
 * }
 */
export default function ListPage({ config }) {
  const {
    title,
    subtitle,
    breadcrumb,
    columns,
    rows,
    getRowKey,
    pageSize = 10,
    searchKeys = [],
    filters = [],
    stats = [],
    primaryAction,
    selectable = true,
  } = config;

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState(null);

  const filtered = useMemo(() => {
    let out = rows;
    const term = search.trim().toLowerCase();
    if (term && searchKeys.length) {
      out = out.filter((r) => searchKeys.some((k) => String(r[k] ?? "").toLowerCase().includes(term)));
    }
    if (activeFilter) {
      const f = filters.find((x) => x.key === activeFilter);
      if (f) out = out.filter(f.test);
    }
    return out;
  }, [rows, search, activeFilter, searchKeys, filters]);

  return (
    <div>
      <PageHeader
        title={title}
        subtitle={subtitle}
        breadcrumb={breadcrumb}
        actions={
          <>
            <Button size="sm" variant="bordered" startContent={<Download size={15} />}>
              Export
            </Button>
            {primaryAction && (
              <Button size="sm" color="primary" as="a" href={primaryAction.to} startContent={<Plus size={15} />}>
                {primaryAction.label}
              </Button>
            )}
          </>
        }
      />

      {stats.length > 0 && (
        <StatGroup className="mb-5" cols={stats.length === 3 ? 3 : 4}>
          {stats.map((s, i) => (
            <KpiCard key={s.label} tone={["primary", "info", "success", "warning"][i % 4]} {...s} />
          ))}
        </StatGroup>
      )}

      <Surface padded={false}>
        <TableToolbar
          search={search}
          onSearch={searchKeys.length ? setSearch : undefined}
          filters={filters}
          activeFilter={activeFilter}
          onFilter={setActiveFilter}
        />
        <DataTable
          columns={columns}
          rows={filtered}
          getRowKey={getRowKey}
          pageSize={pageSize}
          selectable={selectable}
          emptyContent={
            <EmptyState
              title="No matching records"
              description="Try adjusting your search or filters."
              action={
                (search || activeFilter) && (
                  <Button size="sm" variant="bordered" onPress={() => { setSearch(""); setActiveFilter(null); }}>
                    Clear filters
                  </Button>
                )
              }
            />
          }
        />
      </Surface>
    </div>
  );
}
