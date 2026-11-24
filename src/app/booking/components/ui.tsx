"use client";

import React from "react";
import { Check, Minus, Plus } from "lucide-react";

/* ---------------------------------- Section --------------------------------- */

interface SectionProps {
  step: number;
  icon: React.ReactNode;
  title: string;
  description?: string;
  complete?: boolean;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ step, icon, title, description, complete, children }) => (
  <section className={`card ${complete ? "card--complete" : ""}`} aria-labelledby={`section-${step}`}>
    <header className="card__header">
      <span className="card__icon" aria-hidden="true">
        {complete ? <Check size={18} strokeWidth={3} /> : icon}
      </span>
      <div>
        <span className="card__step">Step {step}</span>
        <h3 id={`section-${step}`} className="card__title">{title}</h3>
        {description && <p className="card__desc">{description}</p>}
      </div>
    </header>
    <div className="card__body">{children}</div>
  </section>
);

/* ----------------------------------- Field ---------------------------------- */

interface FieldProps {
  label: string;
  icon?: React.ReactNode;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

export const Field: React.FC<FieldProps> = ({ label, icon, hint, children, className = "" }) => (
  <label className={`field ${className}`}>
    <span className="field__label">{label}</span>
    <span className={`field__control ${icon ? "field__control--icon" : ""}`}>
      {icon && <span className="field__icon" aria-hidden="true">{icon}</span>}
      {children}
    </span>
    {hint && <span className="field__hint">{hint}</span>}
  </label>
);

/* -------------------------------- ChoiceGroup ------------------------------- */

export interface ChoiceOption<T extends string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
  meta?: string;
  disabled?: boolean;
}

interface ChoiceGroupProps<T extends string> {
  name: string;
  legend: string;
  value: string;
  options: ChoiceOption<T>[];
  onChange: (value: T) => void;
  disabled?: boolean;
  required?: boolean;
  variant?: "cards" | "segmented";
}

export function ChoiceGroup<T extends string>({
  name,
  legend,
  value,
  options,
  onChange,
  disabled,
  required,
  variant = "cards",
}: ChoiceGroupProps<T>) {
  return (
    <fieldset className={`choices choices--${variant}`} disabled={disabled}>
      <legend className="field__label">{legend}</legend>
      <div className="choices__list">
        {options.map((opt) => (
          <label key={opt.value} className={`choice ${value === opt.value ? "is-active" : ""} ${opt.disabled ? "is-disabled" : ""}`}>
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              disabled={opt.disabled}
              required={required}
            />
            {opt.icon && <span className="choice__icon" aria-hidden="true">{opt.icon}</span>}
            <span className="choice__text">
              <span className="choice__label">{opt.label}</span>
              {opt.meta && <span className="choice__meta">{opt.meta}</span>}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/* ---------------------------------- Stepper --------------------------------- */

interface StepperProps {
  label: string;
  sublabel?: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export const Stepper: React.FC<StepperProps> = ({ label, sublabel, value, min = 0, max = Infinity, onChange, disabled }) => (
  <div className="stepper">
    <div className="stepper__text">
      <span className="stepper__label">{label}</span>
      {sublabel && <span className="stepper__sub">{sublabel}</span>}
    </div>
    <div className="stepper__controls">
      <button
        type="button"
        className="stepper__btn"
        onClick={() => onChange(value - 1)}
        disabled={disabled || value <= min}
        aria-label={`Decrease ${label}`}
      >
        <Minus size={16} />
      </button>
      <output className="stepper__value" aria-live="polite" aria-label={label}>
        {value}
      </output>
      <button
        type="button"
        className="stepper__btn"
        onClick={() => onChange(value + 1)}
        disabled={disabled || value >= max}
        aria-label={`Increase ${label}`}
      >
        <Plus size={16} />
      </button>
    </div>
  </div>
);
