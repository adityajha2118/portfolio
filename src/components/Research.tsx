import { useEffect, useRef } from "react";
import "./styles/Research.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const researchPapers = [
  {
    title: "LLM-Based Nutrition Systems",
    venue: "ICDSINC 2025",
    badge: "Published",
    badgeClass: "badge-published",
    description:
      "Peer-reviewed research exploring conversational health platforms, medical-report ingestion pipelines, and domain-adapted BioMistral models for personalized dietary analysis.",
    topics: ["LLMs", "BioMistral", "Healthcare AI", "Full Stack AI"],
  },
  {
    title: "Learning & Intelligent Optimization",
    venue: "LION 2026 · Italy",
    badge: "Oral Presentation",
    badgeClass: "badge-oral",
    description:
      "Selected for oral presentation on intelligent optimization methodologies, algorithmic model benchmarking, and threshold optimization in real-world ML systems.",
    topics: ["Machine Learning", "Optimization", "Benchmarking", "Evaluation"],
  },
  {
    title: "Layered Sentinel Defense for LLM Multi-Agent Communication",
    venue: "Under Review · 2026",
    badge: "Under Review",
    badgeClass: "badge-review",
    description:
      "Novel defensive architecture designed to secure inter-agent communication against prompt injection, social engineering exploits, and cascading failure modes.",
    topics: ["Multi-Agent Security", "AI Safety", "Adversarial Testing", "Sentinel Defense"],
  },
];

const Research = () => {
  const researchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const research = researchRef.current;
    if (!research) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        research,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          duration: 1,
          scrollTrigger: {
            trigger: research,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="research-section section-container" id="research" ref={researchRef}>
      <div className="research-container">
        <h2 className="title">
          Research <span>&</span>
          <br /> Publications
        </h2>

        <div className="research-grid">
          {researchPapers.map((paper, index) => (
            <div className="research-card" key={index}>
              <div>
                <span className={`research-badge ${paper.badgeClass}`}>
                  {paper.badge}
                </span>
                <h3>{paper.title}</h3>
                <h4>{paper.venue}</h4>
                <p>{paper.description}</p>
              </div>
              <div className="research-topics">
                {paper.topics.map((topic, i) => (
                  <span className="research-tag" key={i}>
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="achievement-banner">
          <div className="achievement-left">
            <h3>MachineHack — Loan Demand Challenge</h3>
            <p>
              National machine learning competition: engineered predictive models for personalized lending demand.
            </p>
          </div>
          <div className="achievement-right">
            <div className="achievement-stat">
              <div className="number">2nd</div>
              <div className="label">Place Winner</div>
            </div>
            <div className="achievement-stat">
              <div className="number">Top 2%</div>
              <div className="label">1,000+ Participants</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Research;
