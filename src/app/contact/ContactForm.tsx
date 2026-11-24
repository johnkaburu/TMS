"use client";

import React, { useState } from "react";
import { CheckCircle2, Loader2, Mail, Send, User } from "lucide-react";

const SUBJECTS = ["Booking enquiry", "Change or cancel a booking", "Refunds", "Feedback", "Other"];

// NOTE: front-end only — replace the simulated delay with a real API / Firestore call.
const ContactForm: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: SUBJECTS[0], message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("sent");
  };

  if (status === "sent") {
    return (
      <div className="contact-success" role="status">
        <span className="contact-success__icon"><CheckCircle2 size={28} /></span>
        <h3>Message sent</h3>
        <p>
          Thanks, {form.name.split(" ")[0] || "there"}. We&apos;ll reply to <strong>{form.email}</strong> as soon as possible.
        </p>
        <button
          type="button"
          className="btn btn--outline"
          onClick={() => {
            setForm({ name: "", email: "", subject: SUBJECTS[0], message: "" });
            setStatus("idle");
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form__row">
        <label>
          <span className="label">Full name</span>
          <span className="input-icon">
            <User size={16} />
            <input className="input" value={form.name} onChange={update("name")} placeholder="Jane Wanjiku" autoComplete="name" required disabled={sending} />
          </span>
        </label>
        <label>
          <span className="label">Email address</span>
          <span className="input-icon">
            <Mail size={16} />
            <input className="input" type="email" value={form.email} onChange={update("email")} placeholder="you@example.com" autoComplete="email" required disabled={sending} />
          </span>
        </label>
      </div>

      <label>
        <span className="label">Subject</span>
        <select className="input" value={form.subject} onChange={update("subject")} disabled={sending}>
          {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
        </select>
      </label>

      <label>
        <span className="label">Message</span>
        <textarea className="input" value={form.message} onChange={update("message")} placeholder="How can we help?" rows={6} required disabled={sending} />
      </label>

      <button type="submit" className="btn btn--primary btn--lg" disabled={sending}>
        {sending ? <><Loader2 size={18} className="spin" /> Sending…</> : <>Send message <Send size={16} /></>}
      </button>
    </form>
  );
};

export default ContactForm;
