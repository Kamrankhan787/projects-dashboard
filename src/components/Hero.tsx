"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, GitFork, Link2, Mail, ArrowRight, ShieldCheck, Terminal, Bot, Settings } from "lucide-react";
import HologramAvatar from "./HologramAvatar";
import { usePortfolio } from "@/context/PortfolioContext";

export default function Hero() {
  const { profile, setIsSettingsOpen } = usePortfolio();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
  };

  const handleScrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center py-20 px-6 overflow-hidden">
      {/* Radial ambient glow in background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-gradient-to-tr from-cyber-purple/10 to-cyber-cyan/15 rounded-full blur-[80px] pointer-events-none -z-10 animate-pulse-slow" />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left text column (7 cols on lg) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
        >
          {/* Futuristic Status Badge */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-cyber-cyan/30 text-xs font-semibold text-cyber-cyan tracking-widest uppercase shadow-md shadow-cyber-cyan/5"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-cyan"></span>
            </span>
            Agentic AI Internship • 2026
          </motion.div>

          {/* Main Name & Title */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none"
          >
            <span className="text-slate-900 dark:text-white">{profile.name}</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyber-purple via-cyber-blue to-cyber-cyan text-glow-cyan">
              {profile.title}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-slate-650 dark:text-slate-350 max-w-xl leading-relaxed font-sans"
          >
            {profile.bio}
          </motion.p>

          {/* Floating Mini Tech Badges */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 max-w-lg"
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200/50 dark:bg-slate-950/60 border border-slate-300/30 dark:border-slate-850/40 text-xs font-medium text-slate-700 dark:text-slate-400">
              <Terminal size={12} className="text-cyber-cyan" />
              CLI Orchestration
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200/50 dark:bg-slate-950/60 border border-slate-300/30 dark:border-slate-850/40 text-xs font-medium text-slate-700 dark:text-slate-400">
              <Bot size={12} className="text-cyber-purple" />
              Cognitive Frameworks
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200/50 dark:bg-slate-950/60 border border-slate-300/30 dark:border-slate-850/40 text-xs font-medium text-slate-700 dark:text-slate-400">
              <ShieldCheck size={12} className="text-emerald-450" />
              Subprocess Sandboxing
            </div>
          </motion.div>

          {/* Buttons / Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full pt-4"
          >
            <button
              onClick={handleScrollToProjects}
              className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyber-purple to-cyber-blue hover:from-cyber-purple/90 hover:to-cyber-blue/90 text-white font-semibold transition-all duration-300 shadow-lg shadow-cyber-purple/20 hover:shadow-cyber-purple/35 cursor-pointer text-sm"
            >
              Explore Projects Dashboard
              <ArrowRight size={18} />
            </button>
            
            <a
              href={profile.resume}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-250/50 dark:bg-slate-900/50 hover:bg-slate-200 dark:hover:bg-slate-850 border border-slate-300/40 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-semibold transition-all duration-300 cursor-pointer text-sm"
            >
              <FileText size={18} className="text-cyber-purple" />
              Download Resume
            </a>

            <button
              onClick={() => setIsSettingsOpen(true)}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-250/50 dark:bg-slate-900/50 hover:bg-slate-200 dark:hover:bg-slate-850 border border-cyber-purple/30 text-cyber-purple dark:text-cyber-cyan hover:border-cyber-cyan/50 font-semibold transition-all duration-300 cursor-pointer text-sm"
            >
              <Settings size={18} className="animate-spin-slow" />
              Edit Portfolio
            </button>
          </motion.div>

          {/* Mini Social Bar */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-6 pt-4"
          >
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-655 dark:text-slate-400 dark:hover:text-cyber-cyan transition-all duration-300"
              aria-label="GitHub Profile"
            >
              <GitFork size={20} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-655 dark:text-slate-400 dark:hover:text-cyber-cyan transition-all duration-300"
              aria-label="LinkedIn Profile"
            >
              <Link2 size={20} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-655 dark:text-slate-400 dark:hover:text-cyber-cyan transition-all duration-300"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </motion.div>
        </motion.div>

        {/* Right Hologram Avatar column (5 cols on lg) */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
          >
            <HologramAvatar />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
