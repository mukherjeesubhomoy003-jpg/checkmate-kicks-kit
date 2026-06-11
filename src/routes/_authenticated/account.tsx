import { createFileRoute, Link, useNavigate, Outlet } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { Package, User, Shield, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { myProfile } from "@/lib/account.functions";

export const Route = createFileRoute("/_authenticated/account")({
  head: () => ({ meta: [{ title: "Account — CHECKMATE" }] }),
  component: AccountLayout,
});

function AccountLayout() {
  const fetchProfile = useServerFn(myProfile);
  const { data } = useQuery({ queryKey: ["my-profile"], queryFn: () => fetchProfile() });
  const navigate = useNavigate();
  const qc = useQueryClient();

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="container-x py-10 grid lg:grid-cols-[240px_1fr] gap-8">
      <aside className="space-y-1">
        <div className="rounded-2xl border border-border bg-card p-4 mb-4">
          <div className="font-semibold truncate">{data?.profile?.full_name ?? "Member"}</div>
          <div className="text-xs text-muted-foreground truncate">{data?.profile?.id}</div>
        </div>
        <NavL to="/account" icon={User} label="Overview" />
        <NavL to="/account/orders" icon={Package} label="Orders" />
        {data?.isAdmin && <NavL to="/admin" icon={Shield} label="Admin" />}
        <button onClick={signOut} className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-secondary">
          <LogOut className="size-4" /> Sign out
        </button>
      </aside>
      <div>
        <Outlet />
        <AccountHome name={data?.profile?.full_name ?? undefined} />
      </div>
    </div>
  );
}

function NavL({ to, icon: Icon, label }: { to: string; icon: typeof User; label: string }) {
  return (
    <Link to={to as never} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-secondary" activeProps={{ className: "bg-primary/15 text-primary" }}>
      <Icon className="size-4" /> {label}
    </Link>
  );
}

function AccountHome({ name }: { name?: string }) {
  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome{ name ? `, ${name.split(" ")[0]}` : ""} 👋</h1>
      <p className="text-muted-foreground mt-2">Manage your orders, addresses and profile.</p>
      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        <Link to="/account/orders" className="rounded-2xl border border-border bg-card p-6 hover:border-primary/60">
          <Package className="size-6 text-primary" />
          <div className="mt-3 font-semibold">My Orders</div>
          <div className="text-sm text-muted-foreground">Track and manage your purchases.</div>
        </Link>
        <Link to="/shop" className="rounded-2xl border border-border bg-card p-6 hover:border-primary/60">
          <User className="size-6 text-primary" />
          <div className="mt-3 font-semibold">Keep shopping</div>
          <div className="text-sm text-muted-foreground">Discover new gear in the latest drop.</div>
        </Link>
      </div>
    </div>
  );
}
