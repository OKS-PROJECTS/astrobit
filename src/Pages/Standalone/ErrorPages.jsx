import { Link } from "react-router-dom";
import { Button } from "oks-ui";
import { Logo } from "../../Components/Commom/Logo";

function Shell({ code, title, description, children }) {
  return (
    <div className="flex min-h-full flex-col items-center justify-center px-6 py-16 text-center" style={{ background: "var(--app-bg)" }}>
      <Logo />
      <p className="mt-10 text-[64px] font-extrabold leading-none tracking-[-0.03em]" style={{ color: "var(--app-accent)" }}>
        {code}
      </p>
      <h1 className="mt-4 text-[22px] font-bold" style={{ color: "var(--app-fg-strong)" }}>{title}</h1>
      <p className="mt-2 max-w-md text-[13px]" style={{ color: "var(--app-fg-muted)" }}>{description}</p>
      <div className="mt-6 flex gap-2">{children}</div>
    </div>
  );
}

export function NotFound() {
  return (
    <Shell code="404" title="Page not found" description="The page you're looking for was moved, renamed, or never existed.">
      <Button as={Link} to="/dashboards/analytics" color="primary">Back to dashboard</Button>
      <Button as={Link} to="/utility/help-center" variant="bordered">Visit help center</Button>
    </Shell>
  );
}

export function ServerError() {
  return (
    <Shell code="500" title="Something went wrong" description="An unexpected error occurred on our end. The team has been notified.">
      <Button as={Link} to="/dashboards/analytics" color="primary">Back to dashboard</Button>
      <Button variant="bordered" onPress={() => window.location.reload()}>Try again</Button>
    </Shell>
  );
}

export function Maintenance() {
  return (
    <Shell code="503" title="Down for maintenance" description="Astrobit is getting a quick upgrade. We'll be back online shortly — thanks for your patience.">
      <Button as={Link} to="/pages/changelog" variant="bordered">Read the changelog</Button>
    </Shell>
  );
}
