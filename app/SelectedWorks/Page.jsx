import { Tags } from "../../components";
import { SELECTED_WORKS } from "../../constants/selectworksconstants";
import ProjectCard from "../../components/ProjectCard";
import React from "react";

const SelectedWorks = () => {
  return (
    <section className="selected-works-section" id="works">
      <div className="selected-works-content mt-[8px]">
        <div className="section-header px-[160px]">
          <Tags label="Projects" color="#8C62FF" />
          <h1 className="header-text">Selected Works</h1>
        </div>
        <div className="selected-works-grid">
          {SELECTED_WORKS.map((work, index) => (
            <ProjectCard
              key={work.title}
              work={work}
              priority={index < 2}
              loading={index >= 2 && index < 4 ? "eager" : undefined}
              fetchPriority={index >= 2 && index < 4 ? "high" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelectedWorks;
