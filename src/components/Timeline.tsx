"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, CheckCircle2, ChevronRight, Milestone } from "lucide-react";

interface TimelineItem {
  task: string;
  title: string;
  date: string;
  description: string;
  achievement: string;
  projectId: string;
}

const timelineData: TimelineItem[] = [
  {
    task: "Task 1",
    title: "Tool Calling Agent Architecture",
    date: "May 1st, 2026",
    description: "Designed a clean function registration mapping using JSON Schemas to allow LLMs to invoke local Python code dynamically.",
    achievement: "Implemented automated execution loop with self-correcting error flows.",
    projectId: "tool-calling-agent"
  },
  {
    task: "Task 2",
    title: "Symbolic Calculator Orchestrator",
    date: "May 6th, 2026",
    description: "Built a math solver CLI agent leveraging OpenRouter's reasoning capacity to execute algebraic expressions sequentially.",
    achievement: "Integrated SymPy symbolic equation solvers and customized runtime regex checks.",
    projectId: "ai-calculator-agent"
  },
  {
    task: "Task 3",
    title: "Multi-Tool Sandboxed Agent",
    date: "May 11th, 2026",
    description: "Engineered a terminal agent equipped with file explorer capabilities, web scrapers, and secure shell execution frameworks.",
    achievement: "Implemented file integrity logs and locked down directory access protocols.",
    projectId: "multi-tool-agent"
  },
  {
    task: "Task 4",
    title: "Document Retrieval RAG Assistant",
    date: "May 17th, 2026",
    description: "Graduated from CLI into full-stack web UI apps. Built a vector embeddings indexing process for PDF uploads.",
    achievement: "Created a glassmorphic chat interface featuring document source highlight overlays.",
    projectId: "rag-assistant"
  },
  {
    task: "Task 5",
    title: "Autonomous LangGraph Business Planner",
    date: "May 22nd, 2026",
    description: "Developed a market strategist system that breaks business goals into multi-stage execution states.",
    achievement: "Orchestrated competitor price scrapers and ROI calculator nodes in LangGraph.",
    projectId: "autonomous-business-agent"
  },
  {
    task: "Task 6",
    title: "WebSocket Multi-Agent System",
    date: "May 27th, 2026",
    description: "Architected a collaborative agency utilizing Supervisor-Worker topologies communicating over WebSockets.",
    achievement: "Constructed live task progress timelines and editable user-intervention code review cards.",
    projectId: "multi-agent-system"
  }
];

export default function Timeline() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring" as const, stiffness: 80, damping: 15 }
    }
  };

  const handleScrollToProject = (id: string) => {
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      // Small timeout to let scroll complete, then we could highlight the specific element
    }
  };

  return (
    <section id="timeline" className="py-20 px-6 relative">
      <div className="absolute top-1/2 left-0 w-[250px] h-[250px] bg-cyber-purple/5 rounded-full blur-[90px] pointer-events-none -z-10 animate-pulse-slow" />

      <div className="max-w-4xl mx-auto">
        {/* Header Block */}
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Internship{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyber-purple to-cyber-cyan">
              Journey Timeline
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl">
            Tracing my growth from basic terminal agent schemas to complex, production-ready multi-agent architectures.
          </p>
        </div>

        {/* Timeline Path */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative border-l-2 border-slate-200 dark:border-slate-850 pl-6 md:pl-10 space-y-12 ml-4 sm:ml-8"
        >
          {timelineData.map((item, idx) => (
            <motion.div
              key={item.task}
              variants={itemVariants}
              className="relative group"
            >
              {/* Timeline Bullet Node */}
              <span className="absolute -left-[35px] md:-left-[51px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 dark:bg-[#0b0c16] border-2 border-cyber-purple group-hover:border-cyber-cyan transition-colors duration-300 shadow-md">
                <span className="h-2 w-2 rounded-full bg-cyber-purple group-hover:bg-cyber-cyan transition-colors duration-300" />
              </span>

              {/* Timeline Card */}
              <div className="p-6 rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/50 group-hover:border-cyber-purple/35 dark:group-hover:border-cyber-cyan/30 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-cyber-purple/10 text-cyber-purple dark:text-cyber-cyan text-[10px] font-bold tracking-wider uppercase border border-cyber-purple/20">
                      {item.task}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyber-purple dark:group-hover:text-cyber-cyan transition-colors duration-350">
                      {item.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <Calendar size={12} />
                    <span>{item.date}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-650 dark:text-slate-400 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Achievements block */}
                <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-200/40 dark:bg-slate-950/60 border border-slate-300/10 dark:border-slate-900/60 text-xs text-slate-600 dark:text-slate-400 mb-4">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-800 dark:text-slate-300 font-semibold">Key Milestones:</strong> {item.achievement}
                  </span>
                </div>

                {/* Quick Link Button */}
                <button
                  onClick={() => handleScrollToProject(item.projectId)}
                  className="flex items-center text-xs font-semibold text-cyber-purple dark:text-cyber-cyan hover:underline gap-1 cursor-pointer"
                >
                  Inspect Task Artifact
                  <ChevronRight size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
