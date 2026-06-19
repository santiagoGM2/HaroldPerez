"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Gift } from "lucide-react";
import { HaroldAvatar } from "../HaroldAvatar";
import { SystemIcon } from "../ui/SystemIcon";
import { Button } from "../ui/Button";
import { STAGE_ORDER, STAGES } from "@/lib/stages";
import {
  HAROLD,
  DEFINITION,
  BENEFITS,
  CONCEPT_PHRASE,
  INTRO,
} from "@/lib/content";

export function IntroStep({ onStart }: { onStart: () => void }) {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: reduce ? {} : { staggerChildren: 0.07, delayChildren: 0.04 },
    },
  };
  const block: Variants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 14 },
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
      className="px-7 py-10 sm:px-12 sm:py-12"
    >
      {/* Header: presentación de Harold */}
      <motion.div variants={block} className="flex items-center gap-4">
        <HaroldAvatar size={72} />
        <div className="min-w-0">
          <h1 className="font-display text-[20px] font-semibold leading-tight tracking-tight text-navy-deep">
            {HAROLD.name}
          </h1>
          <p className="mt-1 text-[12.5px] leading-snug text-ink-soft">
            {HAROLD.hook}
          </p>
        </div>
      </motion.div>

      <motion.div variants={block} className="mt-7 h-px w-full bg-navy/[0.08]" />

      {/* Protagonista: eyebrow + titular grande + definición */}
      <motion.div variants={block} className="mt-8">
        <p className="text-[11px] font-bold uppercase tracking-eyebrow text-gold-deep">
          {INTRO.eyebrow}
        </p>
        <h2 className="mt-3.5 font-display text-[31px] font-semibold leading-[1.06] tracking-tight text-navy-deep sm:text-[37px]">
          {DEFINITION.title}
        </h2>
        <p className="mt-4 text-[15px] leading-[1.65] text-ink sm:text-[15.5px]">
          {DEFINITION.body}
        </p>
      </motion.div>

      {/* Los 6 sistemas como grilla editorial numerada */}
      <motion.div variants={block} className="mt-11">
        <p className="text-[11px] font-bold uppercase tracking-eyebrow text-ink-faint">
          {INTRO.systemsTitle}
        </p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2">
          {BENEFITS.map((b, i) => {
            const isRight = i % 2 === 1;
            return (
              <div
                key={b.dimension}
                className={`group flex gap-3.5 border-t border-navy/[0.08] py-4 sm:py-5 ${
                  isRight
                    ? "sm:border-l sm:border-navy/[0.08] sm:pl-7"
                    : "sm:pr-7"
                }`}
              >
                <span className="num mt-[2px] font-display text-[13px] font-bold text-gold-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <SystemIcon
                      name={b.iconName}
                      className="h-[18px] w-[18px] text-blue transition-colors duration-300 group-hover:text-gold-deep"
                    />
                    <p className="text-[14px] font-semibold leading-tight text-navy-deep">
                      {b.title}
                    </p>
                  </div>
                  <p className="mt-1.5 text-[12.5px] leading-snug text-ink-soft">
                    {b.line}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Las 4 etapas explicadas, como línea de evolución vertical */}
      <motion.div variants={block} className="mt-11">
        <p className="text-[11px] font-bold uppercase tracking-eyebrow text-ink-faint">
          {INTRO.stagesTitle}
        </p>
        <p className="mt-2.5 text-[13.5px] leading-snug text-ink-soft">
          {INTRO.stagesSubtitle}
        </p>

        <div className="relative mt-6">
          {/* Línea vertical que conecta las etapas */}
          <div className="absolute bottom-3 left-[15px] top-3 w-px bg-navy/12" />
          <div className="space-y-5">
            {STAGE_ORDER.map((key) => {
              const stage = STAGES[key];
              const isGoal = key === "4.0";
              return (
                <div key={key} className="relative flex gap-4">
                  <span
                    className={`num relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ring-4 ring-surface ${
                      isGoal
                        ? "bg-gold text-navy-deep shadow-gold"
                        : "border border-navy/15 bg-surface text-navy"
                    }`}
                  >
                    {key}
                  </span>
                  <div className="pb-0.5">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <p className="text-[13.5px] font-semibold text-navy-deep">
                        {stage.name}
                      </p>
                      <span className="text-[13px] text-ink-soft">
                        · {stage.title}
                      </span>
                      {isGoal && (
                        <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-eyebrow text-gold-deep">
                          La meta
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-[12.5px] leading-snug text-ink-soft">
                      {stage.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Regalo de la metodología */}
      <motion.div
        variants={block}
        className="mt-9 flex items-center gap-3 rounded-2xl border border-gold/30 bg-cream px-5 py-4"
      >
        <Gift className="h-[19px] w-[19px] shrink-0 text-gold-deep" strokeWidth={2} />
        <p className="text-[13px] font-medium leading-snug text-navy-deep">
          {INTRO.gift}
        </p>
      </motion.div>

      {/* Frase conceptual de la marca */}
      <motion.div
        variants={block}
        className="mt-11 flex flex-col items-center gap-4 px-2 text-center"
      >
        <span className="h-px w-9 bg-gold" />
        <p className="font-display text-[18px] font-medium leading-[1.45] tracking-tightish text-navy-deep">
          {CONCEPT_PHRASE}
        </p>
      </motion.div>

      {/* CTA */}
      <motion.div variants={block} className="mt-10">
        <Button onClick={onStart} className="w-full py-4 text-[15.5px]">
          {INTRO.startButton}
          <ArrowRight className="h-[18px] w-[18px] text-gold" strokeWidth={2.2} />
        </Button>
        <p className="mt-3 text-center text-[12px] font-medium text-ink-faint">
          {INTRO.startMicrocopy}
        </p>
      </motion.div>
    </motion.div>
  );
}
