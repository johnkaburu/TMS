import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown, HelpCircle, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import PageHero from "../components/shared/PageHero";
import ContactForm from "./ContactForm";
import { CONTACT } from "@/lib/railData";
import heroImage from "../../../public/assets/pictures/personalized-service.jpg";
import "./contact.scss";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the RailEase support team.",
};

const CHANNELS = [
  { icon: <Mail size={20} />, title: "Email us", value: CONTACT.email, href: `mailto:${CONTACT.email}`, note: "For bookings, refunds and general questions" },
  { icon: <Phone size={20} />, title: "Call us", value: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\s/g, "")}`, note: "Speak directly with our support team" },
  { icon: <MapPin size={20} />, title: "Visit us", value: CONTACT.location, note: "Head office" },
];

const FAQS = [
  {
    q: "How do I book a ticket?",
    a: (
      <>
        Go to the <Link href="/booking">booking page</Link>, enter your contact details, choose your route and travel date, add travellers and
        pick your seats. Your e-ticket is sent to the email you provide.
      </>
    ),
  },
  {
    q: "How many passengers can I book at once?",
    a: "You can book up to 10 passengers in a single booking. Each traveller gets their own seat on the seat map.",
  },
  {
    q: "Can children travel?",
    a: "Yes. Children travel with a guardian, and the guardian's name and ID number are required for each child during booking.",
  },
  {
    q: "What is the cancellation policy?",
    a: (
      <>
        Every ticket includes a 7-day cancellation period. See our <Link href="/terms#cancellations">terms &amp; conditions</Link> for details.
      </>
    ),
  },
  {
    q: "What's the difference between the travel classes?",
    a: (
      <>
        Economy offers standard seating, Business adds extra legroom, meals and priority boarding, and First includes private cabins and lounge
        access. Compare them on the <Link href="/#classes">home page</Link>.
      </>
    ),
  },
];

export default function ContactPage() {
  return (
    <div className="contact-page">
      <PageHero
        eyebrow="Support"
        icon={<MessageCircle size={16} />}
        title="We're here to help"
        subtitle="Questions about a booking, a refund or your journey? Reach out and our team will get back to you."
        image={heroImage}
        overlap
      />

      <div className="contact-page__channels">
        {CHANNELS.map((c) => {
          const inner = (
            <>
              <span className="channel__icon">{c.icon}</span>
              <span className="channel__title">{c.title}</span>
              <span className="channel__value">{c.value}</span>
              <span className="channel__note">{c.note}</span>
            </>
          );
          return c.href ? (
            <a key={c.title} href={c.href} className="channel channel--link">{inner}</a>
          ) : (
            <div key={c.title} className="channel">{inner}</div>
          );
        })}
      </div>

      <div className="contact-page__grid">
        <section className="contact-card">
          <h2 className="contact-card__title">Send us a message</h2>
          <p className="contact-card__desc">Fill in the form and we&apos;ll reply by email.</p>
          <ContactForm />
        </section>

        <section className="faq" id="faq">
          <span className="eyebrow"><HelpCircle size={14} /> FAQ</span>
          <h2 className="faq__title">Frequently asked questions</h2>
          <div className="faq__list">
            {FAQS.map((f, i) => (
              <details key={f.q} className="faq__item" open={i === 0}>
                <summary>
                  {f.q}
                  <ChevronDown size={18} aria-hidden="true" />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
