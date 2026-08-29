import { useState } from "react";
import { Tab, Tabs, Button, Form, FormFieldSet, toast } from "oks-ui";
import { CardHeader, PageHeader, Surface } from "../../Components/ui";
import { cx } from "../../lib/cx";
import { useIsDesktop } from "../../lib/useMediaQuery";

/**
 * SettingsPage — config-driven settings archetype. Left nav (Tabs, vertical on
 * desktop) + a form panel per group.
 *
 * config: {
 *   title, subtitle, breadcrumb,
 *   groups: [{ key, label, description, fields: FormFieldSetProps[] }]
 * }
 */
export default function SettingsPage({ config }) {
  const { title, subtitle, breadcrumb, groups = [] } = config;
  const [active, setActive] = useState(groups[0]?.key);
  const current = groups.find((g) => g.key === active) || groups[0];
  const isDesktop = useIsDesktop();

  const save = async () => {
    await new Promise((r) => setTimeout(r, 500));
    toast.success("Settings updated");
  };

  return (
    <div>
      <PageHeader title={title} subtitle={subtitle} breadcrumb={breadcrumb} />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[220px_1fr]">
        <Surface padded="sm" className="h-max overflow-x-auto">
          <Tabs
            isVertical={isDesktop}
            variant={isDesktop ? "light" : "underlined"}
            color="primary"
            selectedKey={active}
            onSelectionChange={setActive}
            fullWidth={isDesktop}
            classNames={{ tabList: isDesktop ? "!items-stretch" : undefined }}
          >
            {groups.map((g) => (
              <Tab key={g.key} title={g.label} />
            ))}
          </Tabs>
        </Surface>

        <Surface>
          <CardHeader title={current?.label} description={current?.description} divider />
          <Form onSubmit={save} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {current?.fields.map(({ full, ...f }) => (
                <div key={f.name} className={cx(full && "sm:col-span-2")}>
                  <FormFieldSet {...f} />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 border-t pt-4" style={{ borderColor: "var(--app-border)" }}>
              <Button type="button" variant="bordered">Reset</Button>
              <Button type="submit" color="primary">Save</Button>
            </div>
          </Form>
        </Surface>
      </div>
    </div>
  );
}
