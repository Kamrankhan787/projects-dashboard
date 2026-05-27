"use client";

import React, { useState, useEffect } from "react";
import { 
  Home, 
  Terminal, 
  Cpu, 
  Milestone, 
  BarChart3, 
  Mail, 
  Sun, 
  Moon, 
  Menu, 
  X,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";

interface SidebarProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const menuItems = [
  { id: "hero", label: "Overview", icon: Home },
  { id: "projects", label: "Projects", icon: Terminal },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "skills", label: "Skills", icon: Cpu },
  { id: "timeline", label: "Journey", icon: Milestone },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function Sidebar({ darkMode, setDarkMode, isCollapsed, setIsCollapsed }: SidebarProps) {
  const { profile } = usePortfolio();
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Intersection Observer to detect scroll position
  useEffect(() => {
    const observers = menuItems.map((item) => {
      const el = document.getElementById(item.id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(item.id);
          }
        },
        { threshold: 0.3, rootMargin: "-20% 0px -60% 0px" }
      );

      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  const handleScroll = (id: string) => {
    setIsMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Mobile Header (Navbar) */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 glass-panel border-b md:hidden">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-cyber-purple to-cyber-cyan flex items-center justify-center font-bold text-white shadow-lg shadow-cyber-purple/20">
            Ω
          </div>
          <span className="font-bold text-lg tracking-wider text-slate-800 dark:text-slate-100">
            AGENTIC.<span className="text-cyber-purple dark:text-cyber-cyan">AI</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 z-50 w-72 flex flex-col glass-panel border-r p-6 md:hidden"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-cyber-purple to-cyber-cyan flex items-center justify-center font-bold text-white shadow-lg shadow-cyber-purple/20">
                  Ω
                </div>
                <span className="font-bold text-lg tracking-wider text-slate-800 dark:text-slate-100">
                  AGENTIC.<span className="text-cyber-purple dark:text-cyber-cyan">AI</span>
                </span>
              </div>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-1 rounded-md text-slate-500 hover:text-slate-800 dark:hover:text-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Profile */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 mb-6">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyber-cyan to-cyber-purple flex items-center justify-center text-white font-bold shadow-md shadow-cyber-cyan/10">
                KK
              </div>
              <div>
                <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{profile.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Intern Portfolio</p>
              </div>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 flex flex-col gap-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleScroll(item.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm text-left ${
                      active
                        ? "bg-gradient-to-r from-cyber-purple/20 to-cyber-cyan/20 text-cyber-purple dark:text-cyber-cyan border-l-4 border-cyber-purple dark:border-cyber-cyan"
                        : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-900/50"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="mt-auto border-t border-slate-200 dark:border-slate-800/50 pt-4 text-center">
              <p className="text-xs text-slate-400">© 2026 AI Agent Internship</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: isCollapsed ? 76 : 260 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 z-30 glass-panel border-r py-6 px-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8 px-2">
          {!isCollapsed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-cyber-purple to-cyber-cyan flex items-center justify-center font-bold text-white shadow-lg shadow-cyber-purple/20">
                Ω
              </div>
              <span className="font-bold text-lg tracking-wider text-slate-800 dark:text-slate-100">
                AGENTIC.<span className="text-cyber-purple dark:text-cyber-cyan">AI</span>
              </span>
            </motion.div>
          ) : (
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-cyber-purple to-cyber-cyan flex items-center justify-center font-bold text-white mx-auto shadow-md">
              Ω
            </div>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Profile Card */}
        <div className="mb-8">
          {!isCollapsed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50"
            >
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyber-cyan to-cyber-purple flex items-center justify-center text-white font-bold shadow-md shadow-cyber-cyan/10">
                KK
              </div>
              <div>
                <h4 className="font-semibold text-sm text-slate-900 dark:text-white leading-tight">{profile.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Internship 2026</p>
              </div>
            </motion.div>
          ) : (
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyber-cyan to-cyber-purple flex items-center justify-center text-white font-bold mx-auto shadow-md shadow-cyber-cyan/10">
              AI
            </div>
          )}
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm text-left ${
                  active
                    ? "bg-gradient-to-r from-cyber-purple/10 to-cyber-cyan/10 text-cyber-purple dark:text-cyber-cyan border-l-4 border-cyber-purple dark:border-cyber-cyan"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-900/50"
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon size={18} />
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Theme Toggle & Footer */}
        <div className="mt-auto flex flex-col gap-4 border-t border-slate-200 dark:border-slate-800/50 pt-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors font-medium text-sm"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            {!isCollapsed && <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>}
          </button>

          {!isCollapsed && (
            <p className="text-[10px] text-center text-slate-400 dark:text-slate-500">
              Built with Next.js & Tailwind
            </p>
          )}
        </div>
      </motion.aside>
    </>
  );
}
