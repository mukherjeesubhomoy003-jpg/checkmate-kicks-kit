import { useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { X, Check, Phone, ShieldCheck, Printer, MessageCircle, Ruler } from "lucide-react";
import qrAsset from "@/assets/payment-qr.png.asset.json";
import logoAsset from "@/assets/checkmate-logo.asset.json";
import { SizeChartModal } from "@/components/SizeChartModal";
import { useJerseySizeStock, type SizeKey } from "@/lib/jersey-size-stock";
import { createJerseyOrder } from "@/lib/jersey-admin.functions";
import { useBulkCart } from "@/lib/bulk-cart";
import { toast } from "sonner";

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

const PRICE: Record<Kit, number> = { Home: 850, Away: 850 };

function getKitPrice(_team: string, kit: Kit): number {
  return PRICE[kit];
}

type Props = {
  team: string;
  image: string;
  open: boolean;
  onClose: () => void;
  /** Override per-jersey price (used for special drops like Argentina Messi). */
  priceOverride?: number;
  /** Restrict size options for this jersey. */
  sizesOverride?: Size[];
  /** Hide the Home/Away kit selector entirely. */
  hideKitSelector?: boolean;
  /** Pre-fill the back-printing fields. */
  defaultPrintingName?: string;
  defaultPrintingNumber?: string;
  /** Jersey ID (e.g. "j07") — enables per-size stock display + decrement. */
  jerseyId?: string;
  /** Optional shipping fee (defaults to free). */
  shippingOverride?: number;
  /** Category label used when adding to bulk cart. */
  category?: string;
};

const PRINT_ADDON = 250;

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

export function OrderModal({
  team, image, open, onClose,
  priceOverride, sizesOverride, hideKitSelector,
  defaultPrintingName = "", defaultPrintingNumber = "",
  jerseyId, shippingOverride, category,
}: Props) {
  const availableSizes = sizesOverride ?? (SIZES as readonly Size[] as Size[]);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [kit, setKit] = useState<Kit>("Home");
  const [size, setSize] = useState<Size>(availableSizes[0] ?? "L");
  const [qty, setQty] = useState(1);
  const [addPrint, setAddPrint] = useState(false);
  const [printName, setPrintName] = useState(defaultPrintingName);
  const [printNumber, setPrintNumber] = useState(defaultPrintingNumber);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [altPhone, setAltPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [landmark, setLandmark] = useState("");
  const [postOffice, setPostOffice] = useState("");
  const [orderNo, setOrderNo] = useState<string>("");
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [placing, setPlacing] = useState(false);


  const { data: sizeStockMap } = useJerseySizeStock();
  const placeOrder = useServerFn(createJerseyOrder);
  const bulkCart = useBulkCart();
  const sizeStock: Partial<Record<SizeKey, number>> | undefined = jerseyId ? sizeStockMap?.[jerseyId] : undefined;
  const currentSizeStock = sizeStock?.[size as SizeKey];

  if (!open) return null;

  const unit = priceOverride ?? getKitPrice(team, kit);
  const subtotal = unit * qty;
  const printingFee = addPrint ? PRINT_ADDON : 0;
  const shipping = shippingOverride ?? 0;
  const total = subtotal + printingFee + shipping;

  const reset = () => {
    setStep(1); setKit("Home"); setSize(availableSizes[0] ?? "L"); setQty(1);
    setAddPrint(false); setPrintName(defaultPrintingName); setPrintNumber(defaultPrintingNumber);
    setName(""); setPhone(""); setAltPhone(""); setAddress(""); setCity(""); setPincode(""); setLandmark(""); setPostOffice(""); setOrderNo("");
  };
  const close = () => { onClose(); setTimeout(reset, 250); };

  const printingValid = !addPrint || (printName.trim().length > 0 && printNumber.trim().length > 0);
  const stockOk = jerseyId ? (currentSizeStock ?? 0) >= qty : true;
  const altPhoneValid = /^[6-9]\d{9}$/.test(altPhone.trim()) && altPhone.trim() !== phone.trim();
  const validDetails = name.trim() && /^[6-9]\d{9}$/.test(phone.trim()) && altPhoneValid && address.trim() && city.trim() && /^\d{6}$/.test(pincode.trim()) && printingValid && stockOk;


  const postOfficeOut = postOffice.trim() || "NA";

  const buildMessage = (paid: boolean, orderNumber: string) => {
    const itemLine = hideKitSelector
      ? `*Item:* ${team} (Player Edition)`
      : `*Item:* ${team} — ${kit} Kit (Player Edition)`;
    return [
      `*New Order — CHECKMATE*`,
      `*Order #:* ${orderNumber}`,
      ``,
      itemLine,
      `*Size:* ${size}`,
      `*Qty:* ${qty}`,
      `*Unit:* ₹${unit}`,
      `*Subtotal:* ₹${subtotal}`,
      ...(addPrint ? [`*Back Printing:* ${printName.toUpperCase()} #${printNumber} (+₹${PRINT_ADDON})`] : []),
      `*Shipping:* ${shipping === 0 ? "Free" : "₹" + shipping}`,
      `*Total:* ₹${total}`,
      ``,
      `*Buyer*`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Alt Phone: ${altPhone}`,
      `Address: ${address}`,
      ...(landmark.trim() ? [`Landmark: ${landmark.trim()}`] : []),
      `Post Office: ${postOfficeOut}`,
      `City: ${city}  Pin: ${pincode}`,
      ``,
      paid ? `✅ Payment done — sharing screenshot next.` : `🕒 Will pay shortly via UPI QR.`,
    ].join("\n");
  };


  const openWhatsApp = (text: string) => {
    const number = BRAND.whatsappPrimary;
    const msg = encodeURIComponent(text);
    const url = `https://api.whatsapp.com/send?phone=${number}&text=${msg}`;
    try {
      const a = document.createElement("a");
      a.href = url; a.target = "_blank"; a.rel = "noopener noreferrer";
      document.body.appendChild(a); a.click(); a.remove();
    } catch { window.location.href = url; }
    setTimeout(() => {
      if (!document.hidden) window.location.href = `https://wa.me/${number}?text=${msg}`;
    }, 800);
  };

  const confirmPaid = async () => {
    if (placing) return;
    setPlacing(true);
    let num = orderNo;
    if (!num) {
      try {
        const res = await placeOrder({
          data: {
            buyer_name: name.trim(),
            buyer_phone: phone.trim(),
            address: address.trim(),
            city: city.trim(),
            pincode: pincode.trim(),
            landmark: landmark.trim() || null,
            post_office: postOfficeOut,
            item_name: team,
            kit: hideKitSelector ? null : kit,
            size,
            qty,
            unit_price: unit,
            printing_name: addPrint ? printName.trim().toUpperCase() : null,
            printing_number: addPrint ? printNumber.trim() : null,
            printing_fee: addPrint ? PRINT_ADDON : 0,
            total,
            jersey_id: jerseyId ?? null,
          },
        });
        num = res.order_number;
      } catch {
        num = nextOrderNumber(); // local fallback so customer can still get an invoice
      }
      setOrderNo(num);
    }
    openWhatsApp(buildMessage(true, num));
    setStep(3);
    setPlacing(false);
  };




  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true">
      <button onClick={close} className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-label="Close" />
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white shadow-luxe border border-black/10">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-white/95 backdrop-blur px-5 py-3">
          <div className="flex items-center gap-3">
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#fa5400]">
              {step === 1 ? "Order Details" : step === 2 ? "Payment" : "Awaiting Verification"}
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
              <div className="rounded-xl overflow-hidden bg-[#f5f5f5] border border-black/10">
                <img src={image} alt={team} className="aspect-[4/5] w-full object-cover" />
              </div>
              <div className="mt-4">
                <div className="font-display text-2xl font-semibold">{team}</div>
                <div className="text-xs uppercase tracking-[0.22em] text-[#fa5400] mt-1">Player Edition · 2026</div>

                {!hideKitSelector && (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {(["Home", "Away"] as Kit[]).map((k) => (
                      <button key={k} onClick={() => setKit(k)}
                        className={`rounded-lg border px-3 py-2.5 text-sm font-semibold transition ${
                          kit === k ? "border-[#000000] bg-[#f5f5f5] text-[#1a1a1a]" : "border-border hover:border-black/30"
                        }`}>
                        <div>{k} Kit</div>
                        <div className="text-xs font-normal text-muted-foreground">₹{getKitPrice(team, k)}</div>
                      </button>
                    ))}
                  </div>
                )}
                {hideKitSelector && (
                  <div className="mt-4 rounded-lg border border-[#000000] bg-[#f5f5f5] px-3 py-2.5 text-sm font-semibold text-[#1a1a1a]">
                    Special Drop · <span className="text-[#fa5400]">₹{unit}</span>
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Size</label>
                  <button type="button" onClick={() => setShowSizeChart(true)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#fa5400] hover:text-[#000000]">
                    <Ruler className="size-3.5" /> Size Chart
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {availableSizes.map((s) => {
                    const left = jerseyId ? sizeStock?.[s as SizeKey] : undefined;
                    const out = jerseyId !== undefined && (left ?? 0) <= 0;
                    return (
                      <button key={s} onClick={() => !out && setSize(s)} disabled={out}
                        title={out ? "Out of stock" : left !== undefined ? `${left} left` : undefined}
                        className={`relative flex flex-col items-center justify-center w-12 h-12 rounded-xl border text-sm font-semibold transition ${
                          out
                            ? "border-neutral-200 bg-neutral-100 text-neutral-400 cursor-not-allowed line-through"
                            : size === s
                              ? "border-[#000000] bg-[#1a1a1a] text-[#ffffff]"
                              : "border-border hover:border-black/30"
                        }`}>
                        <span className="leading-none">{s}</span>
                        {jerseyId && (
                          <span className={`text-[8px] mt-0.5 leading-none font-bold uppercase tracking-wider ${
                            out ? "text-red-500" : size === s ? "text-[#ffffff]/80" : "text-neutral-500"
                          }`}>
                            {out ? "Out" : `${left} left`}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                {jerseyId && currentSizeStock !== undefined && currentSizeStock > 0 && currentSizeStock <= 3 && (
                  <div className="mt-1.5 text-[11px] font-semibold text-amber-700">
                    Only {currentSizeStock} left in size {size} — hurry!
                  </div>
                )}
                {jerseyId && qty > (currentSizeStock ?? 0) && (
                  <div className="mt-1.5 text-[11px] font-semibold text-red-600">
                    Not enough stock for size {size} (max {currentSizeStock ?? 0}).
                  </div>
                )}

                <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Quantity</label>
                <div className="mt-2 inline-flex items-center rounded-full border border-border">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-1.5">−</button>
                  <span className="px-3 text-sm font-semibold">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="px-3 py-1.5">+</button>
                </div>

                {/* Back-printing add-on */}
                <div className="mt-5 rounded-xl border-2 border-dashed border-black/30 bg-[#f5f5f5] p-3">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input type="checkbox" checked={addPrint} onChange={(e) => setAddPrint(e.target.checked)}
                      className="mt-1 size-4 accent-[#000000]" />
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-[#1a1a1a]">Add back printing (Name + Number)</div>
                      <div className="text-[11px] text-neutral-600">Optional · +₹{PRINT_ADDON} · heat-pressed on back</div>
                    </div>
                  </label>
                  {addPrint && (
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <label className="block">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Name on back</span>
                        <input value={printName} onChange={(e) => setPrintName(e.target.value.toUpperCase().slice(0, 14))}
                          placeholder="MESSI" className="mt-1 w-full rounded-md border border-border bg-white px-2.5 py-2 text-sm font-bold tracking-wider focus:border-[#000000] focus:outline-none" />
                      </label>
                      <label className="block">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Number</span>
                        <input value={printNumber} onChange={(e) => setPrintNumber(e.target.value.replace(/\D/g, "").slice(0, 3))}
                          placeholder="10" className="mt-1 w-full rounded-md border border-border bg-white px-2.5 py-2 text-sm font-bold focus:border-[#000000] focus:outline-none" />
                      </label>
                      {!printingValid && (
                        <div className="col-span-2 text-[11px] text-red-600">Fill both name and number, or uncheck add-on.</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Full name" value={name} onChange={setName} placeholder="As per delivery" />
                <Field label="Phone (10-digit)" value={phone} onChange={(v) => setPhone(v.replace(/\D/g, "").slice(0, 10))} placeholder="9XXXXXXXXX" />
                <Field label="Alternative phone* (required)" value={altPhone} onChange={(v) => setAltPhone(v.replace(/\D/g, "").slice(0, 10))} placeholder="Different from main number" className="sm:col-span-2" />
                <Field label="Address" value={address} onChange={setAddress} placeholder="House, street, area" className="sm:col-span-2" />
                <Field label="Landmark (nearby)" value={landmark} onChange={setLandmark} placeholder="e.g. Near SBI ATM" className="sm:col-span-2" />
                <Field label="Post office" value={postOffice} onChange={setPostOffice} placeholder="Leave blank if not available (NA)" />
                <Field label="City" value={city} onChange={setCity} placeholder="City" />
                <Field label="Pincode" value={pincode} onChange={(v) => setPincode(v.replace(/\D/g, "").slice(0, 6))} placeholder="6-digit" />
              </div>
              {altPhone && !altPhoneValid && (
                <div className="mt-1 text-[11px] text-red-600">Alternative number must be a different valid 10-digit Indian mobile.</div>
              )}


              <div className="mt-5 rounded-xl border border-black/10 bg-[#f5f5f5] p-4">
                <Row label={`${hideKitSelector ? team : `${kit} Kit`} × ${qty}`} value={`₹${subtotal}`} />
                {addPrint && <Row label={`Back printing · ${printName || "—"} #${printNumber || "—"}`} value={`₹${printingFee}`} />}
                <Row label="Shipping" value={shipping === 0 ? "Free" : `₹${shipping}`} />
                <div className="my-2 h-px bg-black/10" />
                <Row label="Total" value={`₹${total}`} strong />
                <div className="mt-2 text-[11px] text-muted-foreground">All-India delivery · No COD · Pay via UPI QR on next step.</div>
              </div>

              <div className="mt-4 rounded-xl border border-black/10 bg-[#f5f5f5] p-4">
                <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#fa5400]">🟩 Terms &amp; Conditions</div>
                <ol className="mt-2 list-decimal pl-5 space-y-1.5 text-[11.5px] text-neutral-700 leading-relaxed">
                  <li>You have to make a proper video of opening the parcel.</li>
                  <li>Product will be changed only when the product is damaged or missing in package — the opening video is the only proof.</li>
                  <li>We share a proper size chart before dispatch. After receiving the product, no replacement on size-related issues.</li>
                  <li>If we send the wrong product or wrong size, that item will be replaced.</li>
                </ol>
                <div className="mt-3 space-y-1 text-[11.5px] text-neutral-700">
                  <div>➡️ Delivery time: <span className="font-semibold">Within 7 days — delivered to your doorstep</span></div>
                  <div>➡️ We share product tracking — you can track your order ❤️</div>
                </div>
              </div>

              <div className="mt-5 flex flex-col sm:flex-row gap-2">
                <button disabled={!validDetails} onClick={() => setStep(2)}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold uppercase tracking-[0.18em] transition disabled:opacity-50"
                  style={{ background: "linear-gradient(135deg,#1a1a1a,#2b2b2b)", color: "#ffffff", border: "1px solid #fa5400" }}>
                  Continue to Payment
                </button>
                <button
                  type="button"
                  disabled={!printingValid || !stockOk}
                  onClick={() => {
                    const itemName = hideKitSelector ? team : `${team} — ${kit} Kit`;
                    bulkCart.add({
                      itemId: `${jerseyId ?? team}__${hideKitSelector ? "one" : kit}${addPrint ? `__${printName || "X"}${printNumber || "0"}` : ""}`,
                      name: itemName + (addPrint ? ` · Print ${printName || "-"} #${printNumber || "-"}` : ""),
                      image,
                      price: unit + (addPrint ? PRINT_ADDON : 0),
                      size,
                      quantity: qty,
                      category: category ?? "Jersey",
                    });
                    toast.success(`Added ${itemName} (Size ${size} × ${qty}) to cart`);
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold uppercase tracking-[0.18em] border border-[#fa5400] text-[#fa5400] hover:bg-[#fa5400] hover:text-white transition disabled:opacity-50"
                >
                  + Add to Cart
                </button>
                <a href={`https://wa.me/${BRAND.whatsappPrimary}?text=${encodeURIComponent(`Hi, I have a question about the ${team} ${kit} kit.`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold border border-border hover:border-black/30">
                  <Phone className="size-4" /> Ask
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

                <div className="mt-4 rounded-2xl border-2 border-black/30 bg-white p-3 max-w-sm">
                  <img src={PAYMENT_QR_URL} alt="Scan to pay" className="w-full h-auto" />
                </div>

                <div className="mt-3 text-xs text-neutral-700">
                  <div className="font-semibold">{UPI_NAME}</div>
                  <div className="text-muted-foreground">UPI ID: {UPI_ID}</div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="size-4 text-[#fa5400]" /> No COD — for buyer & seller safety.
                </div>

                <div className="mt-4 rounded-xl border border-[#fa5400] bg-[#f5f5f5] p-3 text-[12px] leading-relaxed text-neutral-800">
                  <div className="font-bold text-[#fa5400] uppercase tracking-wider text-[10px] mb-1">How to pay</div>
                  📸 <b>Take a screenshot of this QR</b>, pay the amount, then share the payment screenshot with us on WhatsApp to confirm your order — and enjoy your jersey! 🎉<br/>
                  <span className="block mt-1.5 text-neutral-600">Feel free to ask on WhatsApp if you face any problem or have any questions — we're here to help.</span>
                </div>
              </div>


              <div>
                <div className="rounded-xl border border-border p-4">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Order summary</div>
                  <div className="mt-2 text-sm">
                    <div className="font-semibold">{team}{!hideKitSelector && ` — ${kit} Kit`}</div>
                    <div className="text-muted-foreground">Size {size} · Qty {qty}</div>
                    {addPrint && <div className="text-muted-foreground">Back: <b>{printName}</b> #{printNumber}</div>}
                  </div>
                  <div className="mt-3 h-px bg-black/10" />
                  <Row label="Subtotal" value={`₹${subtotal}`} />
                  {addPrint && <Row label="Back printing" value={`₹${printingFee}`} />}
                  <Row label="Shipping" value={shipping === 0 ? "Free" : `₹${shipping}`} />
                  <Row label="Total" value={`₹${total}`} strong />
                  <div className="mt-3 text-[11px] text-muted-foreground leading-relaxed">
                    1. Pay <b>₹{total}</b> using the QR<br />
                    2. Tap below <b>only after payment</b><br />
                    3. Send the payment screenshot on WhatsApp<br />
                    4. Once we verify the payment, we send your invoice on WhatsApp ✅
                  </div>
                </div>


                <div className="mt-4 flex flex-col gap-2">
                  <button onClick={confirmPaid} disabled={placing}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold uppercase tracking-[0.18em] disabled:opacity-60"
                    style={{ background: "#fa5400", color: "#ffffff", border: "1px solid #fa5400" }}>
                    <Check className="size-4" /> {placing ? "Saving order…" : "I've Paid — Send Screenshot on WhatsApp"}
                  </button>
                  <div className="text-[11px] text-muted-foreground text-center px-2">
                    ⚠️ Your invoice is sent on WhatsApp <b>only after we verify your payment</b>. No invoice is generated automatically.
                  </div>
                  <button onClick={() => setStep(1)} className="text-xs text-muted-foreground hover:underline mt-1">
                    ← Edit details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}


        {step === 3 && (
          <PendingVerification
            orderNo={orderNo}
            team={team} kit={hideKitSelector ? "" : kit} size={size} qty={qty} total={total}
            phone={phone} altPhone={altPhone}
            onResend={() => openWhatsApp(buildMessage(true, orderNo))}
            onClose={close}
          />
        )}

      </div>
      <SizeChartModal open={showSizeChart} onClose={() => setShowSizeChart(false)} />
    </div>
  );
}

function PendingVerification(props: {
  orderNo: string; team: string; kit: string; size: string; qty: number; total: number;
  phone: string; altPhone: string;
  onResend: () => void; onClose: () => void;
}) {
  const { orderNo, team, kit, size, qty, total, phone, altPhone, onResend, onClose } = props;
  const itemLine = kit ? `${team} — ${kit} Kit` : team;
  return (
    <div className="p-5 sm:p-6">
      <div className="text-center">
        <div className="mx-auto size-14 rounded-full bg-amber-100 grid place-items-center text-amber-700">
          <ShieldCheck className="size-7" />
        </div>
        <div className="mt-3 font-display text-2xl font-semibold">Payment Under Verification</div>
        <div className="mt-1 text-sm text-muted-foreground">Order number</div>
        <div className="mt-1 text-xl font-bold tracking-[0.18em] text-[#fa5400]">{orderNo || "—"}</div>
      </div>

      <div className="mt-5 rounded-xl border-2 border-amber-300 bg-amber-50 p-4 max-w-md mx-auto text-[12.5px] text-neutral-800 leading-relaxed">
        <div className="font-bold text-amber-800 uppercase tracking-wider text-[10px] mb-1.5">⏳ Important — please read</div>
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>Your order has been <b>placed</b> but the invoice is <b>not yet issued</b>.</li>
          <li>Send your <b>payment screenshot on WhatsApp</b> to confirm.</li>
          <li>Once our team <b>verifies your payment</b>, we will send your official invoice on WhatsApp.</li>
          <li>Until then, no payment receipt or invoice is generated automatically.</li>
        </ol>
      </div>

      <div className="mt-4 rounded-xl border border-black/10 bg-[#f5f5f5] p-4 max-w-md mx-auto text-sm">
        <div className="font-semibold">{itemLine}</div>
        <div className="text-muted-foreground">Size {size} · Qty {qty}</div>
        <Row label="Amount to pay" value={`₹${total}`} strong />
        <div className="mt-1 text-[11px] text-muted-foreground">📱 {phone} · Alt: {altPhone}</div>
      </div>

      <div className="mt-5 flex flex-col sm:flex-row gap-2 justify-center max-w-md mx-auto">
        <button onClick={onResend}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white"
          style={{ background: "#25D366", border: "1px solid #128C7E" }}>
          <MessageCircle className="size-4" /> Send Screenshot on WhatsApp
        </button>
        <button onClick={onClose}
          className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold border border-border hover:border-black/30">
          Close
        </button>
      </div>

      <div className="mt-4 text-center text-[11px] text-muted-foreground px-4">
        Feel free to ask on WhatsApp if you face any problem — we're here to help. 💛
      </div>
    </div>
  );
}



function InvoiceView(props: {
  orderNo: string; team: string; kit: string; size: string; qty: number;
  unit: number; subtotal: number; shipping: number; total: number;
  printName: string; printNumber: string; printingFee: number;
  name: string; phone: string; address: string; city: string; pincode: string;
  onClose: () => void;
}) {
  const { orderNo, team, kit, size, qty, unit, subtotal, shipping, total, printName, printNumber, printingFee, name, phone, address, city, pincode, onClose } = props;
  const date = useMemo(() => new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }), []);

  const estDelivery = useMemo(() => {
    const d1 = new Date(); d1.setDate(d1.getDate() + 15);
    const d2 = new Date(); d2.setDate(d2.getDate() + 20);
    const fmt = (d: Date) => d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
    return `${fmt(d1)} – ${fmt(d2)}`;
  }, []);

  const logoUrl = typeof window !== "undefined" ? new URL(logoAsset.url, window.location.origin).href : logoAsset.url;
  const itemLine = kit ? `${team} — ${kit} Kit` : team;

  const sendOnWhatsApp = () => {
    const text = [
      `*Order Confirmation — CHECKMATE*`,
      `Order #: ${orderNo}`,
      `${itemLine} · Size ${size} · Qty ${qty}`,
      ...(printName ? [`Back Printing: ${printName} #${printNumber}`] : []),
      `Total Paid: ₹${total}`,
      `Ship to: ${name}, ${address}, ${city} - ${pincode}`,
      `Phone: +91 ${phone}`,
      `Est. Delivery: ${estDelivery}`,
      ``,
      `Sharing payment screenshot now ✅`,
    ].join("\n");
    const url = `https://api.whatsapp.com/send?phone=${BRAND.whatsappPrimary}&text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const printInvoice = () => {
    const html = `<!doctype html><html><head><meta charset="utf-8"/><title>Invoice ${orderNo} · CHECKMATE</title>
<style>
  *{box-sizing:border-box}
  body{font-family:-apple-system,Segoe UI,Roboto,Inter,sans-serif;color:#1a1a1a;margin:0;padding:24px;background:#f6f3ea}
  .wrap{max-width:780px;margin:0 auto;border:1px solid #e5e0c8;background:#fff;box-shadow:0 20px 50px -30px rgba(0,0,0,0.25)}
  .hd{background:linear-gradient(135deg,#1a1a1a,#2b2b2b);color:#ffffff;padding:18px 24px;display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #fa5400;gap:16px}
  .brand{display:flex;align-items:center;gap:14px}
  .brand img{width:54px;height:54px;border-radius:10px;border:1.5px solid #fa5400;background:#fff;object-fit:cover}
  .brand h1{margin:0;font-size:22px;letter-spacing:.18em}
  .brand .tag{font-size:9.5px;letter-spacing:.22em;margin-top:3px;color:#e5d28a}
  .meta{font-size:11px;color:#e5d28a;text-align:right;line-height:1.55}
  .meta b{color:#ffffff;font-size:13px;letter-spacing:.12em}
  .body{padding:22px 24px}
  .row{display:flex;justify-content:space-between;gap:24px;margin-bottom:18px}
  .col{flex:1;min-width:0}
  h3{font-size:10px;text-transform:uppercase;letter-spacing:.2em;color:#fa5400;margin:0 0 6px;font-weight:700}
  .kv{font-size:12.5px;line-height:1.65}
  table{width:100%;border-collapse:collapse;margin-top:6px}
  th,td{padding:10px 8px;text-align:left;border-bottom:1px solid #efe9d3;font-size:12.5px;vertical-align:top}
  th{background:#f5f5f5;color:#fa5400;text-transform:uppercase;font-size:9.5px;letter-spacing:.16em}
  .tot{font-weight:800;font-size:16px;color:#1a1a1a}
  .totals{margin-top:14px;margin-left:auto;width:300px}
  .totals .ln{display:flex;justify-content:space-between;padding:5px 0;font-size:12.5px}
  .ft{padding:14px 24px;border-top:1px solid #efe9d3;font-size:10.5px;color:#777;text-align:center;background:#fbf9f1}
  .stamp{display:inline-block;border:2.5px solid #1a7a3a;color:#1a7a3a;padding:4px 12px;border-radius:6px;font-weight:800;letter-spacing:.22em;font-size:11px;transform:rotate(-7deg);margin-top:6px}
  .pill{display:inline-block;background:#f5f5f5;color:#fa5400;padding:2px 8px;border-radius:999px;font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase}
  .grid2{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:16px}
  .box{border:1px solid #efe9d3;border-radius:10px;padding:12px 14px;background:#fcfaf3}
  .box h4{margin:0 0 6px;font-size:10px;letter-spacing:.18em;color:#fa5400;text-transform:uppercase}
  .box .v{font-size:12px;color:#333;line-height:1.55}
  @media print{body{padding:0;background:#fff}.no-print{display:none}.wrap{box-shadow:none;border:none}}
</style></head><body>
<div class="wrap">
  <div class="hd">
    <div class="brand">
      <img src="${logoUrl}" alt="CHECKMATE"/>
      <div><h1>CHECKMATE</h1><div class="tag">PLAYER EDITION · WORLD CUP 2026</div></div>
    </div>
    <div class="meta">
      <div style="font-size:10px;letter-spacing:.2em;text-transform:uppercase">Tax Invoice</div>
      <div><b>${orderNo}</b></div>
      <div>${date}</div>
      <div style="margin-top:6px"><span class="pill" style="background:#1a7a3a;color:#fff">PAID</span></div>
    </div>
  </div>

  <div class="body">
    <div class="row">
      <div class="col"><h3>Billed &amp; Shipped to</h3>
        <div class="kv">
          <b style="font-size:14px">${escapeHtml(name)}</b><br/>
          ${escapeHtml(address)}<br/>
          ${escapeHtml(city)} — ${escapeHtml(pincode)}<br/>
          📱 +91 ${escapeHtml(phone)}
        </div>
      </div>
      <div class="col" style="text-align:right"><h3>Sold By</h3>
        <div class="kv">
          <b>CHECKMATE Jersey</b><br/>
          Player-Edition Football Kits<br/>
          📧 ${BRAND.email}<br/>
          📱 WhatsApp: +91 70033 69589<br/>
          📱 Alt: +91 85830 25727<br/>
          📷 instagram.com/checkmate.jersey
        </div>
        <div><span class="stamp">PAID</span></div>
      </div>
    </div>

    <table>
      <thead><tr>
        <th style="width:42%">Item Description</th>
        <th>HSN</th><th>Size</th>
        <th style="text-align:center">Qty</th>
        <th style="text-align:right">Unit (₹)</th>
        <th style="text-align:right">Amount (₹)</th>
      </tr></thead>
      <tbody>
        <tr>
          <td>
            <b>${escapeHtml(itemLine)}</b><br/>
            <span style="color:#888;font-size:11px">Player Edition · Match-grade dri-fit fabric</span>
          </td>
          <td>6109</td>
          <td>${size}</td>
          <td style="text-align:center">${qty}</td>
          <td style="text-align:right">${unit}</td>
          <td style="text-align:right">${subtotal}</td>
        </tr>
        ${printName ? `<tr>
          <td>
            <b>Back Printing — ${escapeHtml(printName)} #${escapeHtml(printNumber)}</b><br/>
            <span style="color:#888;font-size:11px">Heat-pressed custom name & number on back</span>
          </td>
          <td>6109</td>
          <td>—</td>
          <td style="text-align:center">1</td>
          <td style="text-align:right">${printingFee}</td>
          <td style="text-align:right">${printingFee}</td>
        </tr>` : ""}
      </tbody>
    </table>

    <div class="totals">
      <div class="ln"><span>Subtotal</span><span>₹${subtotal}</span></div>
      ${printName ? `<div class="ln"><span>Back printing add-on</span><span>₹${printingFee}</span></div>` : ""}
      <div class="ln"><span>Shipping (All-India)</span><span>${shipping === 0 ? "FREE" : "₹" + shipping}</span></div>
      <div class="ln"><span>Discount</span><span>—</span></div>
      <div class="ln tot" style="border-top:1.5px solid #fa5400;margin-top:6px;padding-top:8px"><span>Grand Total</span><span>₹${total}</span></div>
      <div style="font-size:11px;color:#666;margin-top:6px;text-align:right">Inclusive of all taxes</div>
    </div>

    <div class="grid2">
      <div class="box">
        <h4>Payment</h4>
        <div class="v">
          Method: <b>UPI</b><br/>
          UPI ID: ${UPI_ID}<br/>
          Payee: ${UPI_NAME}<br/>
          Status: <b style="color:#1a7a3a">PAID ✓</b>
        </div>
      </div>
      <div class="box">
        <h4>Delivery</h4>
        <div class="v">
          ETA: <b>${estDelivery}</b> (15–20 days)<br/>
          Mode: Tracked courier<br/>
          Tracking: shared on WhatsApp after dispatch<br/>
          Support: +91 70033 69589
        </div>
      </div>
    </div>

    <div style="margin-top:18px;padding:12px 14px;border:1px dashed #fa5400;border-radius:10px;background:#f5f5f5">
      <div style="font-size:10px;letter-spacing:.18em;color:#fa5400;font-weight:700;text-transform:uppercase">Replacement Policy</div>
      <ol style="margin:6px 0 0 18px;padding:0;font-size:11px;color:#555;line-height:1.65">
        <li>Record a clear opening video of the parcel — required as proof.</li>
        <li>Replacement only for damaged/missing items shown in the opening video, or if wrong item/size is sent by us.</li>
        <li>No size-related returns after delivery — confirm size from our chart before dispatch.</li>
      </ol>
    </div>

    <div style="margin-top:14px;font-size:10.5px;color:#777;text-align:center">
      This is a computer-generated invoice and does not require a signature.
    </div>
  </div>
  <div class="ft">
    Thank you for shopping with <b style="color:#fa5400">CHECKMATE</b> · Wear Your Passion ❤️<br/>
    For any query: WhatsApp +91 70033 69589 · ${BRAND.email}
  </div>
</div>
<div class="no-print" style="text-align:center;margin:18px 0">
  <button onclick="window.print()" style="padding:10px 22px;background:#1a1a1a;color:#ffffff;border:1px solid #fa5400;border-radius:999px;font-weight:700;letter-spacing:.18em;cursor:pointer">PRINT / SAVE AS PDF</button>
</div>
</body></html>`;
    const w = window.open("", "_blank");
    if (w) { w.document.write(html); w.document.close(); }
  };

  return (
    <div className="p-5 sm:p-6">
      <div className="text-center">
        <div className="mx-auto size-14 rounded-full bg-[#1a7a3a] grid place-items-center text-white"><Check className="size-7" /></div>
        <div className="mt-3 font-display text-2xl font-semibold">Payment Received · Order Placed</div>
        <div className="mt-1 text-sm text-muted-foreground">Order number</div>
        <div className="mt-1 text-xl font-bold tracking-[0.18em] text-[#fa5400]">{orderNo}</div>
        <div className="mt-1 text-[11px] text-muted-foreground">{date}</div>
      </div>

      <div className="mt-5 rounded-xl border border-black/10 bg-[#f5f5f5] p-4 max-w-md mx-auto">
        <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Summary</div>
        <Row label={`${itemLine} · ${size} × ${qty}`} value={`₹${subtotal}`} />
        {printName && <Row label={`Printing · ${printName} #${printNumber}`} value={`₹${printingFee}`} />}
        <Row label="Shipping" value={shipping === 0 ? "Free" : `₹${shipping}`} />
        <Row label="Total Paid" value={`₹${total}`} strong />
        <div className="mt-2 text-[11px] text-muted-foreground leading-relaxed">
          <b>Ship to:</b> {name}, {address}, {city} — {pincode}<br/>
          <b>ETA:</b> {estDelivery} · Tracking on WhatsApp
        </div>
      </div>

      <div className="mt-5 flex flex-col sm:flex-row gap-2 justify-center max-w-md mx-auto">
        <button onClick={sendOnWhatsApp}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white"
          style={{ background: "#25D366", border: "1px solid #128C7E" }}>
          <MessageCircle className="size-4" /> Send Screenshot on WhatsApp
        </button>
        <button onClick={printInvoice}
          className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold uppercase tracking-[0.16em]"
          style={{ background: "#fa5400", color: "#ffffff", border: "1px solid #fa5400" }}>
          <Printer className="size-4" /> Invoice
        </button>
      </div>
      <div className="mt-2 text-center">
        <button onClick={onClose} className="text-xs text-muted-foreground hover:underline">Done</button>
      </div>

      <div className="mt-4 text-center text-[11px] text-muted-foreground px-4">
        Your order has already been sent on WhatsApp. Please share the payment screenshot so we can confirm dispatch.
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
        className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm focus:border-[#000000] focus:outline-none focus:ring-2 focus:ring-[#ffffff]/40" />
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
