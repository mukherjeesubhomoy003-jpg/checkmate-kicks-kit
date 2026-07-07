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
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,5,2,0.72) 0%, rgba(8,5,2,0.5) 45%, rgba(8,5,2,0.9) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 25%, rgba(250,84,0,0.35) 0, transparent 45%), radial-gradient(circle at 85% 80%, rgba(255,255,255,0.12) 0, transparent 50%)",
        }}
      />
    </div>
  );
}
