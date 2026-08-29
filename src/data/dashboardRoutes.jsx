/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { Route } from "react-router-dom";
import { DASHBOARD_CONFIGS } from "./dashboards";

const DashboardPage = lazy(() => import("../Pages/Dashboards/DashboardPage"));

export const dashboardRoutePaths = Object.keys(DASHBOARD_CONFIGS);

export const dashboardRoutes = dashboardRoutePaths.map((p) => (
  <Route key={p} path={p} element={<DashboardPage config={DASHBOARD_CONFIGS[p]} />} />
));
