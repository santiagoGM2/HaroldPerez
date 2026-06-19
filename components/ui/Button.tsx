import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "gold" | "ghost";

// El hover usa transiciones CSS, así que respeta prefers-reduced-motion
// automáticamente (definido en globals.css).
const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-navy text-white shadow-soft hover:bg-navy-deep hover:shadow-lift hover:-translate-y-px",
  gold: "bg-gold text-navy-deep shadow-gold hover:bg-gold-soft hover:-translate-y-px",
  ghost: "bg-transparent text-ink-soft hover:text-navy hover:bg-navy/[0.04]",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-[13px] px-6 py-3.5 text-[15px] font-semibold tracking-[-0.01em] transition-all duration-300 ease-out-quint active:translate-y-0 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none ${VARIANTS[variant]} ${className}`}
      {...props}
    />
  );
}
