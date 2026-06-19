import { HAROLD, INTRO } from "@/lib/content";
import { HaroldAvatar } from "./HaroldAvatar";

// Panel de marca a la izquierda (solo en computador, pantallas anchas).
// Sostiene la presencia de Harold de forma persistente mientras el flujo
// ocurre a la derecha. En celular no se muestra (el MiniHeader cumple ese rol).
export function BrandPane() {
  const pills = INTRO.startMicrocopy.split(" · ");

  return (
    <aside className="relative hidden h-full w-[42%] max-w-[480px] shrink-0 flex-col justify-between overflow-hidden bg-gradient-to-br from-navy to-navy-deep p-10 text-white lg:flex xl:p-12">
      {/* Brillos sutiles de fondo */}
      <div
        className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-blue/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />

      {/* Marca */}
      <div className="relative">
        <p className="text-[11px] font-bold uppercase tracking-eyebrow text-gold-soft">
          {INTRO.eyebrow}
        </p>
      </div>

      {/* Harold, protagonista del panel */}
      <div className="relative">
        <HaroldAvatar size={150} />
        <h2 className="mt-8 font-display text-[30px] font-semibold leading-tight tracking-tight text-white xl:text-[33px]">
          {HAROLD.name}
        </h2>
        <p className="mt-3 max-w-[20rem] text-[14.5px] leading-relaxed text-white/70">
          {HAROLD.hook}
        </p>
        <div className="mt-7 h-px w-12 bg-gold/60" />
        <p className="mt-6 max-w-[19rem] text-[13px] leading-relaxed text-white/55">
          {HAROLD.role}
        </p>
      </div>

      {/* Señales de confianza */}
      <div className="relative flex flex-wrap gap-2">
        {pills.map((pill) => (
          <span
            key={pill}
            className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[11.5px] font-medium capitalize text-white/80"
          >
            {pill}
          </span>
        ))}
      </div>
    </aside>
  );
}
