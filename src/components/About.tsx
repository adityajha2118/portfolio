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
          I'm a Data Science & AI student at IIIT Naya Raipur who enjoys building things with AI and figuring out how to make them useful in the real world. I've worked on ML projects and AI-powered applications, and lately, I've been exploring AI agents and multi-agent systems. I like getting hands-on with new ideas, whether it's training a model, building an application, or making the different pieces work together.
        </p>
        <div className="about-details">
          <div className="about-detail-item">
            <span className="about-detail-label">Education</span>
            <span className="about-detail-value">
              B.Tech in Data Science & AI · IIIT Naya Raipur (2023–2027)
            </span>
          </div>
          <div className="about-detail-item">
            <span className="about-detail-label">Technical Expertise</span>
            <span className="about-detail-value">
              Agentic AI · Artificial Intelligence · Machine Learning · Deep Learning · LLMs · Multi-Agent Systems · NLP · Computer Vision · Data Science · Data Analytics · Python · SQL · API Development · Backend Development · AI Application Development
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
