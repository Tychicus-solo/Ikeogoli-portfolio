import React from "react";
import { Tags, ThemedImage } from "../../components";

const ABOUT_COPY = [
  "Heyo! I'm Ikeogoli Ishie, a highly proficient Product Designer based in Lagos, Nigeria. I specialize in creating user-friendly software for both web and mobile platforms. Throughout my career, I've been fortunate to contribute to solutions that not only delight users but also meet business goals across various industries, including SaaS, fintech, B2B, B2C, e-commerce, real estate, telco, social media and more.",
  "With a background in Engineering, my love for problem-solving naturally led me to product design, where I've developed my skills to create seamless and enjoyable user experiences.",
  "Outside of design, I enjoy football, whether playing or watching, along with playing video games and streaming anime. These hobbies are more than just fun; they sharpen my eye for detail and keep my creativity flowing.",
  "I approach every project with a deep level of care and dedication, always striving to create solutions that truly connect with users around the globe.",
];

const AboutMe = () => {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="about-copy">
        <Tags label="About me" color="#FFB31F" />
        <h2 className="about-title" id="about-title">
          Get to know me
        </h2>
        <div className="about-body">
          {ABOUT_COPY.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="about-photos" aria-label="Photos of Ikeogoli">
        <div className="about-photo about-photo-top">
          <ThemedImage
            src="/assets/dark mode images/figma/about-ike-1.png"
            alt="Ikeogoli standing outdoors"
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 48vw, 24vw"
            className="about-photo-img"
          />
        </div>
        <div className="about-photo about-photo-tall">
          <ThemedImage
            src="/assets/dark mode images/figma/about-ike-2.png"
            alt="Ikeogoli standing indoors"
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 48vw, 24vw"
            className="about-photo-img"
          />
        </div>
        <div className="about-photo about-photo-bottom">
          <ThemedImage
            src="/assets/dark mode images/figma/about-ike-3.png"
            alt="Ikeogoli by the water"
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 48vw, 24vw"
            className="about-photo-img"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
