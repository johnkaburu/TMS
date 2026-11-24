"use client";

import { useState } from "react";

export const useContactInfo = () => {
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return {
    contactName,
    email,
    phone,
    setContactName,
    setEmail,
    setPhone,
  };
};