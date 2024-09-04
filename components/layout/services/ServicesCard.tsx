import Image from "next/image";
import React from "react";

const ServicesCard = ({
  img,
  title,
  description,
}: {
  img: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="max-w-60  ">
      <div className="feature">
        <div className="relative before:absolute before:w-8 before:h-8 before:bg-primary/30  before:content-[''] before:rounded-full before:-right-2 before:bottom-0 mb-2 inline-block">
          <Image
            src={img}
            width={40}
            height={40}
            className="bg-cover"
            alt="feature icon"
          />
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ServicesCard;
