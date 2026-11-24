import React from "react";
import Image from "next/image";
import { BellRing } from "lucide-react";
import SubscribeForm from "../../shared/SubscribeForm";
import bgImage from "../../../../../public/assets/pictures/Interior.png";
import "./newsletter.scss";

const Newsletter = () => (
  <section className="section newsletter">
    <div className="container">
      <div className="newsletter__card">
        <Image src={bgImage} alt="" fill placeholder="blur" sizes="(max-width: 1200px) 100vw, 1180px" className="newsletter__bg" />
        <div className="newsletter__content">
          <span className="newsletter__icon"><BellRing size={22} /></span>
          <h2>Stay in the loop</h2>
          <p>Get schedule changes, new routes and exclusive fares delivered to your inbox.</p>
        </div>
        <div className="newsletter__form">
          <SubscribeForm variant="dark" />
          <small>No spam. Unsubscribe anytime.</small>
        </div>
      </div>
    </div>
  </section>
);

export default Newsletter;
