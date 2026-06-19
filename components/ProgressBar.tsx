"use client";

import { motion, useReducedMotion } from "framer-motion";

// Barra de progreso del quiz: avance en navy con un punto dorado en la punta.
export function ProgressBar({ value }: { value: number }) {
  const reduce = useReducedMotion();
  const pct = Math.max(0, Math.min(1, value)) * 100;
  const transition = reduce
    ? { duration: 0 }
    : { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div
      className="relative h-1.5 w-full rounded-full bg-navy/10"
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full bg-navy"
        initial={false}
        animate={{ width: `${pct}%` }}
        transition={transition}
      />
      {/* Detalle dorado en la punta del avance */}
      <motion.div
        className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold ring-2 ring-surface"
        initial={false}
        animate={{ left: `${pct}%` }}
        transition={transition}
      />
    </div>
  );
}
