"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { COMPANY_SIZES, LEAD, PAIN_OPTIONS } from "@/lib/content";
import type { LeadData } from "@/lib/types";
import { Button } from "../ui/Button";

const inputClass =
  "w-full rounded-[11px] border border-navy/15 bg-surface px-4 py-3.5 text-[14.5px] text-ink placeholder:text-ink-faint outline-none transition-all duration-200 hover:border-navy/25 focus:border-navy focus:ring-4 focus:ring-navy/10";

type Errors = Partial<Record<"name" | "email" | "whatsapp", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LeadStep({
  initialLead,
  onSubmit,
  onBack,
}: {
  initialLead: LeadData;
  onSubmit: (lead: LeadData) => void;
  onBack: () => void;
}) {
  const [lead, setLead] = useState<LeadData>(initialLead);
  const [errors, setErrors] = useState<Errors>({});

  function update<K extends keyof LeadData>(key: K, value: LeadData[K]) {
    setLead((prev) => ({ ...prev, [key]: value }));
    if (key in errors) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  function handleSubmit() {
    const next: Errors = {};
    if (!lead.name.trim()) next.name = LEAD.errors.name;
    if (!EMAIL_RE.test(lead.email.trim())) next.email = LEAD.errors.email;
    if (lead.whatsapp.trim().length < 7) next.whatsapp = LEAD.errors.whatsapp;
    setErrors(next);
    if (Object.keys(next).length === 0) {
      onSubmit(lead);
    }
  }

  return (
    <div className="px-7 py-9 sm:px-10 sm:py-10">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-gold-deep">
          {LEAD.eyebrow}
        </p>
        <h2 className="mt-3 font-display text-[27px] font-medium leading-tight tracking-tightish text-navy-deep">
          {LEAD.title}
        </h2>
        <p className="mt-3 text-[14px] leading-[1.6] text-ink-soft">
          {LEAD.subtitle}
        </p>
      </div>

      <div className="mt-7 space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label={LEAD.fields.name.label} error={errors.name}>
            <input
              className={inputClass}
              type="text"
              autoComplete="name"
              placeholder={LEAD.fields.name.placeholder}
              value={lead.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </Field>
          <Field label={LEAD.fields.company.label}>
            <input
              className={inputClass}
              type="text"
              autoComplete="organization"
              placeholder={LEAD.fields.company.placeholder}
              value={lead.company}
              onChange={(e) => update("company", e.target.value)}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label={LEAD.fields.email.label} error={errors.email}>
            <input
              className={inputClass}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder={LEAD.fields.email.placeholder}
              value={lead.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </Field>
          <Field label={LEAD.fields.whatsapp.label} error={errors.whatsapp}>
            <input
              className={inputClass}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder={LEAD.fields.whatsapp.placeholder}
              value={lead.whatsapp}
              onChange={(e) => update("whatsapp", e.target.value)}
            />
          </Field>
        </div>

        <Field label={LEAD.fields.companySize.label}>
          <div className="relative">
            <select
              className={`${inputClass} cursor-pointer appearance-none pr-10 ${
                lead.companySize ? "text-ink" : "text-ink-faint"
              }`}
              value={lead.companySize}
              onChange={(e) => update("companySize", e.target.value)}
            >
              <option value="" disabled>
                {LEAD.fields.companySize.placeholder}
              </option>
              {COMPANY_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
              strokeWidth={2}
            />
          </div>
        </Field>

        {/* Selección rápida de dolor */}
        <div>
          <p className="mb-3 text-[13px] font-semibold text-navy-deep">
            {LEAD.painQuick.label}
          </p>
          <div className="flex flex-wrap gap-2">
            {PAIN_OPTIONS.map((pain) => {
              const active = lead.mainPain === pain;
              return (
                <button
                  key={pain}
                  type="button"
                  aria-pressed={active}
                  onClick={() => update("mainPain", active ? "" : pain)}
                  className={`rounded-full border px-3.5 py-2 text-[12.5px] font-medium transition-all duration-200 ${
                    active
                      ? "border-navy-deep bg-navy-deep text-white shadow-soft"
                      : "border-navy/15 bg-surface text-ink-soft hover:border-navy/35 hover:text-navy"
                  }`}
                >
                  {pain}
                </button>
              );
            })}
          </div>
        </div>

        <Field label={LEAD.painDetail.label}>
          <textarea
            className={`${inputClass} min-h-[104px] resize-none leading-relaxed`}
            placeholder={LEAD.painDetail.placeholder}
            value={lead.painDetail}
            onChange={(e) => update("painDetail", e.target.value)}
            rows={3}
          />
        </Field>
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <Button variant="ghost" onClick={onBack} className="px-5">
          <ArrowLeft className="h-[18px] w-[18px]" strokeWidth={2} />
          Atrás
        </Button>
        <Button onClick={handleSubmit} className="px-7">
          {LEAD.submit}
          <ArrowRight className="h-[18px] w-[18px] text-gold" strokeWidth={2.2} />
        </Button>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-semibold text-navy-deep">
        {label}
      </span>
      {children}
      {error && (
        <span className="mt-1.5 block text-[12px] font-medium text-amber">
          {error}
        </span>
      )}
    </label>
  );
}
