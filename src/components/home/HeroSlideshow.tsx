import { useEffect, useState } from "react";
import bootImg from "@/assets/hero-boot.png.asset.json";
import jerseyImg from "@/assets/hero-gold-jersey.png.asset.json";

const SLIDES = [bootImg.url, jerseyImg.url];

export function HeroSlideshow() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="absolute inset-0">
      {SLIDES.map((src, idx) => (
        <img
          key={src}
          src={src}
          alt=""
          fetchPriority={idx === 0 ? "high" : "low"}
          decoding="async"
          className="absolute inset-0 size-full object-cover transition-opacity duration-[1600ms] ease-in-out"
          style={{ opacity: i === idx ? 1 : 0, transform: i === idx ? "scale(1.04)" : "scale(1)", transition: "opacity 1.6s ease, transform 8s ease" }}
        />
      ))}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(8,5,2,0.78) 0%, rgba(8,5,2,0.55) 45%, rgba(8,5,2,0.92) 100%)" }} />
      <div aria-hidden className="absolute inset-0 opacity-50" style={{
        backgroundImage: "radial-gradient(circle at 15% 25%, rgba(212,175,55,0.55) 0, transparent 45%), radial-gradient(circle at 85% 80%, rgba(233,69,96,0.35) 0, transparent 50%)",
      }} />
      {/* slide dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {SLIDES.map((_, idx) => (
          <button key={idx} onClick={() => setI(idx)} aria-label={`Slide ${idx + 1}`}
            className="h-1.5 rounded-full transition-all"
            style={{ width: i === idx ? 28 : 10, background: i === idx ? "linear-gradient(90deg,#f4d77a,#b8862b)" : "rgba(255,255,255,0.4)" }} />
        ))}
      </div>
    </div>
  );
}
