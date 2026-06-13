import { useState } from "react";
import { X, Check, Phone, Copy, ShieldCheck } from "lucide-react";

// === Brand contact / order routing =====================================
// Orders are dispatched to this WhatsApp business number after payment.
// Update PAYMENT_QR_URL with the UPI QR image (drop into /public and set path).
export const BRAND = {
  whatsappPrimary: "917003369589", // Ankush — primary
  whatsappAlt: "918583025727",
  email: "checkmatejersey@gmail.com",
  instagram: "https://www.instagram.com/checkmate.jersey?igsh=MXRndjM5cDFkd2t1dw==",
  whatsappGroup: "https://chat.whatsapp.com/GfCRNgxfHb7GeyJmdKvJg1?s=cl&p=a&mlu=1",
};

// Replace this with your UPI QR (e.g. /payment-qr.png in /public).
export const PAYMENT_QR_URL = "";
export const UPI_ID = ""; // optional: e.g. "checkmate@upi"

const SIZES = ["S", "M", "L", "XL", "XXL"] as const;
type Size = (typeof SIZES)[number];
type Kit = "Home" | "Away";

const PRICE: Record<Kit, number> = { Home: 1000, Away: 1100 };

type Props = {
  team: string;
  image: string;
  open: boolean;
  onClose: () => void;
};

