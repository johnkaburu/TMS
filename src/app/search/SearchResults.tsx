"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Moon, Search, SearchX, Sun, Sunrise, TrainFront, Users } from "lucide-react";
import PageHero from "../components/shared/PageHero";
import TripSearchForm, { buildSearchQuery } from "../components/shared/TripSearchForm";
import { FARE_CLASSES, FareClassId, TIME_SLOTS, formatKsh, isStation } from "@/lib/railData";
import { getAvailableTimesForDate } from "../booking/utils/timeUtils";
import type { TimeSlot } from "../booking/types/booking";

const SLOT_ICONS: Record<TimeSlot, React.ReactNode> = {
  morning: <Sunrise size={20} />,
  afternoon: <Sun size={20} />,
  evening: <Moon size={20} />,
};

const toIso = (d: Date) => {
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().split("T")[0];
};

const formatLong = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });

const SearchResults: React.FC = () => {
  const params = useSearchParams();
  const router = useRouter();

  const from = params.get("from") ?? "";
  const to = params.get("to") ?? "";
  const date = params.get("date") ?? "";
  const trip = params.get("trip") === "return" ? "return" : "one-way";
  const returnDate = params.get("return") ?? "";
  const passengers = Math.min(Math.max(Number(params.get("adults")) || 1, 1), 10);

  const [selected, setSelected] = useState<Record<string, FareClassId>>({});

  const validRoute = isStation(from) && isStation(to) && from !== to;
  const hasDate = Boolean(date);

  // 7-day strip starting today (or the selected date if earlier days are past)
  const dateStrip = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const base = date ? new Date(`${date}T00:00:00`) : today;
    const start = new Date(Math.max(today.getTime(), base.getTime() - 3 * 86400000));
    return Array.from({ length: 7 }, (_, i) => toIso(new Date(start.getTime() + i * 86400000)));
  }, [date]);

  const available = hasDate ? getAvailableTimesForDate(date) : [];

  const changeDate = (iso: string) => {
    router.push(`/search?${buildSearchQuery({ from, to, date: iso, returnDate, trip, passengers })}`, { scroll: false });
  };

  const bookingHref = (slot: TimeSlot, cls: FareClassId) => {
    const q = new URLSearchParams({ from, to, date, time: slot, class: cls, adults: String(passengers) });
    if (trip === "return" && returnDate) {
      q.set("trip", "return");
      q.set("return", returnDate);
    }
    return `/booking?${q.toString()}`;
  };

  return (
    <div className="search-page">
      <PageHero
        eyebrow="Find trains"
        icon={<Search size={16} />}
        title={validRoute ? <>{from} <ArrowRight className="search-page__arrow" /> {to}</> : "Search trains"}
        subtitle={
          validRoute && hasDate
            ? `${formatLong(date)} · ${passengers} passenger${passengers > 1 ? "s" : ""}${trip === "return" && returnDate ? ` · Return ${formatLong(returnDate)}` : ""}`
            : "Choose your route and travel date to see available departures."
        }
        overlap
      />

      <div className="search-page__body">
        <TripSearchForm
          key={params.toString()}
          variant="bar"
          initial={{ from, to, date, returnDate, trip, passengers }}
        />

        {!validRoute || !hasDate ? (
          <div className="search-empty">
            <span className="search-empty__icon"><TrainFront size={28} /></span>
            <h2>Where would you like to go?</h2>
            <p>Select an origin, destination and travel date above to see departures and fares.</p>
          </div>
        ) : (
          <>
            <div className="date-strip" role="tablist" aria-label="Travel date">
              {dateStrip.map((iso) => {
                const d = new Date(`${iso}T00:00:00`);
                return (
                  <button
                    key={iso}
                    type="button"
                    role="tab"
                    aria-selected={iso === date}
                    className={iso === date ? "is-active" : ""}
                    onClick={() => changeDate(iso)}
                  >
                    <span>{d.toLocaleDateString(undefined, { weekday: "short" })}</span>
                    <strong>{d.getDate()}</strong>
                    <span>{d.toLocaleDateString(undefined, { month: "short" })}</span>
                  </button>
                );
              })}
            </div>

            <div className="results-head">
              <h2>{available.length} departure{available.length === 1 ? "" : "s"} available</h2>
              <span className="results-head__meta"><Users size={14} /> Prices for {passengers} passenger{passengers > 1 ? "s" : ""}</span>
            </div>

            {available.length === 0 && (
              <div className="search-empty search-empty--inline">
                <span className="search-empty__icon"><SearchX size={26} /></span>
                <h2>No more departures today</h2>
                <p>Try another date from the strip above.</p>
              </div>
            )}

            <ul className="results">
              {TIME_SLOTS.map(({ value: slot, label }) => {
                const isAvailable = available.includes(slot);
                const cls = selected[slot] ?? "economy";
                const fare = FARE_CLASSES.find((c) => c.id === cls)!;

                return (
                  <li key={slot} className={`result ${isAvailable ? "" : "result--off"}`}>
                    <div className="result__time">
                      <span className="result__icon">{SLOT_ICONS[slot]}</span>
                      <div>
                        <strong>{label} departure</strong>
                        <span>{from} → {to}</span>
                      </div>
                      {!isAvailable && <span className="result__badge">Departed</span>}
                    </div>

                    {isAvailable && (
                      <>
                        <div className="result__classes" role="radiogroup" aria-label={`${label} travel class`}>
                          {FARE_CLASSES.map((c) => (
                            <label key={c.id} className={`result__class ${cls === c.id ? "is-active" : ""}`}>
                              <input
                                type="radio"
                                name={`class-${slot}`}
                                checked={cls === c.id}
                                onChange={() => setSelected((s) => ({ ...s, [slot]: c.id }))}
                              />
                              <span className="result__class-name">{c.name}</span>
                              <span className="result__class-price">{formatKsh(c.price)}</span>
                            </label>
                          ))}
                        </div>

                        <div className="result__action">
                          <span className="result__total">
                            <small>Total</small>
                            {formatKsh(fare.price * passengers)}
                          </span>
                          <Link href={bookingHref(slot, cls)} className="btn btn--primary">
                            Select <ArrowRight size={16} className="btn__arrow" />
                          </Link>
                        </div>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
