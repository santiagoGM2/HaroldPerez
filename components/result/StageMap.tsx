import { STAGE_ORDER } from "@/lib/stages";
import { RESULT } from "@/lib/content";
import type { StageKey } from "@/lib/types";

// Mapa de las 4 etapas. Resalta dónde está el usuario y deja claro que el
// destino es siempre la 4.0 (no "la siguiente etapa").
export function StageMap({ current }: { current: StageKey }) {
  const currentIdx = STAGE_ORDER.indexOf(current);
  const fillPct = (currentIdx / (STAGE_ORDER.length - 1)) * 100;

  return (
    <div>
      <h3 className="font-display text-[20px] font-semibold tracking-tightish text-navy-deep">
        {RESULT.stageMapTitle}
      </h3>

      <div className="relative mt-7 flex items-start justify-between">
        {/* Línea base */}
        <div className="absolute inset-x-4 top-[15px] h-[2px] -translate-y-1/2 rounded-full bg-navy/12" />
        {/* Tramo recorrido hasta la etapa actual */}
        <div
          className="absolute left-4 top-[15px] h-[2px] -translate-y-1/2 rounded-full bg-gradient-to-r from-navy-deep to-blue"
          style={{ width: `calc((100% - 2rem) * ${fillPct / 100})` }}
        />

        {STAGE_ORDER.map((stage, idx) => {
          const reached = idx <= currentIdx;
          const isCurrent = idx === currentIdx;
          const isGoal = stage === "4.0";

          let circleClass: string;
          if (isGoal) {
            circleClass = "bg-gold text-navy-deep shadow-gold";
          } else if (reached) {
            circleClass = "bg-navy-deep text-white";
          } else {
            circleClass = "border border-navy/15 bg-surface text-ink-faint";
          }

          return (
            <div
              key={stage}
              className="relative z-10 flex w-1/4 flex-col items-center gap-2"
            >
              <span
                className={`num flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold transition-transform ${circleClass} ${
                  isCurrent ? "scale-110 ring-[3px] ring-gold ring-offset-2" : ""
                }`}
              >
                {stage}
              </span>
              <span className="text-center text-[10.5px] font-medium leading-tight text-ink-faint">
                PyME&nbsp;{stage}
              </span>
              {isCurrent && (
                <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-navy-deep">
                  Estás aquí
                </span>
              )}
              {isGoal && !isCurrent && (
                <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-gold-deep">
                  {RESULT.stageMapGoalLabel}
                </span>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
