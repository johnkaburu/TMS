import React from "react";
import Link from "next/link";
import { ArrowRight, Armchair, Briefcase, Check, Crown, Sparkles } from "lucide-react";
import { FARE_CLASSES, FareClassId } from "@/lib/railData";
import "./packages.scss";

const ICONS: Record<FareClassId, React.ReactNode> = {
  economy: <Armchair size={20} />,
  business: <Briefcase size={20} />,
  first: <Crown size={20} />,
};

const Packages = () => (
  <section className="section classes" id="classes">
    <div className="container">
      <div className="section-head">
        <span className="eyebrow"><Sparkles size={14} /> Travel classes</span>
        <h2 className="section-title">Find a class that&apos;s right for you</h2>
        <p className="section-lead">Simple per-trip pricing. Every ticket comes with a 7-day cancellation period.</p>
      </div>

      <div className="classes__grid">
        {FARE_CLASSES.map((c) => (
          <article key={c.id} className={`fare ${c.featured ? "fare--featured" : ""}`}>
            {c.featured && <span className="fare__ribbon">Most popular</span>}

            <header className="fare__head">
              <span className="fare__icon">{ICONS[c.id]}</span>
              <div>
                <h3 className="fare__name">{c.name}</h3>
                <p className="fare__tagline">{c.tagline}</p>
              </div>
            </header>

            <p className="fare__price">
              <span className="fare__currency">KSh</span>
              <span className="fare__amount">{c.price.toLocaleString("en-KE")}</span>
              <span className="fare__per">/ trip</span>
            </p>

            <ul className="fare__features">
              {c.features.map((f) => (
                <li key={f}><Check size={16} strokeWidth={3} /> {f}</li>
              ))}
            </ul>

            <Link href={`/booking?class=${c.id}`} className={`btn btn--block ${c.featured ? "btn--primary" : "btn--outline"}`}>
              Book {c.name} <ArrowRight size={16} className="btn__arrow" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Packages;
