import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, MessageCircle, QrCode, Check, ArrowRight, Copy } from "lucide-react";
import { useBulkCart } from "@/lib/bulk-cart";
import { BRAND, PAYMENT_QR_URL, UPI_ID, UPI_NAME } from "@/components/order/OrderModal";

export const Route = createFileRoute("/bulk-cart")({
  head: () => ({
    meta: [
      { title: "Your Cart · Bulk Order — CHECKMATE" },
      { name: "description", content: "Order multiple kits at once. Add to cart, share your details, pay via UPI, get your order slip on WhatsApp." },
      { property: "og:title", content: "CHECKMATE — Bulk Cart" },
      { property: "og:description", content: "Bulk-order flow: pick sizes, add to cart, pay via UPI, order slip on WhatsApp." },
    ],
  }),
  component: BulkCartPage,
});

const SHIP_FREE_ABOVE = 1499;
const SHIP_FEE = 99;

type Details = {
  name: string; phone: string; altPhone: string;
  address: string; city: string; pincode: string;
  landmark: string; postOffice: string; notes: string;
};

const EMPTY_DETAILS: Details = {
  name: "", phone: "", altPhone: "", address: "", city: "", pincode: "", landmark: "", postOffice: "", notes: "",
};

function nextOrderNumber(): string {
  const KEY = "checkmate_bulk_counter";
  let n = 0;
  try { n = parseInt(localStorage.getItem(KEY) || "0", 10) || 0; } catch {}
  n += 1;
  try { localStorage.setItem(KEY, String(n)); } catch {}
  return `CHKMB-${String(n).padStart(4, "0")}`;
}

