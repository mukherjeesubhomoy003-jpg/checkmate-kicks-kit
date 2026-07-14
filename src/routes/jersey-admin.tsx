import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Save, LogOut, Lock, Eye, EyeOff, Package, ClipboardList, Truck, Calendar } from "lucide-react";
import { JERSEYS, ALL_JERSEYS } from "@/lib/jerseys";
import { FAN_JERSEYS } from "@/lib/fan-jerseys";
import { JACKETS } from "@/lib/jackets";
import { SHORTS } from "@/lib/shorts";
import { SPECIALS } from "@/lib/specials";
import {
  setAdminSession,
  clearAdminSession,
  getAdminSession,
} from "@/lib/jersey-stock";
import { useJerseySizeStock, type SizeKey } from "@/lib/jersey-size-stock";
import {
  loginJerseyAdmin,
  updateJerseySizeStock,
  adminListJerseyOrders,
  updateJerseyOrderDispatch,
  deleteJerseyOrder,
} from "@/lib/jersey-admin.functions";

import { useQuery } from "@tanstack/react-query";

const SIZES: SizeKey[] = ["S", "M", "L", "XL", "XXL"];

export const Route = createFileRoute("/jersey-admin")({
  head: () => ({ meta: [{ title: "Jersey Admin — CHECKMATE" }, { name: "robots", content: "noindex" }] }),
  component: JerseyAdminPage,
});

function JerseyAdminPage() {
  const [token, setToken] = useState("");
  useEffect(() => setToken(getAdminSession()), []);
  if (!token) return <LoginGate onSuccess={(t) => setToken(t)} />;
  return <AdminShell token={token} onLogout={() => setToken("")} />;
}

