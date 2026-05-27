"use client";

import React from "react";
import { motion } from "framer-motion";

interface RingProgressProps {
  percentage: number;
  label: string;
  color: string;
  glowColor: string;
  size?: number;
}

function RingProgress({ percentage, label, color, glowColor, size = 100 }: RingProgressProps) {
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Track */}
        <svg width={size} height={size} className="rotate-[-90deg]">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="6"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 6px ${glowColor})` }}
          />
        </svg>
        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-black font-mono" style={{ color }}>
            {percentage}%
          </span>
        </div>
      </div>
      <span className="text-[11px] font-semibold text-slate-400 text-center leading-tight">{label}</span>
    </div>
  );
}

const progressItems = [
  { label: "Tool Calling Agent", percentage: 100, color: "#00f0ff", glow: "#00f0ff88" },
  { label: "Calculator Agent", percentage: 100, color: "#bd00ff", glow: "#bd00ff88" },
  { label: "Multi-Tool Agent",  percentage: 100, color: "#0072ff", glow: "#0072ff88" },
  { label: "RAG Assistant",     percentage: 100, color: "#00ff88", glow: "#00ff8888" },
  { label: "Business Agent",    percentage: 100, color: "#ff00aa", glow: "#ff00aa88" },
  { label: "Multi-Agent Sys",   percentage: 100, color: "#fbbf24", glow: "#fbbf2488" },
];

const milestoneRows = [
  { week: "Week 1–2", milestone: "Tool Calling & Function Dispatch Architecture", status: "done" },
  { week: "Week 2–3", milestone: "Mathematical Reasoning Engine + SymPy Integration", status: "done" },
  { week: "Week 3–4", milestone: "Sandboxed Multi-Tool System Agent + Web Scraper", status: "done" },
  { week: "Week 4–5", milestone: "RAG Pipeline · Vector Store · SSE Streaming UI", status: "done" },
  { week: "Week 5–6", milestone: "LangGraph Business Planner · Market Intelligence", status: "done" },
  { week: "Week 6",   milestone: "WebSocket Multi-Agent Orchestration System", status: "done" },
];

export default function InternshipProgress() {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0 aurora-bg opacity-40 pointer-events-none -z-10" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-cyber-purple/8 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-cyber-purple/30 text-[10px] font-bold tracking-widest uppercase text-cyber-purple mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-purple opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-purple"></span>
            </span>
            All 6 Tasks Complete · 100% Progress Rate
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Internship{" "}
            <span className="shimmer-text">Progress Tracker</span>
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl">
            Comprehensive performance overview across 6 weeks of intensive Agentic AI engineering tasks.
          </p>
        </div>

        {/* Ring Progress Grid */}
        <div className="glass-panel border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-8 mb-10">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8 text-center">
            Task Completion Overview
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 justify-items-center">
            {progressItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <RingProgress
                  percentage={item.percentage}
                  label={item.label}
                  color={item.color}
                  glowColor={item.glow}
                  size={90}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Milestone Table */}
        <div className="glass-panel border border-slate-200/50 dark:border-slate-800/40 rounded-3xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200/50 dark:border-slate-800/40 flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-cyber-green shadow-[0_0_6px_#00ff88]" />
            <span className="text-sm font-bold text-slate-900 dark:text-white">Weekly Milestone Log</span>
            <span className="ml-auto text-[10px] font-mono text-slate-500">May 2026</span>
          </div>
          <div className="divide-y divide-slate-200/30 dark:divide-slate-800/30">
            {milestoneRows.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 px-6 py-4 hover:bg-slate-100/30 dark:hover:bg-white/2 transition-colors"
              >
                <div className="w-20 shrink-0">
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-500">{row.week}</span>
                </div>
                <div className="flex-1 text-sm text-slate-800 dark:text-slate-200 font-medium">
                  {row.milestone}
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="h-2 w-2 rounded-full bg-cyber-green shadow-[0_0_6px_#00ff88]" />
                  <span className="text-[10px] font-bold text-cyber-green uppercase tracking-wider">Done</span>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Summary bar */}
          <div className="px-6 py-4 border-t border-slate-200/50 dark:border-slate-800/40 bg-slate-100/30 dark:bg-slate-950/30 flex items-center justify-between">
            <span className="text-xs text-slate-500">6 / 6 tasks delivered on schedule</span>
            <div className="flex items-center gap-2">
              <div className="w-32 h-1.5 bg-slate-300 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-cyber-purple to-cyber-cyan rounded-full"
                />
              </div>
              <span className="text-xs font-bold text-cyber-cyan">100%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
