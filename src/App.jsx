import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { InnerTemplate } from "./Components/Commom/InnerTemplate";
import ComingSoon from "./Pages/InnerPages/ComingSoon";
import { NAV_ROUTES } from "./data/nav";

import { listRoutes, listRoutePaths } from "./data/listRoutes";
import { dashboardRoutes, dashboardRoutePaths } from "./data/dashboardRoutes";
import { archetypeRoutes, archetypeRoutePaths } from "./data/archetypeRoutes";

import AnalyticsDashboard from "./Pages/Dashboards/AnalyticsDashboard";
import { GalleryIndex, GalleryDetail } from "./Pages/InnerPages/GalleryPages";
import { NotFound, ServerError, Maintenance } from "./Pages/Standalone/ErrorPages";
import {
  SignIn,
  SignInCentered,
  SignUp,
  SignUpCentered,
  ForgotPassword,
  LockScreen,
} from "./Pages/Auth/AuthPages";

const KitchenSink = lazy(() => import("./Pages/InnerPages/KitchenSink"));
const lz = (mod, name) => lazy(() => mod().then((m) => ({ default: m[name] })));

const bespoke = () => import("./Pages/InnerPages/BespokePages");
const FaqPage = lz(bespoke, "FaqPage");
const PricingPage = lz(bespoke, "PricingPage");
const ChartsPage = lz(bespoke, "ChartsPage");

const apps = () => import("./Pages/InnerPages/AppPages");
const ChatPage = lz(apps, "ChatPage");
const GroupChatPage = lz(apps, "GroupChatPage");
const EmailPage = lz(apps, "EmailPage");
const CalendarPage = lz(apps, "CalendarPage");
const ContactsPage = lz(apps, "ContactsPage");
const NotesPage = lz(apps, "NotesPage");
const FileManagerPage = lz(apps, "FileManagerPage");
const HelpDeskPage = lz(apps, "HelpDeskPage");

const content = () => import("./Pages/InnerPages/ContentPages");
const ChangelogPage = lz(content, "ChangelogPage");
const ReleaseNotesPage = lz(content, "ReleaseNotesPage");
const RoadmapPage = lz(content, "RoadmapPage");
const StarterKitPage = lz(content, "StarterKitPage");
const WidgetGalleryPage = lz(content, "WidgetGalleryPage");
const HelpCenterPage = lz(content, "HelpCenterPage");
const KnowledgeBasePage = lz(content, "KnowledgeBasePage");
const DocumentationPage = lz(content, "DocumentationPage");
const SearchResultsPage = lz(content, "SearchResultsPage");
const ActivityFeedPage = lz(content, "ActivityFeedPage");

const forms = () => import("./Pages/InnerPages/FormShowcasePages");
const WizardPage = lz(forms, "WizardPage");
const FileUploadPage = lz(forms, "FileUploadPage");
const DatePickersPage = lz(forms, "DatePickersPage");
const SelectComponentsPage = lz(forms, "SelectComponentsPage");
const InputMasksPage = lz(forms, "InputMasksPage");
const RichTextEditorPage = lz(forms, "RichTextEditorPage");

const extra = () => import("./Pages/InnerPages/BespokeExtra");
const CrmAppPage = lz(extra, "CrmAppPage");
const StatisticsPage = lz(extra, "StatisticsPage");
const KpiAnalyticsPage = lz(extra, "KpiAnalyticsPage");
const HeatmapsPage = lz(extra, "HeatmapsPage");
const PermissionsPage = lz(extra, "PermissionsPage");
const BudgetPage = lz(extra, "BudgetPage");
const SalesFunnelPage = lz(extra, "SalesFunnelPage");
const CustomerJourneyPage = lz(extra, "CustomerJourneyPage");
const ProjectTimelinePage = lz(extra, "ProjectTimelinePage");
const GanttPage = lz(extra, "GanttPage");

