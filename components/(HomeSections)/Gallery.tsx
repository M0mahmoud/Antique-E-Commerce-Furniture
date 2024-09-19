import { useTranslations } from "next-intl";
import Image from "next/image";

import img1 from "@/images/gallery/1234.jpg";
import img2 from "@/images/gallery/124356.jpg";
import img3 from "@/images/gallery/2.png";
import img4 from "@/images/gallery/23523523.jpg";
import img5 from "@/images/gallery/4.png";
import img6 from "@/images/gallery/4646.jpg";
import img7 from "@/images/gallery/46767554.jpg";
import img8 from "@/images/gallery/5792679.jpg";
import img9 from "@/images/gallery/66854.jpg";
import img11 from "@/images/gallery/img-grid-1.jpg";
import img12 from "@/images/gallery/img-grid-2.jpg";
import img13 from "@/images/gallery/img-grid-3.jpg";

const Gallery = () => {
  const t = useTranslations("gallery");
  const images = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img11,
    img12,
    img13,
  ];
  return (
    <section id="gallery">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">{t("title")}</h1>
        <p className="text-lg text-gray-600 text-center mb-8">{t("desc")}</p>
        <div className="columns-3xs gap-4">
          {images.map((img, index) => (
            <div key={index} className="relative mb-4">
              <Image
                width={500}
                height={320}
                src={img}
                alt="Gallery Image"
                className="object-cover rounded-lg"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
