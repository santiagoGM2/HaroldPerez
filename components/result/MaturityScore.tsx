"use client";

import { useEffect, useState } from "react";
import { animate, motion, useReducedMotion } from "framer-motion";
import { RESULT } from "@/lib/content";

// Protagonista del resultado: el Índice de Madurez como un número muy grande en
// Fraunces, con una barra fina dorada determinada y conteo animado.
export function MaturityScore({ value }: { value: number }) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [value, reduce]);

  return (
    <div>
      <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-gold-deep">
        {RESULT.maturityTitle}
      </p>

      <div className="mt-3 flex items-end gap-2.5">
        <span className="num font-display text-[70px] font-medium leading-[0.82] tracking-tightish text-navy-deep sm:text-[78px]">
          {display}
        </span>
        <span className="num mb-2.5 font-display text-[21px] text-ink-faint">
          / 100
        </span>
      </div>

      {/* Barra fina dorada */}
      <div className="mt-5 h-[6px] w-full overflow-hidden rounded-full bg-navy/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-gold-deep to-gold"
          initial={reduce ? false : { width: 0 }}
          animate={{ width: `${Math.max(0, Math.min(100, value))}%` }}
          transition={
            reduce ? { duration: 0 } : { duration: 1.4, ease: [0.22, 1, 0.36, 1] }
          }
        />
      </div>

      <p className="mt-3.5 text-[12.5px] leading-snug text-ink-soft">
        {RESULT.maturitySubtitle}
      </p>
    </div>
  );
}
