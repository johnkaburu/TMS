import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./styles/base.scss";
import Navbar from "./layout/navbar/navbar";
import Footer from "./layout/footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "RailEase — Train tickets across Kenya",
    template: "%s · RailEase",
  },
  description: "Search timetables, compare classes and book train tickets across Kenya in seconds.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
