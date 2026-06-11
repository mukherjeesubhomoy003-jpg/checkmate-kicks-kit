import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { adminStats } from "@/lib/admin.functions";
import { inr } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const fn = useServerFn(adminStats);
  const { data } = useQuery({ queryKey: ["admin-stats"], queryFn: () => fn() });
  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground mt-2">Welcome back. Here's how your store is doing.</p>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Revenue" value={data ? inr(data.revenue) : "—"} />
        <Stat label="Orders" value={data ? String(data.orders) : "—"} />
        <Stat label="Pending Orders" value={data ? String(data.pending) : "—"} />
        <Stat label="Products" value={data ? String(data.products) : "—"} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-2 text-3xl font-bold">{value}</div>
    </div>
  );
}
