import { useEffect, useState } from "react";

type Props = {
  images: string[];
  alt: string;
  className?: string;
  /** ms between auto-rotations. 0 disables auto rotation. */
  interval?: number;
  showDots?: boolean;
};

/**
 * Auto-rotating product image with manual dots + prev/next affordances.
 * Used for multi-photo drops (front / back / crest detail sets).
 */
export function RotatingImage({ images, alt, className = "", interval = 2600, showDots = true }: Props) {
  const pics = images.length ? images : [""];
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (pics.length < 2 || !interval || paused) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % pics.length), interval);
    return () => window.clearInterval(t);
  }, [pics.length, interval, paused]);

  return (
    <div
      className="relative size-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {pics.map((src, idx) => (
        <img
          key={src + idx}
          src={src}
          alt={idx === 0 ? alt : `${alt} — view ${idx + 1}`}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${
            idx === i ? "opacity-100" : "opacity-0"
          } ${className}`}
        />
      ))}

      {pics.length > 1 && showDots && (
        <div className="absolute inset-x-0 bottom-1.5 z-20 flex items-center justify-center gap-1.5">
          {pics.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`View photo ${idx + 1}`}
              onClick={(e) => {
                e.stopPropagation();
                setI(idx);
              }}
              className={`h-1.5 rounded-full transition-all ${
                idx === i ? "w-4 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}

      {pics.length > 1 && (
        <div className="absolute right-1.5 bottom-2 z-20 rounded-full bg-black/60 px-1.5 py-0.5 text-[9px] font-bold text-white tabular-nums">
          {i + 1}/{pics.length}
        </div>
      )}
    </div>
  );
}
