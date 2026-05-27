"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, GitFork, ExternalLink, Play, Server, Layers, Cpu, CheckCircle2 } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  initialTab?: "overview" | "architecture" | "video";
}

export default function ProjectModal({ project, onClose, initialTab = "overview" }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "video">(initialTab);

  // Prevent scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Custom SVG Flowcharts for each project
  const renderArchitectureFlowchart = (id: string) => {
    switch (id) {
      case "tool-calling-agent":
        return (
          <svg viewBox="0 0 800 240" className="w-full h-auto text-slate-800 dark:text-slate-200">
            <defs>
              <linearGradient id="cyan-purple" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f0ff" />
                <stop offset="100%" stopColor="#bd00ff" />
              </linearGradient>
            </defs>
            {/* User prompt node */}
            <rect x="20" y="80" width="120" height="60" rx="10" fill="rgba(255, 255, 255, 0.05)" stroke="url(#cyan-purple)" strokeWidth="1.5" />
            <text x="80" y="115" textAnchor="middle" fill="currentColor" className="text-xs font-semibold">User Query</text>

            {/* Arrow */}
            <path d="M 140 110 L 190 110" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
            
            {/* LLM Router */}
            <rect x="200" y="80" width="130" height="60" rx="10" fill="rgba(255, 255, 255, 0.05)" stroke="url(#cyan-purple)" strokeWidth="1.5" />
            <text x="265" y="110" textAnchor="middle" fill="currentColor" className="text-xs font-semibold">LLM Router</text>
            <text x="265" y="125" textAnchor="middle" fill="rgba(255, 255, 255, 0.4)" className="text-[10px]">Analyze schemas</text>

            {/* Loop Arrow Up */}
            <path d="M 330 110 L 380 110" stroke="rgba(0, 240, 255, 0.5)" strokeWidth="2" fill="none" />
            
            {/* Execution Tool Box */}
            <rect x="390" y="30" width="150" height="60" rx="10" fill="rgba(0, 240, 255, 0.05)" stroke="#00f0ff" strokeWidth="1.5" />
            <text x="465" y="60" textAnchor="middle" fill="currentColor" className="text-xs font-semibold">Tool Selection</text>
            <text x="465" y="75" textAnchor="middle" fill="rgba(0, 240, 255, 0.6)" className="text-[10px]">Invoke JSON Schema</text>

            {/* Loop Arrow Down */}
            <path d="M 465 90 L 465 140" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="2" fill="none" />
            
            {/* Python Local Function */}
            <rect x="390" y="150" width="150" height="60" rx="10" fill="rgba(189, 0, 255, 0.05)" stroke="#bd00ff" strokeWidth="1.5" />
            <text x="465" y="180" textAnchor="middle" fill="currentColor" className="text-xs font-semibold">Local Exec Engine</text>
            <text x="465" y="195" textAnchor="middle" fill="rgba(189, 0, 255, 0.6)" className="text-[10px]">Python functions</text>

            {/* Return Arrow */}
            <path d="M 390 180 L 265 180 L 265 140" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="2" fill="none" />
            
            {/* Synthesizer Arrow */}
            <path d="M 330 110 L 580 110" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="2" fill="none" />
            
            {/* Output Node */}
            <rect x="590" y="80" width="140" height="60" rx="10" fill="rgba(255, 255, 255, 0.05)" stroke="url(#cyan-purple)" strokeWidth="1.5" />
            <text x="660" y="110" textAnchor="middle" fill="currentColor" className="text-xs font-semibold">Synthesized Reply</text>
            <text x="660" y="125" textAnchor="middle" fill="rgba(255, 255, 255, 0.4)" className="text-[10px]">Natural Language</text>
          </svg>
        );
      case "ai-calculator-agent":
        return (
          <svg viewBox="0 0 800 240" className="w-full h-auto text-slate-850 dark:text-slate-200">
            <rect x="30" y="90" width="110" height="50" rx="8" fill="rgba(255, 255, 255, 0.03)" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="85" y="120" textAnchor="middle" fill="currentColor" className="text-xs font-medium">Math Expression</text>

            <path d="M 140 115 L 180 115" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" fill="none" />

            {/* Parser */}
            <rect x="190" y="60" width="120" height="110" rx="8" fill="rgba(255, 255, 255, 0.03)" stroke="#8b5cf6" strokeWidth="1.5" />
            <text x="250" y="90" textAnchor="middle" fill="currentColor" className="text-xs font-semibold">CoT Planner</text>
            <text x="250" y="115" textAnchor="middle" fill="rgba(255, 255, 255, 0.5)" className="text-[10px]">Step Decomposition</text>
            <text x="250" y="135" textAnchor="middle" fill="rgba(255, 255, 255, 0.5)" className="text-[10px]">State Stack</text>

            <path d="M 310 115 L 355 115" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" fill="none" />

            {/* Split executing */}
            <path d="M 355 115 L 390 65" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" fill="none" />
            <path d="M 355 115 L 390 165" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" fill="none" />

            <rect x="400" y="35" width="120" height="50" rx="8" fill="rgba(0, 240, 255, 0.03)" stroke="#00f0ff" strokeWidth="1.5" />
            <text x="460" y="65" textAnchor="middle" fill="currentColor" className="text-xs">SymPy Solver</text>

            <rect x="400" y="140" width="120" height="50" rx="8" fill="rgba(189, 0, 255, 0.03)" stroke="#bd00ff" strokeWidth="1.5" />
            <text x="460" y="170" textAnchor="middle" fill="currentColor" className="text-xs">NumPy Calculator</text>

            <path d="M 520 60 L 565 115" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" fill="none" />
            <path d="M 520 165 L 565 115" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" fill="none" />

            {/* Answer Accumulator */}
            <rect x="580" y="90" width="140" height="50" rx="8" fill="rgba(255, 255, 255, 0.03)" stroke="#10b981" strokeWidth="1.5" />
            <text x="650" y="120" textAnchor="middle" fill="currentColor" className="text-xs font-semibold">Final Output</text>
          </svg>
        );
      case "multi-tool-agent":
        return (
          <svg viewBox="0 0 800 240" className="w-full h-auto text-slate-800 dark:text-slate-200">
            <rect x="30" y="90" width="110" height="60" rx="8" fill="rgba(255, 255, 255, 0.03)" stroke="#8b5cf6" strokeWidth="1.5" />
            <text x="85" y="120" textAnchor="middle" fill="currentColor" className="text-xs font-semibold">System Input</text>
            <text x="85" y="135" textAnchor="middle" fill="rgba(255, 255, 255, 0.4)" className="text-[9px]">File/Search prompt</text>

            <path d="M 140 120 L 190 120" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" fill="none" />

            {/* Agent Core */}
            <rect x="200" y="70" width="140" height="100" rx="8" fill="rgba(255, 255, 255, 0.03)" stroke="#00f0ff" strokeWidth="1.5" />
            <text x="270" y="100" textAnchor="middle" fill="currentColor" className="text-xs font-semibold">System Router</text>
            <text x="270" y="120" textAnchor="middle" fill="rgba(0, 240, 255, 0.8)" className="text-[10px] font-mono">Select Tool</text>
            <text x="270" y="145" textAnchor="middle" fill="rgba(255, 255, 255, 0.4)" className="text-[9px]">Permissions check</text>

            {/* Arrows to Tools */}
            <path d="M 340 120 L 400 50" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" fill="none" />
            <path d="M 340 120 L 400 120" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" fill="none" />
            <path d="M 340 120 L 400 190" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" fill="none" />

            {/* Tools */}
            <rect x="410" y="20" width="130" height="45" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <text x="475" y="47" textAnchor="middle" fill="currentColor" className="text-xs">OS & File Explorer</text>

            <rect x="410" y="97" width="130" height="45" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <text x="475" y="124" textAnchor="middle" fill="currentColor" className="text-xs">Web Search & Scraping</text>

            <rect x="410" y="167" width="130" height="45" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <text x="475" y="194" textAnchor="middle" fill="currentColor" className="text-xs">Sandboxed Exec</text>

            {/* Collect answers */}
            <path d="M 540 42 L 600 120" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" fill="none" />
            <path d="M 540 120 L 600 120" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" fill="none" />
            <path d="M 540 190 L 600 120" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" fill="none" />

            <rect x="610" y="90" width="140" height="60" rx="8" fill="rgba(255, 255, 255, 0.03)" stroke="#10b981" strokeWidth="1.5" />
            <text x="680" y="120" textAnchor="middle" fill="currentColor" className="text-xs font-semibold">Integrity Verified Log</text>
            <text x="680" y="135" textAnchor="middle" fill="rgba(16, 185, 129, 0.8)" className="text-[9px] font-mono">Saved to JSON</text>
          </svg>
        );
      case "rag-assistant":
        return (
          <svg viewBox="0 0 800 240" className="w-full h-auto text-slate-800 dark:text-slate-200">
            <rect x="20" y="30" width="100" height="50" rx="6" fill="rgba(255,255,255,0.02)" stroke="#bd00ff" strokeWidth="1.5" />
            <text x="70" y="60" textAnchor="middle" fill="currentColor" className="text-xs">PDF Upload</text>

            <path d="M 120 55 L 150 55 L 150 115 L 180 115" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" fill="none" />

            <rect x="20" y="140" width="100" height="50" rx="6" fill="rgba(255,255,255,0.02)" stroke="#00f0ff" strokeWidth="1.5" />
            <text x="70" y="170" textAnchor="middle" fill="currentColor" className="text-xs">User Chat Query</text>

            <path d="M 120 165 L 150 165 L 150 125 L 180 125" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" fill="none" />

            {/* Orchestrator */}
            <rect x="190" y="80" width="130" height="80" rx="8" fill="rgba(255,255,255,0.03)" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="255" y="115" textAnchor="middle" fill="currentColor" className="text-xs font-semibold">FastAPI Backend</text>
            <text x="255" y="135" textAnchor="middle" fill="rgba(59, 130, 246, 0.8)" className="text-[9px]">Text Splitter & Embed</text>

            {/* Fetching from Vector store */}
            <path d="M 320 120 L 390 120" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" fill="none" />

            <rect x="400" y="80" width="140" height="80" rx="8" fill="rgba(0, 240, 255, 0.03)" stroke="#00f0ff" strokeWidth="1.5" />
            <text x="470" y="115" textAnchor="middle" fill="currentColor" className="text-xs font-semibold">Vector Database</text>
            <text x="470" y="135" textAnchor="middle" fill="rgba(0, 240, 255, 0.8)" className="text-[9px]">Pinecone / Qdrant</text>

            {/* Fetch Context back and send to LLM */}
            <path d="M 470 80 Q 470 40 370 40 Q 270 40 270 80" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1.5" fill="none" />

            <path d="M 320 120 L 580 120" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" fill="none" />

            <rect x="590" y="80" width="140" height="80" rx="8" fill="rgba(255, 255, 255, 0.03)" stroke="#bd00ff" strokeWidth="1.5" />
            <text x="660" y="115" textAnchor="middle" fill="currentColor" className="text-xs font-semibold">Stream LLM UI</text>
            <text x="660" y="135" textAnchor="middle" fill="rgba(189, 0, 255, 0.8)" className="text-[9px]">Citations Highlighted</text>
          </svg>
        );
      case "autonomous-business-agent":
        return (
          <svg viewBox="0 0 800 240" className="w-full h-auto text-slate-800 dark:text-slate-200">
            <rect x="20" y="90" width="110" height="50" rx="8" fill="rgba(255, 255, 255, 0.03)" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="75" y="120" textAnchor="middle" fill="currentColor" className="text-xs">Business Goal</text>

            <path d="M 130 115 L 180 115" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" fill="none" />

            {/* LangGraph */}
            <rect x="190" y="70" width="140" height="100" rx="8" fill="rgba(255, 255, 255, 0.03)" stroke="#bd00ff" strokeWidth="1.5" />
            <text x="260" y="105" textAnchor="middle" fill="currentColor" className="text-xs font-semibold">LangGraph State</text>
            <text x="260" y="125" textAnchor="middle" fill="rgba(189, 0, 255, 0.8)" className="text-[10px] font-mono">Plan / Decompose</text>

            {/* Loop nodes */}
            <path d="M 330 100 L 400 50" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" fill="none" />
            <path d="M 330 120 L 400 120" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" fill="none" />
            <path d="M 330 140 L 400 190" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" fill="none" />

            <rect x="410" y="25" width="130" height="40" rx="6" fill="rgba(255,255,255,0.02)" stroke="#00f0ff" strokeWidth="1" />
            <text x="475" y="49" textAnchor="middle" fill="currentColor" className="text-xs">Market Scraper</text>

            <rect x="410" y="100" width="130" height="40" rx="6" fill="rgba(255,255,255,0.02)" stroke="#00f0ff" strokeWidth="1" />
            <text x="475" y="124" textAnchor="middle" fill="currentColor" className="text-xs">SWOT Synthesizer</text>

            <rect x="410" y="175" width="130" height="40" rx="6" fill="rgba(255,255,255,0.02)" stroke="#00f0ff" strokeWidth="1" />
            <text x="475" y="199" textAnchor="middle" fill="currentColor" className="text-xs">Financial TAM Tool</text>

            {/* Loop back */}
            <path d="M 540 45 L 610 115" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" fill="none" />
            <path d="M 540 120 L 610 120" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" fill="none" />
            <path d="M 540 195 L 610 125" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" fill="none" />

            <rect x="620" y="90" width="140" height="60" rx="8" fill="rgba(255, 255, 255, 0.03)" stroke="#10b981" strokeWidth="1.5" />
            <text x="690" y="120" textAnchor="middle" fill="currentColor" className="text-xs font-semibold">Report Compiler</text>
            <text x="690" y="135" textAnchor="middle" fill="rgba(16, 185, 129, 0.8)" className="text-[9px] font-mono">Download MD/PDF</text>
          </svg>
        );
      case "multi-agent-system":
        return (
          <svg viewBox="0 0 800 240" className="w-full h-auto text-slate-800 dark:text-slate-200">
            {/* User prompt */}
            <circle cx="60" cy="120" r="30" fill="rgba(255,255,255,0.03)" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="60" y="124" textAnchor="middle" fill="currentColor" className="text-[10px] font-bold">User Input</text>

            <path d="M 90 120 L 150 120" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" fill="none" />

            {/* Supervisor */}
            <rect x="160" y="80" width="120" height="80" rx="10" fill="rgba(255,255,255,0.04)" stroke="#bd00ff" strokeWidth="2" />
            <text x="220" y="115" textAnchor="middle" fill="currentColor" className="text-xs font-semibold">Supervisor</text>
            <text x="220" y="135" textAnchor="middle" fill="rgba(189, 0, 255, 0.8)" className="text-[9px] font-mono">WebSocket Hub</text>

            {/* Web bus */}
            <path d="M 280 120 L 370 120" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" fill="none" />

            {/* Worker Nodes Group */}
            <rect x="380" y="15" width="220" height="210" rx="8" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />
            <text x="490" y="32" textAnchor="middle" fill="rgba(255,255,255,0.4)" className="text-[9px] uppercase tracking-wider">Worker Agent Fleet</text>

            <rect x="395" y="45" width="85" height="40" rx="6" fill="rgba(255,255,255,0.02)" stroke="#00f0ff" strokeWidth="1" />
            <text x="437.5" y="69" textAnchor="middle" fill="currentColor" className="text-[10px]">Researcher</text>

            <rect x="500" y="45" width="85" height="40" rx="6" fill="rgba(255,255,255,0.02)" stroke="#00f0ff" strokeWidth="1" />
            <text x="542.5" y="69" textAnchor="middle" fill="currentColor" className="text-[10px]">Architect</text>

            <rect x="395" y="105" width="85" height="40" rx="6" fill="rgba(255,255,255,0.02)" stroke="#00f0ff" strokeWidth="1" />
            <text x="437.5" y="129" textAnchor="middle" fill="currentColor" className="text-[10px]">Developer</text>

            <rect x="500" y="105" width="85" height="40" rx="6" fill="rgba(255,255,255,0.02)" stroke="#00f0ff" strokeWidth="1" />
            <text x="542.5" y="129" textAnchor="middle" fill="currentColor" className="text-[10px]">QA Reviewer</text>

            <rect x="447.5" y="165" width="100" height="40" rx="6" fill="rgba(255,255,255,0.02)" stroke="#bd00ff" strokeWidth="1" />
            <text x="497.5" y="189" textAnchor="middle" fill="currentColor" className="text-[10px]">Writer/Doc</text>

            {/* Loop back to supervisor for routing */}
            <path d="M 380 120 Q 330 150 280 120" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="1.5" fill="none" />

            {/* Final output */}
            <path d="M 600 120 L 650 120" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" fill="none" />

            <rect x="660" y="90" width="110" height="60" rx="8" fill="rgba(255, 255, 255, 0.03)" stroke="#10b981" strokeWidth="1.5" />
            <text x="715" y="120" textAnchor="middle" fill="currentColor" className="text-xs font-semibold">Verified Code</text>
            <text x="715" y="135" textAnchor="middle" fill="rgba(16, 185, 129, 0.8)" className="text-[9px]">Approved Build</text>
          </svg>
        );
      default:
        return <p className="text-center text-xs text-slate-500">Flowchart diagram placeholder for {id}</p>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      {/* Click outside backdrop to close */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative w-full max-w-4xl h-[85vh] flex flex-col rounded-3xl glass-panel border overflow-hidden shadow-2xl z-10"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/50 bg-slate-100/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border ${
              project.type === "Terminal" 
                ? "bg-amber-400/10 text-amber-500 border-amber-500/20" 
                : "bg-cyan-400/10 text-cyber-cyan border-cyber-cyan/20"
            }`}>
              {project.type} Project
            </span>
            <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-500 hover:text-slate-800 dark:hover:text-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-200/50 dark:border-slate-800/50 px-6 bg-slate-50/50 dark:bg-slate-950/30 text-sm font-medium">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-1.5 py-3 border-b-2 px-3 transition-colors ${
              activeTab === "overview"
                ? "border-cyber-purple text-cyber-purple dark:border-cyber-cyan dark:text-cyber-cyan"
                : "border-transparent text-slate-650 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100"
            }`}
          >
            <Layers size={14} />
            Overview
          </button>
          <button
            onClick={() => setActiveTab("architecture")}
            className={`flex items-center gap-1.5 py-3 border-b-2 px-3 transition-colors ${
              activeTab === "architecture"
                ? "border-cyber-purple text-cyber-purple dark:border-cyber-cyan dark:text-cyber-cyan"
                : "border-transparent text-slate-650 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100"
            }`}
          >
            <Server size={14} />
            Architecture
          </button>
          <button
            onClick={() => setActiveTab("video")}
            className={`flex items-center gap-1.5 py-3 border-b-2 px-3 transition-colors ${
              activeTab === "video"
                ? "border-cyber-purple text-cyber-purple dark:border-cyber-cyan dark:text-cyber-cyan"
                : "border-transparent text-slate-650 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100"
            }`}
          >
            <Play size={14} />
            Demo Video
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 font-sans">
          
          {/* Tab 1: Overview */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Metrics cards grid */}
              <div className="grid grid-cols-3 gap-4">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="p-4 rounded-2xl bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/40">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">{metric.label}</p>
                    <p className="text-lg md:text-xl font-bold text-slate-800 dark:text-cyber-cyan mt-1">{metric.value}</p>
                  </div>
                ))}
              </div>

              {/* Text Description */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Cpu size={16} className="text-cyber-purple" />
                  Project Overview
                </h3>
                <p className="text-slate-600 dark:text-slate-350 text-sm md:text-base leading-relaxed">
                  {project.longDesc}
                </p>
              </div>

              {/* Key Features List */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  Key Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.features.map((feat, idx) => (
                    <div key={idx} className="flex gap-2 text-sm text-slate-650 dark:text-slate-450 items-start">
                      <CheckCircle2 size={16} className="text-cyber-cyan shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mock visual preview */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  Visual Interface Preview
                </h3>
                {project.type === "Terminal" ? (
                  // Simulated Terminal Shell
                  <div className="w-full rounded-2xl border border-slate-700 bg-[#080510] p-4 font-mono text-[11px] md:text-xs text-amber-300/90 shadow-2xl space-y-2 select-none">
                    <div className="flex items-center gap-1.5 border-b border-slate-800 pb-2 mb-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                      <span className="text-[10px] text-slate-500 ml-2">ssh@sterling-agent-node</span>
                    </div>
                    <p className="text-slate-550"># Initializing AI agent system module...</p>
                    <p className="text-cyan-400">Sterling-Node:$ python main.py --agent={project.id}</p>
                    <p className="text-purple-400">[Agent System] Connected to API services. Model: o3-mini-2025-01-31</p>
                    <p className="text-emerald-400">[Tool Registry] Loaded tools successfully: {[...project.technologies.slice(0, 3)].join(", ")}</p>
                    <p className="text-slate-100">&gt; Question: Compute execution tree for task pipeline</p>
                    <p className="text-blue-400 font-bold">[Thinking...] analyzing query intent, selecting tool path...</p>
                    <p className="text-yellow-400 font-semibold">[Tool Invocation] calling system function with args = {"{}"}</p>
                    <p className="text-white bg-slate-900/60 p-2 rounded border border-white/5 mt-2">
                      Result: "Pipeline compiled successfully. Checked dependencies. All systems green."
                    </p>
                  </div>
                ) : (
                  // Simulated Web Browser Frame
                  <div className="w-full rounded-2xl border border-slate-700/80 bg-slate-900/90 shadow-2xl overflow-hidden select-none">
                    {/* Browser header */}
                    <div className="flex items-center gap-1.5 bg-slate-950 px-4 py-2.5 border-b border-slate-800">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                      </div>
                      <div className="bg-slate-900 text-slate-500 text-[10px] px-3 py-0.5 rounded-md mx-auto w-1/2 text-center overflow-hidden whitespace-nowrap text-ellipsis border border-white/5">
                        {project.demo}
                      </div>
                    </div>
                    {/* Browser UI Mock */}
                    <div className="p-4 bg-slate-900 min-h-[160px] flex flex-col gap-3 font-sans">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-xs font-bold text-cyber-cyan tracking-wide uppercase">AI Workspace Dashboard</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Active Connection</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="p-2.5 rounded-lg bg-slate-950/60 border border-white/5">
                          <span className="text-[9px] text-slate-500 block">Agent Status</span>
                          <span className="text-xs font-semibold text-slate-200">Idle / Ready</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-950/60 border border-white/5">
                          <span className="text-[9px] text-slate-500 block">Active Websocket</span>
                          <span className="text-xs font-semibold text-slate-200">Connected</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-950/60 border border-white/5">
                          <span className="text-[9px] text-slate-500 block">Model Server</span>
                          <span className="text-xs font-semibold text-slate-200">FastAPI [Port 8000]</span>
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-950/30 border border-white/5 text-xs text-slate-400 flex flex-col gap-1.5">
                        <div className="flex justify-between text-[10px]">
                          <span>Active Job Run</span>
                          <span className="text-cyber-cyan">94% Comp</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-cyber-cyan h-full w-[94%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 2: Architecture */}
          {activeTab === "architecture" && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-slate-100/50 dark:bg-slate-950/60 border border-slate-200/50 dark:border-slate-800/50 flex flex-col items-center justify-center">
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
                  Interactive Node Execution Flow
                </p>
                {renderArchitectureFlowchart(project.id)}
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Architecture Breakdown</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-mono">
                  {project.architecture}
                </p>
                <p className="text-sm text-slate-650 dark:text-slate-400 leading-relaxed">
                  The diagram showcases the end-to-end telemetry system. When request cycles begin, the specialized node maps routing requirements to avoid unnecessary LLM latency. Input validations are verified before calling core engines.
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Video Demo */}
          {activeTab === "video" && (
            <div className="space-y-6">
              {/* Responsive Video Container */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-slate-200/50 dark:border-slate-800/50">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={project.video}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center leading-relaxed">
                Note: This is a placeholder demonstration video. Replace the Youtube embed source inside the project schema to point to actual recording assets.
              </p>
            </div>
          )}

        </div>

        {/* Modal Footer Links */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200/50 dark:border-slate-800/50 bg-slate-100/50 dark:bg-slate-900/50">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-350 hover:text-black dark:hover:text-white transition-colors"
          >
            <GitFork size={16} />
            Source Repository
          </a>
          <div className="flex gap-3">
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyber-purple to-cyber-blue hover:opacity-90 text-white font-semibold text-xs shadow-md shadow-cyber-purple/15 transition-all duration-300"
            >
              Live Demo
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
