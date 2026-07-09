import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Layout } from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({ component: ResetPage });

function ResetPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Password updated");
    navigate({ to: "/" });
  }

  return (
    <Layout>
      <section className="mx-auto max-w-md px-5 py-16 md:px-0">
        <h1 className="font-serif text-4xl">Set a new password</h1>
        <form onSubmit={submit} className="mt-8 space-y-3">
          <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" className="w-full border border-border bg-background px-3 py-2.5 text-sm" />
          <button disabled={busy} className="w-full bg-foreground py-3 text-[11px] tracking-luxe text-background disabled:opacity-60">{busy ? "Updating…" : "Update password"}</button>
        </form>
      </section>
    </Layout>
  );
}
