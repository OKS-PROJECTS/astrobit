import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Globe, KeyRound } from "lucide-react";
import { Button, Checkbox, Divider, Form, FormFieldSet, OtpField, PasswordField, toast } from "oks-ui";
import { Logo } from "../../Components/Commom/Logo";

function SplitLayout({ children }) {
  return (
    <div className="grid grid-cols-1 min-h-full lg:grid-cols-2" style={{ background: "var(--app-bg)" }}>
      <div
        className="relative hidden flex-col justify-between overflow-hidden p-12 lg:flex"
        style={{ background: "linear-gradient(160deg, var(--app-accent) 0%, #1a1150 60%, #0b0a1e 100%)" }}
      >
        <Logo onDark />
        <div className="relative z-10">
          <h2 className="max-w-sm text-[30px] font-extrabold leading-tight tracking-[-0.02em] text-white">
            The analytics workspace teams actually enjoy using.
          </h2>
          <p className="mt-3 max-w-sm text-[13px] text-white/70">
            Revenue, users and growth in one place — every pixel built with oks-ui.
          </p>
          <div className="mt-8 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-[13px] text-white/90">
              "Astrobit gave our team one place for revenue, users and growth. Rollout took an afternoon."
            </p>
            <p className="mt-2 text-[11.5px] font-medium text-white/60">Rowan Ellis · VP Growth, Cobalt Retail</p>
          </div>
        </div>
        <span className="text-[11px] text-white/40">© {new Date().getFullYear()} Astrobit</span>
      </div>
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}

function CenteredLayout({ children }) {
  return (
    <div className="flex min-h-full items-center justify-center p-6" style={{ background: "var(--app-bg)" }}>
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div
          className="rounded-[var(--app-card-radius)] border p-6 sm:p-8"
          style={{ background: "var(--app-surface)", borderColor: "var(--app-border)", boxShadow: "var(--app-card-shadow)" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function SocialRow() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button variant="bordered" fullWidth startContent={<Globe size={15} />}>Google</Button>
      <Button variant="bordered" fullWidth startContent={<KeyRound size={15} />}>SSO</Button>
    </div>
  );
}

function Heading({ title, sub }) {
  return (
    <div className="mb-6">
      <h1 className="text-[22px] font-bold" style={{ color: "var(--app-fg-strong)" }}>{title}</h1>
      <p className="mt-1 text-[13px]" style={{ color: "var(--app-fg-muted)" }}>{sub}</p>
    </div>
  );
}

function useFakeAuth(msg, to = "/dashboards/analytics") {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  return [
    loading,
    async () => {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 700));
      setLoading(false);
      toast.success(msg);
      navigate(to);
    },
  ];
}

function SignInForm() {
  const [loading, submit] = useFakeAuth("Signed in");
  return (
    <>
      <Heading title="Welcome back" sub="Sign in to continue to your workspace." />
      <SocialRow />
      <Divider className="my-5">or</Divider>
      <Form onSubmit={submit} className="space-y-4">
        <FormFieldSet type="email" name="email" label="Email address" validation={{ rules: { required: true, email: true } }} defaultValue="nadia@astrobit.app" />
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[12.5px] font-medium" style={{ color: "var(--app-fg-strong)" }}>Password</span>
            <Link to="/auth/forgot-password" className="text-[12px]" style={{ color: "var(--app-accent)" }}>Forgot password?</Link>
          </div>
          <PasswordField name="password" defaultValue="astrobit-demo" aria-label="Password" />
        </div>
        <Checkbox label="Keep me signed in" defaultChecked />
        <Button type="submit" color="primary" fullWidth isLoading={loading}>Sign in</Button>
      </Form>
      <p className="mt-5 text-center text-[12.5px]" style={{ color: "var(--app-fg-muted)" }}>
        Don't have an account? <Link to="/auth/register" style={{ color: "var(--app-accent)" }}>Sign up free</Link>
      </p>
      <p className="mt-3 text-center">
        <Link to="/dashboards/analytics" className="inline-flex items-center gap-1 text-[12px]" style={{ color: "var(--app-fg-subtle)" }}>
          <ArrowLeft size={12} /> Back to dashboard
        </Link>
      </p>
    </>
  );
}

function SignUpForm() {
  const [loading, submit] = useFakeAuth("Account created");
  return (
    <>
      <Heading title="Create your account" sub="Start your 14-day trial — no card required." />
      <SocialRow />
      <Divider className="my-5">or</Divider>
      <Form onSubmit={submit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <FormFieldSet type="text" name="firstName" label="First name" validation={{ rules: { required: true } }} />
          <FormFieldSet type="text" name="lastName" label="Last name" validation={{ rules: { required: true } }} />
        </div>
        <FormFieldSet type="email" name="email" label="Work email" validation={{ rules: { required: true, email: true } }} />
        <FormFieldSet type="password" name="password" label="Password" validation={{ rules: { required: true, strongPassword: true } }} />
        <Checkbox label="I agree to the terms and privacy policy" />
        <Button type="submit" color="primary" fullWidth isLoading={loading}>Create account</Button>
      </Form>
      <p className="mt-5 text-center text-[12.5px]" style={{ color: "var(--app-fg-muted)" }}>
        Already have an account? <Link to="/auth/login" style={{ color: "var(--app-accent)" }}>Sign in</Link>
      </p>
    </>
  );
}

function ForgotForm() {
  const [loading, submit] = useFakeAuth("Reset link sent", "/auth/login");
  return (
    <>
      <Heading title="Reset your password" sub="We'll email you a link to choose a new one." />
      <Form onSubmit={submit} className="space-y-4">
        <FormFieldSet type="email" name="email" label="Email address" validation={{ rules: { required: true, email: true } }} />
        <Button type="submit" color="primary" fullWidth isLoading={loading}>Send reset link</Button>
      </Form>
      <p className="mt-5 text-center">
        <Link to="/auth/login" className="inline-flex items-center gap-1 text-[12px]" style={{ color: "var(--app-fg-subtle)" }}>
          <ArrowLeft size={12} /> Back to sign in
        </Link>
      </p>
    </>
  );
}

function LockForm() {
  const [loading, submit] = useFakeAuth("Unlocked");
  return (
    <>
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="grid h-14 w-14 place-items-center rounded-full" style={{ background: "var(--app-accent-soft)", color: "var(--app-accent)" }}>
          <span className="text-[18px] font-bold">NO</span>
        </div>
        <h1 className="mt-3 text-[18px] font-bold" style={{ color: "var(--app-fg-strong)" }}>Nadia Okafor</h1>
        <p className="text-[12.5px]" style={{ color: "var(--app-fg-muted)" }}>Enter your PIN to unlock</p>
      </div>
      <Form onSubmit={submit} className="space-y-4">
        <div className="flex justify-center">
          <OtpField name="pin" length={4} aria-label="PIN" />
        </div>
        <Button type="submit" color="primary" fullWidth isLoading={loading}>Unlock</Button>
      </Form>
      <p className="mt-4 text-center">
        <Link to="/auth/login" className="text-[12px]" style={{ color: "var(--app-fg-subtle)" }}>Not you? Sign in</Link>
      </p>
    </>
  );
}

export const SignIn = () => <SplitLayout><SignInForm /></SplitLayout>;
export const SignInCentered = () => <CenteredLayout><SignInForm /></CenteredLayout>;
export const SignUp = () => <SplitLayout><SignUpForm /></SplitLayout>;
export const SignUpCentered = () => <CenteredLayout><SignUpForm /></CenteredLayout>;
export const ForgotPassword = () => <CenteredLayout><ForgotForm /></CenteredLayout>;
export const LockScreen = () => <CenteredLayout><LockForm /></CenteredLayout>;
