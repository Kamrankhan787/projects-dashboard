"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Terminal, Laptop, Database, Code, Brain } from "lucide-react";

interface Skill {
  name: string;
  percentage: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
}

const backendSkills: Skill[] = [
  { name: "Python", percentage: 95, icon: Terminal, color: "from-blue-500 to-indigo-500" },
  { name: "FastAPI", percentage: 90, icon: Cpu, color: "from-teal-400 to-emerald-500" },
  { name: "LangChain", percentage: 85, icon: Brain, color: "from-cyber-purple to-pink-500" },
  { name: "OpenAI API", percentage: 95, icon: Cpu, color: "from-cyber-cyan to-blue-500" },
  { name: "Vector Databases", percentage: 88, icon: Database, color: "from-yellow-400 to-amber-500" },
];

const frontendSkills: Skill[] = [
  { name: "Next.js", percentage: 90, icon: Laptop, color: "from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-600" },
  { name: "React", percentage: 92, icon: Code, color: "from-cyan-400 to-blue-500" },
  { name: "Tailwind CSS", percentage: 95, icon: Laptop, color: "from-indigo-400 to-cyber-cyan" },
  { name: "AI Agents", percentage: 92, icon: Brain, color: "from-cyber-purple to-cyber-cyan" },
  { name: "RAG Systems", percentage: 90, icon: Database, color: "from-pink-500 to-cyber-purple" },
];

export default function Skills() {
  const renderSkillRow = (skill: Skill) => {
    const Icon = skill.icon;
    return (
      <div key={skill.name} className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold">
            <Icon size={16} className="text-cyber-cyan" />
            <span>{skill.name}</span>
          </div>
          <span className="font-mono text-xs text-cyber-cyan">{skill.percentage}%</span>
        </div>
        <div className="h-2 w-full bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-300/10 dark:border-slate-800/40">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.percentage}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
          />
        </div>
      </div>
    );
  };

  return (
    <section id="skills" className="py-20 px-6 relative">
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-cyber-cyan/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto">
        {/* Header Block */}
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Developer{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyber-purple to-cyber-cyan">
              Skills Architecture
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl">
            My primary core expertise spanning Agentic frameworks, NLP systems, modern backend servers, and polished client interfaces.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-8 rounded-3xl glass-panel border border-slate-200/50 dark:border-slate-800/50">
          
          {/* Column 1: Backend & AI */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-905 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-200/50 dark:border-slate-800/45">
              <Cpu size={18} className="text-cyber-purple" />
              AI Core & Backend
            </h3>
            <div className="space-y-5">
              {backendSkills.map(renderSkillRow)}
            </div>
          </div>

          {/* Column 2: Web & Interfaces */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-905 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-200/50 dark:border-slate-800/45">
              <Laptop size={18} className="text-cyber-cyan" />
              Frontend & Architectures
            </h3>
            <div className="space-y-5">
              {frontendSkills.map(renderSkillRow)}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
