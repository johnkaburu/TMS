"use client";

import React from "react";
import { ArrowLeftRight, ArrowRight, CalendarDays, Crown, Briefcase, Armchair, MapPin, Moon, Navigation, Repeat, Sun, Sunrise, TriangleAlert } from "lucide-react";
import type { BookingHook } from "../hooks/useBookingLogic";
import type { TimeSlot, TripType } from "../types/booking";
import { ChoiceGroup, ChoiceOption, Field, Section } from "./ui";

const TIME_OPTIONS: { value: TimeSlot; label: string; icon: React.ReactNode }[] = [
  { value: "morning", label: "Morning", icon: <Sunrise size={18} /> },
  { value: "afternoon", label: "Afternoon", icon: <Sun size={18} /> },
  { value: "evening", label: "Evening", icon: <Moon size={18} /> },
];

export const CLASS_OPTIONS: ChoiceOption<string>[] = [
  { value: "economy", label: "Economy", meta: "Standard seating", icon: <Armchair size={18} /> },
  { value: "business", label: "Business", meta: "Extra legroom", icon: <Briefcase size={18} /> },
  { value: "first", label: "First", meta: "Premium comfort", icon: <Crown size={18} /> },
];

const TripDetailsForm: React.FC<{ booking: BookingHook; complete?: boolean }> = ({ booking, complete }) => {
  const {
    origin,
    destination,
    setOrigin,
    setDestination,
    stations,
    tripType,
    setTripType,
    travelDate,
    setTravelDate,
    returnDate,
    setReturnDate,
    preferredTime,
    setPreferredTime,
    availableTimes,
    seatClass,
    setSeatClass,
    isSubmitting,
    sameClassBothWays,
    setSameClassBothWays,
    returnSeatClass,
    setReturnSeatClass,
    getAvailableReturnTimes,
    returnTime,
    setReturnTime,
  } = booking;

  const todayIso = new Date().toISOString().split("T")[0];
  const returnTimes = getAvailableReturnTimes(preferredTime);
  const noReturnTimes = Boolean(preferredTime) && returnTimes.length === 0;

  const swapStations = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  return (
    <Section
      step={2}
      icon={<Navigation size={18} />}
      title="Trip Details"
      description="Choose your route, travel dates and preferred class."
      complete={complete}
    >
      <ChoiceGroup<TripType>
        name="tripType"
        legend="Trip type"
        variant="segmented"
        value={tripType}
        onChange={setTripType}
        disabled={isSubmitting}
        options={[
          { value: "one-way", label: "One-way", icon: <ArrowRight size={16} /> },
          { value: "return", label: "Return", icon: <Repeat size={16} /> },
        ]}
      />

      <div className="route">
        <Field label="From" icon={<MapPin size={16} />}>
          <select value={origin} onChange={(e) => setOrigin(e.target.value)} required disabled={isSubmitting}>
            <option value="">Select Origin</option>
            {stations.filter((s) => s !== destination).map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>

        <button
          type="button"
          className="route__swap"
          onClick={swapStations}
          disabled={isSubmitting || (!origin && !destination)}
          aria-label="Swap origin and destination"
          title="Swap stations"
        >
          <ArrowLeftRight size={18} />
        </button>

        <Field label="To" icon={<MapPin size={16} />}>
          <select value={destination} onChange={(e) => setDestination(e.target.value)} required disabled={isSubmitting}>
            <option value="">Select Destination</option>
            {stations.filter((s) => s !== origin).map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
      </div>

      <div className={`grid ${tripType === "return" ? "grid--2" : "grid--1"}`}>
        <Field label="Departure date" icon={<CalendarDays size={16} />}>
          <input type="date" value={travelDate} min={todayIso} onChange={(e) => setTravelDate(e.target.value)} required disabled={isSubmitting} />
        </Field>
        {tripType === "return" && (
          <Field label="Return date" icon={<CalendarDays size={16} />}>
            <input type="date" value={returnDate} min={travelDate || todayIso} onChange={(e) => setReturnDate(e.target.value)} required disabled={isSubmitting} />
          </Field>
        )}
      </div>

      <ChoiceGroup<TimeSlot>
        name="preferredTime"
        legend="Departure time"
        value={preferredTime}
        onChange={setPreferredTime}
        disabled={isSubmitting}
        required
        options={TIME_OPTIONS.map((t) => ({
          ...t,
          disabled: !availableTimes.includes(t.value),
          meta: availableTimes.includes(t.value) ? undefined : "Unavailable",
        }))}
      />
      {availableTimes.length === 0 && (
        <p className="alert alert--warning"><TriangleAlert size={16} /> No departures left today. Please choose a later date.</p>
      )}

      <ChoiceGroup
        name="seatClass"
        legend={tripType === "return" ? "Outbound class" : "Travel class"}
        value={seatClass}
        onChange={setSeatClass}
        disabled={isSubmitting}
        options={CLASS_OPTIONS}
      />

      {tripType === "return" && (
        <div className="return-block">
          <div className="return-block__head">
            <Repeat size={16} /> <span>Return journey</span>
          </div>

          <ChoiceGroup<TimeSlot>
            name="returnTime"
            legend="Return time"
            value={returnTime}
            onChange={setReturnTime}
            disabled={isSubmitting || noReturnTimes}
            required
            options={TIME_OPTIONS.map((t) => ({
              ...t,
              disabled: !returnTimes.includes(t.value),
              meta: returnTimes.includes(t.value) ? undefined : "Unavailable",
            }))}
          />
          {noReturnTimes && (
            <p className="alert alert--warning">
              <TriangleAlert size={16} /> No valid return times for same-day travel. Change times or date.
            </p>
          )}

          <label className="switch">
            <input
              type="checkbox"
              checked={sameClassBothWays}
              onChange={() => setSameClassBothWays(!sameClassBothWays)}
              disabled={isSubmitting}
            />
            <span className="switch__track" aria-hidden="true"><span className="switch__thumb" /></span>
            <span>Same class for return trip</span>
          </label>

          {!sameClassBothWays && (
            <ChoiceGroup
              name="returnSeatClass"
              legend="Return class"
              value={returnSeatClass}
              onChange={setReturnSeatClass}
              disabled={isSubmitting}
              required
              options={CLASS_OPTIONS}
            />
          )}
        </div>
      )}
    </Section>
  );
};

export default TripDetailsForm;
