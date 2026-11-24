import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarClock, Clock, MapPin, Moon, Sun, Sunrise, Timer, TrainFront, Wallet } from "lucide-react";
import PageHero from "../components/shared/PageHero";
import { EXPRESS_SERVICE, FARE_CLASSES, TIME_SLOTS, formatDuration, formatKsh, minutesBetween } from "@/lib/railData";
import heroImage from "../../../public/assets/pictures/fares-schedules.jpg";
import "./timetable.scss";

export const metadata: Metadata = {
  title: "Timetable",
  description: "Train schedules, stops and fares on the Nairobi – Mombasa route.",
};

const SLOT_ICONS = { morning: <Sunrise size={18} />, afternoon: <Sun size={18} />, evening: <Moon size={18} /> };

export default function TimetablePage() {
  const { name, stops } = EXPRESS_SERVICE;
  const first = stops[0];
  const last = stops[stops.length - 1];
  const totalMins = minutesBetween(first.departure!, last.arrival!);

  const stats = [
    { icon: <Clock size={18} />, label: "Departs", value: first.departure },
    { icon: <MapPin size={18} />, label: "Arrives", value: last.arrival },
    { icon: <Timer size={18} />, label: "Journey time", value: formatDuration(totalMins) },
    { icon: <TrainFront size={18} />, label: "Stops", value: `${stops.length - 2} intermediate` },
  ];

  return (
    <div className="timetable-page">
      <PageHero
        eyebrow="Schedules & fares"
        icon={<CalendarClock size={16} />}
        title="Train timetable"
        subtitle="Plan your trip with up-to-date departure times, stops and fares along the route."
        image={heroImage}
        overlap
      />

      <div className="timetable-page__layout">
        <div className="timetable-page__main">
          {/* Service overview */}
          <section className="tt-card tt-service">
            <div className="tt-service__head">
              <div>
                <span className="badge"><TrainFront size={12} /> Daily service</span>
                <h2 className="tt-service__name">{name}</h2>
                <p className="tt-service__route">
                  {first.station} <ArrowRight size={16} /> {last.station}
                </p>
              </div>
              <Link href={`/search?from=Nairobi&to=Mombasa`} className="btn btn--primary">
                Book this route <ArrowRight size={16} className="btn__arrow" />
              </Link>
            </div>

            <dl className="tt-stats">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt>{s.icon} {s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Stops */}
          <section className="tt-card">
            <h2 className="tt-card__title">Stops &amp; times</h2>
            <p className="tt-card__desc">Economy fares shown are from each station to {last.station}.</p>

            <div className="tt-table-wrap">
              <table className="tt-table">
                <thead>
                  <tr>
                    <th scope="col">Station</th>
                    <th scope="col">Arrives</th>
                    <th scope="col">Departs</th>
                    <th scope="col" className="num">Fare</th>
                  </tr>
                </thead>
                <tbody>
                  {stops.map((s, i) => {
                    const terminal = i === 0 || i === stops.length - 1;
                    return (
                      <tr key={s.station} className={terminal ? "is-terminal" : ""}>
                        <th scope="row">
                          <span className="tt-table__stop">
                            <span className="tt-table__dot" aria-hidden="true" />
                            {s.station}
                            {i === 0 && <span className="badge badge--soft">Origin</span>}
                            {i === stops.length - 1 && <span className="badge badge--soft">Terminus</span>}
                          </span>
                        </th>
                        <td>{s.arrival ?? <span className="muted">—</span>}</td>
                        <td>{s.departure ?? <span className="muted">—</span>}</td>
                        <td className="num">{s.fareToTerminus ? formatKsh(s.fareToTerminus) : <span className="muted">—</span>}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <aside className="timetable-page__side">
          <section className="tt-card">
            <h2 className="tt-card__title"><Wallet size={18} /> Fares by class</h2>
            <ul className="tt-fares">
              {FARE_CLASSES.map((c) => (
                <li key={c.id} className={c.featured ? "is-featured" : ""}>
                  <span>
                    <strong>{c.name}</strong>
                    <small>{c.tagline}</small>
                  </span>
                  <span className="tt-fares__price">{formatKsh(c.price)}</span>
                </li>
              ))}
            </ul>
            <p className="tt-card__note">Per passenger, per trip. 7-day cancellation period included.</p>
          </section>

          <section className="tt-card">
            <h2 className="tt-card__title"><Clock size={18} /> Departure windows</h2>
            <p className="tt-card__desc">When booking, choose the time of day that suits you.</p>
            <ul className="tt-slots">
              {TIME_SLOTS.map((t) => (
                <li key={t.value}>
                  <span className="tt-slots__icon">{SLOT_ICONS[t.value]}</span>
                  {t.label}
                </li>
              ))}
            </ul>
          </section>

          <div className="tt-cta">
            <h3>Ready to travel?</h3>
            <p>Pick your seat and get your e-ticket in minutes.</p>
            <Link href="/booking" className="btn btn--light btn--block">
              Book a ticket <ArrowRight size={16} className="btn__arrow" />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
