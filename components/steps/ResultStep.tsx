"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { STAGES } from "@/lib/stages";
import { RESULT } from "@/lib/content";
import type { DiagnosticResult, LeadData } from "@/lib/types";
import { MaturityScore } from "../result/MaturityScore";
import { StageMap } from "../result/StageMap";
import { SystemsGrid } from "../result/SystemsGrid";
import { HiddenCosts } from "../result/HiddenCosts";
import { PersonalAnalysis } from "../result/PersonalAnalysis";
import { FinalCta } from "../result/FinalCta";

export function ResultStep({
  result,
  lead,
  analysisLoading,
  analysisText,
}: {
  result: DiagnosticResult;
  lead: LeadData;
  analysisLoading: boolean;
  analysisText: string;
}) {
  const reduce = useReducedMotion();
  const stage = STAGES[result.stageKey];
  const firstName = lead.name.trim().split(" ")[0] || "empresario";

  const container: Variants = {
    hidden: {},
    show: {
      transition: reduce ? {} : { staggerChildren: 0.1, delayChildren: 0.04 },
    },
  };
  const item: Variants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-9 px-7 py-9 sm:px-10 sm:py-10"
    >
      {/* Protagonista: saludo + Índice de Madurez */}
      <motion.div variants={item}>
        <p className="font-display text-[19px] font-medium tracking-tightish text-navy-deep">
          Hola, {firstName}.
        </p>
        <div className="mt-6">
          <MaturityScore value={result.maturityIndex} />
        </div>
      </motion.div>

      {/* Tarjeta de etapa */}
      <motion.div
        variants={item}
        className="overflow-hidden rounded-[20px] bg-gradient-to-br from-navy to-navy-deep p-6 text-white shadow-soft sm:p-7"
      >
        <span className="inline-flex items-center rounded-full border border-gold/30 bg-gold/[0.12] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-gold-soft">
          PyME {result.stageKey}
        </span>
        <h2 className="mt-4 font-display text-[24px] font-medium leading-tight tracking-tightish text-white">
          {stage.title}
        </h2>
        <p className="mt-3 text-[13.5px] leading-[1.6] text-white/75">
          {stage.description}
        </p>
      </motion.div>

      {/* Mapa de etapas */}
      <motion.div variants={item}>
        <StageMap current={result.stageKey} />
      </motion.div>

      {/* Estado de los 6 sistemas */}
      <motion.div variants={item}>
        <SystemsGrid systems={result.systems} />
      </motion.div>

      {/* Costos ocultos */}
      <motion.div variants={item}>
        <HiddenCosts stageKey={result.stageKey} />
      </motion.div>

      {/* Análisis personalizado (nota del asesor) */}
      <motion.div variants={item}>
        <PersonalAnalysis loading={analysisLoading} text={analysisText} />
      </motion.div>

      {/* CTA final hacia WhatsApp */}
      <motion.div variants={item}>
        <FinalCta name={lead.name} stageKey={result.stageKey} />
      </motion.div>
    </motion.div>
  );
}
