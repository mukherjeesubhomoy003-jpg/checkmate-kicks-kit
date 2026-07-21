import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type SizeKey = "S" | "M" | "L" | "XL" | "XXL";
export type SizeStockMap = Record<string, Partial<Record<SizeKey, number>>>;

export async function fetchSizeStockMap(): Promise<SizeStockMap> {
  const rows: { jersey_id: string; size: string; stock: number }[] = [];
  const pageSize = 1000;

  for (let from = 0; ; from += pageSize) {
    const { data, error } = await supabase
      .from("jersey_size_stock")
      .select("jersey_id, size, stock")
      .order("jersey_id", { ascending: true })
      .order("size", { ascending: true })
      .range(from, from + pageSize - 1);

    if (error) throw error;
    rows.push(...((data ?? []) as typeof rows));
    if (!data || data.length < pageSize) break;
  }

  const map: SizeStockMap = {};
  for (const row of rows) {
    const id = row.jersey_id as string;
    if (!map[id]) map[id] = {};
    map[id]![row.size as SizeKey] = row.stock as number;
  }
  return map;
}

export function useJerseySizeStock() {
  return useQuery({
    queryKey: ["jersey-size-stock"],
    queryFn: fetchSizeStockMap,
    staleTime: 60_000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    // NOTE: no polling — admin draft edits must not be clobbered by refetches.
  });
}

