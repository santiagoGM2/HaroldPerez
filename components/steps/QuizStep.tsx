"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { QUESTIONS, TOTAL_QUESTIONS } from "@/lib/questions";
import { QUIZ } from "@/lib/content";
import type { Answer, Answers } from "@/lib/types";
import { ProgressBar } from "../ProgressBar";
import { Button } from "../ui/Button";

export function QuizStep({
  initialAnswers,
  onComplete,
  onExit,
}: {
  initialAnswers: Answers;
  onComplete: (answers: Answers) => void;
  onExit: () => void;
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);

  const question = QUESTIONS[index];
  const selected = answers[question.id];
  const isLast = index === TOTAL_QUESTIONS - 1;

  function select(value: Answer) {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  }

  function goNext() {
    if (!selected) return;
    if (isLast) {
      onComplete(answers);
      return;
    }
    setDirection(1);
    setIndex((i) => i + 1);
  }

  function goBack() {
    if (index === 0) {
      onExit();
      return;
    }
    setDirection(-1);
    setIndex((i) => i - 1);
  }

  const variants: Variants = {
    enter: (dir: number) =>
      reduce ? { opacity: 0 } : { opacity: 0, x: dir > 0 ? 40 : -40 },
    center: { opacity: 1, x: 0 },
    exit: (dir: number) =>
      reduce ? { opacity: 0 } : { opacity: 0, x: dir > 0 ? -40 : 40 },
  };

  return (
    <div className="flex min-h-full flex-col px-7 pb-7 pt-7 sm:px-10 sm:pb-9 sm:pt-8">
      {/* Encabezado del progreso, tratado con intención editorial */}
      <div className="space-y-3.5">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-eyebrow text-gold-deep">
              Pregunta
            </p>
            <p className="num mt-1 font-display text-[26px] font-medium leading-none text-navy-deep">
              {String(index + 1).padStart(2, "0")}
              <span className="ml-1 text-[16px] text-ink-faint">
                / {TOTAL_QUESTIONS}
              </span>
            </p>
          </div>
          <span className="num text-[12px] font-semibold text-ink-soft">
            {Math.round(((index + 1) / TOTAL_QUESTIONS) * 100)}%
          </span>
        </div>
        <ProgressBar value={(index + 1) / TOTAL_QUESTIONS} />
      </div>

      {/* Pregunta */}
      <div className="flex flex-1 items-center py-9">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={question.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduce ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            {question.tag && (
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-navy/10 bg-navy/[0.03] px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-navy">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                {question.tag}
              </span>
            )}

            <p className="font-display text-[23px] font-medium leading-[1.28] tracking-tightish text-navy-deep sm:text-[26px]">
              {question.text}
            </p>

            {/* Respuestas Sí / No */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              <AnswerButton
                label={QUIZ.yes}
                icon={<Check className="h-[18px] w-[18px]" strokeWidth={2.4} />}
                active={selected === "yes"}
                onClick={() => select("yes")}
              />
              <AnswerButton
                label={QUIZ.no}
                icon={<X className="h-[18px] w-[18px]" strokeWidth={2.4} />}
                active={selected === "no"}
                onClick={() => select("no")}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navegación */}
      <div className="flex items-center justify-between gap-3">
        <Button variant="ghost" onClick={goBack} className="px-5">
          <ArrowLeft className="h-[18px] w-[18px]" strokeWidth={2} />
          {QUIZ.back}
        </Button>
        <Button onClick={goNext} disabled={!selected} className="px-7">
          {isLast ? QUIZ.seeResult : QUIZ.next}
          <ArrowRight className="h-[18px] w-[18px]" strokeWidth={2} />
        </Button>
      </div>
    </div>
  );
}

function AnswerButton({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-center justify-center gap-2.5 rounded-[13px] border py-[18px] text-[16px] font-semibold transition-all duration-300 ease-out-quint active:scale-[0.98] ${
        active
          ? "border-navy-deep bg-navy-deep text-white shadow-soft"
          : "border-navy/15 bg-surface text-navy hover:border-navy/35 hover:bg-navy/[0.02] hover:-translate-y-px"
      }`}
    >
      <span className={active ? "text-gold" : "text-ink-faint"}>{icon}</span>
      {label}
    </button>
  );
}
