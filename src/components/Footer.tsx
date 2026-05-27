"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function Footer() {
  const { profile } = usePortfolio();
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 px-6 border-t border-slate-200/50 dark:border-slate-900/60 bg-slate-100/50 dark:bg-slate-950/20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left column */}
        <div className="text-center md:text-left">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            © 2026 {profile.name}. All rights reserved.
          </p>
          <p className="text-[10px] text-slate-400 mt-1">
            Built using <strong className="text-slate-655 dark:text-slate-350">Next.js 15 App Router</strong>, <strong className="text-slate-655 dark:text-slate-350">Tailwind CSS v4</strong>, and <strong className="text-slate-655 dark:text-slate-350">Framer Motion</strong>.
          </p>
        </div>

        {/* Center/Right Social Quicklinks */}
        <div className="flex items-center gap-6">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-cyber-cyan transition-colors"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-cyber-cyan transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-cyber-cyan transition-colors"
          >
            Email
          </a>
          
          <button
            onClick={handleScrollToTop}
            className="p-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors shadow-sm cursor-pointer ml-4"
            aria-label="Scroll to top"
          >
            <ArrowUp size={14} />
          </button>
        </div>

      </div>
    </footer>
  );
}
