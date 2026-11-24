"use client";

import React, { useEffect } from "react";
import { Check, TrainFront } from "lucide-react";
import "./booking.scss";
import { useBookingLogic } from "./hooks/useBookingLogic";
import ContactInfoForm from "./components/ContactInfoForm";
import TripDetailsForm from "./components/TripDetailsForm";
import TravellersForm from "./components/TravellersForm";
import SeatSelection from "./components/SeatSelection";
import BookingSummary from "./components/BookingSummary";
import PageHero from "../components/shared/PageHero";
import { LAST_BOOKING_KEY } from "@/lib/railData";
import type { TimeSlot } from "./types/booking";

const TIME_SLOTS: TimeSlot[] = ["morning", "afternoon", "evening"];
const CLASSES = ["economy", "business", "first"];

const BookingPage: React.FC = () => {
  const booking = useBookingLogic();

  // Prefill from query params, e.g. coming from /search or a destination card.
  // Read from window.location (rather than useSearchParams) so the page works without a router in tests.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const from = q.get("from");
    const to = q.get("to");
    const date = q.get("date");
    const ret = q.get("return");
    const time = q.get("time") as TimeSlot | null;
    const cls = q.get("class");
    const adults = Number(q.get("adults"));

    if (from && booking.stations.includes(from)) booking.setOrigin(from);
    if (to && to !== from && booking.stations.includes(to)) booking.setDestination(to);
    if (date) booking.setTravelDate(date);
    if (q.get("trip") === "return") {
      booking.setTripType("return");
      if (ret) booking.setReturnDate(ret);
    }
    if (time && TIME_SLOTS.includes(time)) booking.setPreferredTime(time);
    if (cls && CLASSES.includes(cls)) booking.setSeatClass(cls);
    if (adults >= 1 && adults <= 10) booking.setAdults(adults);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = await booking.submitBooking();
    if (!payload) return;

    const reference = `RE-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    try {
      sessionStorage.setItem(LAST_BOOKING_KEY, JSON.stringify({ ...payload, reference }));
    } catch {
      /* storage unavailable — confirmation page will show its empty state */
    }
    window.location.assign("/confirmation");
  };

  // Derived completion state for the progress tracker
  const contactDone = Boolean(booking.contactName && booking.email && booking.phone);
  const tripDone = Boolean(
    booking.origin &&
      booking.destination &&
      booking.travelDate &&
      booking.preferredTime &&
      (booking.tripType === "one-way" ||
        (booking.returnDate && booking.returnTime && (booking.sameClassBothWays || booking.returnSeatClass)))
  );
  const travellersDone =
    booking.totalTravelers > 0 &&
    booking.adultDetails.every((a) => a.name && a.id) &&
    booking.childDetails.every((c) => c.guardianName && c.guardianId);
  const seatsDone = booking.totalTravelers > 0 && booking.selectedSeats.length === booking.totalTravelers;

  const steps = [
    { label: "Contact", done: contactDone },
    { label: "Trip", done: tripDone },
    { label: "Travellers", done: travellersDone },
    { label: "Seats", done: seatsDone },
  ];
  const completed = steps.filter((s) => s.done).length;

  return (
    <div className="booking">
      <PageHero
        eyebrow="Book your journey"
        icon={<TrainFront size={16} />}
        title="Train Ticket Booking"
        subtitle="Reserve your seats in a few steps. Fill in the details below and confirm when ready."
        overlap
      >
        <ol className="steps" aria-label="Booking progress">
          {steps.map((s, i) => (
            <li key={s.label} className={`steps__item ${s.done ? "is-done" : ""}`}>
              <span className="steps__dot">{s.done ? <Check size={14} strokeWidth={3} /> : i + 1}</span>
              <span className="steps__label">{s.label}</span>
            </li>
          ))}
        </ol>
      </PageHero>

      <form className="booking__layout" onSubmit={handleSubmit}>
        <div className="booking__main">
          <ContactInfoForm booking={booking} complete={contactDone} />
          <TripDetailsForm booking={booking} complete={tripDone} />
          <TravellersForm booking={booking} complete={travellersDone} />
          <SeatSelection booking={booking} complete={seatsDone} />
        </div>

        <BookingSummary booking={booking} completedSteps={completed} totalSteps={steps.length} />
      </form>
    </div>
  );
};

export default BookingPage;
