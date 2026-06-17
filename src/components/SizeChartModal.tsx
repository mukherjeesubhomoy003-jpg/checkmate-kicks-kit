import { X, Ruler } from "lucide-react";

type Props = { open: boolean; onClose: () => void };

const ROWS: Array<{ size: string; chest: number; length: number }> = [
  { size: "S", chest: 36, length: 26 },
  { size: "M", chest: 38, length: 27 },
  { size: "L", chest: 40, length: 28 },
  { size: "XL", chest: 42, length: 29 },
  { size: "XXL", chest: 44, length: 30 },
];

export function SizeChartModal({ open, onClose }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden"
        style={{ border: "1px solid #d4af37" }}>
        <div className="flex items-center justify-between px-5 py-3.5"
          style={{ background: "linear-gradient(135deg,#0b1733,#0a1228)" }}>
          <div className="flex items-center gap-2 text-white">
            <Ruler className="size-4 text-[#f4d77a]" />
            <h3 className="text-sm font-bold uppercase tracking-[0.18em]">Size Chart</h3>
          </div>
          <button onClick={onClose} aria-label="Close" className="rounded-full p-1.5 text-white/80 hover:bg-white/10">
            <X className="size-4" />
          </button>
        </div>

        <div className="p-5">
          <p className="text-xs text-neutral-600 mb-3">All measurements in <b>inches</b>. Chest = across the front · Body Length = shoulder to hem.</p>
          <div className="overflow-hidden rounded-xl border border-neutral-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#fbf4dd] text-[#1a1a1a]">
                  <th className="px-3 py-2.5 text-left font-bold tracking-wider text-xs uppercase">Size</th>
                  <th className="px-3 py-2.5 text-center font-bold tracking-wider text-xs uppercase">Chest</th>
                  <th className="px-3 py-2.5 text-center font-bold tracking-wider text-xs uppercase">Body Length</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, i) => (
                  <tr key={r.size} className={i % 2 ? "bg-white" : "bg-neutral-50"}>
                    <td className="px-3 py-2.5 font-bold text-[#0b1733]">{r.size}</td>
                    <td className="px-3 py-2.5 text-center">{r.chest}"</td>
                    <td className="px-3 py-2.5 text-center">{r.length}"</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[11px] text-neutral-500 leading-relaxed">
            Tip: For a relaxed fit, pick one size up. Player-edition jerseys are slim-fit.
          </p>
        </div>
      </div>
    </div>
  );
}
