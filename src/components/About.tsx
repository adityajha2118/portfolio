import { useEffect, useRef } from "react";
import "./styles/About.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const about = aboutRef.current;
    if (!about) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        about,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          ease: "power3.out",
          duration: 1,
          scrollTrigger: {
            trigger: about,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="about-section" id="about" ref={aboutRef}>
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          Data Science and AI student at IIIT Naya Raipur, building at the intersection of Agentic AI, Multi-Agent Systems, and AI Security.
        </p>
        <div className="about-details">
          <div className="about-detail-item">
            <span className="about-detail-label">Education</span>
            <span className="about-detail-value">B.Tech in Data Science & AI · IIIT Naya Raipur (2023–2027)</span>
          </div>
          <div className="about-detail-item">
            <span className="about-detail-label">Academic Merit</span>
            <span className="about-detail-value">CGPA: 8.73 / 10 · Class XII: 84%</span>
          </div>
          <div className="about-detail-item">
            <span className="about-detail-label">Research Focus</span>
            <span className="about-detail-value">Adversarial Evaluation, Sentinel Defenses & Agent Reliability</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
