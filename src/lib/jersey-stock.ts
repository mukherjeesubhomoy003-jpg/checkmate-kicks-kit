import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type StockMap = Record<string, number>;

export async function fetchStockMap(): Promise<StockMap> {
  const { data, error } = await supabase.from("jersey_stock").select("id, stock");
  if (error) throw error;
  const map: StockMap = {};
  for (const row of data ?? []) map[row.id as string] = row.stock as number;
  return map;
}

export function useJerseyStock() {
  return useQuery({
    queryKey: ["jersey-stock"],
    queryFn: fetchStockMap,
    staleTime: 30_000,
  });
}

const ADMIN_KEY = "cm_jersey_admin_token";

export function setAdminSession(token: string) {
  if (typeof window !== "undefined") localStorage.setItem(ADMIN_KEY, token);
}
export function clearAdminSession() {
  if (typeof window !== "undefined") localStorage.removeItem(ADMIN_KEY);
}
export function getAdminSession() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(ADMIN_KEY) ?? "";
}
