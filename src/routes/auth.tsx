import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in — CHECKMATE" }, { name: "description", content: "Sign in or create your CHECKMATE account." }] }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back");
        navigate({ to: "/account" });
      } else if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: window.location.origin, data: { full_name: name } },
        });
        if (error) throw error;
        toast.success("Account created. Check your email to confirm.");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin + "/reset-password",
        });
        if (error) throw error;
        toast.success("Reset link sent if the email exists.");
        setMode("signin");
      }
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function google() {
    try {
      await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/account" });
    } catch (err) {
      toast.error((err as Error).message);
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:block relative bg-gradient-to-br from-primary/30 via-background to-background overflow-hidden">
        <div className="absolute inset-0 flex flex-col justify-between p-12">
          <Link to="/" className="font-display text-2xl font-bold"><span className="text-primary">CHECK</span>MATE</Link>
          <div>
            <h2 className="font-display text-5xl font-bold leading-tight">Engineered for the pitch.</h2>
            <p className="mt-4 text-muted-foreground max-w-md">Join the team and unlock member-only drops, early access and faster checkout.</p>
          </div>
          <div className="text-xs text-muted-foreground">© CHECKMATE</div>
        </div>
      </div>
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <Link to="/" className="lg:hidden font-display text-xl font-bold mb-8 block"><span className="text-primary">CHECK</span>MATE</Link>
          <h1 className="text-2xl font-bold">
            {mode === "signin" ? "Sign in" : mode === "signup" ? "Create account" : "Reset password"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {mode === "signin" ? "Welcome back." : mode === "signup" ? "Join CHECKMATE today." : "We'll email you a reset link."}
          </p>

          <button onClick={google} className="mt-6 w-full rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-secondary inline-flex items-center justify-center gap-2">
            <svg className="size-4" viewBox="0 0 24 24"><path fill="#fff" d="M21.35 11.1h-9.18v2.92h5.27c-.23 1.49-1.7 4.38-5.27 4.38a5.93 5.93 0 0 1 0-11.86c1.86 0 3.1.79 3.81 1.47l2.6-2.5C16.96 4.05 14.78 3 12.17 3a8.95 8.95 0 1 0 0 17.9c5.17 0 8.6-3.63 8.6-8.74 0-.58-.06-1.04-.17-1.55Z"/></svg>
            Continue with Google
          </button>

          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex-1 h-px bg-border" /> or <div className="flex-1 h-px bg-border" />
          </div>

          <form onSubmit={submit} className="space-y-3">
            {mode === "signup" && (
              <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Full name" className="w-full rounded-md bg-card border border-border px-3 py-2.5 text-sm" />
            )}
            <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="Email" className="w-full rounded-md bg-card border border-border px-3 py-2.5 text-sm" />
            {mode !== "forgot" && (
              <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" minLength={6} placeholder="Password" className="w-full rounded-md bg-card border border-border px-3 py-2.5 text-sm" />
            )}
            <button disabled={loading} className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground glow-primary hover:bg-primary/90 disabled:opacity-50">
              {loading ? "Please wait…" : mode === "signin" ? "Sign in" : mode === "signup" ? "Create account" : "Send reset link"}
            </button>
          </form>

          <div className="mt-5 text-sm text-muted-foreground space-y-1">
            {mode === "signin" && (
              <>
                <button onClick={() => setMode("forgot")} className="hover:text-primary">Forgot password?</button>
                <div>No account? <button onClick={() => setMode("signup")} className="text-primary">Sign up</button></div>
              </>
            )}
            {mode === "signup" && <div>Already a member? <button onClick={() => setMode("signin")} className="text-primary">Sign in</button></div>}
            {mode === "forgot" && <button onClick={() => setMode("signin")} className="text-primary">Back to sign in</button>}
          </div>
        </div>
      </div>
    </div>
  );
}
