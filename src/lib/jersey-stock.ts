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

const ADMIN_KEY = "cm_jersey_admin";
const ADMIN_ID = "ANKUSHKHATIK123";
const ADMIN_PW = "ANKUSH@123";

export function checkAdminCreds(id: string, pw: string) {
  return id === ADMIN_ID && pw === ADMIN_PW;
}
export function setAdminSession() {
  if (typeof window !== "undefined") localStorage.setItem(ADMIN_KEY, "1");
}
export function clearAdminSession() {
  if (typeof window !== "undefined") localStorage.removeItem(ADMIN_KEY);
}
export function isAdminSession() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(ADMIN_KEY) === "1";
}
