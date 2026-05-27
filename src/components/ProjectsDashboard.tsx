"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Laptop, Search, GitFork, ExternalLink, Play, Eye, ListChecks } from "lucide-react";
import { Project } from "@/data/projects";
import ProjectModal from "./ProjectModal";
import { usePortfolio } from "@/context/PortfolioContext";

export default function ProjectsDashboard() {
  const { projects } = usePortfolio();
  const [filter, setFilter] = useState<"All" | "Terminal" | "UI">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalTab, setModalTab] = useState<"overview" | "architecture" | "video">("overview");

  // Filtering Logic
  const filteredProjects = projects.filter((project) => {
    const matchesFilter = filter === "All" ? true : project.type === filter;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const openProjectModal = (project: Project, tab: "overview" | "architecture" | "video" = "overview") => {
    setModalTab(tab);
    setSelectedProject(project);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="projects" className="py-20 px-6 relative">
      {/* Background cyan/purple glows */}
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-cyber-cyan/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-cyber-purple/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Header Block */}
        <div className="flex flex-col items-center text-center mb-12 space-y-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Internship{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyber-purple to-cyber-cyan">
              Projects Dashboard
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl">
            A comprehensive showcase of terminal agents and user-interface assistants built during my Agentic AI Internship.
          </p>
        </div>

        {/* Dashboard Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 p-4 rounded-2xl glass-panel border border-slate-200/50 dark:border-slate-800/50">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200/50 dark:border-slate-850/50 w-full md:w-auto">
            {(["All", "Terminal", "UI"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`flex-1 md:flex-initial px-4 py-2 rounded-lg text-xs font-semibold tracking-wider transition-all duration-300 ${
                  filter === type
                    ? "bg-slate-900 text-white dark:bg-slate-900 dark:text-cyber-cyan shadow-md"
                    : "text-slate-650 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                {type} Projects
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 dark:text-slate-400">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search projects or technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-slate-100 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-850/50 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyber-purple dark:focus:border-cyber-cyan transition-colors"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                variants={cardVariants}
                className="group relative flex flex-col p-6 rounded-2xl glass-card border flex-1 h-full"
              >
                {/* Project Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5">
                    {project.type === "Terminal" ? (
                      <Terminal size={14} className="text-amber-500" />
                    ) : (
                      <Laptop size={14} className="text-cyber-cyan" />
                    )}
                    <span className={`text-[10px] font-bold tracking-wider uppercase ${
                      project.type === "Terminal" ? "text-amber-550" : "text-cyber-cyan"
                    }`}>
                      {project.type}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-650 dark:text-slate-450 dark:hover:text-white transition-colors"
                      title="GitHub Repository"
                    >
                      <GitFork size={14} />
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-650 dark:text-slate-450 dark:hover:text-white transition-colors"
                      title="Live Deployment"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

                {/* Project Info */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyber-cyan dark:group-hover:text-cyber-cyan transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-xs text-slate-650 dark:text-slate-400 mb-4 leading-relaxed line-clamp-3">
                  {project.shortDesc}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-[9px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-400 border border-slate-200/50 dark:border-slate-850/50"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[9px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 text-slate-500 font-semibold">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Features Mini Checklist */}
                <div className="border-t border-slate-200/50 dark:border-slate-850/50 pt-4 mb-6">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-3 font-semibold">
                    <ListChecks size={12} />
                    Core Spec Highlights
                  </span>
                  <div className="space-y-2">
                    {project.features.slice(0, 2).map((feat, index) => (
                      <p key={index} className="text-[10px] text-slate-550 dark:text-slate-450 line-clamp-1">
                        • {feat}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-2 gap-2 mt-auto">
                  <button
                    onClick={() => openProjectModal(project, "overview")}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-350 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all duration-300 cursor-pointer"
                  >
                    <Eye size={12} />
                    Details
                  </button>
                  <button
                    onClick={() => openProjectModal(project, "video")}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-cyber-purple/10 to-cyber-blue/10 dark:from-cyber-purple/20 dark:to-cyber-blue/20 hover:from-cyber-purple/20 hover:to-cyber-blue/20 text-xs font-bold text-cyber-purple dark:text-cyber-cyan border border-cyber-purple/20 dark:border-cyber-cyan/20 transition-all duration-300 cursor-pointer"
                  >
                    <Play size={12} />
                    Demo Video
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 glass-panel border rounded-2xl p-8">
            <p className="text-slate-650 dark:text-slate-400 text-sm">
              No projects found matching the criteria. Try updating your filters or search terms.
            </p>
          </div>
        )}
      </div>

      {/* Render details popup */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            initialTab={modalTab}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
