import React from "react";
import Image, { StaticImageData } from "next/image";
import "./pageHero.scss";

interface PageHeroProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  eyebrow?: string;
  icon?: React.ReactNode;
  image?: StaticImageData;
  /** Extra bottom padding so the next block can overlap the hero. */
  overlap?: boolean;
  children?: React.ReactNode;
}

const PageHero: React.FC<PageHeroProps> = ({ title, subtitle, eyebrow, icon, image, overlap, children }) => (
  <header className={`page-hero ${overlap ? "page-hero--overlap" : ""} ${image ? "page-hero--image" : ""}`}>
    {image && <Image src={image} alt="" fill priority sizes="100vw" className="page-hero__bg" placeholder="blur" />}
    <div className="page-hero__inner">
      {eyebrow && (
        <span className="page-hero__eyebrow">
          {icon}
          {eyebrow}
        </span>
      )}
      <h1 className="page-hero__title">{title}</h1>
      {subtitle && <p className="page-hero__subtitle">{subtitle}</p>}
      {children}
    </div>
  </header>
);

export default PageHero;
