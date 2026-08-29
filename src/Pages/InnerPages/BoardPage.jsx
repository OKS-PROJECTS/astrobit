import { Filter, Plus } from "lucide-react";
import { Button } from "oks-ui";
import { BoardView, PageHeader } from "../../Components/ui";
import { toast } from "oks-ui";

/**
 * BoardPage — config-driven kanban archetype.
 * config: { title, subtitle, breadcrumb, columns: BoardView columns }
 */
export default function BoardPage({ config }) {
  const { title, subtitle, breadcrumb, columns } = config;
  return (
    <div>
      <PageHeader
        title={title}
        subtitle={subtitle}
        breadcrumb={breadcrumb}
        actions={
          <>
            <Button size="sm" variant="bordered" startContent={<Filter size={15} />}>Filter</Button>
            <Button size="sm" color="primary" startContent={<Plus size={15} />}>Add card</Button>
          </>
        }
      />
      <BoardView columns={columns} onAddCard={(k) => toast.info(`New card in “${k}”`)} />
    </div>
  );
}
