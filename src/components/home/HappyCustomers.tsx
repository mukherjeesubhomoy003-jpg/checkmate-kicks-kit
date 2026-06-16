import { Quote, Star } from "lucide-react";

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

        <div className="mt-10 text-center text-[11px] uppercase tracking-[0.25em] text-neutral-500">
          1000+ jerseys delivered · Pan-India
        </div>
      </div>
    </section>
  );
}
