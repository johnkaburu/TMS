"use client";

import React from "react";
import { Baby, IdCard, User, Users } from "lucide-react";
import type { BookingHook } from "../hooks/useBookingLogic";
import { Field, Section, Stepper } from "./ui";

const MAX_PASSENGERS = 10;

const TravellersForm: React.FC<{ booking: BookingHook; complete?: boolean }> = ({ booking, complete }) => {
  const {
    adults,
    children,
    setAdults,
    setChildren,
    adultDetails,
    childDetails,
    updateAdultDetail,
    updateChildDetail,
    isSubmitting,
  } = booking;

  const atCapacity = adults + children >= MAX_PASSENGERS;

  return (
    <Section
      step={3}
      icon={<Users size={18} />}
      title="Travellers"
      description={`Up to ${MAX_PASSENGERS} passengers per booking.`}
      complete={complete}
    >
      <div className="grid grid--2">
        <Stepper label="Adults" sublabel="18 years and above" value={adults} max={atCapacity ? adults : MAX_PASSENGERS} onChange={setAdults} disabled={isSubmitting} />
        <Stepper label="Children" sublabel="Travelling with a guardian" value={children} max={atCapacity ? children : MAX_PASSENGERS} onChange={setChildren} disabled={isSubmitting} />
      </div>

      {(adults > 0 || children > 0) && (
        <div className="passengers">
          {adultDetails.map((a, idx) => (
            <div className="passenger" key={`adult-${idx}`}>
              <div className="passenger__head">
                <span className="passenger__avatar"><User size={16} /></span>
                <span className="passenger__title">Adult {idx + 1}</span>
              </div>
              <div className="grid grid--2">
                <Field label="Full name" icon={<User size={16} />}>
                  <input placeholder={`Adult ${idx + 1} Name`} value={a.name} onChange={(e) => updateAdultDetail(idx, "name", e.target.value)} required disabled={isSubmitting} />
                </Field>
                <Field label="ID / Passport no." icon={<IdCard size={16} />}>
                  <input placeholder={`Adult ${idx + 1} ID`} value={a.id} onChange={(e) => updateAdultDetail(idx, "id", e.target.value)} required disabled={isSubmitting} />
                </Field>
              </div>
            </div>
          ))}

          {childDetails.map((c, idx) => (
            <div className="passenger passenger--child" key={`child-${idx}`}>
              <div className="passenger__head">
                <span className="passenger__avatar"><Baby size={16} /></span>
                <span className="passenger__title">Child {idx + 1}</span>
                <span className="passenger__tag">Guardian details</span>
              </div>
              <div className="grid grid--2">
                <Field label="Guardian name" icon={<User size={16} />}>
                  <input placeholder={`Child ${idx + 1} Guardian Name`} value={c.guardianName} onChange={(e) => updateChildDetail(idx, "guardianName", e.target.value)} required disabled={isSubmitting} />
                </Field>
                <Field label="Guardian ID" icon={<IdCard size={16} />}>
                  <input placeholder={`Child ${idx + 1} Guardian ID`} value={c.guardianId} onChange={(e) => updateChildDetail(idx, "guardianId", e.target.value)} required disabled={isSubmitting} />
                </Field>
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
};

export default TravellersForm;