function BulkCartPage() {
  const cart = useBulkCart();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [d, setD] = useState<Details>(EMPTY_DETAILS);
  const [orderNo, setOrderNo] = useState("");

  const shipping = cart.subtotal === 0 || cart.subtotal >= SHIP_FREE_ABOVE ? 0 : SHIP_FEE;
  const total = cart.subtotal + shipping;

  const validDetails =
    d.name.trim().length > 1 &&
    /^[6-9]\d{9}$/.test(d.phone.trim()) &&
    (!d.altPhone || (/^[6-9]\d{9}$/.test(d.altPhone.trim()) && d.altPhone.trim() !== d.phone.trim())) &&
    d.address.trim().length > 5 &&
    d.city.trim().length > 1 &&
    /^\d{6}$/.test(d.pincode.trim());

  function buildMessage(num: string, paid: boolean) {
    const items = cart.items.map((it, i) =>
      `${i + 1}. ${it.name} — Size ${it.size} × ${it.quantity} @ ₹${it.price} = ₹${it.price * it.quantity}`,
    ).join("\n");
    return [
      `*New BULK Order — CHECKMATE*`,
      `*Order #:* ${num}`,
      ``,
      `*Items (${cart.count}):*`,
      items,
      ``,
      `*Subtotal:* ₹${cart.subtotal}`,
      `*Shipping:* ${shipping === 0 ? "Free" : "₹" + shipping}`,
      `*Total:* ₹${total}`,
      ``,
      `*Buyer*`,
      `Name: ${d.name}`,
      `Phone: ${d.phone}`,
      ...(d.altPhone ? [`Alt Phone: ${d.altPhone}`] : []),
      `Address: ${d.address}`,
      ...(d.landmark ? [`Landmark: ${d.landmark}`] : []),
      ...(d.postOffice ? [`Post Office: ${d.postOffice}`] : []),
      `City: ${d.city}  Pin: ${d.pincode}`,
      ...(d.notes ? [``, `*Notes:* ${d.notes}`] : []),
      ``,
      paid ? `✅ Payment done — sharing screenshot next.` : `🕒 Will pay shortly via UPI QR.`,
    ].join("\n");
  }

  function openWA(text: string) {
    const url = `https://api.whatsapp.com/send?phone=${BRAND.whatsappPrimary}&text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function confirmPaid() {
    const num = orderNo || nextOrderNumber();
    setOrderNo(num);
    openWA(buildMessage(num, true));
    setStep(4);
  }

  // ---------- EMPTY ----------
  if (cart.items.length === 0 && step === 1) {
    return (
      <div className="container-x py-20 text-center">
        <ShoppingBag className="mx-auto size-14 text-neutral-400" />
        <h1 className="mt-4 font-bebas text-4xl uppercase tracking-tight">Your cart is empty</h1>
        <p className="mt-2 text-sm text-neutral-600">Add sets, jerseys or kits — order them all in one go.</p>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <Link to="/sets" className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-[#fa5400]">
            Shop 1st Grade Sets <ArrowRight className="size-4" />
          </Link>
          <Link to="/player-version" className="inline-flex items-center rounded-full border border-black/20 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-100">
            Player Version
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-x py-8 md:py-12">
      {/* Stepper */}
      <ol className="flex items-center justify-center gap-2 sm:gap-4 mb-8 text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em]">
        {["Cart", "Details", "Payment", "Done"].map((label, i) => {
          const n = (i + 1) as 1 | 2 | 3 | 4;
          const active = step === n;
          const done = step > n;
          return (
            <li key={label} className="flex items-center gap-2">
              <span className={`grid size-6 sm:size-7 place-items-center rounded-full transition ${done ? "bg-[#fa5400] text-white" : active ? "bg-black text-white" : "bg-neutral-200 text-neutral-500"}`}>
                {done ? <Check className="size-3" /> : n}
              </span>
              <span className={active ? "text-black" : done ? "text-[#fa5400]" : "text-neutral-400"}>{label}</span>
              {i < 3 && <span className="w-4 sm:w-8 h-px bg-neutral-300" />}
            </li>
          );
        })}
      </ol>

      {/* STEP 1 — Review Cart */}
      {step === 1 && (
        <div className="grid lg:grid-cols-[1fr_360px] gap-6 md:gap-8">
          <div className="space-y-3">
            {cart.items.map((it) => (
              <div key={it.id} className="flex gap-3 sm:gap-4 rounded-2xl border border-black/10 bg-white p-3 hover:border-black/20 transition">
                <div className="size-20 sm:size-24 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                  <img src={it.image} alt={it.name} className="size-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#fa5400]">{it.category}</div>
                  <div className="font-semibold text-sm line-clamp-2 mt-0.5">{it.name}</div>
                  <div className="text-xs text-neutral-600 mt-0.5">Size {it.size}</div>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="inline-flex items-center rounded-md border border-black/15">
                      <button onClick={() => cart.setQty(it.id, it.quantity - 1)} className="p-1.5"><Minus className="size-3" /></button>
                      <span className="px-3 text-sm font-semibold">{it.quantity}</span>
                      <button onClick={() => cart.setQty(it.id, it.quantity + 1)} className="p-1.5"><Plus className="size-3" /></button>
                    </div>
                    <button onClick={() => cart.remove(it.id)} className="text-neutral-500 hover:text-red-600" aria-label="Remove">
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
                <div className="text-right font-bebas text-lg text-black">₹{it.price * it.quantity}</div>
              </div>
            ))}

            <button onClick={cart.clear} className="text-[11px] uppercase tracking-[0.18em] font-bold text-neutral-500 hover:text-red-600">
              Clear cart
            </button>
          </div>

          <aside className="rounded-2xl border border-black/10 bg-neutral-50 p-5 h-fit lg:sticky lg:top-24">
            <h2 className="font-bebas text-2xl uppercase tracking-tight">Order Summary</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <Row k={`Subtotal (${cart.count} items)`} v={`₹${cart.subtotal}`} />
              <Row k="Shipping" v={shipping === 0 ? "Free" : `₹${shipping}`} />
              {shipping > 0 && (
                <div className="text-[11px] text-[#fa5400] font-semibold">Add ₹{SHIP_FREE_ABOVE - cart.subtotal} more for free shipping</div>
              )}
              <div className="border-t border-black/10 my-2" />
              <Row k="Total" v={`₹${total}`} strong />
            </dl>
            <button
              onClick={() => setStep(2)}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-none bg-black px-5 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-[#fa5400] transition"
            >
              Continue <ArrowRight className="size-4" />
            </button>
            <Link to="/sets" className="mt-3 block text-center text-[11px] uppercase tracking-[0.18em] font-bold text-neutral-500 hover:text-black">
              + Add more items
            </Link>
          </aside>
        </div>
      )}

      {/* STEP 2 — Details */}
      {step === 2 && (
        <div className="grid lg:grid-cols-[1fr_360px] gap-6 md:gap-8">
          <div className="rounded-2xl border border-black/10 bg-white p-5 md:p-6">
            <h2 className="font-bebas text-2xl uppercase tracking-tight">Delivery Details</h2>
            <p className="text-xs text-neutral-500 mt-1">Fill correctly — courier can't reach without it.</p>
            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              <Field label="Full name" v={d.name} on={(v) => setD({ ...d, name: v })} />
              <Field label="Phone (10-digit)" v={d.phone} on={(v) => setD({ ...d, phone: v.replace(/\D/g, "").slice(0, 10) })} placeholder="9XXXXXXXXX" />
              <Field label="Alt phone (optional)" v={d.altPhone} on={(v) => setD({ ...d, altPhone: v.replace(/\D/g, "").slice(0, 10) })} placeholder="Different number" />
              <Field label="Pincode" v={d.pincode} on={(v) => setD({ ...d, pincode: v.replace(/\D/g, "").slice(0, 6) })} placeholder="6-digit" />
              <Field label="Address" v={d.address} on={(v) => setD({ ...d, address: v })} placeholder="House, street, area" className="sm:col-span-2" />
              <Field label="Landmark" v={d.landmark} on={(v) => setD({ ...d, landmark: v })} placeholder="Near…" />
              <Field label="Post office" v={d.postOffice} on={(v) => setD({ ...d, postOffice: v })} placeholder="Optional" />
              <Field label="City" v={d.city} on={(v) => setD({ ...d, city: v })} />
              <Field label="Notes (optional)" v={d.notes} on={(v) => setD({ ...d, notes: v })} placeholder="e.g. gift wrap, sizing question" className="sm:col-span-2" />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={() => setStep(1)} className="rounded-full border border-black/20 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] hover:bg-neutral-100">Back</button>
              <button
                disabled={!validDetails}
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-white hover:bg-[#fa5400] transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Proceed to Payment <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
          <SummaryCard subtotal={cart.subtotal} shipping={shipping} total={total} count={cart.count} />
        </div>
      )}

      {/* STEP 3 — Payment */}
      {step === 3 && (
        <div className="grid lg:grid-cols-[1fr_360px] gap-6 md:gap-8">
          <div className="rounded-2xl border border-black/10 bg-white p-5 md:p-6">
            <h2 className="font-bebas text-2xl uppercase tracking-tight">Pay ₹{total} via UPI</h2>
            <p className="text-xs text-neutral-500 mt-1">Scan or copy UPI ID. After paying, tap the WhatsApp button to send your order slip + screenshot.</p>

            <div className="mt-5 grid sm:grid-cols-[220px_1fr] gap-5 items-start">
              <div className="rounded-xl overflow-hidden border border-black/10 bg-white p-2">
                <img src={PAYMENT_QR_URL} alt="UPI QR" className="w-full aspect-square object-contain" />
                <div className="mt-2 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-700">Scan any UPI App</div>
              </div>
              <div className="space-y-3">
                <div className="rounded-lg border border-black/10 bg-neutral-50 p-3">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">UPI ID</div>
                  <div className="mt-1 flex items-center gap-2">
                    <code className="text-sm font-semibold text-black break-all">{UPI_ID}</code>
                    <button
                      onClick={() => navigator.clipboard?.writeText(UPI_ID)}
                      className="inline-flex items-center gap-1 rounded-md border border-black/15 px-2 py-1 text-[10px] font-bold uppercase tracking-wider hover:bg-white"
                    >
                      <Copy className="size-3" /> Copy
                    </button>
                  </div>
                  <div className="mt-1 text-[11px] text-neutral-600">Name: {UPI_NAME}</div>
                </div>

                <div className="rounded-lg border border-dashed border-black/20 bg-white p-3 text-xs text-neutral-700">
                  <div className="font-bold text-black flex items-center gap-1.5"><QrCode className="size-4 text-[#fa5400]" /> After Paying</div>
                  <ol className="mt-1.5 list-decimal ml-4 space-y-0.5">
                    <li>Screenshot your payment success.</li>
                    <li>Tap "I've paid · Send slip".</li>
                    <li>Send the screenshot in WhatsApp.</li>
                  </ol>
                </div>

                <button
                  onClick={confirmPaid}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-none bg-[#25D366] px-5 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white hover:brightness-110"
                >
                  <MessageCircle className="size-4" /> I've paid · Send slip on WhatsApp
                </button>
                <button
                  onClick={() => {
                    const num = orderNo || nextOrderNumber();
                    setOrderNo(num);
                    openWA(buildMessage(num, false));
                    setStep(4);
                  }}
                  className="w-full text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500 hover:text-black"
                >
                  or send slip first, pay after
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={() => setStep(2)} className="rounded-full border border-black/20 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] hover:bg-neutral-100">Back</button>
            </div>
          </div>
          <SummaryCard subtotal={cart.subtotal} shipping={shipping} total={total} count={cart.count} />
        </div>
      )}

      {/* STEP 4 — Done */}
      {step === 4 && (
        <div className="mx-auto max-w-xl text-center py-12">
          <div className="mx-auto grid size-20 place-items-center rounded-full bg-[#25D366]/10 text-[#25D366]">
            <Check className="size-10" />
          </div>
          <h2 className="mt-5 font-bebas text-4xl uppercase tracking-tight">Order slip sent!</h2>
          <p className="mt-2 text-sm text-neutral-600">Order # <b>{orderNo}</b> — check WhatsApp. We'll confirm dispatch within 24 hours.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => { cart.clear(); setD(EMPTY_DETAILS); setStep(1); setOrderNo(""); }}
              className="rounded-full bg-black px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-[#fa5400]"
            >
              Continue Shopping
            </button>
            <a href={`https://wa.me/${BRAND.whatsappPrimary}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-black/20 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-100">
              <MessageCircle className="size-4" /> Open WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ k, v, strong }: { k: string; v: string; strong?: boolean }) {
  return <div className={`flex justify-between ${strong ? "text-base font-bold" : ""}`}><dt>{k}</dt><dd>{v}</dd></div>;
}

function SummaryCard({ subtotal, shipping, total, count }: { subtotal: number; shipping: number; total: number; count: number }) {
  return (
    <aside className="rounded-2xl border border-black/10 bg-neutral-50 p-5 h-fit lg:sticky lg:top-24">
      <h2 className="font-bebas text-2xl uppercase tracking-tight">Summary</h2>
      <dl className="mt-3 space-y-2 text-sm">
        <Row k={`Items (${count})`} v={`₹${subtotal}`} />
        <Row k="Shipping" v={shipping === 0 ? "Free" : `₹${shipping}`} />
        <div className="border-t border-black/10 my-2" />
        <Row k="Total" v={`₹${total}`} strong />
      </dl>
    </aside>
  );
}

function Field({ label, v, on, placeholder, className }: { label: string; v: string; on: (s: string) => void; placeholder?: string; className?: string }) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">{label}</span>
      <input
        value={v}
        onChange={(e) => on(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-md border border-black/15 bg-white px-3 py-2.5 text-sm focus:border-black focus:outline-none"
      />
    </label>
  );
}
