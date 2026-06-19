"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { computeResult } from "@/lib/scoring";
import { STAGES } from "@/lib/stages";
import { buildFallbackAnalysis } from "@/lib/analysis-fallback";
import type {
  Answers,
  AnalyzePayload,
  DiagnosticResult,
  LeadData,
} from "@/lib/types";
import { MiniHeader } from "./MiniHeader";
import { IntroStep } from "./steps/IntroStep";
import { QuizStep } from "./steps/QuizStep";
import { LeadStep } from "./steps/LeadStep";
import { ResultStep } from "./steps/ResultStep";

type Step = "intro" | "quiz" | "lead" | "result";

const EMPTY_LEAD: LeadData = {
  name: "",
  company: "",
  email: "",
  whatsapp: "",
  companySize: "",
  mainPain: "",
  painDetail: "",
};

export function DiagnosticApp() {
  const reduce = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<Answers>({});
  const [lead, setLead] = useState<LeadData>(EMPTY_LEAD);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisText, setAnalysisText] = useState("");

  // Al cambiar de paso, vuelve el scroll interno al inicio.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [step]);

  // Pide el análisis al servidor; si falla o no hay key, usa el fallback local.
  async function fetchAnalysis(res: DiagnosticResult, leadData: LeadData) {
    setAnalysisLoading(true);
    setAnalysisText("");

    const payload: AnalyzePayload = {
      name: leadData.name,
      company: leadData.company,
      companySize: leadData.companySize,
      stageKey: res.stageKey,
      stageTitle: STAGES[res.stageKey].title,
      maturityIndex: res.maturityIndex,
      mainPain: leadData.mainPain,
      painDetail: leadData.painDetail,
      strengths: res.strengths.map((s) => s.label),
      gaps: res.gaps.map((s) => s.label),
    };

    let text = "";
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const data = (await response.json()) as { analysis?: string | null };
        if (data?.analysis) text = String(data.analysis);
      }
    } catch {
      // Silencioso: el usuario nunca ve un error técnico.
    }

    if (!text) {
      text = buildFallbackAnalysis({
        name: leadData.name,
        stageKey: res.stageKey,
        strengths: res.strengths.map((s) => s.dimension),
        gaps: res.gaps.map((s) => s.dimension),
        mainPain: leadData.mainPain,
      });
    }

    setAnalysisText(text);
    setAnalysisLoading(false);
  }

  function handleQuizComplete(finalAnswers: Answers) {
    setAnswers(finalAnswers);
    setStep("lead");
  }

  function handleLeadSubmit(finalLead: LeadData) {
    setLead(finalLead);
    const res = computeResult(answers);
    setResult(res);
    setStep("result");
    void fetchAnalysis(res, finalLead);
  }

  // Transición suave entre pasos.
  const transition = { duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] };
  const stepVariants = {
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: reduce ? { opacity: 0 } : { opacity: 0, y: -10 },
  };

  return (
    <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-surface sm:h-[min(920px,94dvh)] sm:max-w-[640px] sm:rounded-[24px] sm:border sm:border-navy/[0.06] sm:shadow-card">
      {/* Filo dorado superior de 3px: sello premium de la marca */}
      <div className="h-[3px] w-full shrink-0 bg-gradient-to-r from-gold-deep via-gold to-gold-soft" />

      {step !== "intro" && <MiniHeader />}

      <div
        ref={scrollRef}
        className="app-scroll relative min-h-0 flex-1 overflow-y-auto"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className="min-h-full"
          >
            {step === "intro" && (
              <IntroStep onStart={() => setStep("quiz")} />
            )}
            {step === "quiz" && (
              <QuizStep
                initialAnswers={answers}
                onComplete={handleQuizComplete}
                onExit={() => setStep("intro")}
              />
            )}
            {step === "lead" && (
              <LeadStep
                initialLead={lead}
                onSubmit={handleLeadSubmit}
                onBack={() => setStep("quiz")}
              />
            )}
            {step === "result" && result && (
              <ResultStep
                result={result}
                lead={lead}
                analysisLoading={analysisLoading}
                analysisText={analysisText}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
