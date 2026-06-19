import { Check, Minus } from "lucide-react";
import { BENEFITS, RESULT } from "@/lib/content";
import { SystemIcon } from "../ui/SystemIcon";
import type { Dimension, SystemStatus } from "@/lib/types";

// Icono correspondiente a cada sistema (reutiliza el mapeo de los beneficios).
function iconFor(dimension: Dimension): string {
  return BENEFITS.find((b) => b.dimension === dimension)?.iconName ?? "TrendingUp";
}

// Estado de los 6 sistemas en grilla editorial con líneas finas (sin tarjetas
// con sombra). Fortaleza en navy/dorado, brecha apagada.
export function SystemsGrid({ systems }: { systems: SystemStatus[] }) {
  return (
    <div>
      <h3 className="font-display text-[20px] font-semibold tracking-tightish text-navy-deep">
        {RESULT.systemsTitle}
      </h3>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2">
        {systems.map((s, i) => {
          const isRight = i % 2 === 1;
          return (
            <div
              key={s.dimension}
              className={`flex items-center gap-3 border-t border-navy/[0.08] py-3.5 ${
                isRight ? "sm:border-l sm:border-navy/[0.08] sm:pl-7" : "sm:pr-7"
              }`}
            >
              <SystemIcon
                name={iconFor(s.dimension)}
                className={`h-[18px] w-[18px] shrink-0 ${
                  s.isStrength ? "text-blue" : "text-ink-faint"
                }`}
              />
              <p
                className={`flex-1 text-[13.5px] font-semibold ${
                  s.isStrength ? "text-navy-deep" : "text-ink-soft"
                }`}
              >
                {s.label}
              </p>
              <span
                className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                  s.isStrength ? "text-gold-deep" : "text-ink-faint"
                }`}
              >
                {s.isStrength ? (
                  <Check className="h-3.5 w-3.5" strokeWidth={2.6} />
                ) : (
                  <Minus className="h-3.5 w-3.5" strokeWidth={2.6} />
                )}
                {s.isStrength ? RESULT.systemsStrength : RESULT.systemsGap}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
