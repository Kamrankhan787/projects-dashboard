"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart3, Database, GitBranch, GitFork, ShieldAlert, Cpu, Activity, Clock, Zap } from "lucide-react";

export default function Analytics() {
  const [activeTab, setActiveTab] = useState<"latency" | "token" | "cost">("latency");
  const [uptime, setUptime] = useState("99.98%");

  // Fake loading animation counters
  const [counters, setCounters] = useState({
    projects: 0,
    tasks: 0,
    techs: 0,
    stars: 0
  });

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const interval = duration / steps;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      setCounters({
        projects: Math.min(6, Math.floor((6 / steps) * stepCount)),
        tasks: Math.min(6, Math.floor((6 / steps) * stepCount)),
        techs: Math.min(18, Math.floor((18 / steps) * stepCount)),
        stars: Math.min(142, Math.floor((142 / steps) * stepCount))
      });

      if (stepCount >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Contribution grid mock (53 weeks * 7 days)
  // Let's generate a small 7x24 grid (168 days) to fit cleanly in a card
  const gridCells = Array.from({ length: 168 }, () => {
    const rand = Math.random();
    if (rand > 0.8) return "bg-cyber-cyan opacity-80 shadow-[0_0_8px_#00f0ff]";
    if (rand > 0.65) return "bg-cyber-purple opacity-70";
    if (rand > 0.4) return "bg-cyber-purple opacity-30";
    return "bg-slate-350 dark:bg-slate-900";
  });

  return (
    <section id="analytics" className="py-20 px-6 relative">
      <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] bg-cyber-cyan/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Header Block */}
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Telemetry &{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyber-purple to-cyber-cyan">
              Analytics Hub
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl">
            Live measurements monitoring model performance, response speeds, token payloads, and workspace contributions.
          </p>
        </div>

        {/* High-Level Overview Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          
          <div className="p-6 rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] uppercase font-bold tracking-wider">Total Projects</span>
              <Cpu size={18} className="text-cyber-purple" />
            </div>
            <div className="mt-4">
              <span className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white font-mono">
                {counters.projects}
              </span>
              <p className="text-xs text-slate-500 mt-1">3 CLI + 3 Full-Stack UI</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] uppercase font-bold tracking-wider">Tasks Completed</span>
              <Activity size={18} className="text-cyber-cyan" />
            </div>
            <div className="mt-4">
              <span className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white font-mono">
                {counters.tasks}/6
              </span>
              <p className="text-xs text-slate-500 mt-1">100% completion rate</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] uppercase font-bold tracking-wider">Tech Ecosystem</span>
              <Database size={18} className="text-amber-500" />
            </div>
            <div className="mt-4">
              <span className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white font-mono">
                {counters.techs}
              </span>
              <p className="text-xs text-slate-500 mt-1">Packages, tools, models</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] uppercase font-bold tracking-wider">System Uptime</span>
              <Clock size={18} className="text-emerald-500" />
            </div>
            <div className="mt-4">
              <span className="text-3xl md:text-4xl font-extrabold text-emerald-555 dark:text-emerald-400 font-mono">
                {uptime}
              </span>
              <p className="text-xs text-slate-500 mt-1">Vercel live deployment</p>
            </div>
          </div>

        </div>

        {/* Dashboard Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Custom Performance Graphs Widget (2 Columns) */}
          <div className="lg:col-span-2 p-6 rounded-3xl glass-panel border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800/50 pb-4 mb-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Agent Operations Telemetry</h3>
                  <p className="text-xs text-slate-500">Comparing parameters across active LLM pipeline configurations</p>
                </div>
                {/* Graph Tab buttons */}
                <div className="flex gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200/50 dark:border-slate-850/50">
                  <button 
                    onClick={() => setActiveTab("latency")}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all ${
                      activeTab === "latency" ? "bg-slate-900 text-white dark:bg-slate-900 dark:text-cyber-cyan" : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    Latency
                  </button>
                  <button 
                    onClick={() => setActiveTab("token")}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all ${
                      activeTab === "token" ? "bg-slate-900 text-white dark:bg-slate-900 dark:text-cyber-cyan" : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    Tokens
                  </button>
                  <button 
                    onClick={() => setActiveTab("cost")}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all ${
                      activeTab === "cost" ? "bg-slate-900 text-white dark:bg-slate-900 dark:text-cyber-cyan" : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    Cost
                  </button>
                </div>
              </div>

              {/* Graphic Chart Wrapper */}
              <div className="h-64 flex flex-col justify-between font-mono relative mt-4">
                
                {/* Horizontal grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                  <div className="border-t border-slate-500 w-full" />
                  <div className="border-t border-slate-500 w-full" />
                  <div className="border-t border-slate-500 w-full" />
                  <div className="border-t border-slate-500 w-full" />
                </div>

                {activeTab === "latency" && (
                  <div className="flex-1 flex items-end justify-around pb-6 h-full relative z-10">
                    {/* Bar 1 */}
                    <div className="flex flex-col items-center gap-2 w-12">
                      <span className="text-[10px] text-slate-500">850ms</span>
                      <motion.div initial={{ height: 0 }} animate={{ height: "45%" }} className="w-8 bg-gradient-to-t from-cyber-purple/40 to-cyber-purple rounded-t-lg shadow-[0_0_12px_rgba(189,0,255,0.2)]" />
                      <span className="text-[9px] text-slate-400 text-center truncate w-full">Tool Agent</span>
                    </div>
                    {/* Bar 2 */}
                    <div className="flex flex-col items-center gap-2 w-12">
                      <span className="text-[10px] text-slate-500">320ms</span>
                      <motion.div initial={{ height: 0 }} animate={{ height: "18%" }} className="w-8 bg-gradient-to-t from-cyber-blue/40 to-cyber-blue rounded-t-lg" />
                      <span className="text-[9px] text-slate-400 text-center truncate w-full">Calculator</span>
                    </div>
                    {/* Bar 3 */}
                    <div className="flex flex-col items-center gap-2 w-12">
                      <span className="text-[10px] text-slate-500">1420ms</span>
                      <motion.div initial={{ height: 0 }} animate={{ height: "75%" }} className="w-8 bg-gradient-to-t from-cyber-cyan/40 to-cyber-cyan rounded-t-lg shadow-[0_0_12px_rgba(0,240,255,0.2)]" />
                      <span className="text-[9px] text-slate-400 text-center truncate w-full">Multi Tool</span>
                    </div>
                    {/* Bar 4 */}
                    <div className="flex flex-col items-center gap-2 w-12">
                      <span className="text-[10px] text-slate-555">2100ms</span>
                      <motion.div initial={{ height: 0 }} animate={{ height: "95%" }} className="w-8 bg-gradient-to-t from-amber-500/40 to-amber-500 rounded-t-lg" />
                      <span className="text-[9px] text-slate-400 text-center truncate w-full">RAG Chat</span>
                    </div>
                    {/* Bar 5 */}
                    <div className="flex flex-col items-center gap-2 w-12">
                      <span className="text-[10px] text-slate-500">14.8s</span>
                      <motion.div initial={{ height: 0 }} animate={{ height: "85%" }} className="w-8 bg-gradient-to-t from-emerald-500/40 to-emerald-500 rounded-t-lg" />
                      <span className="text-[9px] text-slate-400 text-center truncate w-full">Business</span>
                    </div>
                    {/* Bar 6 */}
                    <div className="flex flex-col items-center gap-2 w-12">
                      <span className="text-[10px] text-slate-500">6.2s</span>
                      <motion.div initial={{ height: 0 }} animate={{ height: "55%" }} className="w-8 bg-gradient-to-t from-cyber-purple/40 to-cyber-cyan rounded-t-lg" />
                      <span className="text-[9px] text-slate-400 text-center truncate w-full">Multi Agent</span>
                    </div>
                  </div>
                )}

                {activeTab === "token" && (
                  <div className="flex-1 flex items-end justify-around pb-6 h-full relative z-10">
                    <div className="flex flex-col items-center gap-2 w-12">
                      <span className="text-[10px] text-slate-500">12k</span>
                      <motion.div initial={{ height: 0 }} animate={{ height: "25%" }} className="w-8 bg-cyber-cyan opacity-80 rounded-t-lg" />
                      <span className="text-[9px] text-slate-400 text-center">Tool</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 w-12">
                      <span className="text-[10px] text-slate-500">8k</span>
                      <motion.div initial={{ height: 0 }} animate={{ height: "15%" }} className="w-8 bg-cyber-cyan opacity-80 rounded-t-lg" />
                      <span className="text-[9px] text-slate-400 text-center">Calc</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 w-12">
                      <span className="text-[10px] text-slate-500">22k</span>
                      <motion.div initial={{ height: 0 }} animate={{ height: "50%" }} className="w-8 bg-cyber-cyan opacity-80 rounded-t-lg" />
                      <span className="text-[9px] text-slate-400 text-center">System</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 w-12">
                      <span className="text-[10px] text-slate-555">45k</span>
                      <motion.div initial={{ height: 0 }} animate={{ height: "85%" }} className="w-8 bg-cyber-cyan opacity-80 rounded-t-lg" />
                      <span className="text-[9px] text-slate-400 text-center">RAG</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 w-12">
                      <span className="text-[10px] text-slate-500">80k</span>
                      <motion.div initial={{ height: 0 }} animate={{ height: "98%" }} className="w-8 bg-cyber-cyan opacity-80 rounded-t-lg" />
                      <span className="text-[9px] text-slate-400 text-center">Business</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 w-12">
                      <span className="text-[10px] text-slate-500">64k</span>
                      <motion.div initial={{ height: 0 }} animate={{ height: "70%" }} className="w-8 bg-cyber-cyan opacity-80 rounded-t-lg" />
                      <span className="text-[9px] text-slate-400 text-center">Orchestr</span>
                    </div>
                  </div>
                )}

                {activeTab === "cost" && (
                  <div className="flex-1 flex items-end justify-around pb-6 h-full relative z-10">
                    <div className="flex flex-col items-center gap-2 w-12">
                      <span className="text-[10px] text-slate-555">$0.005</span>
                      <motion.div initial={{ height: 0 }} animate={{ height: "20%" }} className="w-8 bg-emerald-555 dark:bg-emerald-500/80 rounded-t-lg" />
                      <span className="text-[9px] text-slate-400 text-center">Tool</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 w-12">
                      <span className="text-[10px] text-slate-500">$0.002</span>
                      <motion.div initial={{ height: 0 }} animate={{ height: "8%" }} className="w-8 bg-emerald-500/80 rounded-t-lg" />
                      <span className="text-[9px] text-slate-400 text-center">Calc</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 w-12">
                      <span className="text-[10px] text-slate-500">$0.012</span>
                      <motion.div initial={{ height: 0 }} animate={{ height: "40%" }} className="w-8 bg-emerald-500/80 rounded-t-lg" />
                      <span className="text-[9px] text-slate-400 text-center">System</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 w-12">
                      <span className="text-[10px] text-slate-500">$0.024</span>
                      <motion.div initial={{ height: 0 }} animate={{ height: "65%" }} className="w-8 bg-emerald-500/80 rounded-t-lg" />
                      <span className="text-[9px] text-slate-400 text-center">RAG</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 w-12">
                      <span className="text-[10px] text-slate-555">$0.075</span>
                      <motion.div initial={{ height: 0 }} animate={{ height: "98%" }} className="w-8 bg-emerald-500/80 rounded-t-lg" />
                      <span className="text-[9px] text-slate-400 text-center">Business</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 w-12">
                      <span className="text-[10px] text-slate-500">$0.040</span>
                      <motion.div initial={{ height: 0 }} animate={{ height: "75%" }} className="w-8 bg-emerald-500/80 rounded-t-lg" />
                      <span className="text-[9px] text-slate-400 text-center">Orchestr</span>
                    </div>
                  </div>
                )}

              </div>
            </div>
            
            <div className="text-[10px] text-slate-400 flex items-center justify-between border-t border-slate-200/50 dark:border-slate-800/50 pt-4 mt-6">
              <span>Telemetry system connected via LangSmith wrappers</span>
              <span>Compiled stats: May 2026</span>
            </div>
          </div>

          {/* GitHub contributions mockup (1 Column) */}
          <div className="p-6 rounded-3xl glass-panel border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800/50 pb-4 mb-2">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <GitFork size={16} />
                    GitHub Workspace Activity
                  </h3>
                  <p className="text-xs text-slate-500">Repository commits frequency</p>
                </div>
              </div>

              {/* GitHub Stars widget */}
              <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200/40 dark:border-slate-900/60">
                <div className="flex items-center gap-2 text-xs">
                  <GitBranch size={14} className="text-cyber-cyan" />
                  <span className="font-semibold text-slate-700 dark:text-slate-350">Workspace Stars</span>
                </div>
                <span className="font-mono text-sm font-bold text-cyber-cyan">{counters.stars}</span>
              </div>

              {/* Grid Box */}
              <div>
                <p className="text-[10px] text-slate-550 dark:text-slate-500 mb-2 uppercase tracking-wide font-bold">168-Day Commit Heatmap</p>
                <div className="grid grid-cols-24 gap-[3px] p-2 bg-slate-100 dark:bg-[#06040d] rounded-xl border border-slate-300/10 dark:border-slate-900/80">
                  {gridCells.map((cell, idx) => (
                    <div key={idx} className={`aspect-square w-full rounded-[1px] ${cell}`} />
                  ))}
                </div>
                <div className="flex justify-between text-[9px] text-slate-500 mt-2 font-semibold">
                  <span>Dec 2025</span>
                  <span>May 2026</span>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 border-t border-slate-200/50 dark:border-slate-800/50 pt-4 mt-6">
              <span>Updated 3 mins ago from Git hooks</span>
            </div>
          </div>

        </div>

        {/* AI Agent Performance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          
          <div className="p-5 rounded-2xl bg-gradient-to-tr from-cyber-purple/5 to-cyber-cyan/5 border border-cyber-purple/20 dark:border-cyber-cyan/15 flex gap-4 items-center">
            <div className="p-3 rounded-xl bg-slate-900 text-cyber-cyan border border-cyber-cyan/30">
              <Zap size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Token Optimization</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Caching embeddings saved 38% costs</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-tr from-cyber-purple/5 to-cyber-cyan/5 border border-cyber-purple/20 dark:border-cyber-cyan/15 flex gap-4 items-center">
            <div className="p-3 rounded-xl bg-slate-900 text-cyber-purple border border-cyber-purple/30">
              <BarChart3 size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Routing Success</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">LangGraph routing accuracy: 96.8%</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-tr from-cyber-purple/5 to-cyber-cyan/5 border border-cyber-purple/20 dark:border-cyber-cyan/15 flex gap-4 items-center">
            <div className="p-3 rounded-xl bg-slate-900 text-amber-500 border border-amber-500/30">
              <ShieldAlert size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Subprocess Integrity</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">0 security breaches in code execution</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
