"use client";

import { IKImage } from "imagekitio-next";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

const Image = () => {
  return (
    <IKImage
      urlEndpoint={urlEndpoint}
      path="default-image.jpg"
      width={400}
      height={400}
      alt="Alt text"
      loading="lazy"
    />
  );
};

export default Image;
