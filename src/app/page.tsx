"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import ParticleBackground from "@/components/ParticleBackground";
import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import SocialLinks from "@/components/SocialLinks";
import ProjectsDashboard from "@/components/ProjectsDashboard";
import Analytics from "@/components/Analytics";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import InternshipProgress from "@/components/InternshipProgress";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SettingsModal from "@/components/SettingsModal";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Manage Dark Mode HTML class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Loading Screen simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-[#03000a] z-50 flex flex-col items-center justify-center font-mono p-6 text-xs text-cyber-cyan"
          >
            <div className="max-w-md w-full space-y-4">
              {/* Spinning Logo */}
              <div className="flex justify-center mb-6">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-cyber-purple to-cyber-cyan flex items-center justify-center font-bold text-white text-2xl shadow-lg shadow-cyber-purple/40 animate-bounce">
                  Ω
                </div>
              </div>

              {/* Simulated Logs */}
              <div className="space-y-1.5 text-left border border-cyber-cyan/20 p-4 rounded-xl bg-slate-950/80">
                <p className="text-slate-500">[SYSTEM ROOT STARTUP]</p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-cyber-cyan">
                  &gt; checking dependencies... OK
                </motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-cyber-cyan">
                  &gt; compiling python subprocess sandbox... OK
                </motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="text-cyber-purple">
                  &gt; loading vector search pipelines... OK
                </motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="text-cyber-cyan">
                  &gt; routing supervisor WebSocket sockets... OK
                </motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="text-slate-200 font-bold">
                  &gt; STERLING DASHBOARD V1.0.0 INITIALIZED
                </motion.p>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.8, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-cyber-purple to-cyber-cyan"
                />
              </div>
              <p className="text-center text-[10px] text-slate-555 animate-pulse">Syncing core model nodes...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Layout */}
      {!isLoading && (
        <div className="min-h-screen flex flex-col font-sans selection:bg-cyber-purple/30 selection:text-white">
          
          {/* Scroll progress bar at top */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyber-purple to-cyber-cyan origin-[0%] z-50"
            style={{ scaleX }}
          />

          {/* Interactive particles background */}
          <ParticleBackground />

          {/* Sidebar Navigation */}
          <Sidebar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />

          {/* Settings Customizer Modal */}
          <SettingsModal />

          {/* Content Panel */}
          <div
            className={`flex flex-col flex-1 min-h-screen pt-16 md:pt-0 transition-all duration-300 ${
              isCollapsed ? "md:pl-20" : "md:pl-64"
            }`}
          >
            <main className="flex-1 w-full relative z-10 dot-grid dark:cyber-grid">
              {/* Section 1: Hero */}
              <Hero />

              {/* Section 2: Social Quicklinks */}
              <SocialLinks />

              {/* Section 3 & 4: Projects & Detail Modals */}
              <ProjectsDashboard />

              {/* Section 7: Analytics */}
              <Analytics />

              {/* Section 5: Skills */}
              <Skills />

              {/* Section 6.5: Internship Progress Tracker */}
              <InternshipProgress />

              {/* Section 6: Journey Timeline */}
              <Timeline />

              {/* Section 8: Contact */}
              <Contact />
            </main>

            {/* Section 9: Footer */}
            <Footer />
          </div>

        </div>
      )}
    </>
  );
}
