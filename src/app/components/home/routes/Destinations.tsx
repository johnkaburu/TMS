import React from "react";
import { Compass } from "lucide-react";
import DestinationCard from "./DestinationCard";
import "./Destinations.scss";

const Destinations = () => (
  <section className="section section--muted destinations">
    <div className="container">
      <div className="section-head">
        <span className="eyebrow"><Compass size={14} /> Explore</span>
        <h2 className="section-title">Popular destinations</h2>
        <p className="section-lead">Discover top travel spots served by our trains, from coastal beaches to lakeside escapes.</p>
      </div>

      <DestinationCard />
    </div>
  </section>
);

export default Destinations;
