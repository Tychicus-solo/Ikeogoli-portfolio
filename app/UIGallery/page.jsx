import React from "react";
import { Tags, ThemedImage } from "../../components";

const GALLERY_IMAGES = Array.from({ length: 8 }, (_, index) => {
  const imageNumber = index + 1;

  return {
    src: `/assets/dark mode images/gallery-img-${imageNumber}.png`,
    alt: `UI gallery shot ${imageNumber}`,
  };
});

const UIGallery = () => {
  return (
    <section className="ui-gallery-section" aria-labelledby="ui-gallery-title">
      <div className="ui-gallery-inner">
        <div className="ui-gallery-header">
          <Tags label="Shots" color="#2CBDF2" />
          <h2 className="ui-gallery-title" id="ui-gallery-title">
            UI Gallery
          </h2>
        </div>

        <div className="ui-gallery-grid">
          {GALLERY_IMAGES.map((image, index) => (
            <div className="ui-gallery-item" key={image.src}>
              <ThemedImage
                src={image.src}
                alt={image.alt}
                width={1086}
                height={954}
                loading={index < 2 ? "eager" : "lazy"}
                fetchPriority={index < 2 ? "high" : undefined}
                sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1279px) calc(100vw - 128px), 724px"
                className="ui-gallery-image"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UIGallery;
