/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { Route } from "react-router-dom";
import { FORM_CONFIGS } from "./forms";
import { DETAIL_CONFIGS } from "./details";
import { SETTINGS_CONFIGS } from "./settings";
import { BOARD_CONFIGS } from "./boards";
import { REPORT_CONFIGS } from "./reports";

const FormPage = lazy(() => import("../Pages/InnerPages/FormPage"));
const DetailPage = lazy(() => import("../Pages/InnerPages/DetailPage"));
const SettingsPage = lazy(() => import("../Pages/InnerPages/SettingsPage"));
const BoardPage = lazy(() => import("../Pages/InnerPages/BoardPage"));
const ReportPage = lazy(() => import("../Pages/InnerPages/ReportPage"));

const build = (configs, Comp) =>
  Object.keys(configs).map((p) => <Route key={p} path={p} element={<Comp config={configs[p]} />} />);

export const formRoutePaths = Object.keys(FORM_CONFIGS);
export const detailRoutePaths = Object.keys(DETAIL_CONFIGS);
export const settingsRoutePaths = Object.keys(SETTINGS_CONFIGS);
export const boardRoutePaths = Object.keys(BOARD_CONFIGS);
export const reportRoutePaths = Object.keys(REPORT_CONFIGS);

export const archetypeRoutePaths = [
  ...formRoutePaths,
  ...detailRoutePaths,
  ...settingsRoutePaths,
  ...boardRoutePaths,
  ...reportRoutePaths,
];

export const archetypeRoutes = [
  ...build(FORM_CONFIGS, FormPage),
  ...build(DETAIL_CONFIGS, DetailPage),
  ...build(SETTINGS_CONFIGS, SettingsPage),
  ...build(BOARD_CONFIGS, BoardPage),
  ...build(REPORT_CONFIGS, ReportPage),
];
