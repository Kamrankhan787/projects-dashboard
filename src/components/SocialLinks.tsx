"use client";

import React from "react";
import { motion } from "framer-motion";
import { GitFork, Link2, Mail, Globe, ArrowUpRight } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function SocialLinks() {
  const { profile } = usePortfolio();

  const socialCards = [
    {
      name: "LinkedIn",
      label: "Professional Network",
      description: "Connect with me for collaborations, agentic AI discussions, and internship opportunities.",
      icon: Link2,
      url: profile.linkedin,
      color: "from-blue-600/20 to-cyber-blue/20",
      hoverColor: "hover:border-blue-500/50",
      iconColor: "text-blue-400"
    },
    {
      name: "GitHub",
      label: "Code Repositories",
      description: "Explore source code, custom libraries, system agents, and terminal calculator projects.",
      icon: GitFork,
      url: profile.github,
      color: "from-zinc-800/40 to-slate-900/40",
      hoverColor: "hover:border-cyber-cyan/50",
      iconColor: "text-slate-300"
    },
    {
      name: "Email Address",
      label: "Direct Communication",
      description: "Send inquiries about consulting, contracting, or full-time roles in artificial intelligence.",
      icon: Mail,
      url: `mailto:${profile.email}`,
      color: "from-purple-900/20 to-cyber-purple/20",
      hoverColor: "hover:border-cyber-purple/50",
      iconColor: "text-purple-400"
    },
    {
      name: "Personal Portfolio",
      label: "Web Hub",
      description: "Review other design cases, system specifications, and full-stack autonomous platforms.",
      icon: Globe,
      url: profile.portfolio,
      color: "from-emerald-955/20 to-teal-500/10",
      hoverColor: "hover:border-emerald-500/50",
      iconColor: "text-emerald-400"
    }
  ];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 }
    }
  };

  return (
    <section className="py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {socialCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.a
                key={card.name}
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={cardVariants}
                className={`group relative flex flex-col p-6 rounded-2xl glass-card border bg-gradient-to-br ${card.color} ${card.hoverColor} overflow-hidden cursor-pointer`}
              >
                {/* Decorative background glow */}
                <div className="absolute -right-8 -top-8 w-24 h-24 bg-white/5 dark:bg-white/2 rounded-full blur-xl group-hover:scale-150 transition-all duration-500" />

                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-slate-900/40 border border-white/5 ${card.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={22} />
                  </div>
                  <ArrowUpRight size={18} className="text-slate-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </div>

                <div className="mt-2">
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
                    {card.label}
                  </p>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
                    {card.name}
                  </h3>
                  <p className="text-xs text-slate-650 dark:text-slate-400 mt-2 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
