import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Layout } from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/forgot-password")({ component: ForgotPage });

function ForgotPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    setSent(true);
  }

  return (
    <Layout>
      <section className="mx-auto max-w-md px-5 py-16 md:px-0">
        <h1 className="font-serif text-4xl">Forgot password</h1>
        {sent ? (
          <p className="mt-6 text-sm text-muted-foreground">If an account exists for {email}, we've sent a reset link.</p>
        ) : (
          <form onSubmit={submit} className="mt-8 space-y-3">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border border-border bg-background px-3 py-2.5 text-sm" />
            <button disabled={busy} className="w-full bg-foreground py-3 text-[11px] tracking-luxe text-background disabled:opacity-60">{busy ? "Sending…" : "Send reset link"}</button>
          </form>
        )}
        <Link to="/login" className="mt-6 block text-xs text-muted-foreground underline">Back to sign in</Link>
      </section>
    </Layout>
  );
}
