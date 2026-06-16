import { useState } from "react";
import { Quote, Star, Send } from "lucide-react";

const WHATSAPP_NUMBER = "917003369589";

const REVIEWS: { text: string; name: string; tag?: string }[] = [
  { text: "Quality khub bhalo… ar ekdom perfect size. Visça Barca 💙❤️", name: "Subho", tag: "Barcelona Home" },
  { text: "Top quality, very comfortable — worth every penny spent ❤️", name: "Atri Da", tag: "Repeat Buyer" },
  { text: "Bohut accha product hai ❤️ Khushi ho gayi.", name: "Rohit", tag: "Verified Buyer" },
  { text: "Excellent quality, perfect fittings. Fully satisfied.", name: "Suman", tag: "Verified Buyer" },
  { text: "Truly satisfied by this quality, perfect fittings — paisa vasool 😎", name: "Arnab", tag: "Repeat Buyer" },
  { text: "Wow quality 😍 fully satisfied… Ese gache ❤️❤️❤️", name: "Indrajit", tag: "Verified Buyer" },
  { text: "Great quality in this price range — value for money 🔥", name: "Anik", tag: "First-time Buyer" },
  { text: "Nice quality bro, exactly like the photos.", name: "Sayan", tag: "Verified Buyer" },
  { text: "Detailing good, fabric soft, fits perfect.", name: "Manas", tag: "Verified Buyer" },
  { text: "Cool future superhero vibe — simple, stylish and powerful 🔥", name: "Yamal Fan", tag: "Lamine Yamal #19" },
  { text: "Loved the fit and the quality. Will order again.", name: "Aritra", tag: "Verified Buyer" },
  { text: "Jersey quality khub bhalo 👌 Ankush bhaiya solid kaam.", name: "Soumen", tag: "Verified Buyer" },
  { text: "Bhai sahab… ki quality bhai etar ❤️", name: "Rik", tag: "Verified Buyer" },
  { text: "Got the masterpiece! Packaging bhi premium.", name: "Debojit", tag: "Verified Buyer" },
  { text: "Very good quality 🖤 happy customer.", name: "Niladri", tag: "Verified Buyer" },
];

export function HappyCustomers() {
  return (
    <section className="relative bg-[#fbf7ee] border-y border-gold/30 overflow-hidden">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px hairline-gold" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px hairline-gold" />
      <div className="container-x py-16 md:py-20">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#8a6a14]"
            style={{ background: "linear-gradient(135deg,#fff8e1,#ffffff)", border: "1px solid #e6c976" }}>
            <Star className="size-3.5 fill-[#d4af37] text-[#d4af37]" /> Our Happy Customers
          </div>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold tracking-tight">
            <span style={{ backgroundImage: "linear-gradient(180deg,#1a1a1a 0%,#1a1a1a 55%,#8a6a14 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              Real reviews from
            </span>{" "}
            <span style={{ backgroundImage: "var(--gradient-gold)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              the CHECKMATE family
            </span>
          </h2>
          <p className="mt-3 text-sm text-neutral-600 max-w-xl mx-auto">
            Straight from WhatsApp — unedited words from buyers across India.
          </p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REVIEWS.map((r, i) => (
            <figure key={i} className="relative rounded-2xl bg-white p-5 shadow-luxe border border-gold/30">
              <Quote className="absolute right-3 top-3 size-5 text-[#d4af37]/40" />
              <div className="flex items-center gap-0.5 text-[#d4af37]">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="size-3.5 fill-current" />
                ))}
              </div>
              <blockquote className="mt-3 text-[14px] leading-relaxed text-neutral-800">
                "{r.text}"
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <div className="size-9 rounded-full grid place-items-center text-xs font-bold text-[#8a6a14]"
                  style={{ background: "linear-gradient(135deg,#fff8e1,#fbf4dd)", border: "1px solid #e6c976" }}>
                  {r.name.slice(0, 1).toUpperCase()}
                </div>
                <div className="text-xs">
                  <div className="font-semibold text-neutral-900">{r.name}</div>
                  {r.tag && <div className="text-neutral-500">{r.tag}</div>}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <AddReview />

        <div className="mt-10 text-center text-[11px] uppercase tracking-[0.25em] text-neutral-500">
          1000+ jerseys delivered · Pan-India
        </div>
      </div>
    </section>
  );
}

function AddReview() {
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    const stars = "⭐".repeat(rating);
    const msg = [
      "*New Customer Review for CHECKMATE* 👑",
      "",
      `*Name:* ${name}`,
      team ? `*Jersey:* ${team}` : null,
      `*Rating:* ${stars} (${rating}/5)`,
      "",
      `"${text}"`,
      "",
      "_Submitted from checkmatenow.online_",
    ].filter(Boolean).join("\n");
    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
    setName(""); setTeam(""); setText(""); setRating(5);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="mt-12">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-6 md:p-8 shadow-luxe border border-gold/40">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8a6a14]"
            style={{ background: "linear-gradient(135deg,#fff8e1,#ffffff)", border: "1px solid #e6c976" }}>
            <Star className="size-3 fill-[#d4af37] text-[#d4af37]" /> Share Your Experience
          </div>
          <h3 className="mt-3 font-display text-2xl md:text-3xl font-bold tracking-tight">
            Loved your jersey? <span style={{ backgroundImage: "var(--gradient-gold)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Drop a review</span>
          </h3>
          <p className="mt-2 text-xs text-neutral-600">
            Your review goes straight to our WhatsApp — we'll feature it here.
          </p>
        </div>

        <form onSubmit={submit} className="mt-6 grid gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-700">Your Name *</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g. Rohit"
                className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2.5 text-sm focus:border-[#d4af37] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/30"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-700">Jersey Bought</label>
              <input
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                placeholder="e.g. Argentina Messi #10"
                className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2.5 text-sm focus:border-[#d4af37] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/30"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-700">Your Rating</label>
            <div className="mt-2 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  aria-label={`${n} star${n > 1 ? "s" : ""}`}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star className={`size-7 ${n <= rating ? "fill-[#d4af37] text-[#d4af37]" : "text-neutral-300"}`} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-700">Your Review *</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              rows={4}
              placeholder="How was the quality, fit & delivery?"
              className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2.5 text-sm focus:border-[#d4af37] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/30 resize-none"
            />
          </div>

          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-black shadow-luxe transition-transform hover:scale-[1.01] active:scale-[0.99]"
            style={{ background: "var(--gradient-gold)" }}
          >
            <Send className="size-4" />
            {sent ? "Sent! Thank you 🙏" : "Send Review via WhatsApp"}
          </button>
        </form>
      </div>
    </div>
  );
}
