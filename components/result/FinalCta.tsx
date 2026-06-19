import { Check, Gift } from "lucide-react";
import { CTA } from "@/lib/content";
import { buildWhatsappLink } from "@/lib/whatsapp";
import type { StageKey } from "@/lib/types";
import { WhatsAppIcon } from "../ui/WhatsAppIcon";

// CTA final hacia WhatsApp. Panel azul marino para que el botón dorado sea
// el elemento más prominente de toda la pantalla.
export function FinalCta({
  name,
  stageKey,
}: {
  name: string;
  stageKey: StageKey;
}) {
  const href = buildWhatsappLink(name, stageKey);

  return (
    <div className="overflow-hidden rounded-[22px] bg-gradient-to-br from-navy to-navy-deep p-7 text-white shadow-soft sm:p-9">
      <p className="text-[11px] font-bold uppercase tracking-eyebrow text-gold-soft">
        {CTA.eyebrow}
      </p>
      <h3 className="mt-3.5 font-display text-[25px] font-semibold leading-[1.12] tracking-tight text-white sm:text-[29px]">
        {CTA.title}
      </h3>
      <p className="mt-3.5 text-[13.5px] leading-[1.6] text-white/75">
        {CTA.subtitle}
      </p>

      {/* Promesa destacada con el dorado como hilo */}
      <div className="mt-6 flex items-start gap-3 rounded-[14px] border border-gold/40 bg-gold/[0.08] px-4 py-4">
        <Gift className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={2} />
        <p className="text-[13px] font-medium leading-[1.5] text-gold-soft">
          {CTA.promise}
        </p>
      </div>

      {/* La metodología: Sistema PYMES 4.0 */}
      <div className="mt-3.5 rounded-[14px] border border-white/10 bg-white/[0.04] px-4 py-4">
        <p className="font-display text-[13px] font-bold tracking-tight text-gold-soft">
          {CTA.methodologyName}
        </p>
        <p className="mt-2 text-[12.5px] leading-[1.55] text-white/65">
          {CTA.methodologyBody}
        </p>
      </div>

      {/* Botón principal: el elemento más prominente de la pantalla */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${CTA.button} por WhatsApp`}
        className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-[13px] bg-gold px-6 py-4 text-[16px] font-bold tracking-tight text-navy-deep shadow-gold transition-all duration-300 ease-out-quint hover:-translate-y-px hover:bg-gold-soft active:translate-y-0 active:scale-[0.99]"
      >
        <WhatsAppIcon className="h-[22px] w-[22px]" />
        {CTA.button}
      </a>

      {/* Píldoras de confianza */}
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {CTA.pills.map((pill) => (
          <span
            key={pill}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[12px] font-medium text-white/80"
          >
            <Check className="h-3.5 w-3.5 text-gold" strokeWidth={2.4} />
            {pill}
          </span>
        ))}
      </div>

      <p className="mt-5 text-center text-[11.5px] leading-snug text-white/45">
        {CTA.footnote}
      </p>
    </div>
  );
}
