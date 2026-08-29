import { NavLink } from "react-router-dom";
import { Code2 } from "lucide-react";
import { Chip } from "oks-ui";
import { APP_VERSION, REPO_URL } from "../../data/app";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="mt-8 flex flex-col items-center justify-between gap-2 border-t px-1 py-5 text-[12px] sm:flex-row"
      style={{ borderColor: "var(--app-border)", color: "var(--app-fg-muted)" }}
    >
      <p>© {year} Astrobit. Built entirely with oks-ui.</p>
      <div className="flex items-center gap-4">
        <NavLink to="/pages/changelog" className="hover:underline">Changelog</NavLink>
        <NavLink to="/utility/documentation" className="hover:underline">Docs</NavLink>
        <NavLink to="/utility/help-center" className="hover:underline">Support</NavLink>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 hover:underline"
        >
          <Code2 size={13} />
          Repository
        </a>
        <Chip size="xs" variant="soft" color="default">v{APP_VERSION}</Chip>
      </div>
    </footer>
  );
}
