import { useEffect, useRef } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    name: "Vision-Language Multimodal Agent",
    category: "Agentic AI / Multimodal Perception",
    tools: "Python, Gemini 2.5 Flash, OmniParser, PyAutoGUI, PyQt5",
    metrics: "50 tasks evaluated · 90% execution success · <4s interaction latency",
    image: "/images/project1_multimodal.jpg",
    link: "https://github.com/adityajha2118",
  },
  {
    number: "02",
    name: "BioTrack",
    category: "Computer Vision / Biometrics / Semantic Search",
    tools: "React 19, TypeScript, React Native, Flask, MongoDB, Gemini, Leaflet",
    metrics: "Face matching operating point τ = 0.45 · Force-directed social graph simulation",
    image: "/images/project2_biotrack.jpg",
    link: "https://github.com/adityajha2118",
  },
  {
    number: "03",
    name: "Unified Health Platform & BioMistral",
    category: "Full Stack AI / LLM / Clinical Analytics",
    tools: "React.js, Node.js, PostgreSQL, Ollama, BioMistral, Recharts",
    metrics: "Published research at ICDSINC 2025 · Context-aware nutrition & diagnostic pipeline",
    image: "/images/project3_health_ai.jpg",
    link: "https://github.com/adityajha2118",
  },
  {
    number: "04",
    name: "Customer Intelligence & Retention Analytics",
    category: "Data Analytics / ML / FinTech",
    tools: "SQL, Python, XGBoost, VADER NLP, Power BI, Pandas",
    metrics: "VADER sentiment enrichment · Churn & customer escalation risk prediction",
    image: "/images/project4_customer_retention.jpg",
    link: "https://github.com/adityajha2118",
  },
  {
    number: "05",
    name: "Transaction Risk Intelligence",
    category: "FinTech / Fraud Detection / AML",
    tools: "SQL, SQLite, Python, XGBoost, SHAP, Chart.js",
    metrics: "590K+ records (683 MB) · 65K+ accounts · PR-AUC = 0.507 · Case-level SHAP",
    image: "/images/project5_transaction_risk.jpg",
    link: "https://github.com/adityajha2118",
  },
  {
    number: "06",
    name: "Credit Risk & Performance Dashboard",
    category: "FinTech / Credit Risk / Decision Systems",
    tools: "SQL, Python, Scikit-learn, XGBoost, Tableau, Pandas",
    metrics: "Probability of Default (PD) modeling · Low / Medium / High portfolio risk tiering",
    image: "/images/project6_credit_risk.jpg",
    link: "https://github.com/adityajha2118",
  },
];

const Work = () => {
  const workRef = useRef<HTMLDivElement>(null);
  const flexRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const work = workRef.current;
    const flex = flexRef.current;
    if (!work || !flex) return;

    const ctx = gsap.context(() => {
      // Dynamic total horizontal distance based on actual card layout
      const getScrollAmount = () => {
        const boxes = flex.querySelectorAll<HTMLElement>(".work-box");
        if (!boxes.length) return 0;
        const lastBox = boxes[boxes.length - 1];
        const totalCardsWidth = lastBox.offsetLeft + lastBox.offsetWidth;
        // Scroll exactly until the 6th project card is fully in view
        const scrollDistance = totalCardsWidth - window.innerWidth + 120;
        return Math.max(0, scrollDistance);
      };

      const tween = gsap.to(flex, {
        x: () => -getScrollAmount(),
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: work,
        start: "top top",
        end: () => `+=${getScrollAmount()}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        id: "work-pin",
      });
    }, workRef);

    // Refresh after images load to ensure accurate measurements
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
      ctx.revert();
    };
  }, []);

  return (
    <div className="work-section" id="work" ref={workRef}>
      <div className="work-container section-container">
        <h2 className="title">
          My <span>Work</span>
        </h2>
        <div className="work-flex" ref={flexRef}>
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.number}</h3>
                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
                {project.metrics && (
                  <p style={{ marginTop: "10px", fontSize: "12px", color: "var(--accentColor)", fontWeight: 400 }}>
                    ✦ {project.metrics}
                  </p>
                )}
              </div>
              <WorkImage image={project.image} alt={project.name} link={project.link} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;