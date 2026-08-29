import { useState } from "react";
import { Button, Form, FormFieldSet, toast } from "oks-ui";
import { CardHeader, PageHeader, Surface } from "../../Components/ui";
import { cx } from "../../lib/cx";

/**
 * FormPage — config-driven create/edit archetype. Every field renders through
 * oks-ui `<Form>` + `<FormFieldSet>`.
 *
 * config: {
 *   title, subtitle, breadcrumb, submitLabel?, initialValues?,
 *   sections: [{ title, description, columns?: 1|2, fields: FormFieldSetProps[] }]
 * }
 */
export default function FormPage({ config }) {
  const { title, subtitle, breadcrumb, sections = [], submitLabel = "Save changes", initialValues } = config;
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (data) => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    toast.success(`${title} saved`, { description: `${Object.keys(data).length} fields captured.` });
  };

  return (
    <div>
      <PageHeader title={title} subtitle={subtitle} breadcrumb={breadcrumb} />
      <Form onSubmit={handleSubmit} initialValues={initialValues} validationMode="blur" className="space-y-5">
        {sections.map((section, i) => (
          <Surface key={i}>
            <CardHeader title={section.title} description={section.description} divider />
            <div className={cx("grid gap-4", section.columns === 1 ? "grid-cols-1" : "sm:grid-cols-2")}>
              {section.fields.map(({ full, ...f }) => (
                <div key={f.name} className={cx(full && "sm:col-span-2")}>
                  <FormFieldSet {...f} />
                </div>
              ))}
            </div>
          </Surface>
        ))}
        <div className="flex items-center justify-end gap-2">
          <Button type="button" variant="bordered">
            Cancel
          </Button>
          <Button type="submit" color="primary" isLoading={submitting}>
            {submitLabel}
          </Button>
        </div>
      </Form>
    </div>
  );
}
