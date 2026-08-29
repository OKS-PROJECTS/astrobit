import { useState } from "react";
import {
  Button,
  Checkbox,
  DatePickerField,
  Drawer,
  FileField,
  Form,
  FormFieldSet,
  LoopFields,
  Modal,
  OtpField,
  PhoneField,
  RangeField,
  SelectField,
  SwitchField,
  TextField,
  defineStep,
  SteppedForm,
  toast,
} from "oks-ui";
import { CardHeader, PageHeader, Surface } from "../../Components/ui";

function Block({ title, children }) {
  return (
    <Surface>
      <CardHeader title={title} divider />
      <div className="space-y-4">{children}</div>
    </Surface>
  );
}

export default function KitchenSink() {
  const [modal, setModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [range, setRange] = useState(40);

  return (
    <div>
      <PageHeader
        title="Kitchen sink"
        subtitle="The interactive oks-ui primitives — overlays, every field type, repeatable groups and the stepped form."
        breadcrumb={{ trail: [{ label: "Components", to: "/components" }], current: "Kitchen Sink" }}
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <Block title="Overlays">
          <div className="flex flex-wrap gap-3">
            <Button color="primary" onPress={() => setModal(true)}>Open modal</Button>
            <Button variant="bordered" color="danger" onPress={() => setConfirm(true)}>Confirm dialog</Button>
            <Button variant="bordered" onPress={() => setDrawer(true)}>Open drawer</Button>
          </div>
          <Modal isOpen={modal} onClose={() => setModal(false)} title="Invite teammates" actions={<><Button variant="bordered" onPress={() => setModal(false)}>Cancel</Button><Button color="primary" onPress={() => { setModal(false); toast.success("Invites sent"); }}>Send invites</Button></>}>
            <div className="space-y-3">
              <TextField label="Email addresses" placeholder="comma separated" />
              <SelectField label="Role" options={["Admin", "Editor", "Viewer"].map((v) => ({ label: v, value: v }))} />
            </div>
          </Modal>
          <Modal isOpen={confirm} onClose={() => setConfirm(false)} role="alertdialog" title="Delete project?" actions={<><Button variant="bordered" onPress={() => setConfirm(false)}>Keep</Button><Button color="danger" onPress={() => { setConfirm(false); toast.error("Project deleted"); }}>Delete</Button></>}>
            <p className="text-[13px]" style={{ color: "var(--app-fg-muted)" }}>This permanently removes the project and its 42 tasks. This can't be undone.</p>
          </Modal>
          <Drawer isOpen={drawer} onClose={() => setDrawer(false)} position="right" title="Filters" width="360px">
            <div className="space-y-4">
              <SelectField label="Status" options={["Any", "Open", "Closed"].map((v) => ({ label: v, value: v }))} />
              <DatePickerField label="Created after" clearable />
              <SwitchField label="Only mine" showStateText />
            </div>
          </Drawer>
        </Block>

        <Block title="Text & selection fields">
          <TextField label="Full name" placeholder="Ada Novak" />
          <TextField type="email" label="Email" variant="soft" placeholder="ada@astrobit.app" />
          <SelectField
            label="Country"
            placeholderOption="Select a country"
            options={["United States", "Germany", "Japan", "Brazil"].map((v) => ({ label: v, value: v }))}
          />
          <div className="flex gap-6">
            <Checkbox label="Subscribe" defaultChecked />
            <SwitchField label="Notifications" showStateText />
          </div>
        </Block>

        <Block title="Specialised inputs">
          <PhoneField label="Phone" defaultCountryCode="US" />
          <RangeField label="Budget" min={0} max={100} value={range} onChange={setRange} showValue formatValue={(n) => `$${n}k`} />
          <OtpField label="Verification code" length={6} />
          <DatePickerField label="Date range" range showPresets />
        </Block>

        <Block title="File upload">
          <FileField label="Attachments" ui="dropzone" isDroppable preview="thumbnails" maxFiles={3} />
        </Block>

        <Block title="Repeatable group — LoopFields">
          <Form onSubmit={(d) => toast.success(`${Object.keys(d).length} fields`)} className="space-y-3">
            <LoopFields group="items" minItems={1} maxItems={4} addTitle="Add line item">
              {(index) => (
                <div className="grid grid-cols-[1fr_100px] gap-2">
                  <FormFieldSet type="text" name={`items.${index}.name`} label={index === 0 ? "Item" : undefined} placeholder="Description" />
                  <FormFieldSet type="number" name={`items.${index}.qty`} label={index === 0 ? "Qty" : undefined} defaultValue={1} />
                </div>
              )}
            </LoopFields>
            <Button type="submit" size="sm" color="primary">Submit</Button>
          </Form>
        </Block>

        <Block title="SteppedForm">
          <SteppedForm
            headerVariant="progress"
            onSubmit={() => toast.success("Onboarding complete")}
            steps={[
              defineStep({ key: "profile", title: "Profile", fields: [{ type: "text", name: "name", label: "Name" }, { type: "email", name: "email", label: "Email" }] }),
              defineStep({ key: "team", title: "Team", fields: [{ type: "select", name: "size", label: "Team size", options: ["1–10", "11–50", "51+"].map((v) => ({ label: v, value: v })) }] }),
              defineStep({ key: "done", title: "Finish", content: <p className="text-[13px]" style={{ color: "var(--app-fg-muted)" }}>Review and submit to finish onboarding.</p> }),
            ]}
          />
        </Block>
      </div>
    </div>
  );
}
