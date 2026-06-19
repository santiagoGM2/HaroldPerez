import { AlertCircle, Check } from "lucide-react";
import { STAGES } from "@/lib/stages";
import { RESULT } from "@/lib/content";
import type { StageKey } from "@/lib/types";

// Costos ocultos de la etapa actual en un bloque crema con peso visual, para
// generar urgencia. Si la empresa ya es 4.0, mostramos lo que está logrando.
export function HiddenCosts({ stageKey }: { stageKey: StageKey }) {
  const stage = STAGES[stageKey];
  const isTop = stageKey === "4.0";
  const items = isTop ? stage.achievements ?? [] : stage.hiddenCosts;

  return (
    <div>
      <h3 className="font-display text-[20px] font-semibold tracking-tightish text-navy-deep">
        {isTop ? RESULT.achievementsTitle : RESULT.hiddenCostsTitle}
      </h3>

      <div
        className={`mt-4 rounded-[14px] border bg-cream p-5 sm:p-6 ${
          isTop ? "border-sage/30" : "border-amber/30"
        }`}
      >
        <ul className="space-y-3.5">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              {isTop ? (
                <Check
                  className="mt-[2px] h-[17px] w-[17px] shrink-0 text-sage"
                  strokeWidth={2.2}
                />
              ) : (
                <AlertCircle
                  className="mt-[2px] h-[17px] w-[17px] shrink-0 text-amber"
                  strokeWidth={2}
                />
              )}
              <span className="text-[13.5px] leading-[1.55] text-ink">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
