import { useMemo, useState } from "react";
import { X, Check, Phone, ShieldCheck, Printer, MessageCircle } from "lucide-react";
import qrAsset from "@/assets/payment-qr.png.asset.json";
import logoAsset from "@/assets/checkmate-logo.asset.json";

// === Brand contact / order routing =====================================
export const BRAND = {
  whatsappPrimary: "917003369589", // Ankush — primary
  whatsappAlt: "918583025727",
  email: "checkmatejersey@gmail.com",
  instagram: "https://www.instagram.com/checkmate.jersey?igsh=MXRndjM5cDFkd2t1dw==",
  whatsappGroup: "https://chat.whatsapp.com/GfCRNgxfHb7GeyJmdKvJg1?s=cl&p=a&mlu=1",
};

export const PAYMENT_QR_URL = qrAsset.url;
export const UPI_ID = "ankushkhatik218@okhdfcbank";
export const UPI_NAME = "Ankush khatik";

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

// Sequential order number — counter persisted in browser localStorage
function nextOrderNumber(): string {
  const KEY = "checkmate_order_counter";
  let n = 0;
  try {
    n = parseInt(localStorage.getItem(KEY) || "0", 10) || 0;
  } catch {}
  n += 1;
  try {
    localStorage.setItem(KEY, String(n));
  } catch {}
  return `CHKM-${String(n).padStart(4, "0")}`;
}

