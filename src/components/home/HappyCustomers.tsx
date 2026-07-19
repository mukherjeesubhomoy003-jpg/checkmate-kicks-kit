import { useState } from "react";
import { Quote, Star, Send, Trophy } from "lucide-react";

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
    <section className="relative overflow-hidden bg-[#050814] text-white">
      {/* WC final gradient glows */}
      <div aria-hidden className="absolute inset-0 opacity-60" style={{
        backgroundImage: "radial-gradient(circle at 12% 15%, rgba(117,170,219,0.28) 0, transparent 45%), radial-gradient(circle at 88% 85%, rgba(170,21,27,0.28) 0, transparent 50%), radial-gradient(circle at 50% 50%, rgba(241,191,0,0.10) 0, transparent 60%)",
      }} />
      {/* Flag ribbon */}
      <div aria-hidden className="relative h-1 w-full flex">
        <div className="flex-1 bg-[#75AADB]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#75AADB]" />
        <div className="flex-1 bg-[#AA151B]" />
        <div className="flex-1 bg-[#F1BF00]" />
        <div className="flex-1 bg-[#AA151B]" />
      </div>

      <div className="container-x relative py-16 md:py-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 border border-[#F1BF00]/60 bg-gradient-to-r from-[#75AADB]/15 via-white/5 to-[#AA151B]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-[#F1BF00]">
            <Trophy className="size-3.5" /> Final Day Reviews
          </div>
          <h2 className="mt-4 font-bebas text-4xl md:text-6xl leading-[0.9] tracking-tight uppercase">
            Straight from the <span className="bg-gradient-to-r from-[#75AADB] via-[#F1BF00] to-[#AA151B] bg-clip-text text-transparent">CHECKMATE family.</span>
          </h2>
          <p className="mt-3 text-sm text-neutral-400 max-w-xl mx-auto">
            Unedited words from buyers across India — copied straight from WhatsApp.
          </p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REVIEWS.map((r, i) => {
            const accents = [
              { border: "hover:border-[#75AADB]/60", quote: "text-[#75AADB]/50", star: "text-[#75AADB]", avatar: "bg-[#75AADB]" },
              { border: "hover:border-[#F1BF00]/60", quote: "text-[#F1BF00]/50", star: "text-[#F1BF00]", avatar: "bg-[#F1BF00] text-black" },
              { border: "hover:border-[#AA151B]/60", quote: "text-[#AA151B]/60", star: "text-[#AA151B]", avatar: "bg-[#AA151B]" },
            ];
            const a = accents[i % 3];
            return (
              <figure key={i} className={`group relative rounded-2xl bg-[#0f1424] p-5 border border-white/10 ${a.border} transition`}>
                <Quote className={`absolute right-3 top-3 size-5 ${a.quote}`} />
                <div className={`flex items-center gap-0.5 ${a.star}`}>
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="size-3.5 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-3 text-[14px] leading-relaxed text-neutral-200">
                  "{r.text}"
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <div className={`size-9 rounded-full grid place-items-center text-xs font-bold text-white ${a.avatar}`}>
                    {r.name.slice(0, 1).toUpperCase()}
                  </div>
                  <div className="text-xs">
                    <div className="font-semibold text-white">{r.name}</div>
                    {r.tag && <div className="text-neutral-500">{r.tag}</div>}
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>

        <AddReview />

        <div className="mt-10 text-center text-[11px] uppercase tracking-[0.25em] text-neutral-500">
          🏆 1000+ jerseys delivered · Final Day Live
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
      <div className="mx-auto max-w-2xl rounded-3xl bg-[#141414] p-6 md:p-8 border border-white/10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 border border-[#fa5400] bg-[#fa5400]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#fa5400]">
            Share your experience
          </div>
          <h3 className="mt-3 font-bebas text-2xl md:text-3xl uppercase tracking-wide">
            Drop your <span className="text-[#fa5400]">review.</span>
          </h3>
          <p className="mt-1 text-xs text-neutral-500">Sends to our WhatsApp — we post it here after verification.</p>
        </div>
        <form onSubmit={submit} className="mt-5 grid gap-3 sm:grid-cols-2">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name"
            className="rounded-md border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-[#fa5400] focus:outline-none" />
          <input value={team} onChange={(e) => setTeam(e.target.value)} placeholder="Jersey (optional)"
            className="rounded-md border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-[#fa5400] focus:outline-none" />
          <div className="sm:col-span-2 flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-neutral-500">Rating</span>
            {[1,2,3,4,5].map((n) => (
              <button key={n} type="button" onClick={() => setRating(n)}
                className={`p-1 ${n <= rating ? "text-[#fa5400]" : "text-neutral-700"}`}>
                <Star className="size-5 fill-current" />
              </button>
            ))}
          </div>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} placeholder="Your review…"
            className="sm:col-span-2 rounded-md border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-[#fa5400] focus:outline-none" />
          <button type="submit" disabled={sent}
            className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#fa5400] px-4 py-3 text-xs font-bold uppercase tracking-[0.22em] text-white hover:bg-[#e64a00] disabled:opacity-60">
            <Send className="size-4" /> {sent ? "Sent — thank you!" : "Send review on WhatsApp"}
          </button>
        </form>
      </div>
    </div>
  );
}
