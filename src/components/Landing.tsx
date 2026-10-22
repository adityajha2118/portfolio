import { useEffect } from "react";
import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Landing = ({ children }: PropsWithChildren) => {

  useEffect(() => {
    if (window.innerWidth < 1025) return;

    const characterModel = document.querySelector(".character-model");
    if (!characterModel) return;

    const ctx = gsap.context(() => {
      gsap.to(characterModel, {
        scale: 0.6,
        y: "-20vh",
        ease: "none",
        scrollTrigger: {
          trigger: ".landing-section",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".landing-intro", {
        opacity: 0,
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ".landing-section",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".landing-info", {
        opacity: 0,
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ".landing-section",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              ADITYA
              <br />
              <span>KUMAR JHA</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>AI/ML Engineer</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Agentic AI</div>
              <div className="landing-h2-2">Data Science</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Researcher</div>
              <div className="landing-h2-info-1">Developer</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
