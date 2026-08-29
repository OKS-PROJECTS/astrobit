import { Suspense, useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Drawer } from "oks-ui";
import { useLayout } from "../../context/LayoutContext";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CommandPalette, useCommandHotkey } from "./CommandPalette";
import { TableSkeleton } from "../ui/Skeleton";

export function InnerTemplate() {
  const { collapsed, mobileOpen, closeMobile } = useLayout();
  const [cmdOpen, setCmdOpen] = useState(false);
  useCommandHotkey(setCmdOpen);
  const { pathname } = useLocation();
  const mainRef = useRef(null);

  // Reset scroll to the top of the content area on every route change.
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  return (
    <div className="flex h-full" style={{ background: "var(--app-bg)" }}>
      <div className="hidden lg:block">
        <Sidebar collapsed={collapsed} />
      </div>

      <Drawer isOpen={mobileOpen} onClose={closeMobile} position="left" width="278px" classNames={{ body: "!p-0" }}>
        <Sidebar collapsed={false} onNavigate={closeMobile} />
      </Drawer>

      <div className="flex min-w-0 flex-1 flex-col">
        <Header onOpenCommand={() => setCmdOpen(true)} />
        <main ref={mainRef} className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full px-4 py-6 sm:px-6 lg:px-8" style={{ maxWidth: "var(--app-content-max)" }}>
            <Suspense fallback={<div className="pt-10"><TableSkeleton rows={8} /></div>}>
              <div key={pathname} className="animate-[fadeIn_.24s_ease] motion-reduce:animate-none">
                <Outlet />
              </div>
            </Suspense>
            <Footer />
          </div>
        </main>
      </div>

      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
    </div>
  );
}
