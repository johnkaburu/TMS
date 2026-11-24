"use client";

import React from "react";
import { Armchair, ChevronUp } from "lucide-react";
import type { BookingHook } from "../hooks/useBookingLogic";
import { Section } from "./ui";

const SEATS_PER_ROW = 4; // 2 + aisle + 2
const COLUMNS = ["A", "B", "C", "D"];

const SeatSelection: React.FC<{ booking: BookingHook; complete?: boolean }> = ({ booking, complete }) => {
  const { totalSeats, selectedSeats, toggleSeat, totalTravelers, isSubmitting } = booking;
  const rows = Math.ceil(totalSeats / SEATS_PER_ROW);
  const remaining = Math.max(totalTravelers - selectedSeats.length, 0);

  const renderSeat = (index: number) => {
    if (index >= totalSeats) return <span className="seat seat--empty" key={`empty-${index}`} />;

    const seat = `S${index + 1}`;
    const isSelected = selectedSeats.includes(seat);
    const disabled =
      isSubmitting ||
      totalTravelers === 0 ||
      (!isSelected && selectedSeats.length >= totalTravelers && totalTravelers > 0);

    return (
      <button
        key={seat}
        type="button"
        className={`seat ${isSelected ? "selected" : ""} ${disabled ? "disabled" : ""}`}
        onClick={() => !disabled && toggleSeat(seat)}
        disabled={disabled}
        aria-pressed={isSelected}
        aria-label={`Seat ${seat}`}
        title={seat}
      >
        {index + 1}
      </button>
    );
  };

  return (
    <Section
      step={4}
      icon={<Armchair size={18} />}
      title="Seat Selection"
      description="Pick a seat for each traveller. Tap again to deselect."
      complete={complete}
    >
      <div className="seat-toolbar">
        <p className="booking__seat-note">
          {totalTravelers > 0
            ? remaining > 0
              ? `Select ${remaining} more seat${remaining > 1 ? "s" : ""} (${selectedSeats.length} of ${totalTravelers} selected)`
              : `All ${totalTravelers} seat${totalTravelers > 1 ? "s" : ""} selected`
            : "Add passengers to select seats"}
        </p>
        <ul className="seat-legend">
          <li><span className="seat-legend__swatch" /> Available</li>
          <li><span className="seat-legend__swatch seat-legend__swatch--selected" /> Selected</li>
          <li><span className="seat-legend__swatch seat-legend__swatch--booked" /> Unavailable</li>
        </ul>
      </div>

      <div className="coach">
        <div className="coach__front"><ChevronUp size={16} /> Front of coach</div>

        <div className="coach__grid" role="group" aria-label="Seat map">
          <span />
          {COLUMNS.slice(0, 2).map((c) => <span key={c} className="coach__col">{c}</span>)}
          <span />
          {COLUMNS.slice(2).map((c) => <span key={c} className="coach__col">{c}</span>)}

          {Array.from({ length: rows }, (_, r) => {
            const base = r * SEATS_PER_ROW;
            return (
              <React.Fragment key={r}>
                <span className="coach__row">{r + 1}</span>
                {renderSeat(base)}
                {renderSeat(base + 1)}
                <span className="coach__aisle" aria-hidden="true" />
                {renderSeat(base + 2)}
                {renderSeat(base + 3)}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {selectedSeats.length > 0 && (
        <div className="chips" aria-live="polite">
          {selectedSeats.map((s) => (
            <button key={s} type="button" className="chip" onClick={() => toggleSeat(s)} disabled={isSubmitting} aria-label={`Remove seat ${s}`}>
              {s} <span aria-hidden="true">×</span>
            </button>
          ))}
        </div>
      )}
    </Section>
  );
};

export default SeatSelection;
