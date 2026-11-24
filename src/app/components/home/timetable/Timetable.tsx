import React from "react";
import Link from "next/link";
import { ArrowRight, Clock, MapPin, Route } from "lucide-react";
import { EXPRESS_SERVICE, formatDuration, formatKsh, minutesBetween } from "@/lib/railData";
import "./timetable.scss";

/** Home-page preview of the main route, rendered as a journey line. */
export const Timetable: React.FC = () => {
  const { stops, name } = EXPRESS_SERVICE;
  const first = stops[0];
  const last = stops[stops.length - 1];
  const duration = formatDuration(minutesBetween(first.departure!, last.arrival!));

  return (
    <section className="section route-preview">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <span className="eyebrow"><Route size={14} /> Route at a glance</span>
            <h2 className="section-title">Nairobi to the coast in {duration}</h2>
            <p className="section-lead">
              The {name} stops at {stops.length - 2} stations along the way. Board wherever suits you.
            </p>
          </div>
          <Link href="/timetable" className="btn btn--outline">
            Full timetable <ArrowRight size={16} className="btn__arrow" />
          </Link>
        </div>

        <ol className="journey">
          {stops.map((stop, i) => {
            const isEnd = i === 0 || i === stops.length - 1;
            return (
              <li key={stop.station} className={`journey__stop ${isEnd ? "journey__stop--end" : ""}`}>
                <span className="journey__dot" aria-hidden="true">{isEnd && <MapPin size={12} />}</span>
                <div className="journey__info">
                  <span className="journey__time">
                    <Clock size={12} /> {stop.departure ?? stop.arrival}
                  </span>
                  <span className="journey__station">{stop.station}</span>
                  {stop.fareToTerminus > 0 && <span className="journey__fare">from {formatKsh(stop.fareToTerminus)}</span>}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Timetable;
