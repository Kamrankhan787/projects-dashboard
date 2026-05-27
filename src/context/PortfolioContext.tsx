"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { projectsData, Project } from "@/data/projects";

export interface ProfileData {
  name: string;
  title: string;
  bio: string;
  linkedin: string;
  github: string;
  email: string;
  whatsapp: string;
  resume: string;
  portfolio: string;
}

export interface ProjectLink {
  github: string;
  demo: string;
  video: string;
}

export interface ProjectLinksMap {
  [projectId: string]: ProjectLink;
}

interface PortfolioContextType {
  profile: ProfileData;
  projectLinks: ProjectLinksMap;
  projects: Project[];
  updateProfile: (data: Partial<ProfileData>) => void;
  updateProjectLinks: (projectId: string, links: Partial<ProjectLink>) => void;
  resetToDefault: () => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (isOpen: boolean) => void;
}

const defaultProfile: ProfileData = {
  name: "Aiden Sterling",
  title: "Agentic AI Developer",
  bio: "Designing and deploying autonomous AI systems. Specialized in dynamic tool calling, multi-agent orchestrations, retrieval-augmented generation (RAG), and high-performance, glassmorphic control dashboards.",
  linkedin: "https://linkedin.com/in/placeholder",
  github: "https://github.com/placeholder",
  email: "placeholder@email.com",
  whatsapp: "+1 (234) 567-890",
  resume: "#resume-placeholder",
  portfolio: "https://vercel.example/portfolio"
};

const defaultProjectLinks: ProjectLinksMap = {
  "tool-calling-agent": {
    github: "https://github.com/placeholder/tool-calling-agent",
    demo: "https://vercel.example/tool-calling-agent",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  "ai-calculator-agent": {
    github: "https://github.com/placeholder/ai-calculator-agent",
    demo: "https://vercel.example/ai-calculator-agent",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  "multi-tool-agent": {
    github: "https://github.com/placeholder/multi-tool-agent",
    demo: "https://vercel.example/multi-tool-agent",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  "rag-assistant": {
    github: "https://github.com/placeholder/rag-assistant",
    demo: "https://vercel.example/rag-assistant",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  "autonomous-business-agent": {
    github: "https://github.com/placeholder/autonomous-business-agent",
    demo: "https://vercel.example/autonomous-business-agent",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  "multi-agent-system": {
    github: "https://github.com/placeholder/multi-agent-system",
    demo: "https://vercel.example/multi-agent-system",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  }
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [projectLinks, setProjectLinks] = useState<ProjectLinksMap>(defaultProjectLinks);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem("portfolio_profile");
      const storedLinks = localStorage.getItem("portfolio_project_links");

      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
      if (storedLinks) {
        setProjectLinks(JSON.parse(storedLinks));
      }
    } catch (e) {
      console.error("Failed to load portfolio settings from localStorage", e);
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage when updated
  const updateProfile = (data: Partial<ProfileData>) => {
    setProfile((prev) => {
      const next = { ...prev, ...data };
      localStorage.setItem("portfolio_profile", JSON.stringify(next));
      return next;
    });
  };

  const updateProjectLinks = (projectId: string, links: Partial<ProjectLink>) => {
    setProjectLinks((prev) => {
      const next = {
        ...prev,
        [projectId]: { ...prev[projectId], ...links }
      };
      localStorage.setItem("portfolio_project_links", JSON.stringify(next));
      return next;
    });
  };

  const resetToDefault = () => {
    setProfile(defaultProfile);
    setProjectLinks(defaultProjectLinks);
    localStorage.removeItem("portfolio_profile");
    localStorage.removeItem("portfolio_project_links");
  };

  // Construct combined projects list
  const projects = projectsData.map((project) => {
    const customLinks = projectLinks[project.id] || defaultProjectLinks[project.id];
    return {
      ...project,
      github: customLinks.github,
      demo: customLinks.demo,
      video: customLinks.video
    };
  });

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        projectLinks,
        projects,
        updateProfile,
        updateProjectLinks,
        resetToDefault,
        isSettingsOpen,
        setIsSettingsOpen
      }}
    >
      {isInitialized ? children : <div className="bg-[#03000a] min-h-screen" />}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
