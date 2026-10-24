import { useEffect, useRef } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    name: "MeetingPilot",
    category: "Agentic AI / Meeting Intelligence / Workflow Automation",
    tools: "Python, LangGraph, LangChain, FastAPI, Redis, NeonDB, pgvector, MCP",
    bullets: [
      "Built an AI-powered meeting intelligence platform automating Google Calendar polling, agenda generation, OSINT attendee briefings, and actionable checklists (saves 2–3 hrs/wk).",
      "Engineered an 11-node LangGraph agentic workflow integrating 8+ Google Workspace APIs and 4+ OSINT sources using MCP, with JWT-secured REST/WebSocket endpoints and LangSmith.",
      "Developed a RAG pipeline using NeonDB and pgvector retrieving context from 600+ documents for LLaMA 3.1 8B; deployed React frontend, Chrome Extension, and 3 Dockerized services.",
    ],
    metrics: "11-node LangGraph workflow · 8+ Google APIs · 600+ docs RAG · Saves 2–3 hrs/wk",
    image: "/images/project1_meetingpilot.jpg",
    link: "https://github.com/adityajha2118/Meeting_Pilot/blob/main/README.md",
  },
  {
    number: "02",
    name: "DocuRAG",
    category: "Production RAG / Hybrid Search / Observability",
    tools: "Python, FastAPI, ChromaDB, BM25, SentenceTransformers, OpenAI, Langfuse",
    bullets: [
      "Built a production-grade RAG system for technical documentation using hybrid dense and BM25 retrieval with Reciprocal Rank Fusion (RRF) and cross-encoder reranking.",
      "Engineered a hallucination prevention pipeline with pre-generation evidence gate and strict citation validation (100% refusal accuracy on OOD test queries, 90% citation coverage).",
      "Implemented end-to-end LLM observability and CI/CD quality gates using Langfuse, SQLite metrics, and GitHub Actions, tracking latency and failure rates across 50-test suite.",
    ],
    metrics: "Hybrid dense + BM25 RRF · 100% OOD refusal accuracy · 90% citation coverage",
    image: "/images/project2_docurag.jpg",
    link: "https://github.com/adityajha2118/DocuRAG/blob/main/README.md",
  },
  {
    number: "03",
    name: "Vision-Language Multimodal Agent",
    category: "Agentic AI / Multimodal Perception",
    tools: "Python, Gemini 2.5 Flash, OmniParser, PyAutoGUI, PyQt5",
    bullets: [
      "Architected and delivered a multimodal desktop automation AI agent that parses on-screen UI and executes JSON action plans, driving workforce transformation in the agentic era.",
      "Designed automated test suites to investigate failure modes across 50 tasks; implemented adaptive screen-stability detection to improve execution reliability to 90% success at sub-4s latency.",
      "Implemented hands-free voice control (Google Speech Recognition, Sphinx), acting as a self-starter to build breakthrough features from scratch.",
    ],
    metrics: "50 tasks evaluated · 90% execution success · <4s interaction latency",
    image: "/images/project1_multimodal.jpg",
    link: "https://github.com/adityajha2118",
  },
  {
    number: "04",
    name: "BioTrack",
    category: "Computer Vision / Biometrics / Semantic Search",
    tools: "React 19, TypeScript, React Native, Flask, MongoDB, Gemini, Leaflet",
    bullets: [
      "Built and tested a scalable, high-performance cloud computing platform spanning a mobile app (Auth0), Vite/React web portal (Leaflet maps), and Flask REST backend for AI-driven photo organization.",
      "Devised test strategies and ran extensive threshold analysis to identify an optimal operating point (τ = 0.45) for production deployment of the InsightFace recognition model.",
      "Implemented automated AI image tagging (Google Gemini) and semantic search (MongoDB), demonstrating strong end-to-end system design.",
    ],
    metrics: "Face matching operating point τ = 0.45 · Force-directed social graph simulation",
    image: "/images/project2_biotrack.jpg",
    link: "https://github.com/adityajha2118",
  },
  {
    number: "05",
    name: "Unified Health Platform & BioMistral",
    category: "Full Stack AI / LLM / Clinical Analytics",
    tools: "React.js, Node.js, PostgreSQL, Ollama, BioMistral, Recharts",
    bullets: [
      "Architected, designed, and implemented a highly scalable full-stack AI health platform simulating an AI + Data + CRM solution to connect with users and delight customers.",
      "Delivered a secure REST API with dynamic schema evolution; developed unit/functional tests and validation layers (Multer, Joi) against SQL injection, maintaining a stable platform.",
      "Integrated Recharts-based dashboards for real-time health metrics telemetry, driving operational excellence and culminating in a peer-reviewed publication (ICDSINC 2025).",
    ],
    metrics: "Published research at ICDSINC 2025 · Context-aware nutrition & diagnostic pipeline",
    image: "/images/project3_health_ai.jpg",
    link: "https://github.com/adityajha2118",
  },
  {
    number: "06",
    name: "Customer Intelligence & Retention Analytics",
    category: "Data Analytics / ML / FinTech",
    tools: "SQL, Python, XGBoost, VADER NLP, Power BI, Pandas",
    bullets: [
      "Designed SQL-based ETL pipelines to extract, clean, and transform raw transactional, KYC, and complaint data into analysis-ready tables for enterprise-scale servicing and MIS functions.",
      "Built churn and escalation classification models (Logistic Regression, Random Forest, XGBoost) and applied K-Means clustering for risk-based customer segmentation.",
      "Enriched complaint data with NLP (VADER) sentiment analysis and integrated structured + unstructured outputs into Power BI dashboards for executive reporting.",
    ],
    metrics: "VADER sentiment enrichment · Churn & customer escalation risk prediction",
    image: "/images/project4_customer_retention.jpg",
    link: "https://github.com/adityajha2118",
  },
  {
    number: "07",
    name: "Transaction Risk Intelligence",
    category: "FinTech / Fraud Detection / AML",
    tools: "SQL, SQLite, Python, XGBoost, SHAP, Chart.js",
    bullets: [
      "Engineered a SQL-first pipeline on 590K+ transaction records (683 MB) using SQLite, writing 5+ profiling queries to drive downstream feature and business decisions.",
      "Built and validated an XGBoost model (0.507 PR-AUC) with time-based train/test splitting and 55 documented column-level data-quality decisions to prevent leakage.",
      "Delivered SHAP-based case explanations and a 4-tab Chart.js dashboard for auditors, extending the pipeline with entity resolution across 65K+ accounts and AML-style risk tiering.",
    ],
    metrics: "590K+ records (683 MB) · 65K+ accounts · PR-AUC = 0.507 · Case-level SHAP",
    image: "/images/project5_transaction_risk.jpg",
    link: "https://github.com/adityajha2118/Transaction-Risk-Intelligence/blob/main/README.md",
  },
  {
    number: "08",
    name: "Credit Risk & Performance Dashboard",
    category: "FinTech / Credit Risk / Decision Systems",
    tools: "SQL, Python, Scikit-learn, XGBoost, Tableau, Pandas",
    bullets: [
      "Queried and cleaned loan applicant data using SQL and Pandas, engineering financial indicators (Debt-to-Income ratio, Employment Stability) to strengthen model predictive power.",
      "Benchmarked Logistic Regression, Random Forest, and XGBoost classifiers, selecting XGBoost to generate Probability of Default (PD) scores for every applicant.",
      "Segmented the loan portfolio into Low/Medium/High risk tiers and designed an interactive Tableau dashboard for stakeholder-ready reporting.",
    ],
    metrics: "Probability of Default (PD) modeling · Low / Medium / High portfolio risk tiering",
    image: "/images/project6_credit_risk.jpg",
    link: "https://github.com/adityajha2118/Credit-Risk-Performance-Analytics-Dashboard/blob/main/README.md",
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
        // Scroll exactly until the last project card is fully in view
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
        scrub: 0.3,
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
                {project.bullets && project.bullets.length > 0 && (
                  <ul className="work-bullets">
                    {project.bullets.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                )}
                {project.metrics && (
                  <p className="work-metrics">
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