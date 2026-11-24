import React from "react";
import Image from "next/image";
import { Armchair, ShieldCheck, Ticket } from "lucide-react";
import TripSearchForm from "../../shared/TripSearchForm";
import heroImage from "../../../../../public/assets/pictures/pexels-donaldtong94-28614.jpg";
import "./landing.scss";

const FEATURES = [
  { icon: <Ticket size={18} />, title: "Instant e-tickets", text: "Sent to your email" },
  { icon: <Armchair size={18} />, title: "Choose your seat", text: "Interactive seat map" },
  { icon: <ShieldCheck size={18} />, title: "Secure booking", text: "Your data stays private" },
];

const Landing = () => (
  <section className="hero">
    <Image src={heroImage} alt="" fill priority placeholder="blur" sizes="100vw" className="hero__bg" />

    <div className="hero__inner">
      <div className="hero__content">
        <h1 className="hero__title">
          Your journey <span>starts here.</span>
        </h1>
        <p className="hero__subtitle">
          From Nairobi to Mombasa and beyond. Compare classes, pick your seat and book in seconds.
        </p>

        <ul className="hero__features">
          {FEATURES.map((f) => (
            <li key={f.title}>
              <span className="hero__feature-icon">{f.icon}</span>
              <span>
                <strong>{f.title}</strong>
                <small>{f.text}</small>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="hero__card">
        <h2 className="hero__card-title">Where to next?</h2>
        <TripSearchForm />
      </div>
    </div>
  </section>
);

export default Landing;
