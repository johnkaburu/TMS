"use client";

import React from "react";
import { Mail, Phone, User, UserRound } from "lucide-react";
import type { BookingHook } from "../hooks/useBookingLogic";
import { Field, Section } from "./ui";

const ContactInfoForm: React.FC<{ booking: BookingHook; complete?: boolean }> = ({ booking, complete }) => {
  const { contactName, email, phone, setContactName, setEmail, setPhone, isSubmitting } = booking;

  return (
    <Section
      step={1}
      icon={<UserRound size={18} />}
      title="Contact Information"
      description="We'll send your e-ticket and trip updates here."
      complete={complete}
    >
      <div className="grid grid--3">
        <Field label="Full name" icon={<User size={16} />}>
          <input
            placeholder="Full Name"
            autoComplete="name"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </Field>
        <Field label="Email address" icon={<Mail size={16} />}>
          <input
            placeholder="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </Field>
        <Field label="Phone number" icon={<Phone size={16} />} hint="10–15 digits">
          <input
            placeholder="Phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </Field>
      </div>
    </Section>
  );
};

export default ContactInfoForm;
