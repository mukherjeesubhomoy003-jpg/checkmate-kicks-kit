import promo from "@/assets/hero-promo.mp4.asset.json";

export function HeroSlideshow() {
  return (
    <div className="absolute inset-0">
      <video
        src={promo.url}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 size-full object-cover"
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
            "radial-gradient(circle at 15% 25%, rgba(212,175,55,0.5) 0, transparent 45%), radial-gradient(circle at 85% 80%, rgba(233,69,96,0.3) 0, transparent 50%)",
        }}
      />
    </div>
  );
}
