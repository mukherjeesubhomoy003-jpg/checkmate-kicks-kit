import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Minus, Plus, Save, LogOut, Lock } from "lucide-react";
import { JERSEYS } from "@/lib/jerseys";
import { supabase } from "@/integrations/supabase/client";
import {
  useJerseyStock,
  checkAdminCreds,
  setAdminSession,
  clearAdminSession,
  isAdminSession,
} from "@/lib/jersey-stock";

export const Route = createFileRoute("/jersey-admin")({
  head: () => ({ meta: [{ title: "Jersey Stock Admin — CHECKMATE" }, { name: "robots", content: "noindex" }] }),
  component: JerseyAdminPage,
});

function JerseyAdminPage() {
  const [authed, setAuthed] = useState(false);
  useEffect(() => setAuthed(isAdminSession()), []);
  if (!authed) return <LoginGate onSuccess={() => setAuthed(true)} />;
  return <StockEditor onLogout={() => setAuthed(false)} />;
}

function LoginGate({ onSuccess }: { onSuccess: () => void }) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (checkAdminCreds(id.trim(), pw)) {
      setAdminSession();
      onSuccess();
    } else setErr("Invalid credentials");
  }
  return (
    <div className="min-h-[70vh] grid place-items-center px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-gold/40 bg-white p-6 shadow-luxe">
        <div className="flex items-center gap-2 text-[#8a6a14]"><Lock className="size-4" /><h1 className="font-display text-xl font-bold">Admin Login</h1></div>
        <p className="mt-1 text-xs text-neutral-500">Owner access only</p>
        <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-neutral-600">Admin ID</label>
        <input value={id} onChange={(e) => setId(e.target.value)} autoComplete="off"
          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm" />
        <label className="mt-3 block text-xs font-semibold uppercase tracking-wider text-neutral-600">Password</label>
        <input type="password" value={pw} onChange={(e) => setPw(e.target.value)}
          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm" />
        {err && <div className="mt-3 text-xs text-red-600">{err}</div>}
        <button type="submit"
          className="mt-5 w-full rounded-full px-4 py-2.5 text-xs font-bold uppercase tracking-wider"
          style={{ background: "var(--gradient-gold)", color: "#1a1a1a", border: "1px solid #8a6a14" }}>
          Enter Admin
        </button>
      </form>
    </div>
  );
}

function StockEditor({ onLogout }: { onLogout: () => void }) {
  const { data: stockMap, isLoading } = useJerseyStock();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [draft, setDraft] = useState<Record<string, number>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (stockMap) setDraft({ ...stockMap }); }, [stockMap]);

  const dirtyIds = useMemo(
    () => Object.keys(draft).filter((id) => stockMap && draft[id] !== stockMap[id]),
    [draft, stockMap],
  );

  function bump(id: string, delta: number) {
    setDraft((d) => ({ ...d, [id]: Math.max(0, (d[id] ?? 0) + delta) }));
  }
  function setVal(id: string, v: string) {
    const n = Math.max(0, parseInt(v || "0", 10) || 0);
    setDraft((d) => ({ ...d, [id]: n }));
  }

  async function saveAll() {
    if (!dirtyIds.length) { toast.info("No changes to save"); return; }
    setSaving(true);
    try {
      for (const id of dirtyIds) {
        const { error } = await supabase
          .from("jersey_stock")
          .update({ stock: draft[id], updated_at: new Date().toISOString() })
          .eq("id", id);
        if (error) throw error;
      }
      await qc.invalidateQueries({ queryKey: ["jersey-stock"] });
      toast.success(`Stock updated for ${dirtyIds.length} jersey${dirtyIds.length > 1 ? "s" : ""}`);
    } catch (e) {
      toast.error((e as Error).message);
    } finally { setSaving(false); }
  }

  function done() {
    if (dirtyIds.length) { toast.error("Save changes first"); return; }
    navigate({ to: "/world-cup-2026" });
  }

  return (
    <div className="container-x py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold">Jersey Stock</h1>
          <p className="text-xs text-neutral-500">Adjust stock with +/–, then Update Stock. Changes go live instantly.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={saveAll} disabled={saving || !dirtyIds.length}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider disabled:opacity-50"
            style={{ background: "var(--gradient-gold)", color: "#1a1a1a", border: "1px solid #8a6a14" }}>
            <Save className="size-3.5" /> {saving ? "Saving…" : `Update Stock${dirtyIds.length ? ` (${dirtyIds.length})` : ""}`}
          </button>
          <button onClick={done}
            className="inline-flex items-center rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider border border-neutral-300 hover:bg-neutral-50">
            Done
          </button>
          <button onClick={() => { clearAdminSession(); onLogout(); }}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900">
            <LogOut className="size-3.5" /> Logout
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="mt-10 text-sm text-neutral-500">Loading stock…</div>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {JERSEYS.map((j) => {
            const current = draft[j.id] ?? 0;
            const dirty = stockMap && current !== stockMap[j.id];
            return (
              <div key={j.id}
                className={`flex items-center gap-3 rounded-xl border p-3 bg-white ${dirty ? "border-[#d4af37] ring-1 ring-[#d4af37]/40" : "border-neutral-200"}`}>
                <img src={j.image} alt={j.team} className="size-16 rounded-md object-cover bg-gold-soft" />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-mono text-neutral-500">#{j.id}</div>
                  <div className="font-semibold text-sm truncate">{j.team}</div>
                  <div className="text-[10px] uppercase tracking-wider text-neutral-500">{j.tag}</div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => bump(j.id, -1)} className="grid place-items-center size-7 rounded-md border border-neutral-300 hover:bg-neutral-50" aria-label="Decrease">
                    <Minus className="size-3.5" />
                  </button>
                  <input value={current} onChange={(e) => setVal(j.id, e.target.value)} inputMode="numeric"
                    className="w-12 rounded-md border border-neutral-300 px-1 py-1 text-center text-sm font-semibold" />
                  <button onClick={() => bump(j.id, 1)} className="grid place-items-center size-7 rounded-md border border-neutral-300 hover:bg-neutral-50" aria-label="Increase">
                    <Plus className="size-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
