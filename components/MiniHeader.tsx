import { HAROLD } from "@/lib/content";
import { HaroldAvatar } from "./HaroldAvatar";

// Mini-header persistente durante el quiz y el resultado: sostiene la presencia
// de la marca personal y la autoridad de Harold.
export function MiniHeader() {
  return (
    <header className="flex items-center gap-3 border-b border-navy/[0.08] bg-surface px-6 py-3.5 sm:px-8">
      <HaroldAvatar size={40} />
      <div className="leading-tight">
        <p className="font-display text-[15px] font-semibold text-navy-deep">
          {HAROLD.name}
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-eyebrow text-gold-deep">
          Diagnóstico PYMES 4.0
        </p>
      </div>
    </header>
  );
}
