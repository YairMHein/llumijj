import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Layout } from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";

type Search = { redirect?: string };

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    redirect: typeof s.redirect === "string" ? s.redirect : undefined,
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { emailRedirectTo: `${window.location.origin}/`, data: { full_name: name } },
      });
      setBusy(false);
      if (error) return toast.error(error.message);
      toast.success("Welcome to LLUMI");
      navigate({ to: redirect || "/" });
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return toast.error(error.message);
      toast.success("Signed in");
      navigate({ to: redirect || "/" });
    }
  }

  return (
    <Layout>
      <section className="mx-auto max-w-md px-5 py-16 md:px-0">
        <h1 className="font-serif text-4xl">{mode === "signin" ? "Sign in" : "Create account"}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "signin" ? "Welcome back." : "Begin your LLUMI story."}
        </p>
        <form onSubmit={submit} className="mt-8 space-y-3">
          {mode === "signup" && (
            <input className="w-full border border-border bg-background px-3 py-2.5 text-sm" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
          )}
          <input type="email" required className="w-full border border-border bg-background px-3 py-2.5 text-sm" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" required minLength={8} className="w-full border border-border bg-background px-3 py-2.5 text-sm" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button disabled={busy} className="w-full bg-foreground py-3 text-[11px] tracking-luxe text-background disabled:opacity-60">
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>
        <div className="mt-6 flex justify-between text-xs text-muted-foreground">
          <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="underline">
            {mode === "signin" ? "Create account" : "Have an account? Sign in"}
          </button>
          <Link to="/forgot-password" className="underline">Forgot password?</Link>
        </div>
      </section>
    </Layout>
  );
}
