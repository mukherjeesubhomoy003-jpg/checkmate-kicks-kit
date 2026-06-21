import { useState } from "react";
import { Sparkles, X, MessageCircle, Truck } from "lucide-react";
import ronaldo from "@/assets/posters/ronaldo.jpg.asset.json";
import mbappe from "@/assets/posters/mbappe.jpg.asset.json";
import neymar from "@/assets/posters/neymar.jpg.asset.json";
import { BRAND } from "@/components/order/OrderModal";

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
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] animate-pulse"
            style={{ background: "linear-gradient(135deg,#d4af37,#8a6a14)", color: "#0a0a0a", border: "1px solid #f4d77a" }}>
            <Sparkles className="size-3.5" /> New Launch · CHECKMATE Merch
          </div>
          <h2 className="mt-5 font-display text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight">
            <span style={{ backgroundImage: "linear-gradient(180deg,#ffffff 0%,#fff7d6 60%,#e6c976 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              Wall Poster
            </span>{" "}
            <span style={{ backgroundImage: "var(--gradient-gold)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              Series
            </span>
          </h2>
          <p className="mt-4 max-w-xl text-sm md:text-base text-neutral-300">
            Premium HD-printed wall posters of your favourite stars. Thick matte cardstock, sharp colours, made to inspire every match-day.
          </p>
          <div className="mt-4 inline-flex items-center gap-4 rounded-full bg-white/5 border border-gold/40 px-5 py-2 text-xs">
            <span><span className="font-bold text-[#f4d77a]">₹{PRICE}</span> / poster</span>
            <span className="h-3 w-px bg-gold/40" />
            <span className="flex items-center gap-1.5 text-neutral-300"><Truck className="size-3.5 text-[#f4d77a]" /> +₹{SHIPPING} delivery</span>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {POSTERS.map((p) => (
            <article key={p.id} className="group relative cursor-pointer" onClick={() => setActive(p)}>
              <div className="relative overflow-hidden rounded-xl bg-white p-4 shadow-2xl transition-transform group-hover:-translate-y-1"
                style={{ boxShadow: `0 30px 60px -30px ${p.accent}80, 0 0 0 1px rgba(212,175,55,0.3)` }}>
                <div className="absolute right-3 top-3 z-10 rounded-sm bg-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#f4d77a]">
                  NEW
                </div>
                <div className="absolute left-3 top-3 z-10 rounded-sm bg-[#d4322a] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white animate-pulse">
                  Only 1 left
                </div>
                <div className="aspect-[3/4] overflow-hidden rounded-md">
                  <img src={p.image} alt={`${p.name} wall poster`} loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
              </div>
              <div className="pt-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-display text-lg font-semibold text-white truncate">{p.name}</div>
                  <div className="mt-0.5 text-[11px] uppercase tracking-[0.2em] text-neutral-400">{p.subtitle}</div>
                </div>
                <div className="text-right whitespace-nowrap">
                  <div className="text-base font-bold text-[#f4d77a]">₹{PRICE}</div>
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
  const [qty, setQty] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [altPhone, setAltPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [landmark, setLandmark] = useState("");
  const [postOffice, setPostOffice] = useState("");

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

  const send = () => {
    const msg = [
      `*New Order — CHECKMATE Wall Poster*`,
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
      `🕒 Will pay via UPI QR — please share details.`,
    ].join("\n");
    window.open(`https://api.whatsapp.com/send?phone=${BRAND.whatsappPrimary}&text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
      <button onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-label="Close" />
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white text-neutral-900 shadow-2xl border border-gold/40">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white/95 backdrop-blur px-5 py-3">
          <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8a6a14]">Wall Poster · Order</div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-neutral-100"><X className="size-4" /></button>
        </div>
        <div className="grid md:grid-cols-[1fr_1.3fr] gap-6 p-5 sm:p-6">
          <div>
            <div className="rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 p-3">
              <img src={poster.image} alt={poster.name} className="aspect-[3/4] w-full object-cover rounded" />
            </div>
            <div className="mt-3 font-display text-xl font-semibold">{poster.name}</div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#8a6a14]">{poster.subtitle}</div>
            <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-neutral-500">Quantity</label>
            <div className="mt-2 inline-flex items-center rounded-full border">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-1.5">−</button>
              <span className="px-3 text-sm font-semibold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-1.5">+</button>
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
              <div className="my-2 h-px bg-gold/40" />
              <Row l="Total" v={`₹${total}`} strong />
            </div>
            <button disabled={!valid} onClick={send}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] disabled:opacity-50"
              style={{ background: "var(--gradient-gold)", color: "#1a1a1a", border: "1px solid #8a6a14" }}>
              <MessageCircle className="size-4" /> Send order on WhatsApp
            </button>
            <div className="mt-2 text-[11px] text-neutral-500 text-center">
              UPI/GPay/PhonePe/Paytm · Share screenshot to confirm · Feel free to ask any questions on WhatsApp.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Inp({ label, v, on, ph, full }: { label: string; v: string; on: (s: string) => void; ph: string; full?: boolean }) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">{label}</span>
      <input value={v} onChange={(e) => on(e.target.value)} placeholder={ph}
        className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-2.5 py-2 text-sm focus:border-[#b8862b] focus:outline-none" />
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
