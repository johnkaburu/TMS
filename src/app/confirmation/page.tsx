"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Armchair, CalendarDays, Check, Home, Mail, Printer, Ticket, TrainFront, User, Users } from "lucide-react";
import { LAST_BOOKING_KEY } from "@/lib/railData";
import type { BookingPayload } from "../booking/types/booking";
import "./confirm.scss";

type StoredBooking = BookingPayload & { reference: string };

const capitalize = (s?: string | null) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");
const formatDate = (iso?: string | null) =>
  iso ? new Date(`${iso}T00:00:00`).toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short", year: "numeric" }) : "";

export default function ConfirmationPage() {
  const [booking, setBooking] = useState<StoredBooking | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(LAST_BOOKING_KEY);
      if (raw) setBooking(JSON.parse(raw));
    } catch {
      /* storage unavailable — show empty state */
    }
    setLoaded(true);
  }, []);

  if (!loaded) return <div className="confirm-page" aria-busy="true" />;

  if (!booking) {
    return (
      <div className="confirm-page">
        <div className="confirm-empty">
          <span className="confirm-empty__icon"><Ticket size={28} /></span>
          <h1>No recent booking found</h1>
          <p>Once you complete a booking, your confirmation and ticket details will appear here.</p>
          <div className="confirm-actions">
            <Link href="/booking" className="btn btn--primary">Book a ticket <ArrowRight size={16} className="btn__arrow" /></Link>
            <Link href="/" className="btn btn--outline"><Home size={16} /> Home</Link>
          </div>
        </div>
      </div>
    );
  }

  const isReturn = booking.tripType === "return";
  const passengers = [
    ...booking.adultDetails.map((a) => ({ name: a.name, type: "Adult" })),
    ...booking.childDetails.map((c) => ({ name: `Child of ${c.guardianName}`, type: "Child" })),
  ];

  return (
    <div className="confirm-page">
      <div className="confirm-hero">
        <span className="confirm-hero__check"><Check size={34} strokeWidth={3} /></span>
        <h1>Booking confirmed!</h1>
        <p>
          Your ticket details have been sent to <strong>{booking.email}</strong>.
        </p>
      </div>

      <article className="ticket">
        <header className="ticket__head">
          <span className="ticket__brand"><TrainFront size={18} /> RailEase e-ticket</span>
          <span className="ticket__ref">
            <small>Booking ref</small>
            {booking.reference}
          </span>
        </header>

        <div className="ticket__route">
          <div>
            <small>From</small>
            <strong>{booking.origin}</strong>
          </div>
          <span className="ticket__line" aria-hidden="true"><TrainFront size={16} /></span>
          <div className="ticket__to">
            <small>To</small>
            <strong>{booking.destination}</strong>
          </div>
        </div>

        <div className="ticket__perforation" aria-hidden="true" />

        <dl className="ticket__grid">
          <div>
            <dt><CalendarDays size={14} /> Departure</dt>
            <dd>{formatDate(booking.travelDate)}<span>{capitalize(booking.preferredTime)}</span></dd>
          </div>
          {isReturn && (
            <div>
              <dt><CalendarDays size={14} /> Return</dt>
              <dd>{formatDate(booking.returnDate)}<span>{capitalize(booking.returnTime)}</span></dd>
            </div>
          )}
          <div>
            <dt><Ticket size={14} /> Class</dt>
            <dd>
              {capitalize(booking.seatClass)}
              {isReturn && booking.returnSeatClass !== booking.seatClass && <span>Return: {capitalize(booking.returnSeatClass)}</span>}
            </dd>
          </div>
          <div>
            <dt><Armchair size={14} /> Seats</dt>
            <dd>{booking.selectedSeats.join(", ")}</dd>
          </div>
          <div>
            <dt><Users size={14} /> Travellers</dt>
            <dd>{booking.adults + booking.children}</dd>
          </div>
          <div>
            <dt><Mail size={14} /> Contact</dt>
            <dd className="ticket__wrap">{booking.contactName}<span>{booking.phone}</span></dd>
          </div>
        </dl>

        <div className="ticket__passengers">
          <h2>Passengers</h2>
          <ul>
            {passengers.map((p, i) => (
              <li key={i}>
                <span className="ticket__avatar"><User size={14} /></span>
                <span className="ticket__pname">{p.name}</span>
                <span className="badge">{p.type}</span>
                <span className="ticket__seat">{booking.selectedSeats[i]}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>

      <div className="confirm-actions no-print">
        <button type="button" className="btn btn--outline" onClick={() => window.print()}>
          <Printer size={16} /> Print ticket
        </button>
        <Link href="/booking" className="btn btn--primary">
          Book another trip <ArrowRight size={16} className="btn__arrow" />
        </Link>
      </div>
    </div>
  );
}
