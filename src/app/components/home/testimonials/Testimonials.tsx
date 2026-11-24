"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, MessageSquareQuote, Quote } from "lucide-react";
import "./Testimonials.scss";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  color: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Ethan Patel",
    role: "Frequent Business Traveler",
    quote:
      "Booking my daily train rides through RailEase has been a game-changer. I can reserve seats, get instant updates, and even change my schedule on the go — all in seconds.",
    color: "#f59e0b",
  },
  {
    name: "Olivia Martin",
    role: "University Student",
    quote:
      "As a student commuting between cities every weekend, RailEase made my life so much easier. The mobile app is intuitive, and the student discounts are a huge plus!",
    color: "#10b981",
  },
  {
    name: "James O’Connor",
    role: "Family Traveler",
    quote:
      "Our family trip was perfectly organized thanks to RailEase. Real-time train tracking and seat selection helped us travel together comfortably without stress.",
    color: "#0891b2",
  },
  {
    name: "Priya Mehra",
    role: "Tour Operator",
    quote:
      "Managing group bookings used to be a nightmare until I found RailEase. Bulk booking and instant e-tickets save me hours every week.",
    color: "#e11d48",
  },
];

const Testimonials: React.FC = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((p) => (p + 1) % count), 6000);
    return () => clearInterval(id);
  }, [paused, count]);

  const go = (delta: number) => setActive((p) => (p + delta + count) % count);
  const t = testimonials[active];

  return (
    <section className="section section--muted testimonials">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow"><MessageSquareQuote size={14} /> Testimonials</span>
          <h2 className="section-title">Loved by travellers</h2>
        </div>

        <div
          className="testimonials__stage"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <button type="button" className="testimonials__nav" onClick={() => go(-1)} aria-label="Previous testimonial">
            <ChevronLeft size={20} />
          </button>

          <figure className="testimonial" key={active} aria-live="polite">
            <Quote className="testimonial__mark" size={40} style={{ color: t.color }} />
            <blockquote className="testimonial__quote">{t.quote}</blockquote>
            <figcaption className="testimonial__author">
              <span className="testimonial__avatar" style={{ background: t.color }}>{t.name.charAt(0)}</span>
              <span>
                <strong>{t.name}</strong>
                <small>{t.role}</small>
              </span>
            </figcaption>
          </figure>

          <button type="button" className="testimonials__nav" onClick={() => go(1)} aria-label="Next testimonial">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="testimonials__dots">
          {testimonials.map((item, i) => (
            <button
              key={item.name}
              type="button"
              className={i === active ? "is-active" : ""}
              onClick={() => setActive(i)}
              aria-label={`Show testimonial ${i + 1}`}
              aria-current={i === active}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
