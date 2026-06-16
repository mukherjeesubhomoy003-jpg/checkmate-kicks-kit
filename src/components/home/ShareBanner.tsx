import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Copy, Check, Share2, MessageCircle, ArrowRight, Globe } from "lucide-react";

const SITE_URL = "https://checkmatenow.online";

const WHATSAPP_MESSAGE =
  "🔥 *CHECKMATE Jersey* — Player Edition World Cup 2026\n\n" +
  "Home kit ₹1000 | Away kit ₹1100 | Free shipping all India 🚚\n" +
  "Special: Argentina Messi #10 Player Version ₹1299\n\n" +
  "*How to order:*\n" +
  "1️⃣ Open link → browse 46+ jerseys\n" +
  "2️⃣ Tap jersey → pick size, kit, qty\n" +
  "3️⃣ Tap *Order on WhatsApp* → pay via UPI\n" +
  "4️⃣ Send payment screenshot → we ship pan-India 📦\n\n" +
  "🔗 " + SITE_URL + "\n\n" +
  "No COD — UPI only | All sizes: S, M, L, XL, 2XL";

export function ShareBanner() {
  const [copied, setCopied] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(SITE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = SITE_URL;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareText = encodeURIComponent(WHATSAPP_MESSAGE);

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${shareText}`, "_blank", "noopener,noreferrer");
  };

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(WHATSAPP_MESSAGE);
      setCopiedMsg(true);
      setTimeout(() => setCopiedMsg(false), 2500);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = WHATSAPP_MESSAGE;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopiedMsg(true);
      setTimeout(() => setCopiedMsg(false), 2500);
    }
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0" style={{
        background: "linear-gradient(135deg, #0b1733 0%, #0a1228 50%, #0b1733 100%)"
      }} />
      <div aria-hidden className="absolute inset-0 opacity-20" style={{
        backgroundImage: "radial-gradient(circle at 20% 30%, #d4af37 0, transparent 45%), radial-gradient(circle at 80% 70%, #75aadb 0, transparent 40%)"
      }} />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px hairline-gold" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px hairline-gold" />

      <div className="container-x relative py-14 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em]"
            style={{ background: "linear-gradient(135deg,#e94560,#b8862b)", color: "#fff", border: "1px solid #d4af37", boxShadow: "0 10px 30px -10px rgba(233,69,96,0.6)" }}>
            <Share2 className="size-3.5" /> Share with friends
          </div>

          <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold leading-tight text-white">
            Spread the Passion —{" "}
            <span style={{ backgroundImage: "var(--gradient-gold)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              Share CHECKMATE
            </span>
          </h2>

          <p className="mt-3 max-w-lg mx-auto text-sm text-neutral-300">
            Found your perfect jersey? Let your friends know — they can browse, pick, and order in under 2 minutes.
          </p>

          {/* Domain card */}
          <div className="mt-8 mx-auto max-w-xl rounded-2xl bg-white/10 backdrop-blur-md border border-gold/40 p-5 md:p-6">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 flex-1 w-full">
                <Globe className="size-4 text-[#8a6a14] shrink-0" />
                <span className="text-sm font-semibold text-neutral-800 tracking-wide truncate">checkmatenow.online</span>
              </div>
              <button onClick={copyLink}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-bold uppercase tracking-wider transition-transform hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
                style={{ background: "var(--gradient-gold)", color: "#1a1a1a", border: "1px solid #8a6a14" }}>
                {copied ? <><Check className="size-3.5" /> Copied</> : <><Copy className="size-3.5" /> Copy Link</>}
              </button>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              <div className="flex items-start gap-2.5 rounded-xl bg-white/10 px-3 py-3 border border-white/10">
                <div className="mt-0.5 size-5 rounded-full grid place-items-center text-[10px] font-bold" style={{ background: "var(--gradient-gold)", color: "#1a1a1a" }}>1</div>
                <div>
                  <div className="text-xs font-semibold text-white">Open the link</div>
                  <div className="text-[11px] text-neutral-400">Browse all 46+ player-edition jerseys</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5 rounded-xl bg-white/10 px-3 py-3 border border-white/10">
                <div className="mt-0.5 size-5 rounded-full grid place-items-center text-[10px] font-bold" style={{ background: "var(--gradient-gold)", color: "#1a1a1a" }}>2</div>
                <div>
                  <div className="text-xs font-semibold text-white">Tap any jersey</div>
                  <div className="text-[11px] text-neutral-400">Select size, kit & quantity</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5 rounded-xl bg-white/10 px-3 py-3 border border-white/10">
                <div className="mt-0.5 size-5 rounded-full grid place-items-center text-[10px] font-bold" style={{ background: "var(--gradient-gold)", color: "#1a1a1a" }}>3</div>
                <div>
                  <div className="text-xs font-semibold text-white">Order on WhatsApp</div>
                  <div className="text-[11px] text-neutral-400">Pay via UPI — we ship pan-India</div>
                </div>
              </div>
            </div>

            {/* WhatsApp copy-paste message */}
            <div className="mt-6 rounded-xl bg-[#0a1228] border border-[#d4af37]/40 p-4 text-left">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f4d77a]">Copy & paste in WhatsApp</span>
                <button onClick={copyMessage}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition hover:scale-[1.02]"
                  style={{ background: copiedMsg ? "#25D366" : "var(--gradient-gold)", color: copiedMsg ? "#fff" : "#1a1a1a" }}>
                  {copiedMsg ? <><Check className="size-3" /> Copied</> : <><Copy className="size-3" /> Copy Text</>}
                </button>
              </div>
              <pre className="mt-3 whitespace-pre-wrap text-[12px] leading-relaxed text-neutral-200 font-sans"
                style={{ wordBreak: "break-word" }}>{WHATSAPP_MESSAGE}</pre>
            </div>
          </div>

          {/* Share actions */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button onClick={shareWhatsApp}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-wider transition-transform hover:-translate-y-0.5"
              style={{ background: "#25D366", color: "#fff", boxShadow: "0 12px 32px -12px rgba(37,211,102,0.6)" }}>
              <MessageCircle className="size-4" /> Share on WhatsApp
            </button>
            <Link to="/"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-wider border border-gold/60 text-white hover:bg-white/10 transition">
              <ArrowRight className="size-4 text-[#f4d77a]" /> Back to Store
            </Link>
          </div>

          <p className="mt-5 text-[11px] text-neutral-400 tracking-wide">
            Free shipping · All-India delivery · No COD — UPI only
          </p>
        </div>
      </div>
    </section>
  );
}