export function OrderModal({ team, image, open, onClose }: Props) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [kit, setKit] = useState<Kit>("Home");
  const [size, setSize] = useState<Size>("L");
  const [qty, setQty] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [orderNo, setOrderNo] = useState<string>("");

  if (!open) return null;

  const unit = PRICE[kit];
  const subtotal = unit * qty;
  const shipping = 0;
  const total = subtotal + shipping;

  const reset = () => {
    setStep(1); setKit("Home"); setSize("L"); setQty(1);
    setName(""); setPhone(""); setAddress(""); setCity(""); setPincode(""); setOrderNo("");
  };
  const close = () => { onClose(); setTimeout(reset, 250); };

  const validDetails = name.trim() && /^[6-9]\d{9}$/.test(phone.trim()) && address.trim() && city.trim() && /^\d{6}$/.test(pincode.trim());

  const buildMessage = (paid: boolean, orderNumber: string) => {
    return [
      `*New Order — CHECKMATE*`,
      `*Order #:* ${orderNumber}`,
      ``,
      `*Item:* ${team} — ${kit} Kit (Player Edition)`,
      `*Size:* ${size}`,
      `*Qty:* ${qty}`,
      `*Unit:* ₹${unit}`,
      `*Subtotal:* ₹${subtotal}`,
      `*Shipping:* Free`,
      `*Total:* ₹${total}`,
      ``,
      `*Buyer*`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Address: ${address}`,
      `City: ${city}  Pin: ${pincode}`,
      ``,
      paid ? `✅ Payment done — sharing screenshot next.` : `🕒 Will pay shortly via UPI QR.`,
    ].join("\n");
  };

  // Robust WhatsApp redirect — anchor-click works where window.open is blocked
  // (in-app browsers, mobile Safari popup blocker). Falls back to location change.
  const openWhatsApp = (text: string) => {
    const number = BRAND.whatsappPrimary;
    const msg = encodeURIComponent(text);
    // api.whatsapp.com/send is the most cross-platform endpoint (desktop + mobile + in-app browsers)
    const url = `https://api.whatsapp.com/send?phone=${number}&text=${msg}`;
    try {
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch {
      window.location.href = url;
    }
    // Safety net: if nothing happened after 800ms, fall back to same-tab navigation
    setTimeout(() => {
      if (!document.hidden) {
        // user may still be on the page (popup blocked) — navigate same tab
        window.location.href = `https://wa.me/${number}?text=${msg}`;
      }
    }, 800);
  };

  const confirmPaid = () => {
    const num = orderNo || nextOrderNumber();
    if (!orderNo) setOrderNo(num);
    openWhatsApp(buildMessage(true, num));
    setStep(3);
  };

  const sendOrderUnpaid = () => {
    const num = orderNo || nextOrderNumber();
    if (!orderNo) setOrderNo(num);
    openWhatsApp(buildMessage(false, num));
    setStep(3);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true">
      <button onClick={close} className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-label="Close" />
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white shadow-luxe border border-gold/40">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-white/95 backdrop-blur px-5 py-3">
          <div className="flex items-center gap-3">
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8a6a14]">
              {step === 1 ? "Order Details" : step === 2 ? "Payment" : "Invoice"}
            </div>
            <div className="text-xs text-muted-foreground hidden sm:block">Step {step} of 3</div>
          </div>
          <button onClick={close} className="p-2 rounded-full hover:bg-muted" aria-label="Close">
            <X className="size-4" />
          </button>
        </div>

        {step === 1 && (
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-6 p-5 sm:p-6">
            <div>
              <div className="rounded-xl overflow-hidden bg-gold-soft border border-gold/30">
                <img src={image} alt={team} className="aspect-[4/5] w-full object-cover" />
              </div>
              <div className="mt-4">
                <div className="font-display text-2xl font-semibold">{team}</div>
                <div className="text-xs uppercase tracking-[0.22em] text-[#8a6a14] mt-1">Player Edition · 2026</div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  {(["Home", "Away"] as Kit[]).map((k) => (
                    <button key={k} onClick={() => setKit(k)}
                      className={`rounded-lg border px-3 py-2.5 text-sm font-semibold transition ${
                        kit === k ? "border-[#b8862b] bg-[#fbf4dd] text-[#1a1a1a]" : "border-border hover:border-gold/60"
                      }`}>
                      <div>{k} Kit</div>
                      <div className="text-xs font-normal text-muted-foreground">₹{PRICE[k]}</div>
                    </button>
                  ))}
                </div>

                <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Size</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {SIZES.map((s) => (
                    <button key={s} onClick={() => setSize(s)}
                      className={`size-10 rounded-full border text-sm font-semibold transition ${
                        size === s ? "border-[#b8862b] bg-[#1a1a1a] text-[#f4d77a]" : "border-border hover:border-gold/60"
                      }`}>{s}</button>
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
                <div className="mt-2 text-[11px] text-muted-foreground">All-India delivery · No COD · Pay via UPI QR on next step.</div>
              </div>

              <div className="mt-4 rounded-xl border border-gold/40 bg-gold-soft p-4">
                <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#8a6a14]">🟩 Terms &amp; Conditions</div>
                <ol className="mt-2 list-decimal pl-5 space-y-1.5 text-[11.5px] text-neutral-700 leading-relaxed">
                  <li>You have to make a proper video of opening the parcel.</li>
                  <li>Product will be changed only when the product is damaged or missing in package — the opening video is the only proof.</li>
                  <li>We share a proper size chart before dispatch. After receiving the product, no replacement on size-related issues.</li>
                  <li>If we send the wrong product or wrong size, that item will be replaced.</li>
                </ol>
                <div className="mt-3 space-y-1 text-[11.5px] text-neutral-700">
                  <div>➡️ Delivery time: <span className="font-semibold">15–20 days</span></div>
                  <div>➡️ We share product tracking — you can track your order ❤️</div>
                </div>
              </div>

              <div className="mt-5 flex flex-col sm:flex-row gap-2">
                <button disabled={!validDetails} onClick={() => setStep(2)}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold uppercase tracking-[0.18em] transition disabled:opacity-50"
                  style={{ background: "linear-gradient(135deg,#1a1a1a,#2b2b2b)", color: "#f4d77a", border: "1px solid #d4af37" }}>
                  Continue to Payment
                </button>
                <a href={`https://wa.me/${BRAND.whatsappPrimary}?text=${encodeURIComponent(`Hi, I have a question about the ${team} ${kit} kit.`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold border border-border hover:border-gold/60">
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
                <div className="mt-1 text-sm text-muted-foreground">UPI · GPay · PhonePe · Paytm · BHIM</div>

                <div className="mt-4 rounded-2xl border-2 border-gold/60 bg-white p-3 max-w-sm">
                  <img src={PAYMENT_QR_URL} alt="Scan to pay" className="w-full h-auto" />
                </div>

                <div className="mt-3 text-xs text-neutral-700">
                  <div className="font-semibold">{UPI_NAME}</div>
                  <div className="text-muted-foreground">UPI ID: {UPI_ID}</div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="size-4 text-[#8a6a14]" /> No COD — for buyer & seller safety.
                </div>
              </div>

              <div>
                <div className="rounded-xl border border-border p-4">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Order summary</div>
                  <div className="mt-2 text-sm">
                    <div className="font-semibold">{team} — {kit} Kit</div>
                    <div className="text-muted-foreground">Size {size} · Qty {qty}</div>
                  </div>
                  <div className="mt-3 h-px hairline-gold" />
                  <Row label="Subtotal" value={`₹${subtotal}`} />
                  <Row label="Shipping" value="Free" />
                  <Row label="Total" value={`₹${total}`} strong />
                  <div className="mt-3 text-[11px] text-muted-foreground leading-relaxed">
                    1. Pay ₹{total} using the QR<br />
                    2. Tap below — your order opens in WhatsApp<br />
                    3. Attach payment screenshot · we confirm & ship
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <button onClick={confirmPaid}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold uppercase tracking-[0.18em]"
                    style={{ background: "var(--gradient-gold)", color: "#1a1a1a", border: "1px solid #8a6a14" }}>
                    <Check className="size-4" /> I've Paid — Send Order & Get Invoice
                  </button>
                  <button onClick={sendOrderUnpaid}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold border border-border hover:border-gold/60">
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

        {step === 3 && (
          <InvoiceView
            orderNo={orderNo}
            team={team} kit={kit} size={size} qty={qty}
            unit={unit} subtotal={subtotal} shipping={shipping} total={total}
            name={name} phone={phone} address={address} city={city} pincode={pincode}
            onClose={close}
          />
        )}
      </div>
    </div>
  );
}

function InvoiceView(props: {
  orderNo: string; team: string; kit: string; size: string; qty: number;
  unit: number; subtotal: number; shipping: number; total: number;
  name: string; phone: string; address: string; city: string; pincode: string;
  onClose: () => void;
}) {
  const { orderNo, team, kit, size, qty, unit, subtotal, shipping, total, name, phone, address, city, pincode, onClose } = props;
  const date = useMemo(() => new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }), []);

  const printInvoice = () => {
    const html = `<!doctype html><html><head><meta charset="utf-8"/><title>Invoice ${orderNo}</title>
<style>
  *{box-sizing:border-box}
  body{font-family:-apple-system,Segoe UI,Roboto,Inter,sans-serif;color:#1a1a1a;margin:0;padding:32px;background:#fff}
  .wrap{max-width:760px;margin:0 auto;border:1px solid #e5e0c8}
  .hd{background:linear-gradient(135deg,#1a1a1a,#2b2b2b);color:#f4d77a;padding:20px 24px;display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #d4af37}
  .hd h1{margin:0;font-size:22px;letter-spacing:.18em}
  .hd .meta{font-size:11px;color:#e5d28a;text-align:right}
  .body{padding:24px}
  .row{display:flex;justify-content:space-between;gap:24px;margin-bottom:18px}
  .col{flex:1}
  h3{font-size:11px;text-transform:uppercase;letter-spacing:.18em;color:#8a6a14;margin:0 0 6px}
  table{width:100%;border-collapse:collapse;margin-top:8px}
  th,td{padding:10px 8px;text-align:left;border-bottom:1px solid #eee;font-size:13px}
  th{background:#fbf4dd;color:#8a6a14;text-transform:uppercase;font-size:10px;letter-spacing:.14em}
  .tot{font-weight:700;font-size:16px}
  .ft{padding:16px 24px;border-top:1px solid #eee;font-size:11px;color:#666;text-align:center}
  .stamp{display:inline-block;border:2px solid #1a7a3a;color:#1a7a3a;padding:4px 10px;border-radius:6px;font-weight:700;letter-spacing:.18em;font-size:11px;transform:rotate(-6deg)}
  @media print{body{padding:0}.no-print{display:none}}
</style></head><body>
<div class="wrap">
  <div class="hd"><div><h1>CHECKMATE</h1><div style="font-size:10px;letter-spacing:.22em;margin-top:2px">PLAYER EDITION · WORLD CUP 2026</div></div>
  <div class="meta">Tax Invoice<br/><b style="color:#f4d77a">${orderNo}</b><br/>${date}</div></div>
  <div class="body">
    <div class="row">
      <div class="col"><h3>Billed to</h3>
        <div><b>${escapeHtml(name)}</b></div>
        <div>${escapeHtml(address)}</div>
        <div>${escapeHtml(city)} — ${escapeHtml(pincode)}</div>
        <div>+91 ${escapeHtml(phone)}</div>
      </div>
      <div class="col" style="text-align:right"><h3>Seller · CHECKMATE Jersey</h3>
        <div>📧 checkmatejersey@gmail.com</div>
        <div>📱 WhatsApp: +91 70033 69589</div>
        <div>📱 Alt: +91 85830 25727</div>
        <div>📷 instagram.com/checkmate.jersey</div>
        <div style="margin-top:10px"><span class="stamp">PAID</span></div>
      </div>
    </div>
    <table>
      <thead><tr><th>Item</th><th>Size</th><th style="text-align:center">Qty</th><th style="text-align:right">Unit</th><th style="text-align:right">Amount</th></tr></thead>
      <tbody><tr>
        <td><b>${escapeHtml(team)}</b><br/><span style="color:#888;font-size:11px">${kit} Kit · Player Edition</span></td>
        <td>${size}</td><td style="text-align:center">${qty}</td>
        <td style="text-align:right">₹${unit}</td><td style="text-align:right">₹${subtotal}</td>
      </tr></tbody>
    </table>
    <div style="margin-top:14px;margin-left:auto;width:280px">
      <div style="display:flex;justify-content:space-between;padding:4px 0"><span>Subtotal</span><span>₹${subtotal}</span></div>
      <div style="display:flex;justify-content:space-between;padding:4px 0"><span>Shipping</span><span>${shipping === 0 ? "FREE" : "₹" + shipping}</span></div>
      <div style="display:flex;justify-content:space-between;padding:8px 0;border-top:1px solid #d4af37;margin-top:6px" class="tot"><span>Total</span><span>₹${total}</span></div>
      <div style="font-size:11px;color:#666;margin-top:4px">Paid via UPI · ankushkhatik218@okhdfcbank</div>
    </div>
    <div style="margin-top:24px;font-size:11px;color:#666;line-height:1.6">
      <b style="color:#8a6a14">Delivery:</b> 15–20 days. Tracking shared on WhatsApp after dispatch.<br/>
      <b style="color:#8a6a14">Replacement:</b> Only if parcel is damaged/missing in opening video, or wrong item/size sent. No size-related returns after delivery.
    </div>
  </div>
  <div class="ft">Thank you for shopping with CHECKMATE · Wear Your Passion</div>
</div>
<div class="no-print" style="text-align:center;margin-top:16px"><button onclick="window.print()" style="padding:10px 20px;background:#1a1a1a;color:#f4d77a;border:1px solid #d4af37;border-radius:999px;font-weight:700;letter-spacing:.18em;cursor:pointer">PRINT / SAVE AS PDF</button></div>
</body></html>`;
    const w = window.open("", "_blank");
    if (w) { w.document.write(html); w.document.close(); }
  };

  return (
    <div className="p-5 sm:p-6">
      <div className="text-center">
        <div className="mx-auto size-14 rounded-full bg-[#1a7a3a] grid place-items-center text-white"><Check className="size-7" /></div>
        <div className="mt-3 font-display text-2xl font-semibold">Order Placed</div>
        <div className="mt-1 text-sm text-muted-foreground">Order number</div>
        <div className="mt-1 text-xl font-bold tracking-[0.18em] text-[#8a6a14]">{orderNo}</div>
      </div>

      <div className="mt-5 rounded-xl border border-gold/40 bg-gold-soft p-4 max-w-md mx-auto">
        <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Summary</div>
        <Row label={`${team} — ${kit} · ${size} × ${qty}`} value={`₹${subtotal}`} />
        <Row label="Shipping" value="Free" />
        <Row label="Total Paid" value={`₹${total}`} strong />
        <div className="mt-2 text-[11px] text-muted-foreground">
          Ship to: {name}, {address}, {city} — {pincode}
        </div>
      </div>

      <div className="mt-5 flex flex-col sm:flex-row gap-2 justify-center">
        <button onClick={printInvoice}
          className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-[0.18em]"
          style={{ background: "var(--gradient-gold)", color: "#1a1a1a", border: "1px solid #8a6a14" }}>
          <Printer className="size-4" /> Download Invoice
        </button>
        <button onClick={onClose} className="rounded-full px-6 py-3 text-sm font-semibold border border-border hover:border-gold/60">
          Done
        </button>
      </div>

      <div className="mt-4 text-center text-[11px] text-muted-foreground">
        A copy of your order has been sent on WhatsApp. We'll confirm dispatch with tracking shortly.
      </div>
    </div>
  );
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));
}

function Field({ label, value, onChange, placeholder, className = "" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm focus:border-[#b8862b] focus:outline-none focus:ring-2 focus:ring-[#f4d77a]/40" />
    </label>
  );
}

function Row({ label, value, strong, muted }: { label: string; value: string; strong?: boolean; muted?: boolean }) {
  return (
    <div className={`flex items-center justify-between py-1 text-sm ${strong ? "font-bold text-base" : ""} ${muted ? "text-muted-foreground text-xs" : ""}`}>
      <span>{label}</span><span>{value}</span>
    </div>
  );
}
