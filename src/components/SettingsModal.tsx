"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, RefreshCw, User, Link2, GitFork, Mail, Phone, FileText, Globe, Tv, CheckCircle2 } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function SettingsModal() {
  const {
    profile,
    projectLinks,
    projects,
    updateProfile,
    updateProjectLinks,
    resetToDefault,
    isSettingsOpen,
    setIsSettingsOpen
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<"profile" | "links">("profile");
  const [profileForm, setProfileForm] = useState(profile);
  const [linksForm, setLinksForm] = useState(projectLinks);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  if (!isSettingsOpen) return null;

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLinkChange = (projectId: string, field: "github" | "demo" | "video", value: string) => {
    setLinksForm((prev) => ({
      ...prev,
      [projectId]: {
        ...prev[projectId],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    setSaveStatus("saving");
    
    // Save Profile
    updateProfile(profileForm);

    // Save all links
    Object.keys(linksForm).forEach((id) => {
      updateProjectLinks(id, linksForm[id]);
    });

    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => {
        setSaveStatus("idle");
        setIsSettingsOpen(false);
      }, 1000);
    }, 800);
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all profile settings and links to default values?")) {
      resetToDefault();
      // Reload page to re-initialize forms
      window.location.reload();
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, damping: 25, stiffness: 250 } },
    exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto bg-black/70 backdrop-blur-md">
        {/* Click outside to close */}
        <div className="absolute inset-0" onClick={() => setIsSettingsOpen(false)} />

        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full max-w-4xl rounded-3xl glass-panel border border-cyber-purple/30 bg-[#090514]/90 shadow-2xl shadow-cyber-purple/20 overflow-hidden flex flex-col max-h-[85vh] z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/5 bg-slate-950/40">
            <div>
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-purple opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-purple"></span>
                </span>
                Personalize Portfolio Dashboard
              </h3>
              <p className="text-xs text-slate-450 mt-1">Configure your personal brand, LinkedIn, GitHub, and task-specific URLs.</p>
            </div>
            <button
              onClick={() => setIsSettingsOpen(false)}
              className="p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
            {/* Tabs */}
            <div className="flex gap-4 border-b border-white/5 pb-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-2 pb-3 px-1 font-semibold text-sm transition-all border-b-2 ${
                  activeTab === "profile"
                    ? "border-cyber-purple text-cyber-purple dark:text-cyber-cyan dark:border-cyber-cyan"
                    : "border-transparent text-slate-500 hover:text-slate-300"
                }`}
              >
                <User size={16} />
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab("links")}
                className={`flex items-center gap-2 pb-3 px-1 font-semibold text-sm transition-all border-b-2 ${
                  activeTab === "links"
                    ? "border-cyber-purple text-cyber-purple dark:text-cyber-cyan dark:border-cyber-cyan"
                    : "border-transparent text-slate-500 hover:text-slate-300"
                }`}
              >
                <Link2 size={16} />
                Internship Task Links
              </button>
            </div>

            {/* Tab 1: Profile */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-305 flex items-center gap-1.5">
                      <User size={12} className="text-cyber-purple" /> Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={profileForm.name}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 rounded-xl text-sm bg-slate-950/60 border border-white/10 text-slate-100 focus:outline-none focus:border-cyber-cyan transition-colors"
                      placeholder="e.g. Aiden Sterling"
                    />
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-305 flex items-center gap-1.5">
                      <Globe size={12} className="text-cyber-cyan" /> Professional Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={profileForm.title}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 rounded-xl text-sm bg-slate-950/60 border border-white/10 text-slate-100 focus:outline-none focus:border-cyber-cyan transition-colors"
                      placeholder="e.g. Agentic AI Developer"
                    />
                  </div>

                  {/* LinkedIn */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-305 flex items-center gap-1.5">
                      <Link2 size={12} className="text-blue-400" /> LinkedIn URL
                    </label>
                    <input
                      type="url"
                      name="linkedin"
                      value={profileForm.linkedin}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 rounded-xl text-sm bg-slate-950/60 border border-white/10 text-slate-100 focus:outline-none focus:border-cyber-cyan transition-colors"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>

                  {/* GitHub Profile */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-305 flex items-center gap-1.5">
                      <GitFork size={12} className="text-slate-400" /> GitHub Profile URL
                    </label>
                    <input
                      type="url"
                      name="github"
                      value={profileForm.github}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 rounded-xl text-sm bg-slate-950/60 border border-white/10 text-slate-100 focus:outline-none focus:border-cyber-cyan transition-colors"
                      placeholder="https://github.com/username"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-305 flex items-center gap-1.5">
                      <Mail size={12} className="text-purple-400" /> Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profileForm.email}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 rounded-xl text-sm bg-slate-950/60 border border-white/10 text-slate-100 focus:outline-none focus:border-cyber-cyan transition-colors"
                      placeholder="email@example.com"
                    />
                  </div>

                  {/* WhatsApp */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-305 flex items-center gap-1.5">
                      <Phone size={12} className="text-emerald-450" /> WhatsApp Number
                    </label>
                    <input
                      type="text"
                      name="whatsapp"
                      value={profileForm.whatsapp}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 rounded-xl text-sm bg-slate-950/60 border border-white/10 text-slate-100 focus:outline-none focus:border-cyber-cyan transition-colors"
                      placeholder="e.g. +1234567890"
                    />
                  </div>

                  {/* Resume URL */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-305 flex items-center gap-1.5">
                      <FileText size={12} className="text-yellow-450" /> Resume Download Path / URL
                    </label>
                    <input
                      type="text"
                      name="resume"
                      value={profileForm.resume}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 rounded-xl text-sm bg-slate-950/60 border border-white/10 text-slate-100 focus:outline-none focus:border-cyber-cyan transition-colors"
                      placeholder="/files/resume.pdf"
                    />
                  </div>

                  {/* Portfolio URL */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-305 flex items-center gap-1.5">
                      <Globe size={12} className="text-teal-450" /> Portfolio Website Link
                    </label>
                    <input
                      type="url"
                      name="portfolio"
                      value={profileForm.portfolio}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-3 rounded-xl text-sm bg-slate-950/60 border border-white/10 text-slate-100 focus:outline-none focus:border-cyber-cyan transition-colors"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-305">Profile Bio / Introduction</label>
                  <textarea
                    name="bio"
                    value={profileForm.bio}
                    onChange={handleProfileChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl text-sm bg-slate-950/60 border border-white/10 text-slate-100 focus:outline-none focus:border-cyber-cyan transition-colors resize-none"
                    placeholder="Describe your AI expertise..."
                  />
                </div>
              </div>
            )}

            {/* Tab 2: Links */}
            {activeTab === "links" && (
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-cyber-purple/5 border border-cyber-purple/20 text-xs text-cyber-purple dark:text-cyber-cyan flex items-start gap-3">
                  <Tv size={16} className="shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Pro Tip: </span>
                    To load a video directly from your computer, place the video file (e.g. <code>demo.mp4</code>) in the <code>public/videos/</code> folder, then write its URL as <code>/videos/demo.mp4</code> here. Otherwise, you can enter any YouTube embed link like <code>https://www.youtube.com/embed/VIDEO_ID</code>.
                  </div>
                </div>

                <div className="space-y-8">
                  {projects.map((project, idx) => (
                    <div key={project.id} className="p-5 rounded-2xl bg-slate-950/40 border border-white/5 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-200">
                          Task {idx + 1}: {project.title}
                        </h4>
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                          project.type === "Terminal" ? "bg-cyber-cyan/15 text-cyber-cyan" : "bg-cyber-purple/15 text-cyber-purple"
                        }`}>
                          {project.type}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* GitHub Repository */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                            <GitFork size={10} /> GitHub Repository
                          </label>
                          <input
                            type="url"
                            value={linksForm[project.id]?.github || ""}
                            onChange={(e) => handleLinkChange(project.id, "github", e.target.value)}
                            className="w-full px-3 py-2 rounded-lg text-xs bg-slate-950 border border-white/10 text-slate-100 focus:outline-none focus:border-cyber-cyan"
                            placeholder="GitHub Repository link"
                          />
                        </div>

                        {/* Vercel Demo */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                            <Globe size={10} /> Live Vercel Demo
                          </label>
                          <input
                            type="url"
                            value={linksForm[project.id]?.demo || ""}
                            onChange={(e) => handleLinkChange(project.id, "demo", e.target.value)}
                            className="w-full px-3 py-2 rounded-lg text-xs bg-slate-950 border border-white/10 text-slate-100 focus:outline-none focus:border-cyber-cyan"
                            placeholder="Vercel Deployment URL"
                          />
                        </div>

                        {/* Video Demo */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                            <Tv size={10} /> Video Demo Path/Link
                          </label>
                          <input
                            type="text"
                            value={linksForm[project.id]?.video || ""}
                            onChange={(e) => handleLinkChange(project.id, "video", e.target.value)}
                            className="w-full px-3 py-2 rounded-lg text-xs bg-slate-950 border border-white/10 text-slate-100 focus:outline-none focus:border-cyber-cyan"
                            placeholder="/videos/my-video.mp4"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer controls */}
          <div className="p-6 border-t border-white/5 bg-slate-950/40 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-500/20 text-rose-450 hover:bg-rose-500/10 text-xs font-semibold transition-all cursor-pointer"
            >
              <RefreshCw size={14} />
              Reset All to Defaults
            </button>

            <div className="flex gap-3">
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 text-xs font-semibold transition-all cursor-pointer"
              >
                Cancel
              </button>
              
              <button
                onClick={handleSave}
                disabled={saveStatus !== "idle"}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyber-purple to-cyber-blue hover:opacity-90 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-cyber-purple/20 transition-all cursor-pointer"
              >
                {saveStatus === "saving" ? (
                  <>
                    <span className="h-3 w-3 border-2 border-white border-t-transparent animate-spin rounded-full" />
                    Saving...
                  </>
                ) : saveStatus === "saved" ? (
                  <>
                    <CheckCircle2 size={14} />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save size={14} />
                    Save & Apply Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
