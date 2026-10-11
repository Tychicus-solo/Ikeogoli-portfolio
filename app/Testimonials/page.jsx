"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import React, { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ThemedImage } from "../../components";
import TestimonialGlow from "../../components/TestimonialGlow";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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
    name: "Eniolorunda Toluwanimi",
    role: "Software Engineer at Enyata",
    avatar: "/assets/testimonials/eniolorunda-toluwanimi.webp",
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
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const cardsTrackRef = useRef(null);
  const skillsTrackRef = useRef(null);
  const skillsGroupRef = useRef(null);

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

  useGSAP((context, contextSafe) => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = cardsTrackRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animation;
    let resizeTimer;
    let disposed = false;
    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;

    const reset = () => {
      animation?.scrollTrigger?.kill();
      animation?.revert();
      animation = undefined;
      section.classList.remove("testimonials-section--pinned");
    };

    const setup = contextSafe(() => {
      if (disposed) return;
      reset();
      if (!reducedMotion.matches) {
        section.classList.add("testimonials-section--pinned");
        const topOffset = parseFloat(getComputedStyle(section).getPropertyValue("--testimonials-pin-top"));
        // Never pin content taller than the available reading area.
        if (section.offsetHeight > window.innerHeight - topOffset + 1) {
          section.classList.remove("testimonials-section--pinned");
        } else {
          const hold = 0.12;
          const travel = 1;
          const totalDuration = TESTIMONIALS.length * hold + (TESTIMONIALS.length - 1) * travel;
          const readingRanges = TESTIMONIALS.map((_, index) => ({
            start: index * (hold + travel) / totalDuration,
            end: (index * (hold + travel) + hold) / totalDuration,
          }));
          const stops = readingRanges.map((range, index) =>
            index === 0 ? 0 : index === TESTIMONIALS.length - 1 ? 1 : (range.start + range.end) / 2
          );

          animation = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: () => `top ${getComputedStyle(section).getPropertyValue("--testimonials-pin-top").trim()}`,
              end: () => `+=${viewport.clientWidth * totalDuration}`,
              pin: true,
              scrub: 0.15,
              snap: {
                // Leave reading pauses alone; only settle interrupted transitions.
                snapTo: (progress) => readingRanges.some(({ start, end }) => progress >= start && progress <= end)
                  ? progress
                  : gsap.utils.snap(stops, progress),
                inertia: false,
                delay: 0.12,
                duration: { min: 0.16, max: 0.32 },
                ease: "power2.inOut",
              },
              anticipatePin: 1,
              invalidateOnRefresh: true,
              refreshPriority: 1,
            },
          });

          TESTIMONIALS.forEach((_, index) => {
            if (index > 0) {
              animation.to(track, {
                x: () => -index * viewport.clientWidth,
                duration: travel,
                ease: "none",
              });
            }
            animation.to({}, { duration: hold });
          });
        }
      }
      // The pin adds space before all subsequent landing-page reveals.
      ScrollTrigger.refresh();
    });

    const onResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      // Mobile browser chrome changes height during scroll; don't rebuild the pin.
      if (width === lastWidth && (width < 768 || height === lastHeight)) return;
      lastWidth = width;
      lastHeight = height;
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(setup, 180);
    };

    setup();
    document.fonts.ready.then(() => { if (!disposed) setup(); });
    window.addEventListener("resize", onResize);
    reducedMotion.addEventListener("change", setup);

    return () => {
      disposed = true;
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      reducedMotion.removeEventListener("change", setup);
      reset();
    };
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="testimonials-section"
      aria-labelledby="testimonials-title"
    >
      <TestimonialGlow />
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

      <h2 className="testimonial-eyebrow" id="testimonials-title">
        <span aria-hidden="true" />
        Endorsements
      </h2>
      <div className="testimonials-slider" ref={viewportRef}>
        <div className="testimonials-cards-track" ref={cardsTrackRef}>
          {TESTIMONIALS.map((testimonial) => (
            <article className="testimonial-card" key={testimonial.name}>
              <blockquote className="testimonial-quote">
                {testimonial.quote}
              </blockquote>
              <div className="testimonial-profile">
                <ThemedImage
                  src={testimonial.avatar}
                  width={80}
                  height={80}
                  alt=""
                  className="testimonial-avatar"
                />
                <div>
                  <h2>{testimonial.name}</h2>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
