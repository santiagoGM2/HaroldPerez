"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HAROLD, RESULT } from "@/lib/content";
import { HaroldAvatar } from "../HaroldAvatar";

// Análisis personalizado presentado como una nota del asesor: bloque crema con
// el encabezado de Harold y su firma. Estado de carga elegante (shimmer).
export function PersonalAnalysis({
  loading,
  text,
}: {
  loading: boolean;
  text: string;
}) {
  const reduce = useReducedMotion();
  const paragraphs = text ? text.split(/\n\n+/).filter((p) => p.trim()) : [];

  return (
    <div className="rounded-[16px] border border-navy/10 bg-cream p-6 sm:p-7">
      <div className="flex items-center gap-3">
        <HaroldAvatar size={40} />
        <div className="leading-tight">
          <p className="font-display text-[15.5px] font-semibold tracking-tightish text-navy-deep">
            {RESULT.analysisTitle}
          </p>
          <p className="mt-0.5 text-[10.5px] font-semibold uppercase tracking-eyebrow text-gold-deep">
            Nota de {HAROLD.name}
          </p>
        </div>
      </div>

      <div className="mt-5 h-px w-full bg-navy/[0.08]" />

      {loading ? (
        <div
          className="mt-5 space-y-2.5"
          aria-live="polite"
          aria-busy="true"
        >
          {[0.96, 0.84, 0.9, 0.62].map((w, i) => (
            <div
              key={i}
              className="skeleton-line h-3 animate-shimmer rounded"
              style={{ width: `${w * 100}%` }}
            />
          ))}
          <p className="pt-2 text-[12px] text-ink-faint">
            {RESULT.analysisLoading}…
          </p>
        </div>
      ) : (
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mt-5 space-y-3.5">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-[14px] leading-[1.7] text-ink">
                {p}
              </p>
            ))}
          </div>

          {/* Firma */}
          <div className="mt-6 flex items-center gap-3 border-t border-navy/[0.07] pt-4">
            <span className="h-px w-7 bg-gold" />
            <div>
              <p className="font-display text-[15px] font-semibold tracking-tightish text-navy-deep">
                {HAROLD.name}
              </p>
              <p className="mt-0.5 text-[11.5px] text-ink-soft">{HAROLD.role}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
