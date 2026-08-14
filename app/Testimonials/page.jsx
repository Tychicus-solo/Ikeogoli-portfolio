"use client";

import { gsap } from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { ThemedImage } from "../../components";

const SKILLS = [
  {
    label: "Creativity",
    icon: "/assets/dark mode images/figma/skill-creativity.svg",
  },
  {
    label: "Problem solving",
    icon: "/assets/dark mode images/figma/skill-problem-solving.svg",
  },
  {
    label: "Communication",
    icon: "/assets/dark mode images/figma/skill-communication.svg",
  },
  {
    label: "Collaboration",
    icon: "/assets/dark mode images/figma/skill-collaboration.svg",
  },
  {
    label: "Critical thinking",
    icon: "/assets/dark mode images/figma/skill-critical-thinking.svg",
  },
  {
    label: "Teamwork",
    icon: "/assets/dark mode images/figma/skill-teamwork.svg",
  },
  {
    label: "Empathy",
    icon: "/assets/dark mode images/figma/skill-empathy.svg",
  },
  {
    label: "Adaptability",
    icon: "/assets/dark mode images/figma/skill-adaptability.svg",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Ikeogoli is a highly proficient designer with an eye for detail that I haven't seen in a long time. He's really a delight to work with, and his work ethic is very commendable, always creating astounding work in record time. He is always able to provide valuable feedback whenever there's a blocker and proffer solid solutions",
    name: "Adetunji Ademuyiwa",
    role: "CTO at Pertinence Group",
    avatar: "/assets/dark mode images/figma/testimonials/tunji.png",
  },
  {
    quote:
      "Ikeogoli brings a level of creativity and innovation that's truly inspiring. His ability to think outside the box and deliver unique designs sets him apart. Working with him is a pleasure, and his passion for design is evident in every project. He was able to deliver top-class elegant work in our product, I totally recommend him",
    name: "Abiodun O.",
    role: "Founder at Lyvads",
    avatar: "/assets/dark mode images/figma/testimonials/chinedu.png",
  },
  {
    quote:
      "Ikeogoli is not just a talented designer but also a fantastic team player. He is everything you'd wish for in a designer-engineer collaboration. His ability to listen, understand, and incorporate feedback into his work makes collaboration seamless. He's approachable, communicative, and always goes the extra mile to ensure maximum satisfaction.",
    name: "Emmanuel Okeibunor",
    role: "Software Engineer at Pettysave",
    avatar: "/assets/dark mode images/emmanuel.png",
  },
  {
    quote:
      "Ikeogoli has a remarkable talent for problem-solving through design. His adaptability in tackling complex challenges and turning them into intuitive solutions is impressive. He's always ready to pivot and find the best approach, making him an invaluable asset to any project. He's simply the best and I'm glad we worked together.",
    name: "Christian Sada",
    role: "Product Manager at Icheta",
    avatar: "/assets/dark mode images/christian.png",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const directionRef = useRef(1);
  const hasMountedRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const skillsTrackRef = useRef(null);
  const skillsGroupRef = useRef(null);
  const testimonialCardRef = useRef(null);
  const activeTestimonial = TESTIMONIALS[activeIndex];

  useEffect(() => {
    const track = skillsTrackRef.current;
    const firstGroup = skillsGroupRef.current;

    if (!track || !firstGroup) {
      return undefined;
    }

    const measureMarquee = () => {
      const styles = window.getComputedStyle(track);
      const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
      const distance = firstGroup.getBoundingClientRect().width + gap;

      track.style.setProperty("--testimonials-marquee-distance", `${distance}px`);
      track.style.setProperty("--testimonials-marquee-duration", "10s");
    };

    measureMarquee();

    const resizeObserver = new ResizeObserver(measureMarquee);
    resizeObserver.observe(firstGroup);
    resizeObserver.observe(track);
    window.addEventListener("resize", measureMarquee);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measureMarquee);
    };
  }, []);

  useEffect(() => {
    const card = testimonialCardRef.current;

    if (!card) {
      return;
    }

    gsap.killTweensOf(card);

    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      gsap.set(card, { autoAlpha: 1, x: 0, filter: "blur(0px)" });
      return;
    }

    gsap.fromTo(
      card,
      {
        autoAlpha: 0,
        x: 28 * directionRef.current,
        filter: "blur(6px)",
      },
      {
        autoAlpha: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 0.45,
        ease: "power3.out",
        clearProps: "filter",
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      }
    );

    return () => {
      gsap.killTweensOf(card);
    };
  }, [activeIndex]);

  const showTestimonial = (nextIndex) => {
    if (nextIndex === activeIndex || isAnimatingRef.current) {
      return;
    }

    const card = testimonialCardRef.current;
    const isWrappingForward =
      activeIndex === TESTIMONIALS.length - 1 && nextIndex === 0;
    const isWrappingBackward =
      activeIndex === 0 && nextIndex === TESTIMONIALS.length - 1;
    const direction =
      isWrappingForward || (!isWrappingBackward && nextIndex > activeIndex)
        ? 1
        : -1;

    directionRef.current = direction;

    if (!card) {
      setActiveIndex(nextIndex);
      return;
    }

    isAnimatingRef.current = true;
    gsap.killTweensOf(card);
    gsap.to(card, {
      autoAlpha: 0,
      x: -28 * direction,
      filter: "blur(6px)",
      duration: 0.24,
      ease: "power2.in",
      onComplete: () => {
        setActiveIndex(nextIndex);
      },
    });
  };

  const showPrevious = () => {
    showTestimonial(activeIndex === 0 ? TESTIMONIALS.length - 1 : activeIndex - 1);
  };

  const showNext = () => {
    showTestimonial((activeIndex + 1) % TESTIMONIALS.length);
  };

  return (
    <section
      className="testimonials-section"
      aria-labelledby="testimonials-title"
    >
      <div className="testimonials-skills" aria-label="Design strengths">
        <div className="testimonials-skills-track" ref={skillsTrackRef}>
          {[0, 1, 2].map((groupIndex) => (
            <div
              className="testimonials-skills-group"
              aria-hidden={groupIndex > 0}
              key={groupIndex}
              ref={groupIndex === 0 ? skillsGroupRef : null}
            >
              {SKILLS.map((skill) => (
                <span
                  className="testimonials-skill"
                  key={`${groupIndex}-${skill.label}`}
                >
                  <ThemedImage src={skill.icon} width={24} height={24} alt="" />
                  {skill.label}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="testimonials-slider">
        <button
          className="testimonials-arrow"
          type="button"
          aria-label="Previous testimonial"
          onClick={showPrevious}
        >
          <span aria-hidden="true">
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 1L1 7L7 13"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>

        <article
          className="testimonial-card"
          aria-live="polite"
          ref={testimonialCardRef}
        >
          <div className="testimonial-eyebrow" id="testimonials-title">
            <span />
            Endorsements
          </div>
          <blockquote className="testimonial-quote">
            {activeTestimonial.quote}
          </blockquote>
          <div className="testimonial-profile">
            <ThemedImage
              src={activeTestimonial.avatar}
              width={80}
              height={80}
              alt=""
              className="testimonial-avatar"
            />
            <div>
              <h2>{activeTestimonial.name}</h2>
              <p>{activeTestimonial.role}</p>
            </div>
          </div>
          <div className="testimonial-dots" aria-label="Select testimonial">
            {TESTIMONIALS.map((testimonial, index) => (
              <button
                className={index === activeIndex ? "active" : ""}
                type="button"
                aria-label={`Show testimonial from ${testimonial.name}`}
                aria-pressed={index === activeIndex}
                onClick={() => showTestimonial(index)}
                key={testimonial.name}
              />
            ))}
          </div>
        </article>

        <button
          className="testimonials-arrow"
          type="button"
          aria-label="Next testimonial"
          onClick={showNext}
        >
          <span aria-hidden="true">
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L7 7L1 13"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
