"use client";

import React from "react";
import { ArrowRight, Loader2, ShieldCheck, TrainFront } from "lucide-react";
import type { BookingHook } from "../hooks/useBookingLogic";

const formatDate = (iso: string) =>
  iso
    ? new Date(`${iso}T00:00:00`).toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short", year: "numeric" })
    : "";

const capitalize = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");

const Row: React.FC<{ label: string; value?: React.ReactNode }> = ({ label, value }) => (
  <div className="summary__row">
    <dt>{label}</dt>
    <dd className={value ? "" : "is-empty"}>{value || "—"}</dd>
  </div>
);

interface Props {
  booking: BookingHook;
  completedSteps: number;
  totalSteps: number;
}

const BookingSummary: React.FC<Props> = ({ booking, completedSteps, totalSteps }) => {
  const {
    origin,
    destination,
    tripType,
    travelDate,
    returnDate,
    preferredTime,
    returnTime,
    seatClass,
    sameClassBothWays,
    returnSeatClass,
    adults,
    children,
    selectedSeats,
    isSubmitting,
  } = booking;

  const passengers = [
    adults > 0 && `${adults} adult${adults > 1 ? "s" : ""}`,
    children > 0 && `${children} child${children > 1 ? "ren" : ""}`,
  ]
    .filter(Boolean)
    .join(", ");

  const depart = [formatDate(travelDate), capitalize(preferredTime)].filter(Boolean).join(" · ");
  const ret = [formatDate(returnDate), capitalize(returnTime)].filter(Boolean).join(" · ");
  const progress = Math.round((completedSteps / totalSteps) * 100);

  return (
    <aside className="summary" aria-label="Booking summary">
      <div className="summary__ticket">
        <div className="summary__brand">
          <TrainFront size={16} /> <span>Your trip</span>
          <span className="summary__badge">{tripType === "return" ? "Return" : "One-way"}</span>
        </div>

        <div className="summary__route">
          <div>
            <span className="summary__station-label">From</span>
            <span className={`summary__station ${origin ? "" : "is-empty"}`}>{origin || "Origin"}</span>
          </div>
          <span className="summary__line" aria-hidden="true">
            <TrainFront size={14} />
          </span>
          <div className="summary__to">
            <span className="summary__station-label">To</span>
            <span className={`summary__station ${destination ? "" : "is-empty"}`}>{destination || "Destination"}</span>
          </div>
        </div>
      </div>

      <dl className="summary__details">
        <Row label="Departure" value={depart} />
        {tripType === "return" && <Row label="Return" value={ret} />}
        <Row
          label="Class"
          value={
            tripType === "return" && !sameClassBothWays
              ? `${capitalize(seatClass)} / ${capitalize(returnSeatClass) || "—"}`
              : capitalize(seatClass)
          }
        />
        <Row label="Passengers" value={passengers} />
        <Row label="Seats" value={selectedSeats.length ? selectedSeats.join(", ") : ""} />
      </dl>

      <div className="summary__progress">
        <div className="summary__progress-label">
          <span>Booking progress</span>
          <span>{completedSteps}/{totalSteps} steps</span>
        </div>
        <div className="summary__bar" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>

      <button type="submit" className="booking__button" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="spin" /> Processing...
          </>
        ) : (
          <>
            Confirm Booking <ArrowRight size={18} />
          </>
        )}
      </button>

      <p className="summary__secure">
        <ShieldCheck size={14} /> Your details are secure and only used for this booking.
      </p>
    </aside>
  );
};

export default BookingSummary;
