import { useEffect, useRef, useState } from "react";
import { ShoppingCart, Ruler, ClipboardList, QrCode, MessageCircle, PackageCheck } from "lucide-react";

const STEPS = [
  { icon: Ruler, title: "Pick your size", body: "Choose S–XXL on each item. Check the size chart if unsure." },
  { icon: ShoppingCart, title: "Add to Cart", body: "Tap Add to Cart — combine any number of sets, jerseys or kits." },
  { icon: ClipboardList, title: "Fill delivery details", body: "Name, phone, address, pincode. Takes 30 seconds." },
  { icon: QrCode, title: "Pay via UPI QR", body: "Scan the QR shown at checkout. Any UPI app works." },
  { icon: MessageCircle, title: "Send slip on WhatsApp", body: "One tap sends your order slip + screenshot to us." },
  { icon: PackageCheck, title: "Dispatch in 24 hrs", body: "Track updates on WhatsApp. All-India delivery in 5–7 days." },
];

export function OrderGuide() {
  const [activeIdx, setActiveIdx] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.idx);
            setActiveIdx(i);
          }
        });
      },
      { threshold: 0.55, rootMargin: "-10% 0px -35% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <aside className="relative py-4">
      <div className="sticky top-24 mb-4">
        <div className="inline-flex items-center gap-2 bg-black text-[#F1BF00] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em]">
          How to Order · Bulk friendly
        </div>
        <h3 className="mt-3 font-bebas text-3xl md:text-4xl uppercase tracking-tight text-black">
          Order in <span className="text-[#fa5400]">6 easy steps</span>
        </h3>
        <p className="mt-1 text-xs text-neutral-600">Scroll down to see each step animate in.</p>
      </div>

      <ol className="relative border-l-2 border-dashed border-black/10 pl-6 space-y-6">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const active = i === activeIdx;
          return (
            <li
              key={s.title}
              ref={(el) => { refs.current[i] = el; }}
              data-idx={i}
              className={`relative transition-all duration-500 ${active ? "opacity-100 translate-x-0" : "opacity-60 translate-x-1"}`}
            >
              <span
                className={`absolute -left-[34px] top-0 grid size-8 place-items-center rounded-full border-2 transition-all duration-500 ${
                  active ? "bg-[#fa5400] border-[#fa5400] text-white scale-110 shadow-lg shadow-[#fa5400]/40" : "bg-white border-black/20 text-neutral-500"
                }`}
              >
                <Icon className="size-4" />
              </span>
              <div className={`transition-colors ${active ? "text-black" : "text-neutral-600"}`}>
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#fa5400]">Step {i + 1}</div>
                <div className="mt-0.5 font-bebas text-xl uppercase tracking-wide">{s.title}</div>
                <p className="mt-1 text-xs leading-relaxed">{s.body}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
