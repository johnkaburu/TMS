import Link from "next/link";
import { Mail, MapPin, Phone, TrainFront } from "lucide-react";
import { BRAND, CONTACT } from "@/lib/railData";
import SubscribeForm from "@/app/components/shared/SubscribeForm";
import "./footer.scss";

const COLUMNS = [
  {
    title: "Travel",
    links: [
      { href: "/booking", label: "Book a ticket" },
      { href: "/search", label: "Find trains" },
      { href: "/timetable", label: "Timetable" },
      { href: "/#classes", label: "Travel classes" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/contact", label: "Contact us" },
      { href: "/contact#faq", label: "FAQs" },
      { href: "/terms", label: "Terms & conditions" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <Link href="/" className="footer__logo">
            <span className="footer__logo-mark"><TrainFront size={18} /></span>
            {BRAND.name}
          </Link>
          <p className="footer__tagline">{BRAND.tagline}</p>

          <ul className="footer__contact">
            <li><Mail size={15} /> <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
            <li><Phone size={15} /> <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>{CONTACT.phone}</a></li>
            <li><MapPin size={15} /> {CONTACT.location}</li>
          </ul>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.title} className="footer__col" aria-label={col.title}>
            <h3>{col.title}</h3>
            <ul>
              {col.links.map((l) => (
                <li key={l.label}><Link href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="footer__col footer__subscribe">
          <h3>Stay updated</h3>
          <p>Travel alerts and offers, straight to your inbox.</p>
          <SubscribeForm variant="dark" buttonLabel="Join" />
        </div>
      </div>

      <div className="footer__bottom">
        <p>&copy; {year} {BRAND.name}. All rights reserved.</p>
        <Link href="/terms">Terms &amp; conditions</Link>
      </div>
    </footer>
  );
}
