import promo from "@/assets/hero-promo.mp4.asset.json";
import poster from "@/assets/argentina-messi.jpg.asset.json";
import { useEffect, useRef, useState } from "react";

export function HeroSlideshow() {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const onCanPlay = () => setReady(true);
    v.addEventListener("canplay", onCanPlay);
    // Start immediately — no idle deferral
    v.play().catch(() => {});
    return () => v.removeEventListener("canplay", onCanPlay);
  }, []);

  return (
    <div className="absolute inset-0">
      {/* Poster shown until video first frame is ready */}
      <img
        src={poster.url}
        alt=""
        aria-hidden
        className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${ready ? "opacity-0" : "opacity-100"}`}
      />
      <video
        ref={ref}
        src={promo.url}
        poster={poster.url}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
      />
      {/* WC FINAL — Argentina sky-blue × Spain red × trophy gold overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,10,28,0.78) 0%, rgba(8,8,14,0.55) 45%, rgba(4,4,6,0.94) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-70 mix-blend-screen"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 22%, rgba(117,170,219,0.38) 0, transparent 42%), radial-gradient(circle at 88% 78%, rgba(198,11,30,0.34) 0, transparent 45%), radial-gradient(circle at 50% 100%, rgba(255,196,0,0.20) 0, transparent 55%)",
        }}
      />
      {/* Flag ribbon — Argentina (blue/white/blue) × Spain (red/gold/red) */}
      <div aria-hidden className="absolute top-0 left-0 right-0 h-1.5 flex z-[2]">
        <div className="flex-1 bg-[#75AADB]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#75AADB]" />
        <div className="flex-1 bg-[#AA151B]" />
        <div className="flex-1 bg-[#F1BF00]" />
        <div className="flex-1 bg-[#AA151B]" />
      </div>
    </div>
  );
}
