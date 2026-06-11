import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { LayoutDashboard, Package, ShoppingBag, Tag, ArrowLeft } from "lucide-react";
import { myProfile } from "@/lib/account.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — CHECKMATE" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  const fn = useServerFn(myProfile);
  const { data, isLoading } = useQuery({ queryKey: ["my-profile"], queryFn: () => fn() });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && data && !data.isAdmin) navigate({ to: "/account" });
  }, [isLoading, data, navigate]);

  if (isLoading || !data) return <div className="container-x py-20 text-muted-foreground">Loading…</div>;
  if (!data.isAdmin) return null;

  return (
    <div className="min-h-screen grid lg:grid-cols-[240px_1fr]">
      <aside className="border-r border-border bg-card/40 p-4 space-y-1">
        <div className="px-2 py-3 font-display text-xl font-bold"><span className="text-primary">CHECK</span>MATE <span className="text-xs text-muted-foreground font-normal">/ Admin</span></div>
        <NavL to="/admin" icon={LayoutDashboard} label="Dashboard" />
        <NavL to="/admin/products" icon={Package} label="Products" />
        <NavL to="/admin/orders" icon={ShoppingBag} label="Orders" />
        <NavL to="/admin/coupons" icon={Tag} label="Coupons" />
        <Link to="/" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-secondary mt-6">
          <ArrowLeft className="size-4" /> Back to store
        </Link>
      </aside>
      <main className="p-6 lg:p-10">
        <Outlet />
        <AdminHome />
      </main>
    </div>
  );
}

function NavL({ to, icon: Icon, label }: { to: string; icon: typeof Package; label: string }) {
  return (
    <Link to={to as never} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-secondary" activeProps={{ className: "bg-primary/15 text-primary" }}>
      <Icon className="size-4" /> {label}
    </Link>
  );
}

function AdminHome() {
  return null;
}
