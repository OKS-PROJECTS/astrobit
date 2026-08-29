import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Hammer } from "lucide-react";
import { Button } from "oks-ui";
import { PageHeader, Surface, EmptyState } from "../../Components/ui";
import { ROUTE_LABEL } from "../../data/nav";

export default function ComingSoon() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const meta = ROUTE_LABEL[pathname];
  const label = meta?.label || "This page";

  return (
    <div>
      <PageHeader
        title={label}
        subtitle="This screen is mapped in the navigation and slated for a later build pass."
        breadcrumb={{ trail: (meta?.trail || []).map((t) => ({ label: t })), current: label }}
      />
      <Surface>
        <EmptyState
          icon={Hammer}
          title={`${label} is on the roadmap`}
          description="The Astrobit v1 core covers every dashboard, the list/CRUD archetype, the component gallery and one worked example of each other archetype. This route resolves here until it is built out."
          action={
            <Button variant="bordered" startContent={<ArrowLeft size={15} />} onPress={() => navigate("/dashboards/analytics")}>
              Back to dashboard
            </Button>
          }
        />
      </Surface>
    </div>
  );
}
