import logo from "@/assets/checkmate-logo.asset.json";

export function Logo({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <img
      src={logo.url}
      alt="Checkmate — Wear Your Passion"
      width={120}
      height={36}
      className={className}
      style={{ objectFit: "contain" }}
    />
  );
}