/* Explicit (non-config) in-shell pages. */
const EXPLICIT = {
  "/dashboards/analytics": <AnalyticsDashboard />,
  "/components": <GalleryIndex />,
  "/components/kitchen-sink": <KitchenSink />,
  "/utility/faq": <FaqPage />,
  "/pricing": <PricingPage />,
  "/charts/line-area": <ChartsPage kind="line-area" />,
  "/charts/bar-column": <ChartsPage kind="bar-column" />,
  "/charts/distributions": <ChartsPage kind="distributions" />,
  "/charts/revenue-analytics": <ChartsPage kind="revenue" />,
  "/charts/user-analytics": <ChartsPage kind="users" />,
  "/charts/statistics": <StatisticsPage />,
  "/charts/kpi-analytics": <KpiAnalyticsPage />,
  "/charts/heatmaps": <HeatmapsPage />,
  "/apps/chat": <ChatPage />,
  "/apps/group-chat": <GroupChatPage />,
  "/apps/email": <EmailPage />,
  "/apps/calendar": <CalendarPage />,
  "/apps/contacts": <ContactsPage />,
  "/apps/notes": <NotesPage />,
  "/apps/file-manager": <FileManagerPage />,
  "/apps/help-desk": <HelpDeskPage />,
  "/users/permissions": <PermissionsPage />,
  "/crm/app": <CrmAppPage />,
  "/crm/sales-funnel": <SalesFunnelPage />,
  "/crm/customer-journey": <CustomerJourneyPage />,
  "/finance/budget": <BudgetPage />,
  "/projects/timeline": <ProjectTimelinePage />,
  "/projects/gantt": <GanttPage />,
  "/forms/wizard": <WizardPage />,
  "/forms/file-upload": <FileUploadPage />,
  "/forms/date-pickers": <DatePickersPage />,
  "/forms/select-components": <SelectComponentsPage />,
  "/forms/input-masks": <InputMasksPage />,
  "/forms/rich-text-editor": <RichTextEditorPage />,
  "/pages/changelog": <ChangelogPage />,
  "/pages/release-notes": <ReleaseNotesPage />,
  "/pages/roadmap": <RoadmapPage />,
  "/pages/starter-kit": <StarterKitPage />,
  "/pages/widget-gallery": <WidgetGalleryPage />,
  "/utility/help-center": <HelpCenterPage />,
  "/utility/knowledge-base": <KnowledgeBasePage />,
  "/utility/documentation": <DocumentationPage />,
  "/utility/search-results": <SearchResultsPage />,
  "/utility/activity-feed": <ActivityFeedPage />,
};

const CONFIGURED = new Set([
  ...listRoutePaths,
  ...dashboardRoutePaths,
  ...archetypeRoutePaths,
  ...Object.keys(EXPLICIT),
]);

const AUTH_ROUTES = new Set([
  "/auth/login",
  "/auth/login-split",
  "/auth/register",
  "/auth/register-split",
  "/auth/forgot-password",
  "/auth/lock",
]);

const shellRoutes = NAV_ROUTES.filter(
  (p) =>
    !CONFIGURED.has(p) &&
    !AUTH_ROUTES.has(p) &&
    !["/404", "/500", "/maintenance"].includes(p) &&
    !p.startsWith("/components")
);

export default function App() {
  return (
    <Routes>
      {/* shell-less */}
      <Route path="/auth/login" element={<SignIn />} />
      <Route path="/auth/login-split" element={<SignInCentered />} />
      <Route path="/auth/register" element={<SignUp />} />
      <Route path="/auth/register-split" element={<SignUpCentered />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/lock" element={<LockScreen />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="/500" element={<ServerError />} />
      <Route path="/maintenance" element={<Maintenance />} />

      <Route element={<InnerTemplate />}>
        <Route path="/" element={<Navigate to="/dashboards/analytics" replace />} />
        <Route path="/dashboards" element={<Navigate to="/dashboards/analytics" replace />} />
        <Route path="/dashboard" element={<Navigate to="/dashboards/analytics" replace />} />

        {dashboardRoutes}
        {listRoutes}
        {archetypeRoutes}

        {Object.entries(EXPLICIT).map(([p, el]) => (
          <Route key={p} path={p} element={el} />
        ))}

        <Route path="/components/:slug" element={<GalleryDetail />} />

        {shellRoutes.map((p) => (
          <Route key={p} path={p} element={<ComingSoon />} />
        ))}
        <Route path="*" element={<ComingSoon />} />
      </Route>
    </Routes>
  );
}
