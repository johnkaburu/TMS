import type { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";
import PageHero from "../components/shared/PageHero";
import { BRAND, CONTACT } from "@/lib/railData";
import heroImage from "../../../public/assets/pictures/terms-conditions.jpg";
import "./terms.scss";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for booking and travelling with RailEase.",
};

// NOTE: template content derived from the app's booking rules — have it reviewed before going live.
const LAST_UPDATED = "23 November 2026";

const SECTIONS: { id: string; title: string; body: React.ReactNode }[] = [
  {
    id: "bookings",
    title: "Bookings",
    body: (
      <>
        <p>
          A booking is confirmed once you have provided valid contact details, selected your route, travel date, departure window and travel
          class, and chosen a seat for every traveller. Your e-ticket is sent to the email address you provide.
        </p>
        <p>A single booking may include up to 10 passengers. Please check all details carefully before confirming.</p>
      </>
    ),
  },
  {
    id: "identification",
    title: "Tickets & identification",
    body: (
      <>
        <p>
          Each adult passenger must carry a valid national ID or passport matching the details given at booking. Tickets are
          non-transferable and may be checked before boarding and on the train.
        </p>
        <p>Please arrive at the station early enough to complete security screening and boarding before departure.</p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <p>
        Children must travel with a guardian. The guardian&apos;s name and ID number are required for each child at booking, and the guardian is
        responsible for the child throughout the journey. Each child is allocated their own seat.
      </p>
    ),
  },
  {
    id: "cancellations",
    title: "Cancellations & refunds",
    body: (
      <>
        <p>
          Every ticket includes a 7-day cancellation period from the time of booking, provided the cancellation is made before the scheduled
          departure. Refunds are returned to the original payment method.
        </p>
        <p>
          To cancel, <Link href="/contact">contact our support team</Link> with your booking reference.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to your journey",
    body: (
      <p>
        Date, time or class changes are subject to availability and any fare difference. {BRAND.name} may change schedules, rolling stock or
        seat allocations for operational reasons and will notify you using the contact details on your booking.
      </p>
    ),
  },
  {
    id: "baggage",
    title: "Baggage allowance",
    body: (
      <>
        <ul>
          <li><strong>Economy:</strong> one carry-on bag.</li>
          <li><strong>Business:</strong> two checked bags.</li>
          <li><strong>First:</strong> unlimited checked bags.</li>
        </ul>
        <p>Passengers are responsible for their personal belongings at all times.</p>
      </>
    ),
  },
  {
    id: "prohibited",
    title: "Prohibited items & conduct",
    body: (
      <p>
        Dangerous goods, weapons, flammable substances and illegal items are not permitted on board. Passengers must follow staff
        instructions and respect fellow travellers. We may refuse travel to anyone who endangers safety or comfort on board.
      </p>
    ),
  },
  {
    id: "privacy",
    title: "Privacy",
    body: (
      <p>
        Personal details collected during booking — including names, ID numbers, email and phone number — are used only to process your
        booking, verify identity at boarding and send journey updates. We do not sell your personal data.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Questions about these terms? Email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or call {CONTACT.phone}.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <div className="terms-page">
      <PageHero
        eyebrow="Legal"
        icon={<FileText size={16} />}
        title="Terms & Conditions"
        subtitle={`Please read these terms before booking. Last updated ${LAST_UPDATED}.`}
        image={heroImage}
      />

      <div className="terms-page__layout">
        <nav className="terms-toc" aria-label="On this page">
          <span className="terms-toc__title">On this page</span>
          <ol>
            {SECTIONS.map((s) => (
              <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>
            ))}
          </ol>
        </nav>

        <article className="terms-body">
          {SECTIONS.map((s, i) => (
            <section key={s.id} id={s.id} className="terms-body__section">
              <h2><span>{String(i + 1).padStart(2, "0")}</span> {s.title}</h2>
              {s.body}
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