export function OrderModal({ team, image, open, onClose }: Props) {
  const [step, setStep] = useState<1 | 2>(1);
  const [kit, setKit] = useState<Kit>("Home");
  const [size, setSize] = useState<Size>("L");
  const [qty, setQty] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  if (!open) return null;

  const unit = PRICE[kit];
  const subtotal = unit * qty;
  const shipping = 0; // free standard; fast delivery quoted on WhatsApp
  const total = subtotal + shipping;

  const reset = () => {
    setStep(1); setKit("Home"); setSize("L"); setQty(1);
    setName(""); setPhone(""); setAddress(""); setCity(""); setPincode("");
  };
  const close = () => { onClose(); setTimeout(reset, 250); };

  const validDetails = name.trim() && /^[6-9]\d{9}$/.test(phone.trim()) && address.trim() && city.trim() && /^\d{6}$/.test(pincode.trim());

  const buildMessage = (paid: boolean) => {
    const lines = [
      `*New Order — CHECKMATE*`,
      ``,
      `*Item:* ${team} — ${kit} Kit (Player Edition)`,
      `*Size:* ${size}`,
      `*Qty:* ${qty}`,
      `*Unit price:* ₹${unit}`,
      `*Subtotal:* ₹${subtotal}`,
      `*Shipping:* Free (standard)`,
      `*Total:* ₹${total}`,
      ``,
      `*Buyer*`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Address: ${address}`,
      `City: ${city}  Pincode: ${pincode}`,
      ``,
      paid ? `✅ Payment done — sharing screenshot next.` : `🕒 Will pay shortly via UPI QR.`,
    ].filter(Boolean);
    return lines.join("\n");
  };

  const sendOrder = (paid: boolean) => {
    const url = `https://wa.me/${BRAND.whatsappPrimary}?text=${encodeURIComponent(buildMessage(paid))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true">
      <button onClick={close} className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-label="Close" />
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white shadow-luxe border border-gold/40">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-white/95 backdrop-blur px-5 py-3">
          <div className="flex items-center gap-3">
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8a6a14]">
              {step === 1 ? "Order Details" : "Payment"}
            </div>
            <div className="text-xs text-muted-foreground hidden sm:block">Step {step} of 2</div>
          </div>
          <button onClick={close} className="p-2 rounded-full hover:bg-muted" aria-label="Close">
            <X className="size-4" />
          </button>
        </div>

        {step === 1 && (
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-6 p-5 sm:p-6">
            {/* Item preview */}
            <div>
              <div className="rounded-xl overflow-hidden bg-gold-soft border border-gold/30">
                <img src={image} alt={team} className="aspect-[4/5] w-full object-cover" />
              </div>
              <div className="mt-4">
                <div className="font-display text-2xl font-semibold">{team}</div>
                <div className="text-xs uppercase tracking-[0.22em] text-[#8a6a14] mt-1">Player Edition · 2026</div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  {(["Home", "Away"] as Kit[]).map((k) => (
                    <button
                      key={k}
                      onClick={() => setKit(k)}
                      className={`rounded-lg border px-3 py-2.5 text-sm font-semibold transition ${
                        kit === k ? "border-[#b8862b] bg-[#fbf4dd] text-[#1a1a1a]" : "border-border hover:border-gold/60"
                      }`}
                    >
                      <div>{k} Kit</div>
                      <div className="text-xs font-normal text-muted-foreground">₹{PRICE[k]}</div>
                    </button>
                  ))}
                </div>

                <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Size</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`size-10 rounded-full border text-sm font-semibold transition ${
                        size === s ? "border-[#b8862b] bg-[#1a1a1a] text-[#f4d77a]" : "border-border hover:border-gold/60"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Quantity</label>
                <div className="mt-2 inline-flex items-center rounded-full border border-border">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-1.5">−</button>
                  <span className="px-3 text-sm font-semibold">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="px-3 py-1.5">+</button>
                </div>
              </div>
            </div>

            {/* Buyer details */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Full name" value={name} onChange={setName} placeholder="As per delivery" />
                <Field label="Phone (10-digit)" value={phone} onChange={(v) => setPhone(v.replace(/\D/g, "").slice(0, 10))} placeholder="9XXXXXXXXX" />
                <Field label="Address" value={address} onChange={setAddress} placeholder="House, street, area" className="sm:col-span-2" />
                <Field label="City" value={city} onChange={setCity} placeholder="City" />
                <Field label="Pincode" value={pincode} onChange={(v) => setPincode(v.replace(/\D/g, "").slice(0, 6))} placeholder="6-digit" />
              </div>

              <div className="mt-5 rounded-xl border border-gold/40 bg-gold-soft p-4">
                <Row label={`${kit} Kit × ${qty}`} value={`₹${subtotal}`} />
                <Row label="Shipping" value="Free" />
                <Row label="Fast delivery (optional)" value="up to ₹100 · billed on WhatsApp" muted />
                <div className="my-2 h-px hairline-gold" />
                <Row label="Total" value={`₹${total}`} strong />
                <div className="mt-2 text-[11px] text-muted-foreground">All-India delivery · No COD (for safety) · Pay via UPI QR on next step.</div>
              </div>

              {/* Contact details */}
              <div className="mt-4 rounded-xl border border-gold/40 bg-white p-4">
                <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#8a6a14]">Reach us anytime</div>
                <div className="mt-2 grid grid-cols-1 gap-1.5 text-xs text-neutral-700">
                  <a href={`https://wa.me/${BRAND.whatsappPrimary}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#8a6a14]">
                    WhatsApp (Ankush): +91 70033 69589
                  </a>
                  <a href={`https://wa.me/${BRAND.whatsappAlt}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#8a6a14]">
                    Alternate: +91 85830 25727
                  </a>
                  <a href={`mailto:${BRAND.email}`} className="hover:text-[#8a6a14]">{BRAND.email}</a>
                  <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#8a6a14]">Instagram · @checkmate.jersey</a>
                  <a href={BRAND.whatsappGroup} target="_blank" rel="noopener noreferrer" className="hover:text-[#8a6a14]">Join our WhatsApp community</a>
                </div>
              </div>

              {/* Terms & conditions */}
              <div className="mt-4 rounded-xl border border-gold/40 bg-gold-soft p-4">
                <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#8a6a14]">🟩 Terms &amp; Conditions</div>
                <ol className="mt-2 list-decimal pl-5 space-y-1.5 text-[11.5px] text-neutral-700 leading-relaxed">
                  <li>You have to make a proper video of opening the parcel.</li>
                  <li>Product will be changed only when the product is damaged in package or missing in package — the opening video is the only proof.</li>
                  <li>We will share a proper size chart for your order. After receiving the product, no replacement on size-related issues.</li>
                  <li>If we send the wrong product or wrong size, that item will be replaced.</li>
                </ol>
                <div className="mt-3 space-y-1 text-[11.5px] text-neutral-700">
                  <div>➡️ Delivery time: <span className="font-semibold">15–20 days</span></div>
                  <div>➡️ We share product tracking — you can track your order ❤️</div>
                </div>
              </div>

              <div className="mt-5 flex flex-col sm:flex-row gap-2">
                <button
                  disabled={!validDetails}
                  onClick={() => setStep(2)}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold uppercase tracking-[0.18em] transition disabled:opacity-50"
                  style={{ background: "linear-gradient(135deg,#1a1a1a,#2b2b2b)", color: "#f4d77a", border: "1px solid #d4af37" }}
                >
                  Continue to Payment
                </button>
                <a
                  href={`https://wa.me/${BRAND.whatsappPrimary}?text=${encodeURIComponent(`Hi, I have a question about the ${team} ${kit} kit.`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold border border-border hover:border-gold/60"
                >
                  <Phone className="size-4" /> Ask first
                </a>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="p-5 sm:p-6">
            <div className="grid md:grid-cols-[1fr_1fr] gap-6">
              <div>
                <div className="text-lg font-display font-semibold">Scan & Pay ₹{total}</div>
                <div className="mt-1 text-sm text-muted-foreground">UPI · GPay · PhonePe · Paytm</div>

                <div className="mt-4 aspect-square w-full max-w-sm rounded-2xl border-2 border-dashed border-gold/60 bg-gold-soft grid place-items-center p-6 text-center">
                  {PAYMENT_QR_URL ? (
                    <img src={PAYMENT_QR_URL} alt="Scan to pay" className="size-full object-contain" />
                  ) : (
                    <div>
                      <div className="text-xs uppercase tracking-[0.22em] text-[#8a6a14] font-bold">UPI QR</div>
                      <div className="mt-3 text-sm text-neutral-700">Payment QR will appear here.</div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        Until then, message us on WhatsApp — we'll share the QR right away.
                      </div>
                    </div>
                  )}
                </div>

                {UPI_ID && (
                  <button
                    onClick={() => navigator.clipboard.writeText(UPI_ID)}
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#8a6a14] hover:underline"
                  >
                    <Copy className="size-4" /> {UPI_ID}
                  </button>
                )}

                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="size-4 text-[#8a6a14]" /> No COD for buyer & seller safety.
                </div>
              </div>

              <div>
                <div className="rounded-xl border border-border p-4">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Order summary</div>
                  <div className="mt-2 text-sm">
                    <div className="font-semibold">{team} — {kit} Kit</div>
                    <div className="text-muted-foreground">Size {size} · Qty {qty}</div>
                    </div>
                  </div>
                  <div className="mt-3 h-px hairline-gold" />
                  <Row label="Subtotal" value={`₹${subtotal}`} />
                  <Row label="Shipping" value="Free" />
                  <Row label="Total" value={`₹${total}`} strong />
                  <div className="mt-3 text-[11px] text-muted-foreground leading-relaxed">
                    1. Pay ₹{total} using the QR<br />
                    2. Tap the button below — your order opens in WhatsApp<br />
                    3. Attach payment screenshot and send · we confirm & ship
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <button
                    onClick={() => sendOrder(true)}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold uppercase tracking-[0.18em]"
                    style={{ background: "var(--gradient-gold)", color: "#1a1a1a", border: "1px solid #8a6a14" }}
                  >
                    <Check className="size-4" /> I've Paid — Send Order on WhatsApp
                  </button>
                  <button
                    onClick={() => sendOrder(false)}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold border border-border hover:border-gold/60"
                  >
                    Send Order First, Pay After
                  </button>
                  <button onClick={() => setStep(1)} className="text-xs text-muted-foreground hover:underline mt-1">
                    ← Edit details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, className = "" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm focus:border-[#b8862b] focus:outline-none focus:ring-2 focus:ring-[#f4d77a]/40"
      />
    </label>
  );
}

function Row({ label, value, strong, muted }: { label: string; value: string; strong?: boolean; muted?: boolean }) {
  return (
    <div className={`flex items-center justify-between py-1 text-sm ${strong ? "font-bold text-base" : ""} ${muted ? "text-muted-foreground text-xs" : ""}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
