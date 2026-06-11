export const inr = (v: number | string | null | undefined) => {
  const n = typeof v === "string" ? parseFloat(v) : (v ?? 0);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(n) ? n : 0);
};

export const firstImage = (images: unknown, fallback = "/placeholder.svg"): string => {
  if (Array.isArray(images) && images.length > 0 && typeof images[0] === "string") return images[0];
  return fallback;
};
