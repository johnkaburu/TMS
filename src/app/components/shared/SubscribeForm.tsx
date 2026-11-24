"use client";

import React, { useState } from "react";
import { CheckCircle2, Mail, Send } from "lucide-react";
import "./subscribeForm.scss";

interface Props {
  variant?: "light" | "dark";
  buttonLabel?: string;
}

// NOTE: front-end only — wire `onSubmit` to a real mailing-list endpoint when available.
const SubscribeForm: React.FC<Props> = ({ variant = "light", buttonLabel = "Subscribe" }) => {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
  };

  if (done) {
    return (
      <p className={`subscribe subscribe--${variant} subscribe__done`} role="status">
        <CheckCircle2 size={18} /> Thanks! <strong>{email}</strong> is on the list.
      </p>
    );
  }

  return (
    <form className={`subscribe subscribe--${variant}`} onSubmit={handleSubmit}>
      <label className="subscribe__field">
        <span className="sr-only">Email address</span>
        <Mail size={16} aria-hidden="true" />
        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <button type="submit" className="btn btn--primary">
        {buttonLabel} <Send size={15} />
      </button>
    </form>
  );
};

export default SubscribeForm;