function LoginGate({ onSuccess }: { onSuccess: (token: string) => void }) {
  const loginAdmin = useServerFn(loginJerseyAdmin);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr("");
    try {
      const { token } = await loginAdmin({ data: { id: id.trim(), password: pw } });
      setAdminSession(token);
      onSuccess(token);
    } catch {
      setErr("Invalid credentials");
    } finally {
      setLoading(false);
    }
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
        <div className="relative mt-1">
          <input type={showPw ? "text" : "password"} value={pw} onChange={(e) => setPw(e.target.value)}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 pr-10 text-sm" />
          <button type="button" onClick={() => setShowPw((s) => !s)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
            aria-label={showPw ? "Hide password" : "Show password"}>
            {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        {err && <div className="mt-3 text-xs text-red-600">{err}</div>}
        <button type="submit" disabled={loading}
          className="mt-5 w-full rounded-full px-4 py-2.5 text-xs font-bold uppercase tracking-wider"
          style={{ background: "var(--gradient-gold)", color: "#1a1a1a", border: "1px solid #8a6a14" }}>
          {loading ? "Checking…" : "Enter Admin"}
        </button>
      </form>
    </div>
  );
}

function AdminShell({ token, onLogout }: { token: string; onLogout: () => void }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"orders" | "stock">("orders");
  return (
    <div className="container-x py-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl md:text-3xl font-bold">CHECKMATE Admin</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate({ to: "/world-cup-2026" })}
            className="rounded-full border border-neutral-300 px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-neutral-50">
            View Site
          </button>
          <button onClick={() => { clearAdminSession(); onLogout(); }}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900">
            <LogOut className="size-3.5" /> Logout
          </button>
        </div>
      </div>

      <div className="mt-5 inline-flex rounded-full border border-neutral-300 bg-white p-1 text-xs font-bold uppercase tracking-wider">
        {(["orders", "stock"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 transition ${tab === t ? "bg-[#1a1a1a] text-[#f4d77a]" : "text-neutral-600 hover:text-neutral-900"}`}>
            {t === "orders" ? <ClipboardList className="size-3.5" /> : <Package className="size-3.5" />} {t}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "orders" ? <OrdersPanel token={token} /> : <StockPanel token={token} />}
      </div>
    </div>
  );
}

// ============ ORDERS ============

type OrderRow = {
  id: string; order_number: string;
  buyer_name: string; buyer_phone: string;
  address: string; city: string; pincode: string;
  landmark: string | null; post_office: string | null;
  item_name: string; kit: string | null; size: string; qty: number;
  unit_price: number; printing_name: string | null; printing_number: string | null;
  printing_fee: number; total: number;
  payment_status: string; dispatch_status: string;
  created_at: string;
};

const DISPATCH_STATES = ["pending", "ready", "dispatched", "delivered", "cancelled"] as const;
type DispatchState = typeof DISPATCH_STATES[number];

function OrdersPanel({ token }: { token: string }) {
  const list = useServerFn(adminListJerseyOrders);
  const updateDispatch = useServerFn(updateJerseyOrderDispatch);
  const deleteOrder = useServerFn(deleteJerseyOrder);
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["jersey-orders", token],
    queryFn: () => list({ data: { token } }) as Promise<OrderRow[]>,
    refetchInterval: 30_000,
  });
  const [filter, setFilter] = useState<"today" | "all" | "pending">("today");

  // Exclude cancelled from every count/view (they're also deleted on cancel)
  const visible = useMemo(() => (data ?? []).filter((r) => r.dispatch_status !== "cancelled"), [data]);

  const rows = useMemo(() => {
    if (filter === "today") {
      const today = new Date(); today.setHours(0, 0, 0, 0);
      return visible.filter((r) => new Date(r.created_at) >= today);
    }
    if (filter === "pending") return visible.filter((r) => r.dispatch_status === "pending" || r.dispatch_status === "ready");
    return visible;
  }, [visible, filter]);

  const todaysCount = useMemo(() => {
    const t = new Date(); t.setHours(0, 0, 0, 0);
    return visible.filter((r) => new Date(r.created_at) >= t).length;
  }, [visible]);
  const todaysRevenue = useMemo(() => {
    const t = new Date(); t.setHours(0, 0, 0, 0);
    return visible.filter((r) => new Date(r.created_at) >= t).reduce((s, r) => s + r.total, 0);
  }, [visible]);
  const pendingCount = useMemo(() => visible.filter((r) => r.dispatch_status === "pending").length, [visible]);

  async function setStatus(id: string, dispatch_status: DispatchState) {
    try {
      if (dispatch_status === "cancelled") {
        if (!confirm("Cancel and permanently delete this order? It will be removed from all stats.")) return;
        await deleteOrder({ data: { token, id } });
        toast.success("Order cancelled & removed");
      } else {
        await updateDispatch({ data: { token, id, dispatch_status } });
        toast.success(`Marked ${dispatch_status}`);
      }
      qc.invalidateQueries({ queryKey: ["jersey-orders"] });
    } catch (e) { toast.error((e as Error).message); }
  }


  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        <StatCard icon={<Calendar className="size-4" />} label="Today's orders" value={String(todaysCount)} />
        <StatCard icon={<Truck className="size-4" />} label="Today's revenue" value={`₹${todaysRevenue.toLocaleString("en-IN")}`} />
        <StatCard icon={<Package className="size-4" />} label="Pending dispatch" value={String(pendingCount)} />
      </div>

      <div className="mt-5 inline-flex rounded-full border border-neutral-200 bg-white p-1 text-xs font-semibold">
        {(["today", "pending", "all"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`rounded-full px-3 py-1 ${filter === f ? "bg-[#fbf4dd] text-[#1a1a1a]" : "text-neutral-600 hover:text-neutral-900"}`}>
            {f === "today" ? "Today" : f === "pending" ? "Pending" : "All"}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="mt-6 text-sm text-neutral-500">Loading orders…</div>
      ) : rows.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-neutral-300 bg-white p-8 text-center text-sm text-neutral-500">
          No orders {filter === "today" ? "today" : "yet"}.
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {rows.map((o) => (
            <OrderCard key={o.id} order={o} onSetStatus={(s) => setStatus(o.id, s)} />
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-gold/30 bg-white p-3 shadow-sm">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#8a6a14] font-bold">{icon}{label}</div>
      <div className="mt-1 text-xl md:text-2xl font-display font-bold">{value}</div>
    </div>
  );
}

function OrderCard({ order, onSetStatus }: { order: OrderRow; onSetStatus: (s: DispatchState) => void }) {
  const [open, setOpen] = useState(false);
  const date = new Date(order.created_at);
  const statusColor: Record<string, string> = {
    pending: "bg-amber-100 text-amber-800",
    ready: "bg-blue-100 text-blue-800",
    dispatched: "bg-emerald-100 text-emerald-800",
    delivered: "bg-emerald-200 text-emerald-900",
    cancelled: "bg-red-100 text-red-700",
  };
  return (
    <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden">
      <button onClick={() => setOpen((v) => !v)} className="w-full text-left p-3 md:p-4 hover:bg-neutral-50">
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="font-mono text-xs font-bold text-[#8a6a14]">{order.order_number}</div>
            <div className="min-w-0">
              <div className="font-semibold text-sm truncate">{order.item_name}{order.kit ? ` · ${order.kit}` : ""} · {order.size} × {order.qty}</div>
              <div className="text-[11px] text-neutral-500 truncate">{order.buyer_name} · +91 {order.buyer_phone} · {date.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm font-bold">₹{order.total}</div>
            <span className={`rounded-full px-2 py-0.5 text-[10px] uppercase font-bold ${statusColor[order.dispatch_status] ?? "bg-neutral-100"}`}>{order.dispatch_status}</span>
          </div>
        </div>
      </button>
      {open && (
        <div className="border-t border-neutral-200 p-4 bg-neutral-50/60 text-xs space-y-2">
          <Detail label="Address" value={`${order.address}, ${order.city} – ${order.pincode}`} />
          {order.landmark && <Detail label="Landmark" value={order.landmark} />}
          {order.post_office && <Detail label="Post office" value={order.post_office} />}
          {order.printing_name && <Detail label="Back printing" value={`${order.printing_name} #${order.printing_number} (+₹${order.printing_fee})`} />}
          <Detail label="Payment" value={order.payment_status} />
          <div className="pt-2 flex flex-wrap gap-1.5">
            {DISPATCH_STATES.map((s) => (
              <button key={s} onClick={() => onSetStatus(s)} disabled={order.dispatch_status === s}
                className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider border ${order.dispatch_status === s ? "border-[#8a6a14] bg-[#1a1a1a] text-[#f4d77a] cursor-default" : "border-neutral-300 bg-white hover:bg-neutral-100"}`}>
                {s === "ready" ? "Ready to dispatch" : s === "dispatched" ? "Mark dispatched" : s === "delivered" ? "Delivered" : s === "cancelled" ? "Cancel" : "Reset to pending"}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <div className="w-24 shrink-0 text-[10px] uppercase tracking-wider text-neutral-500 font-bold">{label}</div>
      <div className="text-neutral-800">{value}</div>
    </div>
  );
}

// ============ STOCK ============

const POSTER_ITEMS = [
  { id: "p-ronaldo", team: "Ronaldo · 7", image: "https://placehold.co/60/1a1a1a/fa5400?text=R" },
  { id: "p-mbappe", team: "Mbappé · 10", image: "https://placehold.co/60/1a1a1a/fa5400?text=M" },
  { id: "p-neymar", team: "Neymar · 10", image: "https://placehold.co/60/1a1a1a/fa5400?text=N" },
];

type StockSection = "player" | "specials" | "fan" | "jackets" | "shorts" | "posters";
const SECTIONS: { key: StockSection; label: string; sub: string }[] = [
  { key: "player", label: "Player Version", sub: "Match-grade · S/M/L/XL/XXL" },
  { key: "specials", label: "Special Editions", sub: "FS · Practice · Deals" },
  { key: "fan", label: "Fan Version", sub: "Supporter kits · S/M/L/XL/XXL" },
  { key: "jackets", label: "Jackets", sub: "Track jackets · S/M/L/XL/XXL" },
  { key: "shorts", label: "Shorts", sub: "Football shorts · S/M/L/XL/XXL" },
  { key: "posters", label: "Wall Posters", sub: "Single-unit stock" },
];

const SHORT_ITEMS = SHORTS.map((s) => ({ id: s.id, team: `${s.team} · ${s.colour}`, image: s.image }));

const SPECIAL_ITEMS = SPECIALS.map((s) => ({ id: s.id, team: s.title, image: s.image }));

function StockPanel({ token }: { token: string }) {
  const [section, setSection] = useState<StockSection>("player");
  const { data: stockMap, isLoading } = useJerseySizeStock();
  const save = useServerFn(updateJerseySizeStock);
  const qc = useQueryClient();
  const [draft, setDraft] = useState<Record<string, Partial<Record<SizeKey, number>>>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (stockMap) setDraft(JSON.parse(JSON.stringify(stockMap))); }, [stockMap]);

  const items = section === "player" ? ALL_JERSEYS
    : section === "specials" ? SPECIAL_ITEMS
    : section === "fan" ? FAN_JERSEYS
    : section === "jackets" ? JACKETS
    : section === "shorts" ? SHORT_ITEMS
    : section === "posters" ? POSTER_ITEMS
    : [];
  const sizeCols: SizeKey[] = section === "posters" ? ["M"] : SIZES;

  const dirty = useMemo(() => {
    const updates: { jersey_id: string; size: SizeKey; stock: number }[] = [];
    if (!stockMap) return updates;
    const all = [...ALL_JERSEYS, ...SPECIAL_ITEMS, ...FAN_JERSEYS, ...JACKETS, ...SHORT_ITEMS, ...POSTER_ITEMS];
    for (const j of all) {
      const isPoster = j.id.startsWith("p-");
      const cols: SizeKey[] = isPoster ? ["M"] : SIZES;
      for (const s of cols) {
        const a = draft[j.id]?.[s] ?? 0;
        const b = stockMap[j.id]?.[s] ?? 0;
        if (a !== b) updates.push({ jersey_id: j.id, size: s, stock: a });
      }
    }
    return updates;
  }, [draft, stockMap]);

  function setVal(jersey_id: string, size: SizeKey, v: string) {
    const n = Math.max(0, parseInt(v || "0", 10) || 0);
    setDraft((d) => ({ ...d, [jersey_id]: { ...(d[jersey_id] ?? {}), [size]: n } }));
  }

  async function saveAll() {
    if (!dirty.length) { toast.info("No changes"); return; }
    setSaving(true);
    try {
      await save({ data: { token, updates: dirty } });
      await qc.invalidateQueries({ queryKey: ["jersey-size-stock"] });
      toast.success(`Updated ${dirty.length} row${dirty.length > 1 ? "s" : ""} — live on website`);
    } catch (e) { toast.error((e as Error).message); }
    finally { setSaving(false); }
  }

  const sectionDirty = dirty.filter((u) => {
    if (section === "player") return ALL_JERSEYS.some((j) => j.id === u.jersey_id);
    if (section === "specials") return SPECIAL_ITEMS.some((j) => j.id === u.jersey_id);
    if (section === "fan") return FAN_JERSEYS.some((j) => j.id === u.jersey_id);
    if (section === "jackets") return JACKETS.some((j) => j.id === u.jersey_id);
    if (section === "shorts") return SHORT_ITEMS.some((j) => j.id === u.jersey_id);
    if (section === "posters") return POSTER_ITEMS.some((j) => j.id === u.jersey_id);
    return false;
  }).length;


  return (
    <div>
      {/* Section tabs */}
      <div className="flex flex-wrap gap-2">
        {SECTIONS.map((s) => (
          <button key={s.key} onClick={() => setSection(s.key)}
            className={`rounded-xl border px-3 py-2 text-left transition ${section === s.key ? "border-[#fa5400] bg-[#1a1a1a] text-white" : "border-neutral-300 bg-white text-neutral-800 hover:border-neutral-500"}`}>
            <div className="text-[11px] font-bold uppercase tracking-wider">{s.label}</div>
            <div className={`text-[10px] ${section === s.key ? "text-[#fa5400]" : "text-neutral-500"}`}>{s.sub}</div>
          </button>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-xs text-neutral-500">
          {section === "shorts"
            ? "Shorts inventory not launched yet. Add stock rows here when products go live."
            : `Editing ${items.length} ${section === "posters" ? "posters" : "jerseys"}. Changes apply to the website instantly after Save.`}
        </p>
        <button onClick={saveAll} disabled={saving || !dirty.length}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#fa5400] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[#e64a00] disabled:opacity-50">
          <Save className="size-3.5" /> {saving ? "Saving…" : `Save${dirty.length ? ` (${dirty.length})` : ""}`}
        </button>
      </div>

      {section !== "shorts" && sectionDirty > 0 && (
        <div className="mt-3 rounded-lg border border-[#fa5400]/40 bg-[#fff4ec] px-3 py-2 text-[11px] font-semibold text-[#8a3400]">
          {sectionDirty} unsaved change{sectionDirty > 1 ? "s" : ""} in this section.
        </div>
      )}

      {section === "shorts" ? (
        <div className="mt-6 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-10 text-center">
          <div className="mx-auto mb-2 grid size-12 place-items-center rounded-full bg-[#1a1a1a] text-[#fa5400]">
            <Package className="size-5" />
          </div>
          <div className="font-bebas text-2xl tracking-wide">SHORTS DROP INCOMING</div>
          <div className="mt-1 text-xs text-neutral-500">No stockable products yet — the website shows "Coming soon".</div>
        </div>
      ) : isLoading ? (
        <div className="mt-6 text-sm text-neutral-500">Loading stock…</div>
      ) : (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {items.map((j) => {
            const jerseyTotal = sizeCols.reduce((s, k) => s + (draft[j.id]?.[k] ?? 0), 0);
            const stockOut = () => setDraft((d) => ({
              ...d,
              [j.id]: sizeCols.reduce((o, k) => ({ ...o, [k]: 0 }), {} as Partial<Record<SizeKey, number>>),
            }));
            const label = "team" in j ? j.team : "";
            const tag = "tag" in j ? ` · ${(j as { tag: string }).tag}` : "";
            return (
              <div key={j.id} className="rounded-xl border border-neutral-200 bg-white p-3">
                <div className="flex items-center gap-3">
                  <img src={j.image} alt={label} className="size-12 rounded-md object-cover bg-neutral-100" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-mono text-neutral-500">#{j.id}</div>
                    <div className="font-semibold text-sm truncate">{label}{tag}</div>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${jerseyTotal === 0 ? "bg-red-100 text-red-700" : "bg-emerald-50 text-emerald-700 border border-emerald-200"}`}>
                    {jerseyTotal === 0 ? "Sold out" : `${jerseyTotal} total`}
                  </span>
                  <button onClick={stockOut} disabled={jerseyTotal === 0}
                    className="rounded-md border border-red-300 bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-red-700 hover:bg-red-50 disabled:opacity-40">
                    Stock out
                  </button>
                </div>
                <div className={`mt-3 grid gap-2`} style={{ gridTemplateColumns: `repeat(${sizeCols.length}, minmax(0, 1fr))` }}>
                  {sizeCols.map((s) => {
                    const cur = draft[j.id]?.[s] ?? 0;
                    const orig = stockMap?.[j.id]?.[s] ?? 0;
                    const isDirty = cur !== orig;
                    return (
                      <div key={s} className={`rounded-md border p-1.5 text-center ${isDirty ? "border-[#fa5400] bg-[#fff4ec]" : "border-neutral-200"}`}>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">{section === "posters" ? "Units" : s}</div>
                        <input value={cur} onChange={(e) => setVal(j.id, s, e.target.value)} inputMode="numeric"
                          className="mt-0.5 w-full rounded border border-neutral-300 px-1 py-0.5 text-center text-sm font-semibold" />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

