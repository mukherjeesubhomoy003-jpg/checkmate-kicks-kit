import { Link } from "@tanstack/react-router";
import { ArrowRight, Trophy, Sparkles } from "lucide-react";

// Player Edition — Latest World Cup Collection.
// Photo slots are placeholders ready for the user's product photos.
// Replace `image` with the asset URL once uploaded.
const slots: Array<{ id: string; title: string; team: string; image?: string }> = [
  { id: "1", title: "Home Kit", team: "Argentina" },
  { id: "2", title: "Away Kit", team: "Brazil" },
  { id: "3", title: "Home Kit", team: "Portugal" },
  { id: "4", title: "Home Kit", team: "France" },
  { id: "5", title: "Away Kit", team: "Spain" },
  { id: "6", title: "Home Kit", team: "Germany" },
];

export function WorldCupSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Luxury white→cream backdrop with gold accents */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#fbf7ee] to-white" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #d4af37 0, transparent 40%), radial-gradient(circle at 80% 70%, #b8862b 0, transparent 45%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #d4af37, transparent)" }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #d4af37, transparent)" }}
      />

      <div className="container-x relative py-20 md:py-28 text-neutral-900">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{
              background: "linear-gradient(135deg, #fff8e1, #ffffff)",
              color: "#8a6a14",
              border: "1px solid #e6c976",
              boxShadow: "0 1px 0 #ffffff inset, 0 8px 24px -12px rgba(184,134,43,0.45)",
            }}
          >
            <Trophy className="size-3.5" /> Player Edition · Limited Drop
          </div>

          <h2 className="mt-6 font-display text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight">
            <span
              style={{
                backgroundImage: "linear-gradient(180deg, #1a1a1a 0%, #1a1a1a 55%, #8a6a14 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              World Cup
            </span>
            <br />
            <span
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #b8862b 0%, #f4d77a 35%, #d4af37 60%, #8a6a14 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Collection 2026
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-neutral-600">
            The latest player-edition jerseys — match-grade fabric, federation badges, heat-pressed numbers.
            Worn on the world's biggest stage. Crafted for the few.
          </p>

          <div
            className="mt-6 h-px w-28"
            style={{ background: "linear-gradient(90deg, transparent, #d4af37, transparent)" }}
          />
        </div>

        {/* Grid of player-edition pieces */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {slots.map((s, i) => (
            <article
              key={s.id}
              className="group relative overflow-hidden rounded-2xl bg-white"
              style={{
                border: "1px solid #ecdcae",
                boxShadow:
                  "0 1px 0 #ffffff inset, 0 30px 60px -30px rgba(138,106,20,0.35), 0 8px 24px -12px rgba(0,0,0,0.08)",
              }}
            >
              {/* Gold corner ribbon */}
              <div
                className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest"
                style={{
                  background: "linear-gradient(135deg, #b8862b, #f4d77a, #8a6a14)",
                  color: "#1a1a1a",
                  boxShadow: "0 6px 16px -8px rgba(184,134,43,0.6)",
                }}
              >
                <Sparkles className="size-3" /> Player Ed.
              </div>

              {/* Image / placeholder */}
              <div
                className="aspect-[4/5] w-full overflow-hidden"
                style={{
                  background:
                    "linear-gradient(160deg, #fdfaf0 0%, #f4ead0 60%, #ecdcae 100%)",
                }}
              >
                {s.image ? (
                  <img
                    src={s.image}
                    alt={`${s.team} ${s.title}`}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center">
                    <div className="text-center">
                      <Trophy
                        className="mx-auto size-12"
                        style={{ color: "#b8862b", opacity: 0.55 }}
                      />
                      <div className="mt-3 text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                        Photo {i + 1} · coming soon
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Caption */}
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    {s.title}
                  </div>
                  <div
                    className="mt-1 font-display text-lg font-bold"
                    style={{ color: "#1a1a1a" }}
                  >
                    {s.team}
                  </div>
                </div>
                <div
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: "#8a6a14" }}
                >
                  2026 ✦
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 flex flex-col items-center gap-4">
          <Link
            to="/shop"
            search={{ q: "world cup" } as never}
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold uppercase tracking-[0.18em] transition-transform hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #1a1a1a, #2b2b2b)",
              color: "#f4d77a",
              border: "1px solid #d4af37",
              boxShadow:
                "0 1px 0 #d4af37 inset, 0 18px 40px -16px rgba(184,134,43,0.6)",
            }}
          >
            Shop the Collection <ArrowRight className="size-4" />
          </Link>
          <div className="text-[11px] uppercase tracking-[0.25em] text-neutral-500">
            Authentic · Match-grade · Limited stock
          </div>
        </div>
      </div>
    </section>
  );
}
