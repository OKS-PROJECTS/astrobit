/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { Route } from "react-router-dom";
import { LIST_CONFIGS } from "./lists";
import { EXTRA_LIST_CONFIGS } from "./listsExtra";

const ListPage = lazy(() => import("../Pages/InnerPages/ListPage"));

const ALL_LIST_CONFIGS = { ...LIST_CONFIGS, ...EXTRA_LIST_CONFIGS };

export const listRoutePaths = Object.keys(ALL_LIST_CONFIGS);

export const listRoutes = listRoutePaths.map((p) => (
  <Route key={p} path={p} element={<ListPage config={ALL_LIST_CONFIGS[p]} />} />
));
