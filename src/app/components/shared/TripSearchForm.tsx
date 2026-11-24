"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftRight, ArrowRight, CalendarDays, MapPin, Repeat, Search, Users } from "lucide-react";
import { STATIONS } from "@/lib/railData";
import "./tripSearchForm.scss";

export interface TripSearchValues {
  from: string;
  to: string;
  date: string;
  returnDate: string;
  trip: "one-way" | "return";
  passengers: number;
}

interface Props {
  initial?: Partial<TripSearchValues>;
  variant?: "card" | "bar";
}

const MAX_PASSENGERS = 10;

const todayIso = () => new Date().toISOString().split("T")[0];

export const buildSearchQuery = (v: TripSearchValues) => {
  const params = new URLSearchParams({ from: v.from, to: v.to, date: v.date, adults: String(v.passengers) });
  if (v.trip === "return" && v.returnDate) {
    params.set("trip", "return");
    params.set("return", v.returnDate);
  }
  return params.toString();
};

const TripSearchForm: React.FC<Props> = ({ initial, variant = "card" }) => {
  const router = useRouter();
  const [values, setValues] = useState<TripSearchValues>({
    from: initial?.from ?? "",
    to: initial?.to ?? "",
    date: initial?.date ?? "",
    returnDate: initial?.returnDate ?? "",
    trip: initial?.trip ?? "one-way",
    passengers: initial?.passengers ?? 1,
  });

  const set = <K extends keyof TripSearchValues>(key: K, value: TripSearchValues[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const swap = () => setValues((prev) => ({ ...prev, from: prev.to, to: prev.from }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?${buildSearchQuery(values)}`);
  };

  const min = todayIso();

  return (
    <form className={`trip-search trip-search--${variant}`} onSubmit={handleSubmit}>
      <div className="trip-search__toggle" role="radiogroup" aria-label="Trip type">
        {(["one-way", "return"] as const).map((t) => (
          <label key={t} className={values.trip === t ? "is-active" : ""}>
            <input type="radio" name="trip" value={t} checked={values.trip === t} onChange={() => set("trip", t)} />
            {t === "one-way" ? <ArrowRight size={14} /> : <Repeat size={14} />}
            {t === "one-way" ? "One-way" : "Return"}
          </label>
        ))}
      </div>

      <div className="trip-search__fields">
        <div className="trip-search__route">
          <label className="trip-search__field">
            <span className="label">From</span>
            <span className="input-icon">
              <MapPin size={16} />
              <select className="input" value={values.from} onChange={(e) => set("from", e.target.value)} required>
                <option value="">Origin station</option>
                {STATIONS.filter((s) => s !== values.to).map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </span>
          </label>

          <button type="button" className="trip-search__swap" onClick={swap} aria-label="Swap origin and destination" title="Swap stations">
            <ArrowLeftRight size={16} />
          </button>

          <label className="trip-search__field">
            <span className="label">To</span>
            <span className="input-icon">
              <MapPin size={16} />
              <select className="input" value={values.to} onChange={(e) => set("to", e.target.value)} required>
                <option value="">Destination station</option>
                {STATIONS.filter((s) => s !== values.from).map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </span>
          </label>
        </div>

        <label className="trip-search__field">
          <span className="label">Departure</span>
          <span className="input-icon">
            <CalendarDays size={16} />
            <input className="input" type="date" min={min} value={values.date} onChange={(e) => set("date", e.target.value)} required />
          </span>
        </label>

        {values.trip === "return" && (
          <label className="trip-search__field">
            <span className="label">Return</span>
            <span className="input-icon">
              <CalendarDays size={16} />
              <input className="input" type="date" min={values.date || min} value={values.returnDate} onChange={(e) => set("returnDate", e.target.value)} required />
            </span>
          </label>
        )}

        <label className="trip-search__field trip-search__field--sm">
          <span className="label">Passengers</span>
          <span className="input-icon">
            <Users size={16} />
            <select className="input" value={values.passengers} onChange={(e) => set("passengers", Number(e.target.value))}>
              {Array.from({ length: MAX_PASSENGERS }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>{n} {n === 1 ? "passenger" : "passengers"}</option>
              ))}
            </select>
          </span>
        </label>

        <button type="submit" className="btn btn--primary btn--lg trip-search__submit">
          <Search size={18} /> {variant === "bar" ? "Update" : "Search trains"}
        </button>
      </div>
    </form>
  );
};

export default TripSearchForm;
