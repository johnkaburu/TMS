// Shared static data for the RailEase front-end.
// Single source for stations, fares and schedules used across pages.

import type { TimeSlot } from "@/app/booking/types/booking";

export const BRAND = {
  name: "RailEase",
  tagline: "Reliable rail travel across Kenya — book in seconds.",
};

export const CONTACT = {
  email: "support@trainbooking.com",
  phone: "+254 712 345 678",
  location: "Nairobi, Kenya",
};

// Single source of truth for bookable stations (used by the booking hook too)
export const STATIONS = ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Naivasha", "Eldoret", "Malindi", "Voi"] as const;

export const isStation = (value: string | null | undefined): value is string =>
  !!value && (STATIONS as readonly string[]).includes(value);

export const TIME_SLOTS: { value: TimeSlot; label: string }[] = [
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Evening" },
];

export type FareClassId = "economy" | "business" | "first";

export interface FareClass {
  id: FareClassId;
  name: string;
  price: number; // KSh per passenger, per trip
  tagline: string;
  features: string[];
  featured?: boolean;
}

export const FARE_CLASSES: FareClass[] = [
  {
    id: "economy",
    name: "Economy",
    price: 1200,
    tagline: "Comfortable, everyday travel",
    features: ["Standard seating", "Free WiFi access", "One carry-on bag", "Complimentary water"],
  },
  {
    id: "business",
    name: "Business",
    price: 2500,
    tagline: "Extra space and priority service",
    featured: true,
    features: [
      "Premium reclining seats",
      "Free WiFi & power outlets",
      "Two checked bags",
      "Complimentary meal & drinks",
      "Priority boarding",
      "Extra legroom",
    ],
  },
  {
    id: "first",
    name: "First",
    price: 4800,
    tagline: "The finest way to travel",
    features: [
      "Luxury private cabins",
      "Free WiFi access",
      "Unlimited checked bags",
      "Gourmet dining service",
      "Priority boarding & lounge",
    ],
  },
];

export const formatKsh = (amount: number) => `KSh ${amount.toLocaleString("en-KE")}`;

export interface TrainStop {
  station: string;
  arrival: string | null; // 24h "HH:MM"
  departure: string | null;
  fareToTerminus: number; // Economy fare from this stop to the final station
}

export const EXPRESS_SERVICE = {
  name: "Coast Express",
  from: "Nairobi",
  to: "Mombasa Terminus",
  stops: [
    { station: "Nairobi", arrival: null, departure: "06:30", fareToTerminus: 1200 },
    { station: "Athi River", arrival: "07:00", departure: "07:05", fareToTerminus: 1100 },
    { station: "Emali", arrival: "08:00", departure: "08:05", fareToTerminus: 950 },
    { station: "Mtito Andei", arrival: "09:00", departure: "09:10", fareToTerminus: 800 },
    { station: "Voi", arrival: "10:30", departure: "10:40", fareToTerminus: 650 },
    { station: "Miasenyi", arrival: "11:30", departure: "11:35", fareToTerminus: 500 },
    { station: "Mombasa Terminus", arrival: "12:30", departure: null, fareToTerminus: 0 },
  ] as TrainStop[],
};

/** Minutes between two "HH:MM" strings. */
export const minutesBetween = (a: string, b: string) => {
  const [ah, am] = a.split(":").map(Number);
  const [bh, bm] = b.split(":").map(Number);
  return bh * 60 + bm - (ah * 60 + am);
};

export const formatDuration = (mins: number) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
};

export const LAST_BOOKING_KEY = "railease:lastBooking";
