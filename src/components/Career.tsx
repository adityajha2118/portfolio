import { useEffect, useRef } from "react";
import "./styles/Career.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Career = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        timeline,
        { maxHeight: "0%" },
        {
          maxHeight: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: ".career-section",
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2 className="title">
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline" ref={timelineRef}>
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI Research Intern</h4>
                <h5>University of Messina</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              <strong>March 2026 – August 2026 · Messina, Italy (Onsite)</strong><br />
              Architected a 9-agent LangGraph system with autonomous tool execution. Developed a 124-case adversarial benchmark (AgentDojo, FBI IC3) evaluating prompt injection and multi-agent failure modes. Redesigned scoring pipelines to improve recall from 0.435 to 0.98 (F1: 0.918 against 6 ML classifiers) and created a layered LLM Sentinel defense.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Machine Learning Intern</h4>
                <h5>Samsung R&D Institute</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              <strong>November 2025 – May 2026 · Remote</strong><br />
              Designed a 20-configuration evaluation grid (4 distance metrics × 5 similarity thresholds) for face-verification and person re-identification models. Optimized threshold operating points and conducted research on generative image architectures for scalable AI features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
