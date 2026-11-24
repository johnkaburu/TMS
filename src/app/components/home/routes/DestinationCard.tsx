import React from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { ArrowUpRight } from "lucide-react";
import image1 from "../../../../../public/assets/pictures/mombasa.jpg";
import image2 from "../../../../../public/assets/pictures/nairobi.jpg";
import image3 from "../../../../../public/assets/pictures/voi.jpg";
import image4 from "../../../../../public/assets/pictures/naivasha.jpg";

type Destination = {
  image: StaticImageData;
  title: string;
  tag: string;
  description: string;
};

const destinations: Destination[] = [
  { image: image1, title: "Mombasa", tag: "Coast", description: "Relax by the ocean and explore rich Swahili culture." },
  { image: image2, title: "Nairobi", tag: "City", description: "Experience the bustling capital and nearby national parks." },
  { image: image3, title: "Voi", tag: "Safari", description: "Gateway to Tsavo National Park and rich wildlife experiences." },
  { image: image4, title: "Naivasha", tag: "Lakeside", description: "Enjoy serene lakeside views and adventurous activities." },
];

const DestinationCard = () => (
  <div className="destination-grid">
    {destinations.map((d, i) => (
      <Link
        key={d.title}
        href={`/booking?to=${encodeURIComponent(d.title)}`}
        className={`destination ${i === 0 ? "destination--wide" : ""}`}
      >
        <Image src={d.image} alt={d.title} fill placeholder="blur" sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" className="destination__img" />
        <span className="destination__tag">{d.tag}</span>
        <div className="destination__body">
          <h3>{d.title}</h3>
          <p>{d.description}</p>
          <span className="destination__cta">
            Book a trip <ArrowUpRight size={16} />
          </span>
        </div>
      </Link>
    ))}
  </div>
);

export default DestinationCard;
