import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "oks-ui";

import "./index.css";
import "oks-ui/styles.css";
import "./styles/theme.css";

import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { LayoutProvider } from "./context/LayoutContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <LayoutProvider>
        <ToastProvider position="top-right">
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <App />
          </BrowserRouter>
        </ToastProvider>
      </LayoutProvider>
    </ThemeProvider>
  </StrictMode>
);
