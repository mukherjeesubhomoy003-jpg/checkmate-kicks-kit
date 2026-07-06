import { useState } from "react";
import { Sparkles, X, MessageCircle, Truck, ShieldCheck, Check, QrCode, ArrowLeft } from "lucide-react";
import ronaldo from "@/assets/posters/ronaldo.jpg.asset.json";
import mbappe from "@/assets/posters/mbappe.jpg.asset.json";
import neymar from "@/assets/posters/neymar.jpg.asset.json";
import { BRAND, PAYMENT_QR_URL, UPI_ID, UPI_NAME } from "@/components/order/OrderModal";

type Poster = { id: string; name: string; subtitle: string; image: string; accent: string };

const POSTERS: Poster[] = [
  { id: "p-ronaldo", name: "Ronaldo · 7", subtitle: "Portugal · Legend Series", image: ronaldo.url, accent: "#d4322a" },
  { id: "p-mbappe", name: "Mbappé · 10", subtitle: "France · Roar Series", image: mbappe.url, accent: "#1a2a6b" },
  { id: "p-neymar", name: "Neymar Jr · 10", subtitle: "Brasil · Samba Series", image: neymar.url, accent: "#f5d000" },
];

const PRICE = 150;
const SHIPPING = 50;

export function PosterDrop() {
  const [active, setActive] = useState<Poster | null>(null);
  return (
    <section className="relative overflow-hidden bg-neutral-950 text-white" id="posters">
      <div aria-hidden className="absolute inset-0 opacity-30" style={{
        backgroundImage: "radial-gradient(circle at 15% 20%, #b8862b 0, transparent 45%), radial-gradient(circle at 85% 80%, #8a6a14 0, transparent 50%)",
      }} />
      <div className="container-x relative py-16 md:py-24">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] bg-[#fa5400] text-white">
            <Sparkles className="size-3.5" /> New Launch · CHECKMATE Merch
          </div>
          <h2 className="mt-5 font-bebas text-5xl md:text-7xl leading-[0.88] tracking-tight uppercase text-white">
            Wall Poster<br />
            <span className="text-neutral-500">Series.</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm md:text-base text-neutral-300">
            Premium HD-printed wall posters of your favourite stars. Thick matte cardstock, sharp colours, made to inspire every match-day.
          </p>
          <div className="mt-4 inline-flex items-center gap-4 border border-white/20 px-5 py-2 text-xs">
            <span><span className="font-bold text-white">₹{PRICE}</span> / poster</span>
            <span className="h-3 w-px bg-white/30" />
            <span className="flex items-center gap-1.5 text-neutral-300"><Truck className="size-3.5" /> +₹{SHIPPING} delivery</span>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {POSTERS.map((p) => (
            <article key={p.id} className="group relative cursor-pointer" onClick={() => setActive(p)}>
              <div className="relative overflow-hidden bg-[#f5f5f5] transition-transform group-hover:-translate-y-1">
                <div className="absolute right-2 top-2 z-10 bg-black px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  NEW
                </div>
                <div className="absolute left-2 top-2 z-10 bg-[#fa5400] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  Only 1 left
                </div>
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={p.image} alt={`${p.name} wall poster`} loading="lazy"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                </div>
              </div>
              <div className="pt-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#fa5400]">Legend Series</div>
                  <div className="mt-0.5 font-bebas text-xl uppercase tracking-wide text-white truncate">{p.name}</div>
                  <div className="mt-0.5 text-[11px] uppercase tracking-[0.16em] text-neutral-400">{p.subtitle}</div>
                </div>
                <div className="text-right whitespace-nowrap">
                  <div className="font-bebas text-xl tracking-wide text-white">MRP ₹{PRICE}</div>
                  <div className="text-[10px] text-neutral-500">+₹{SHIPPING} ship</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>


      {active && <PosterOrderModal poster={active} onClose={() => setActive(null)} />}
    </section>
  );
}

function PosterOrderModal({ poster, onClose }: { poster: Poster; onClose: () => void }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [qty, setQty] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [altPhone, setAltPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [landmark, setLandmark] = useState("");
  const [postOffice, setPostOffice] = useState("");
  const [orderNo] = useState(
    () => "CMP" + Math.random().toString(36).slice(2, 6).toUpperCase() + Date.now().toString().slice(-4)
  );

  const subtotal = PRICE * qty;
  const total = subtotal + SHIPPING;

  const valid =
    name.trim() &&
    /^[6-9]\d{9}$/.test(phone) &&
    /^[6-9]\d{9}$/.test(altPhone) &&
    altPhone !== phone &&
    address.trim() &&
    city.trim() &&
    /^\d{6}$/.test(pincode);

  const buildMsg = (paid: boolean) =>
    [
      `*New Order — CHECKMATE Wall Poster*`,
      `*Order #:* ${orderNo}`,
      ``,
      `*Item:* ${poster.name} Wall Poster`,
      `*Qty:* ${qty}`,
      `*Unit:* ₹${PRICE}`,
      `*Subtotal:* ₹${subtotal}`,
      `*Delivery:* ₹${SHIPPING}`,
      `*Total:* ₹${total}`,
      ``,
      `*Buyer*`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Alt Phone: ${altPhone}`,
      `Address: ${address}`,
      ...(landmark.trim() ? [`Landmark: ${landmark}`] : []),
      `Post Office: ${postOffice.trim() || "NA"}`,
      `City: ${city}  Pin: ${pincode}`,
      ``,
      `*Payment*`,
      `UPI: ${UPI_ID}`,
      `Payee: ${UPI_NAME}`,
      ``,
      paid
        ? `✅ Payment done — sharing screenshot now.`
        : `🕒 Will pay shortly via UPI QR.`,
    ].join("\n");

  const openWA = (paid: boolean) => {
    window.open(
      `https://api.whatsapp.com/send?phone=${BRAND.whatsappPrimary}&text=${encodeURIComponent(buildMsg(paid))}`,
      "_blank"
    );
  };

  const confirmPaid = () => {
    openWA(true);
    setStep(3);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
      <button onClick={onClose} className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-label="Close" />
      <div className="relative w-full max-w-3xl max-h-[94vh] overflow-y-auto rounded-2xl bg-white text-neutral-900 shadow-2xl border border-gold/40">
        {/* Header — gold band + step indicator */}
        <div className="sticky top-0 z-10 border-b border-gold/30 bg-white/95 backdrop-blur">
          <div className="flex items-center justify-between px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8a6a14]">
                Wall Poster · {step === 1 ? "Order Details" : step === 2 ? "Payment" : "Awaiting Verification"}
              </div>
              <div className="hidden sm:flex items-center gap-1 text-[10px] font-semibold text-neutral-400">
                {[1, 2, 3].map((s) => (
                  <span key={s} className={`px-2 py-0.5 rounded-full border ${step === s ? "bg-[#fffaeb] border-[#d4af37] text-[#8a6a14]" : "border-neutral-200"}`}>
                    0{s}
                  </span>
                ))}
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-neutral-100"><X className="size-4" /></button>
          </div>
          <div className="h-0.5" style={{ background: "linear-gradient(90deg, transparent, #d4af37, transparent)" }} />
        </div>

        {/* STEP 1 — Details */}
        {step === 1 && (
          <div className="grid md:grid-cols-[1fr_1.3fr] gap-6 p-5 sm:p-6">
            <div>
              <div className="rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 p-3">
                <img src={poster.image} alt={poster.name} className="aspect-[3/4] w-full object-cover rounded" />
              </div>
              <div className="mt-3 font-display text-xl font-semibold">{poster.name}</div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#8a6a14]">{poster.subtitle}</div>
              <label className="mt-4 block text-[10px] font-bold uppercase tracking-wider text-neutral-500">Quantity</label>
              <div className="mt-2 inline-flex items-center rounded-full border border-neutral-300">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-1.5 hover:bg-neutral-50">−</button>
                <span className="px-3 text-sm font-semibold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-3 py-1.5 hover:bg-neutral-50">+</button>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Inp label="Full name" v={name} on={setName} ph="As per delivery" full />
                <Inp label="Phone (10-digit)" v={phone} on={(v) => setPhone(v.replace(/\D/g, "").slice(0, 10))} ph="9XXXXXXXXX" />
                <Inp label="Alternative phone" v={altPhone} on={(v) => setAltPhone(v.replace(/\D/g, "").slice(0, 10))} ph="Different number" />
                <Inp label="Address" v={address} on={setAddress} ph="House, street, area" full />
                <Inp label="Landmark (optional)" v={landmark} on={setLandmark} ph="Near…" full />
                <Inp label="Post office (NA if none)" v={postOffice} on={setPostOffice} ph="Post office" />
                <Inp label="City" v={city} on={setCity} ph="City" />
                <Inp label="Pincode" v={pincode} on={(v) => setPincode(v.replace(/\D/g, "").slice(0, 6))} ph="6-digit" />
              </div>
              <div className="mt-4 rounded-xl border border-gold/40 bg-[#fffaeb] p-4 text-sm">
                <Row l={`${poster.name} × ${qty}`} v={`₹${subtotal}`} />
                <Row l="Delivery" v={`₹${SHIPPING}`} />
                <div className="my-2 h-px" style={{ background: "linear-gradient(90deg, transparent, #d4af37, transparent)" }} />
                <Row l="Total" v={`₹${total}`} strong />
              </div>
              <button
                disabled={!valid}
                onClick={() => setStep(2)}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold uppercase tracking-[0.18em] disabled:opacity-50 transition-transform hover:-translate-y-0.5"
                style={{ background: "var(--gradient-gold)", color: "#1a1a1a", border: "1px solid #8a6a14", boxShadow: "0 14px 30px -14px rgba(184,134,43,0.7)" }}
              >
                Continue to Payment →
              </button>
              <div className="mt-2 text-[11px] text-neutral-500 text-center">
                All-India delivery · No COD · Pay via UPI QR on next step
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 — Payment */}
        {step === 2 && (
          <div className="p-5 sm:p-6 grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8a6a14]">
                <QrCode className="size-4" /> Scan & Pay
              </div>
              <div className="mt-1 font-display text-2xl font-semibold">₹{total}</div>
              <div className="text-sm text-neutral-600">UPI · GPay · PhonePe · Paytm · BHIM</div>

              <div className="mt-4 rounded-2xl border-2 border-[#d4af37] bg-white p-3 max-w-xs shadow-luxe">
                <img src={PAYMENT_QR_URL} alt="Scan to pay" className="w-full h-auto" />
              </div>

              <div className="mt-3 text-xs text-neutral-700">
                <div className="font-semibold">{UPI_NAME}</div>
                <div className="text-neutral-500">UPI ID: {UPI_ID}</div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-neutral-500">
                <ShieldCheck className="size-4 text-[#8a6a14]" /> No COD — for buyer & seller safety
              </div>
            </div>

            <div>
              <div className="rounded-xl border border-gold/40 bg-[#fffaeb] p-4 text-sm">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#8a6a14]">Order summary</div>
                <div className="mt-2 font-semibold">{poster.name} Wall Poster</div>
                <div className="text-neutral-500 text-xs">Qty {qty} · Order # {orderNo}</div>
                <div className="my-3 h-px" style={{ background: "linear-gradient(90deg, transparent, #d4af37, transparent)" }} />
                <Row l="Subtotal" v={`₹${subtotal}`} />
                <Row l="Delivery" v={`₹${SHIPPING}`} />
                <Row l="Total" v={`₹${total}`} strong />
              </div>

              <div className="mt-4 rounded-xl border border-[#d4af37] bg-white p-3 text-[12px] leading-relaxed text-neutral-800">
                <div className="font-bold text-[#8a6a14] uppercase tracking-wider text-[10px] mb-1.5">How to pay</div>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Pay <b>₹{total}</b> by scanning the QR.</li>
                  <li>Take a <b>screenshot</b> of the payment success page.</li>
                  <li>Tap the button below — WhatsApp opens.</li>
                  <li>Share the screenshot. We verify and dispatch ✅</li>
                </ol>
              </div>

              <button
                onClick={confirmPaid}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold uppercase tracking-[0.18em] transition-transform hover:-translate-y-0.5"
                style={{ background: "var(--gradient-gold)", color: "#1a1a1a", border: "1px solid #8a6a14", boxShadow: "0 14px 30px -14px rgba(184,134,43,0.7)" }}
              >
                <Check className="size-4" /> I've Paid — Send Screenshot
              </button>
              <div className="mt-2 text-[11px] text-neutral-500 text-center px-2">
                ⚠️ Order is confirmed only after we verify your payment on WhatsApp.
              </div>
              <button onClick={() => setStep(1)} className="mt-2 inline-flex items-center gap-1 text-xs text-neutral-500 hover:underline">
                <ArrowLeft className="size-3" /> Edit details
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 — Awaiting verification */}
        {step === 3 && (
          <div className="p-6 sm:p-8 text-center">
            <div className="mx-auto size-14 rounded-full bg-amber-100 grid place-items-center text-amber-700">
              <ShieldCheck className="size-7" />
            </div>
            <div className="mt-3 font-display text-2xl font-semibold">Payment Under Verification</div>
            <div className="mt-1 text-sm text-neutral-500">Order number</div>
            <div className="mt-1 text-xl font-bold tracking-[0.18em] text-[#8a6a14]">{orderNo}</div>

            <div className="mt-5 max-w-md mx-auto rounded-xl border-2 border-amber-300 bg-amber-50 p-4 text-left text-[12.5px] text-neutral-800 leading-relaxed">
              <div className="font-bold text-amber-800 uppercase tracking-wider text-[10px] mb-1.5">⏳ Important — please read</div>
              <ol className="list-decimal pl-5 space-y-1.5">
                <li>Your order has been <b>placed</b> but is <b>not yet confirmed</b>.</li>
                <li>Send the <b>payment screenshot on WhatsApp</b> to confirm.</li>
                <li>Once verified, we <b>dispatch your poster</b> and share tracking on WhatsApp.</li>
              </ol>
            </div>

            <div className="mt-4 max-w-md mx-auto rounded-xl border border-gold/40 bg-[#fffaeb] p-4 text-sm text-left">
              <div className="font-semibold">{poster.name} Wall Poster</div>
              <div className="text-neutral-500 text-xs">Qty {qty}</div>
              <Row l="Amount paid" v={`₹${total}`} strong />
              <div className="mt-1 text-[11px] text-neutral-500">📱 {phone} · Alt: {altPhone}</div>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={() => openWA(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold uppercase tracking-[0.18em]"
                style={{ background: "var(--gradient-gold)", color: "#1a1a1a", border: "1px solid #8a6a14" }}
              >
                <MessageCircle className="size-4" /> Re-open WhatsApp
              </button>
              <button onClick={onClose} className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold border border-neutral-300 hover:border-[#d4af37]">
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Inp({ label, v, on, ph, full }: { label: string; v: string; on: (s: string) => void; ph: string; full?: boolean }) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">{label}</span>
      <input value={v} onChange={(e) => on(e.target.value)} placeholder={ph}
        className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-2.5 py-2 text-sm focus:border-[#b8862b] focus:ring-1 focus:ring-[#d4af37]/40 focus:outline-none" />
    </label>
  );
}

function Row({ l, v, strong }: { l: string; v: string; strong?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${strong ? "text-base font-bold" : "text-sm"}`}>
      <span className="text-neutral-700">{l}</span>
      <span>{v}</span>
    </div>
  );
}
