import { useState } from "react";
import {
  DatePickerField,
  FileField,
  OtpField,
  PhoneField,
  SelectField,
  SteppedForm,
  TextField,
  TextEditor,
  defineStep,
  toast,
} from "oks-ui";
import { CardHeader, PageHeader, Surface } from "../../Components/ui";

const opt = (a) => a.map((v) => ({ label: v, value: v }));
const crumb = (c) => ({ trail: [{ label: "Tables & Forms" }], current: c });

function Block({ title, description, children }) {
  return (
    <Surface>
      <CardHeader title={title} description={description} divider />
      <div className="space-y-4">{children}</div>
    </Surface>
  );
}

export function WizardPage() {
  return (
    <div>
      <PageHeader title="Multi-step wizard" subtitle="oks-ui SteppedForm — per-step validation, progress header." breadcrumb={crumb("Multi-Step Wizard")} />
      <div className="mx-auto max-w-2xl">
        <Surface>
          <SteppedForm
            headerVariant="progress"
            onSubmit={() => toast.success("Workspace created")}
            steps={[
              defineStep({
                key: "workspace",
                title: "Workspace",
                description: "Name your workspace.",
                fields: [
                  { type: "text", name: "name", label: "Workspace name", validation: { rules: { required: true } } },
                  { type: "text", name: "slug", label: "URL", prefix: "astrobit.app/" },
                ],
              }),
              defineStep({
                key: "team",
                title: "Team",
                description: "Who's joining?",
                fields: [
                  { type: "select", name: "size", label: "Team size", options: opt(["1–10", "11–50", "51–200", "200+"]) },
                  { type: "textarea", name: "invites", label: "Invite emails", description: "Comma separated" },
                ],
              }),
              defineStep({
                key: "prefs",
                title: "Preferences",
                fields: [
                  { type: "radio", name: "theme", label: "Theme", options: [{ label: "System", value: "s" }, { label: "Light", value: "l" }, { label: "Dark", value: "d" }] },
                  { type: "switch", name: "digest", label: "Weekly digest", showStateText: true },
                ],
              }),
              defineStep({ key: "done", title: "Review", content: <p className="text-[13px]" style={{ color: "var(--app-fg-muted)" }}>Everything looks good. Submit to create your workspace.</p> }),
            ]}
          />
        </Surface>
      </div>
    </div>
  );
}

export function FileUploadPage() {
  return (
    <div>
      <PageHeader title="File upload" subtitle="oks-ui FileField — inline, dropzone, previews, limits." breadcrumb={crumb("File Upload")} />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Block title="Dropzone with thumbnails">
          <FileField label="Product images" ui="dropzone" isDroppable preview="thumbnails" maxFiles={5} />
        </Block>
        <Block title="Inline, single file">
          <FileField label="Upload avatar" ui="inline" maxFiles={1} preview="thumbnails" />
        </Block>
        <Block title="With size limit">
          <FileField label="Attach a document" ui="dropzone" isDroppable maxFileSize={5 * 1024 * 1024} description="PDF or DOCX, up to 5 MB" />
        </Block>
        <Block title="Multiple, no preview">
          <FileField label="Bulk import" ui="dropzone" isDroppable preview="none" showFileList maxFiles={10} />
        </Block>
      </div>
    </div>
  );
}

export function DatePickersPage() {
  return (
    <div>
      <PageHeader title="Date pickers" subtitle="oks-ui DatePickerField — single, range, presets, time." breadcrumb={crumb("Date Pickers")} />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Block title="Single date"><DatePickerField label="Start date" clearable /></Block>
        <Block title="Date range"><DatePickerField label="Reporting period" range /></Block>
        <Block title="Range with presets"><DatePickerField label="Filter by date" range showPresets /></Block>
        <Block title="With time"><DatePickerField label="Meeting time" withTime /></Block>
        <Block title="Two months, ISO display"><DatePickerField label="Trip dates" range monthsToShow={2} displayFormat="iso" /></Block>
        <Block title="Bounded"><DatePickerField label="Book a slot" minDate={new Date()} /></Block>
      </div>
    </div>
  );
}

export function SelectComponentsPage() {
  const [multi, setMulti] = useState([]);
  return (
    <div>
      <PageHeader title="Select components" subtitle="oks-ui SelectField — native, custom, multi, chips." breadcrumb={crumb("Select Components")} />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Block title="Custom single">
          <SelectField label="Country" placeholderOption="Choose a country" options={opt(["United States", "Germany", "Japan", "Brazil", "Australia"])} />
        </Block>
        <Block title="Native">
          <SelectField label="Plan" native options={opt(["Starter", "Growth", "Scale", "Enterprise"])} />
        </Block>
        <Block title="Multi-select with chips">
          <SelectField label="Tags" multiple value={multi} onChange={setMulti} options={opt(["Design", "Engineering", "Growth", "Support", "Data", "People"])} />
        </Block>
        <Block title="With option content">
          <SelectField
            label="Assignee"
            options={[
              { label: "Nadia Okafor", value: "nadia" },
              { label: "Theo Lindqvist", value: "theo" },
              { label: "Priya Raman", value: "priya" },
            ]}
          />
        </Block>
      </div>
    </div>
  );
}

export function InputMasksPage() {
  return (
    <div>
      <PageHeader title="Input masks" subtitle="Formatted inputs from oks-ui field primitives." breadcrumb={crumb("Input Masks")} />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Block title="Phone">
          <PhoneField label="Phone number" defaultCountryCode="US" />
        </Block>
        <Block title="One-time code">
          <OtpField label="Verification code" length={6} />
        </Block>
        <Block title="Currency & units">
          <TextField label="Price" prefix="$" suffix="USD" placeholder="0.00" type="number" />
          <TextField label="Weight" suffix="kg" placeholder="0.0" type="number" />
        </Block>
        <Block title="Prefixes">
          <TextField label="Handle" prefix="@" placeholder="username" />
          <TextField label="Website" prefix="https://" placeholder="example.com" />
          <TextField label="SKU" prefix="AB-" placeholder="1042" />
        </Block>
      </div>
    </div>
  );
}

export function RichTextEditorPage() {
  const [value, setValue] = useState([
    { type: "heading", content: [{ text: "Meeting notes" }] },
    { type: "paragraph", content: [{ text: "Type below — this editor is oks-ui's TextEditor. Use the toolbar for headings, lists, quotes and more." }] },
    { type: "bulletList", content: [{ text: "Confirm the launch date" }] },
  ]);
  return (
    <div>
      <PageHeader title="Rich text editor" subtitle="oks-ui TextEditor — block-based, serialisable." breadcrumb={crumb("Rich Text Editor")} />
      <div className="mx-auto max-w-3xl">
        <Surface>
          <TextEditor value={value} onChange={setValue} />
        </Surface>
      </div>
    </div>
  );
}
